const repository =
  require(
    './session.repository',
  );

const {
  hashToken,
  createDeviceId,
} = require(
  './session.util',
);

async function create({
  userId,
  refreshToken,
  deviceId,
  deviceName,
  platform,
  ipAddress,
  userAgent,
  expiresAt,
}) {
  return repository.create({
    userId,
    refreshTokenHash:
      hashToken(refreshToken),
    deviceId:
      deviceId ??
      createDeviceId(),
    deviceName:
      deviceName ??
      'Unknown device',
    platform:
      platform ?? 'unknown',
    ipAddress:
      ipAddress ?? null,
    userAgent:
      userAgent ?? null,
    expiresAt,
  });
}

async function listForUser(
  userId,
) {
  return repository
    .findUserSessions(
      userId,
    );
}

async function revoke({
  sessionId,
  userId,
}) {
  const session =
    await repository.revoke(
      sessionId,
      userId,
    );

  if (!session) {
    const error =
      new Error(
        'Session not found.',
      );

    error.statusCode = 404;
    error.code =
      'SESSION_NOT_FOUND';

    throw error;
  }

  return session;
}

async function revokeOthers({
  userId,
  currentSessionId,
}) {
  return repository
    .revokeAllForUser(
      userId,
      currentSessionId,
    );
}

module.exports = {
  create,
  listForUser,
  revoke,
  revokeOthers,
};
