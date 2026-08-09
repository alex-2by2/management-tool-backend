const service =
  require(
    './feature-flag.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const features =
      await service.list();

    return response.json({
      success: true,
      data: {
        features,
      },
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
    const enabled =
      request.body.enabled;

    if (
      typeof enabled !==
      'boolean'
    ) {
      const error =
        new Error(
          'enabled must be a boolean.',
        );

      error.statusCode = 400;
      error.code =
        'INVALID_FEATURE_STATE';

      throw error;
    }

    const feature =
      await service.update({
        key:
          request.params.key,
        enabled,
        userId:
          request.auth.userId,
      });

    return response.json({
      success: true,
      data: {
        feature,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  update,
};
