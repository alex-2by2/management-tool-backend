const backupService =
  require(
    '../backups/backup.worker',
  );

const notificationWorker =
  require(
    '../notifications/notification.worker',
  );

const cleanupWorker =
  require(
    './cleanup.worker',
  );

const handlers = {
  BACKUP_CREATE:
    backupService.run,

  NOTIFICATION_DELIVERY:
    notificationWorker.run,

  SYSTEM_CLEANUP:
    cleanupWorker.run,
};

async function execute(job) {
  const handler =
    handlers[job.type];

  if (!handler) {
    const error =
      new Error(
        `Unknown job type: ${job.type}`,
      );

    error.code =
      'UNKNOWN_JOB_TYPE';

    throw error;
  }

  return handler(
    job.payload,
  );
}

module.exports = {
  execute,
};
