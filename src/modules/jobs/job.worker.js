const repository =
  require(
    './job.repository',
  );

const service =
  require(
    './job.service',
  );

const handlers =
  require(
    './job.handlers',
  );

let running = false;

async function processNext() {
  const job =
    await repository.claimNext();

  if (!job) {
    return false;
  }

  try {
    await handlers.execute(
      job,
    );

    await service.complete(
      job,
    );
  } catch (error) {
    await service.handleFailure(
      job,
      error,
    );
  }

  return true;
}

async function start() {
  if (running) {
    return;
  }

  running = true;

  while (running) {
    const processed =
      await processNext();

    if (!processed) {
      await sleep(1000);
    }
  }
}

function stop() {
  running = false;
}

function sleep(ms) {
  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms,
      ),
  );
}

module.exports = {
  start,
  stop,
  processNext,
};
