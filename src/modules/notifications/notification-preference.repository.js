const Preference =
  require(
    '../../models/notification-preference.model',
  );

async function get(
  userId,
) {
  let preference =
    await Preference.findOne({
      userId,
    }).lean();

  if (!preference) {
    preference =
      await Preference.create({
        userId,
      });

    preference =
      preference.toObject();
  }

  return preference;
}

async function update(
  userId,
  data,
) {
  return Preference.findOneAndUpdate(
    {
      userId,
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
  get,
  update,
};
