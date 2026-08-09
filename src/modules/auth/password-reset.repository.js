const PasswordReset =
  require(
    '../../models/password-reset.model',
  );

async function create(data) {
  return PasswordReset.create(
    data,
  );
}

async function findValid(
  tokenHash,
) {
  return PasswordReset.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: {
      $gt: new Date(),
    },
  });
}

async function markUsed(id) {
  return PasswordReset.findOneAndUpdate(
    {
      _id: id,
      usedAt: null,
    },
    {
      $set: {
        usedAt: new Date(),
      },
    },
    {
      new: true,
    },
  );
}

async function invalidateUserTokens(
  userId,
) {
  return PasswordReset.updateMany(
    {
      userId,
      usedAt: null,
    },
    {
      $set: {
        usedAt: new Date(),
      },
    },
  );
}

module.exports = {
  create,
  findValid,
  markUsed,
  invalidateUserTokens,
};
