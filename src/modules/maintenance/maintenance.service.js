const repository =
  require(
    './maintenance.repository',
  );

const audit =
  require(
    '../audit/audit.service',
  );

async function getStatus() {
  const record =
    await repository.get();

  return sanitize(record);
}

async function update({
  enabled,
  title,
  message,
  estimatedEndAt,
  userId,
  request,
}) {
  const record =
    await repository.update({
      enabled,
      title,
      message,
      estimatedEndAt:
        estimatedEndAt ?? null,
      updatedBy:
        userId,
    });

  await audit.record({
    actorId: userId,
    action: enabled
      ? 'MAINTENANCE_ENABLED'
      : 'MAINTENANCE_DISABLED',
    category: 'system',
    targetType:
      'maintenance_mode',
    targetId:
      record._id.toString(),
    metadata: {
      enabled,
      title,
      estimatedEndAt:
        estimatedEndAt ?? null,
    },
    request,
  });

  return sanitize(record);
}

function sanitize(record) {
  return {
    enabled:
      record.enabled,

    title:
      record.title,

    message:
      record.message,

    estimatedEndAt:
      record.estimatedEndAt,

    updatedAt:
      record.updatedAt,
  };
}

module.exports = {
  getStatus,
  update,
};
