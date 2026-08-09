const MaintenanceMode =
  require(
    '../../models/maintenance-mode.model',
  );

async function get() {
  let record =
    await MaintenanceMode.findOne();

  if (!record) {
    record =
      await MaintenanceMode.create({
        enabled: false,
      });
  }

  return record;
}

async function update(data) {
  return MaintenanceMode.findOneAndUpdate(
    {},
    {
      $set: data,
    },
    {
      new: true,
      upsert: true,
    },
  );
}

module.exports = {
  get,
  update,
};
