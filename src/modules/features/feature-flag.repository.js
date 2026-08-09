const FeatureFlag =
  require(
    '../../models/feature-flag.model',
  );

async function findAll() {
  return FeatureFlag.find({})
    .sort({
      name: 1,
    })
    .lean();
}

async function findByKey(key) {
  return FeatureFlag.findOne({
    key,
  }).lean();
}

async function findEnabledKeys(
  environment,
) {
  return FeatureFlag.find({
    enabled: true,
    $or: [
      {
        environment: 'all',
      },
      {
        environment,
      },
    ],
  })
    .select('key')
    .lean();
}

async function update({
  key,
  enabled,
  userId,
}) {
  return FeatureFlag.findOneAndUpdate(
    {
      key,
    },
    {
      $set: {
        enabled,
        updatedBy: userId,
        updatedAt: new Date(),
      },
    },
    {
      new: true,
    },
  ).lean();
}

async function createIfMissing(
  feature,
) {
  return FeatureFlag.findOneAndUpdate(
    {
      key: feature.key,
    },
    {
      $setOnInsert: feature,
    },
    {
      upsert: true,
      new: true,
    },
  ).lean();
}

module.exports = {
  findAll,
  findByKey,
  findEnabledKeys,
  update,
  createIfMissing,
};
