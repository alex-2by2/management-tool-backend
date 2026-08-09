const {
  connectDatabase,
} = require(
  './core/database',
);

const worker =
  require(
    './modules/jobs/job.worker',
  );

async function main() {
  await connectDatabase();

  await worker.start();
}

main().catch(
  (error) => {
    console.error(
      'Worker failed to start.',
      error,
    );

    process.exit(1);
  },
);
