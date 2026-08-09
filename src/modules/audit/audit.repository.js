const AuditLog =
  require(
    '../../models/audit-log.model',
  );

async function create(data) {
  return AuditLog.create(data);
}

async function findRecent({
  limit = 100,
  category,
  action,
}) {
  const query = {};

  if (category) {
    query.category = category;
  }

  if (action) {
    query.action = action;
  }

  return AuditLog.find(query)
    .populate(
      'actorId',
      'fullName username email role',
    )
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 100,
          1,
        ),
        500,
      ),
    )
    .lean();
}

module.exports = {
  create,
  findRecent,
};
