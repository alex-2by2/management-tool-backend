const ScheduledJob =
  require(
    '../../models/scheduled-job.model',
  );

async function findDue() {
  return ScheduledJob.find({
    enabled: true,
    nextRunAt: {
      $lte: new Date(),
    },
  })
    .sort({
      nextRunAt: 1,
    })
    .limit(20);
}

async function updateRun(
  id,
  data,
) {
  return ScheduledJob.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
    });
}

async function findAll() {
  return ScheduledJob.find({})
    .sort({
      name: 1,
    })
    .lean();
}

async function findByName(name) {
  return ScheduledJob.findOne({
    name,
  }).lean();
}

async function upsert(
  name,
  data,
) {
  return ScheduledJob.findOneAndUpdate(
    {
      name,
    },
    {
      $set: data,
    },
    {
      new: true,
      upsert: true,
    },
  ).lean();
}

module.exports = {
  findDue,
  updateRun,
  findAll,
  findByName,
  upsert,
};
