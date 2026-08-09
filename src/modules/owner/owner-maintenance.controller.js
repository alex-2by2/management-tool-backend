const service =
  require(
    '../maintenance/maintenance.service',
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

async function update(
  request,
  response,
  next,
) {
  try {
    const {
      enabled,
      title,
      message,
      estimatedEndAt,
    } = request.body;

    if (
      typeof enabled !==
      'boolean'
    ) {
      const error =
        new Error(
          'enabled must be boolean.',
        );

      error.statusCode = 400;
      error.code =
        'INVALID_MAINTENANCE_STATUS';

      throw error;
    }

    const data =
      await service.update({
        enabled,
        title,
        message,
        estimatedEndAt,
        userId:
          request.auth.userId,
        request,
      });

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
  update,
};
