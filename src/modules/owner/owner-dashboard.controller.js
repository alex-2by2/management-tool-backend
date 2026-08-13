const service =
  require(
    './owner-dashboard.service',
  );

async function overview(
  request,
  response,
  next,
) {
  try {
    const data =
      await service.getOverview();

    return response.json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  overview,
};
