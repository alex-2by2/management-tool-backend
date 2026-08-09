const repository =
  require(
    './job.repository',
  );

async function enqueue({
  type,
  payload = {},
  maxAttempts = 3,
  createdBy = null,
}) {
  return repository.enqueue({
    type,
    payload,
    maxAttempts,
    createdBy,
  });
}

async function complete(
  job,
) {
  return repository.complete(
    job._id,
  );
}

async function handleFailure(
  job,
  error,
) {
  if (
    job.attempts <
    job.maxAttempts
  ) {
    const delay =
      Math.min(
        2 ** job.attempts,
        60,
      );

    const availableAt =
      new Date(
        Date.now() +
          delay * 1000,
      );

    return repository.retry(
      job._id,
      availableAt,
      error,
    );
  }

  return repository.fail(
    job._id,
    error,
  );
}

module.exports = {
  enqueue,
  complete,
  handleFailure,
};
