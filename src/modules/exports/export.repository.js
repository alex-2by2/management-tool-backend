const ExportJob =
  require(
    '../../models/export-job.model',
  );

async function create(data) {
  return ExportJob.create(
    data,
  );
}

async function findForUser(
  userId,
  limit = 20,
) {
  return ExportJob.find({
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
    .select(
      '-storageKey -checksum',
    )
    .lean();
}

async function findById(
  id,
) {
  return ExportJob.findById(
    id,
  ).lean();
}

async function update(
  id,
  data,
) {
  return ExportJob.findByIdAndUpdate(
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
  findForUser,
  findById,
  update,
};
