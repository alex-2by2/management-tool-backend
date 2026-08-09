const Release =
  require(
    '../../models/release.model',
  );

async function create(data) {
  return Release.create(data);
}

async function findRecent(
  environment,
  limit = 30,
) {
  return Release.find({
    environment,
  })
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 30,
          1,
        ),
        100,
      ),
    )
    .populate(
      'triggeredBy',
      'fullName username',
    )
    .lean();
}

module.exports = {
  create,
  findRecent,
};
