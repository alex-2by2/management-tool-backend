const repository =
  require(
    './backup.repository',
  );

const audit =
  require(
    '../audit/audit.service',
  );

async function createManual({
  userId,
  request,
}) {
  const job =
    await repository.create({
      type: 'manual',
      status: 'queued',
      createdBy:
        userId,
    });

  await audit.record({
    actorId: userId,
    action:
      'BACKUP_REQUESTED',
    category: 'system',
    targetType:
      'backup_job',
    targetId:
      job._id.toString(),
    request,
  });

  return sanitize(job);
}

async function list() {
  const jobs =
    await repository.findRecent();

  return jobs.map(sanitize);
}

function sanitize(job) {
  return {
    id:
      job._id.toString(),

    type:
      job.type,

    status:
      job.status,

    sizeBytes:
      job.sizeBytes,

    startedAt:
      job.startedAt,

    completedAt:
      job.completedAt,

    errorCode:
      job.errorCode,

    createdAt:
      job.createdAt,
  };
}

module.exports = {
  createManual,
  list,
};
