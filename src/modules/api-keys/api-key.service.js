const repository =
  require(
    './api-key.repository',
  );

const {
  generateApiKey,
  hashApiKey,
  getPrefix,
} = require(
  './api-key.util',
);

const audit =
  require(
    '../audit/audit.service',
  );

const {
  AUDIT_ACTIONS,
} = require(
  '../audit/audit-actions',
);

async function create({
  name,
  scopes = [],
  expiresAt = null,
  userId,
  request,
}) {
  const rawKey =
    generateApiKey();

  const key =
    await repository.create({
      name,
      prefix:
        getPrefix(rawKey),
      keyHash:
        hashApiKey(rawKey),
      scopes,
      expiresAt,
      createdBy:
        userId,
    });

  await audit.record({
    actorId: userId,
    action:
      AUDIT_ACTIONS
        .API_KEY_CREATED,
    category: 'security',
    targetType: 'api_key',
    targetId:
      key._id.toString(),
    metadata: {
      name,
      scopes,
      expiresAt,
    },
    request,
  });

  return {
    id:
      key._id.toString(),
    name:
      key.name,
    key:
      rawKey,
    prefix:
      key.prefix,
    scopes:
      key.scopes,
    expiresAt:
      key.expiresAt,
    createdAt:
      key.createdAt,
  };
}

async function list() {
  const keys =
    await repository.findAll();

  return keys.map(
    (key) => ({
      id:
        key._id.toString(),
      name:
        key.name,
      prefix:
        key.prefix,
      scopes:
        key.scopes,
      status:
        key.status,
      lastUsedAt:
        key.lastUsedAt,
      expiresAt:
        key.expiresAt,
      revokedAt:
        key.revokedAt,
      createdAt:
        key.createdAt,
      createdBy:
        key.createdBy,
    }),
  );
}

async function revoke({
  id,
  userId,
  request,
}) {
  const key =
    await repository.revoke(id);

  if (!key) {
    throw notFound();
  }

  await audit.record({
    actorId: userId,
    action:
      AUDIT_ACTIONS
        .API_KEY_REVOKED,
    category: 'security',
    targetType: 'api_key',
    targetId: id,
    metadata: {
      name: key.name,
      prefix: key.prefix,
    },
    request,
  });

  return {
    id,
    status:
      'revoked',
  };
}

function notFound() {
  const error =
    new Error(
      'API key was not found.',
    );

  error.statusCode = 404;
  error.code =
    'API_KEY_NOT_FOUND';

  return error;
}

module.exports = {
  create,
  list,
  revoke,
};
