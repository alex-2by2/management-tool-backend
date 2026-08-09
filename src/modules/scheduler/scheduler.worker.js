const scheduler =
  require(
    './scheduler.service',
  );

let running = false;

async function start() {
  if (running) {
    return;
  }

  running = true;

  while (running) {
    try {
      await scheduler
        .processDue();
    } catch (error) {
      console.error(
        'Scheduler cycle failed.',
        error,
      );
    }

    await sleep(
      30 * 1000,
    );
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
};
