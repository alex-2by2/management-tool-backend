const BackgroundJob =
  require(
    '../../models/background-job.model',
  );

async function enqueue(data) {
  return BackgroundJob.create({
    ...data,
    status: 'queued',
  });
}

async function claimNext() {
  return BackgroundJob.findOneAndUpdate(
    {
      status: 'queued',
      availableAt: {
        $lte: new Date(),
      },
    },
    {
      $set: {
        status: 'running',
        startedAt: new Date(),
        lockedAt: new Date(),
      },

      $inc: {
        attempts: 1,
      },
    },
    {
      new: true,
      sort: {
        availableAt: 1,
        createdAt: 1,
      },
    },
  );
}

async function complete(id) {
  return BackgroundJob.findByIdAndUpdate(
    id,
    {
      $set: {
        status: 'completed',
        completedAt: new Date(),
        lockedAt: null,
      },
    },
    {
      new: true,
    },
  );
}

async function fail(
  id,
  error,
) {
  return BackgroundJob.findByIdAndUpdate(
    id,
    {
      $set: {
        status: 'failed',
        failedAt: new Date(),
        lockedAt: null,
        lastError:
          error?.message ??
          'Job failed.',
      },
    },
    {
      new: true,
    },
  );
}

async function retry(
  id,
  availableAt,
  error,
) {
  return BackgroundJob.findByIdAndUpdate(
    id,
    {
      $set: {
        status: 'queued',
        availableAt,
        lockedAt: null,
        lastError:
          error?.message ??
          'Job failed.',
      },
    },
    {
      new: true,
    },
  );
}

module.exports = {
  enqueue,
  claimNext,
  complete,
  fail,
  retry,
};
