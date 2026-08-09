const ImportJob =
  require(
    '../../models/import-job.model',
  );

async function create(data) {
  return ImportJob.create(data);
}

async function findById(id) {
  return ImportJob.findById(
    id,
  ).lean();
}

async function findForUser(
  userId,
  limit = 20,
) {
  return ImportJob.find({
    requestedBy: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 20,
          1,
        ),
        50,
      ),
    )
    .lean();
}

async function update(
  id,
  data,
) {
  return ImportJob.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
    },
  ).lean();
}

module.exports = {
  create,
  findById,
  findForUser,
  update,
};
