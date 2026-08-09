const repository =
  require(
    './remote-config.repository',
  );

const {
  validateValue,
  validateKey,
} = require(
  './remote-config.validator',
);

const audit =
  require(
    '../audit/audit.service',
  );

async function publicConfig() {
  const configs =
    await repository.findPublic();

  return configs.reduce(
    (result, item) => {
      result[item.key] =
        item.value;

      return result;
    },
    {},
  );
}

async function ownerList() {
  return repository.findAll();
}

async function update({
  key,
  value,
  type,
  description,
  enabled,
  userId,
  request,
}) {
  if (!validateKey(key)) {
    throw badRequest(
      'Invalid configuration key.',
      'INVALID_CONFIG_KEY',
    );
  }

  if (
    !validateValue(
      value,
      type,
    )
  ) {
    throw badRequest(
      'Configuration value does not match its type.',
      'INVALID_CONFIG_VALUE',
    );
  }

  const config =
    await repository.upsert({
      key,
      value,
      type,
      description:
        description ?? '',
      enabled:
        enabled ?? true,
      updatedBy:
        userId,
    });

  await audit.record({
    actorId: userId,
    action:
      'REMOTE_CONFIG_UPDATED',
    category: 'feature',
    targetType:
      'remote_config',
    targetId: key,
    metadata: {
      type,
      enabled:
        enabled ?? true,
    },
    request,
  });

  return config;
}

async function remove({
  key,
  userId,
  request,
}) {
  const deleted =
    await repository.remove(
      key,
    );

  if (!deleted) {
    throw badRequest(
      'Configuration was not found.',
      'CONFIG_NOT_FOUND',
      404,
    );
  }

  await audit.record({
    actorId: userId,
    action:
      'REMOTE_CONFIG_DELETED',
    category: 'feature',
    targetType:
      'remote_config',
    targetId: key,
    request,
  });

  return {
    key,
    deleted: true,
  };
}

function badRequest(
  message,
  code,
  statusCode = 400,
) {
  const error =
    new Error(message);

  error.statusCode =
    statusCode;

  error.code = code;

  return error;
}

module.exports = {
  publicConfig,
  ownerList,
  update,
  remove,
};
