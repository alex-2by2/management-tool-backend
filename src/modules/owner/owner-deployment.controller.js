const service =
  require(
    '../deployment/deployment.service',
  );

async function runtime(
  request,
  response,
  next,
) {
  try {
    const data =
      await service.runtime();

    return response.json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
}

async function history(
  request,
  response,
  next,
) {
  try {
    const environment =
      request.query.environment ??
      process.env.NODE_ENV ??
      'development';

    const releases =
      await service.history({
        environment,
        limit:
          request.query.limit,
      });

    return response.json({
      success: true,
      data: {
        releases,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function prepareRelease(
  request,
  response,
  next,
) {
  try {
    const {
      version,
      environment,
      commitSha,
    } = request.body;

    if (!version) {
      const error =
        new Error(
          'Version is required.',
        );

      error.statusCode = 400;
      error.code =
        'VERSION_REQUIRED';

      throw error;
    }

    const release =
      await service.createRelease({
        version,
        environment:
          environment ??
          'production',
        commitSha:
          commitSha ?? null,
        userId:
          request.auth.userId,
      });

    return response
      .status(201)
      .json({
        success: true,
        data: {
          release,
        },
      });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  runtime,
  history,
  prepareRelease,
};
