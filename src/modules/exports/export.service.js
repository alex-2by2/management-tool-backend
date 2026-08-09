const repository =
  require(
    './export.repository',
  );

const jobService =
  require(
    '../jobs/job.service',
  );

async function requestUserExport({
  userId,
}) {
  const exportJob =
    await repository.create({
      requestedBy: userId,
      scope: 'my_data',
      format: 'json',
      status: 'queued',
    });

  await jobService.enqueue({
    type:
      'USER_DATA_EXPORT',

    payload: {
      exportJobId:
        exportJob._id.toString(),
    },

    createdBy:
      userId,
  });

  return sanitize(
    exportJob,
  );
}

async function listForUser(
  userId,
) {
  const exports =
    await repository
      .findForUser(
        userId,
      );

  return exports.map(
    sanitize,
  );
}

function sanitize(job) {
  return {
    id:
      job._id.toString(),
    scope:
      job.scope,
    format:
      job.format,
    status:
      job.status,
    sizeBytes:
      job.sizeBytes,
    expiresAt:
      job.expiresAt,
    completedAt:
      job.completedAt,
    createdAt:
      job.createdAt,
  };
}

module.exports = {
  requestUserExport,
  listForUser,
};
