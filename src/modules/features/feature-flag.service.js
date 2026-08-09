const repository =
  require(
    './feature-flag.repository',
  );

const DEFAULT_FEATURES =
  require(
    './default-features',
  );

async function initializeDefaults() {
  for (const feature of DEFAULT_FEATURES) {
    await repository.createIfMissing(
      feature,
    );
  }
}

async function list() {
  const features =
    await repository.findAll();

  return features.map(
    sanitize,
  );
}

async function isEnabled(
  key,
  environment,
) {
  const feature =
    await repository.findByKey(
      key,
    );

  if (!feature) {
    return false;
  }

  if (
    feature.environment !==
      'all' &&
    feature.environment !==
      environment
  ) {
    return false;
  }

  return feature.enabled;
}

async function enabledKeys(
  environment,
) {
  const features =
    await repository.findEnabledKeys(
      environment,
    );

  return features.map(
    (feature) =>
      feature.key,
  );
}

async function update({
  key,
  enabled,
  userId,
}) {
  const feature =
    await repository.update({
      key,
      enabled,
      userId,
    });

  if (!feature) {
    throw notFound();
  }

  return sanitize(
    feature,
  );
}

function sanitize(feature) {
  return {
    key:
      feature.key,
    name:
      feature.name,
    description:
      feature.description,
    enabled:
      feature.enabled,
    environment:
      feature.environment,
    updatedAt:
      feature.updatedAt,
  };
}

function notFound() {
  const error =
    new Error(
      'Feature flag was not found.',
    );

  error.statusCode = 404;
  error.code =
    'FEATURE_FLAG_NOT_FOUND';

  return error;
}

module.exports = {
  initializeDefaults,
  list,
  isEnabled,
  enabledKeys,
  update,
};
