const RemoteConfig =
  require(
    '../../models/remote-config.model',
  );

async function findAll() {
  return RemoteConfig.find({})
    .sort({
      key: 1,
    })
    .populate(
      'updatedBy',
      'fullName username',
    )
    .lean();
}

async function findPublic() {
  return RemoteConfig.find({
    enabled: true,
  })
    .select(
      'key value type',
    )
    .sort({
      key: 1,
    })
    .lean();
}

async function findByKey(key) {
  return RemoteConfig.findOne({
    key,
  }).lean();
}

async function upsert({
  key,
  value,
  type,
  description,
  enabled,
  updatedBy,
}) {
  return RemoteConfig.findOneAndUpdate(
    {
      key,
    },
    {
      $set: {
        value,
        type,
        description,
        enabled,
        updatedBy,
      },
    },
    {
      new: true,
      upsert: true,
    },
  ).lean();
}

async function remove(key) {
  return RemoteConfig.findOneAndDelete({
    key,
  }).lean();
}

module.exports = {
  findAll,
  findPublic,
  findByKey,
  upsert,
  remove,
};
