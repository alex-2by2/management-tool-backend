const repository =
  require(
    './security-event.repository',
  );

async function record({
  userId,
  type,
  request,
  deviceId,
  metadata = {},
}) {
  return repository.create({
    userId:
      userId ?? null,

    type,

    ipAddress:
      getIp(request),

    userAgent:
      request?.headers?.[
        'user-agent'
      ] ?? null,

    deviceId:
      deviceId ?? null,

    metadata:
      sanitizeMetadata(
        metadata,
      ),
  });
}

async function userActivity(
  userId,
  limit,
) {
  return repository.findForUser(
    userId,
    limit,
  );
}

async function recentActivity(
  limit,
) {
  return repository.findRecent(
    limit,
  );
}

function getIp(request) {
  if (!request) {
    return null;
  }

  return (
    request.ip ??
    request.headers?.[
      'x-forwarded-for'
    ] ??
    null
  );
}

function sanitizeMetadata(
  metadata,
) {
  const blocked = new Set([
    'password',
    'passwordHash',
    'refreshToken',
    'accessToken',
    'token',
    'secret',
    'apiKey',
    'authorization',
  ]);

  return Object.fromEntries(
    Object.entries(
      metadata ?? {},
    ).filter(
      ([key]) =>
        !blocked.has(key),
    ),
  );
}

module.exports = {
  record,
  userActivity,
  recentActivity,
};
