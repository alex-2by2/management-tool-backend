const service =
  require(
    './settings.service',
  );

async function publicSettings(
  request,
  response,
  next,
) {
  try {
    const settings =
      await service.getPublic();

    return response.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  publicSettings,
};
