const ApiKey =
  require(
    '../../models/api-key.model',
  );

async function create(data) {
  return ApiKey.create(data);
}

async function findAll() {
  return ApiKey.find({})
    .select(
      '-keyHash',
    )
    .populate(
      'createdBy',
      'fullName username',
    )
    .sort({
      createdAt: -1,
    })
    .lean();
}

async function findActiveByHash(
  keyHash,
) {
  return ApiKey.findOne({
    keyHash,
    status: 'active',
    $or: [
      {
        expiresAt: null,
      },
      {
        expiresAt: {
          $gt: new Date(),
        },
      },
    ],
  });
}

async function revoke(id) {
  return ApiKey.findOneAndUpdate(
    {
      _id: id,
      status: 'active',
    },
    {
      $set: {
        status: 'revoked',
        revokedAt: new Date(),
      },
    },
    {
      new: true,
    },
  )
    .select('-keyHash')
    .lean();
}

async function markUsed(id) {
  return ApiKey.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        lastUsedAt: new Date(),
      },
    },
  );
}

module.exports = {
  create,
  findAll,
  findActiveByHash,
  revoke,
  markUsed,
};
