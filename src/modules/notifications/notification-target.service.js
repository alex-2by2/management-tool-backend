const User =
  require(
    '../../models/user.model',
  );

async function findTargetUsers(
  target,
) {
  const query = {};

  if (target === 'owners') {
    query.role = 'owner';
  }

  if (target === 'admins') {
    query.role = 'admin';
  }

  if (target === 'support') {
    query.role = 'support';
  }

  if (target === 'users') {
    query.role = 'user';
  }

  query.status = 'active';

  return User.find(query)
    .select('_id')
    .lean();
}

module.exports = {
  findTargetUsers,
};
