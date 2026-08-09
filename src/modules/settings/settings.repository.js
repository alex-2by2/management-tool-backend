const AppSettings =
  require(
    '../../models/app-settings.model',
  );

async function get() {
  let settings =
    await AppSettings.findOne()
      .lean();

  if (!settings) {
    settings =
      await AppSettings.create({});
    settings =
      settings.toObject();
  }

  return settings;
}

async function update(data) {
  return AppSettings.findOneAndUpdate(
    {},
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
  get,
  update,
};
