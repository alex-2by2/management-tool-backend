const repository =
  require(
    './audit.repository',
  );

async function record({
  actorId,
  action,
  category,
  targetType,
  targetId,
  metadata,
  request,
  success = true,
}) {
  return repository.create({
    actorId,
    action,
    category,
    targetType,
    targetId,
    metadata:
      sanitizeMetadata(
        metadata,
      ),
    ipAddress:
      getIpAddress(request),
    userAgent:
      request?.headers
        ?.['user-agent'] ??
      null,
    success,
  });
}

async function recent(filters) {
  const logs =
    await repository.findRecent(
      filters,
    );

  return logs.map(
    sanitize,
  );
}

function sanitize(log) {
  return {
    id:
      log._id.toString(),

    actor: log.actorId
      ? {
          id:
            log.actorId._id.toString(),
          fullName:
            log.actorId.fullName,
          username:
            log.actorId.username,
          email:
            log.actorId.email,
          role:
            log.actorId.role,
        }
      : null,

    action:
      log.action,

    category:
      log.category,

    targetType:
      log.targetType,

    targetId:
      log.targetId,

    metadata:
      log.metadata,

    ipAddress:
      log.ipAddress,

    success:
      log.success,

    createdAt:
      log.createdAt,
  };
}

function sanitizeMetadata(
  metadata,
) {
  if (!metadata) {
    return {};
  }

  const copy = {
    ...metadata,
  };

  delete copy.password;
  delete copy.refreshToken;
  delete copy.accessToken;
  delete copy.token;
  delete copy.secret;
  delete copy.apiKey;

  return copy;
}

function getIpAddress(
  request,
) {
  return (
    request?.headers
      ?.['x-forwarded-for']
      ?.split(',')[0]
      ?.trim() ??
    request?.ip ??
    null
  );
}

module.exports = {
  record,
  recent,
};
