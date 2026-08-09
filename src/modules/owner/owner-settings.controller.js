const service =
  require(
    '../settings/settings.service',
  );

async function get(
  request,
  response,
  next,
) {
  try {
    const settings =
      await service.getOwner();

    return response.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(
  request,
  response,
  next,
) {
  try {
    const {
      appName,
      supportEmail,
      supportUrl,
      logoUrl,
      primaryColor,
      maintenanceMessage,
      defaultTheme,
    } = request.body;

    const settings =
      await service.update({
        appName:
          appName?.trim(),
        supportEmail:
          supportEmail?.trim(),
        supportUrl:
          supportUrl?.trim(),
        logoUrl:
          logoUrl?.trim(),
        primaryColor:
          primaryColor?.trim(),
        maintenanceMessage:
          maintenanceMessage?.trim(),
        defaultTheme,
        userId:
          request.auth.userId,
        request,
      });

    return response.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  get,
  update,
};
