const BackupJob =
  require(
    '../../models/backup-job.model',
  );

async function create(data) {
  return BackupJob.create(
    data,
  );
}

async function findRecent(
  limit = 20,
) {
  return BackupJob.find({})
    .select(
      '-storageKey -checksum',
    )
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

async function findById(id) {
  return BackupJob.findById(
    id,
  ).lean();
}

async function update(
  id,
  data,
) {
  return BackupJob.findByIdAndUpdate(
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
  findRecent,
  findById,
  update,
};
