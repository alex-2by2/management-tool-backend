const repository =
  require(
    './scheduler.repository',
  );

const jobService =
  require(
    '../jobs/job.service',
  );

const {
  validateCron,
  validateTimezone,
} = require(
  './scheduler.validator',
);

async function register({
  name,
  jobType,
  cronExpression,
  timezone,
  payload = {},
  enabled = true,
  updatedBy = null,
}) {
  if (
    !validateCron(
      cronExpression,
    )
  ) {
    throw badRequest(
      'Invalid cron expression.',
      'INVALID_CRON',
    );
  }

  if (
    !validateTimezone(
      timezone,
    )
  ) {
    throw badRequest(
      'Invalid timezone.',
      'INVALID_TIMEZONE',
    );
  }

  return repository.upsert(
    name,
    {
      jobType,
      cronExpression,
      timezone,
      payload,
      enabled,
    updatedBy,
      },
  );
}

async function processDue() {
  const schedules =
    await repository.findDue();

  for (const schedule of schedules) {
    await enqueueSchedule(
      schedule,
    );
  }
}

async function enqueueSchedule(
  schedule,
) {
  const job =
    await jobService.enqueue({
      type:
        schedule.jobType,

      payload:
        schedule.payload,
    });

  /*
   * nextRunAt calculation should
   * use the approved cron library
   * with the schedule timezone.
   */

  const nextRunAt =
    calculateNextRun(
      schedule,
    );

  await repository.updateRun(
    schedule._id,
    {
      lastRunAt:
        new Date(),

      nextRunAt,

      lastJobId:
        job._id,
    },
  );
}

function calculateNextRun(
  schedule,
) {
  /*
   * Replace with the project's
   * cron scheduler implementation.
   */
  return new Date(
    Date.now() +
      60 * 60 * 1000,
  );
}

function badRequest(
  message,
  code,
) {
  const error =
    new Error(message);

  error.statusCode = 400;
  error.code = code;

  return error;
}

module.exports = {
  register,
  processDue,
};
