const service =
  require(
    './remote-config.service',
  );

async function publicConfig(
  request,
  response,
  next,
) {
  try {
    const config =
      await service.publicConfig();

    return response.json({
      success: true,
      data: {
        config,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  publicConfig,
};
