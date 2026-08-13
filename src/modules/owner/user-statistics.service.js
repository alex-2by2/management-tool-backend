const User =
  require(
    '../../models/user.model',
  );

async function getUserStatistics() {
  const [
    total,
    owners,
    admins,
    support,
    users,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      role: 'owner',
    }),

    User.countDocuments({
      role: 'admin',
    }),

    User.countDocuments({
      role: 'support',
    }),

    User.countDocuments({
      role: 'user',
    }),
  ]);

  return {
    total,
    owners,
    admins,
    support,
    users,
  };
}

module.exports = {
  getUserStatistics,
};
