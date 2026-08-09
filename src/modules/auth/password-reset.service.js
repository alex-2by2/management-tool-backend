const repository =
  require(
    './password-reset.repository',
  );

const {
  createResetToken,
  hashResetToken,
} = require(
  './password-reset.util',
);

const {
  hashPassword,
  validatePassword,
} = require(
  './password.util',
);

const sessionService =
  require(
    '../sessions/session.service',
  );

const securityEvents =
  require(
    '../security/security-event.service',
  );

async function requestReset({
  user,
  request,
}) {
  if (!user) {
    return;
  }

  await repository
    .invalidateUserTokens(
      user._id,
    );

  const token =
    createResetToken();

  const expiresAt =
    new Date(
      Date.now() +
        15 * 60 * 1000,
    );

  await repository.create({
    userId:
      user._id,

    tokenHash:
      hashResetToken(token),

    expiresAt,

    requestedIp:
      request?.ip ?? null,
  });

  await securityEvents.record({
    userId:
      user._id,
    type:
      'password_reset_requested',
    request,
  });

  /*
   * Send the raw token through
   * the configured email/SMS
   * recovery provider.
   *
   * Never log the token.
   */
}

async function resetPassword({
  token,
  newPassword,
  request,
}) {
  const validation =
    validatePassword(
      newPassword,
    );

  if (!validation.valid) {
    throw badRequest(
      validation.message,
      'INVALID_PASSWORD',
    );
  }

  const reset =
    await repository.findValid(
      hashResetToken(token),
    );

  if (!reset) {
    throw badRequest(
      'Reset token is invalid or expired.',
      'INVALID_RESET_TOKEN',
    );
  }

  const passwordHash =
    await hashPassword(
      newPassword,
    );

  await updateUserPassword(
    reset.userId,
    passwordHash,
  );

  await repository.markUsed(
    reset._id,
  );

  await repository
    .invalidateUserTokens(
      reset.userId,
    );

  await sessionService
    .revokeOthers({
      userId:
        reset.userId,
      currentSessionId:
        null,
    });

  await securityEvents.record({
    userId:
      reset.userId,
    type:
      'password_changed',
    request,
  });

  return {
    success: true,
  };
}

function badRequest(
  message,
  code,
) {
  const error =
    new Error(message);

  error.statusCode = 400;
  error.code = code;

  return error;
}

async function updateUserPassword(
  userId,
  passwordHash,
) {
  // Replace with existing
  // user repository/service.
}

module.exports = {
  requestReset,
  resetPassword,
};
