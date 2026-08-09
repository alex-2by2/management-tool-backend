const service =
  require(
    './maintenance.service',
  );

async function status(
  request,
  response,
  next,
) {
  try {
    const data =
      await service.getStatus();

    return response.json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  status,
};
