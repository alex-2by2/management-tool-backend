const {
  getHealth,
} = require(
  './health.service',
);

async function health(
  request,
  response,
  next,
) {
  try {
    const data =
      await getHealth();

    const statusCode =
      data.status === 'healthy'
        ? 200
        : 503;

    return response
      .status(statusCode)
      .json({
        success:
          data.status ===
          'healthy',
        data,
      });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  health,
};
