const service =
  require(
    '../api-keys/api-key.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const keys =
      await service.list();

    return response.json({
      success: true,
      data: {
        keys,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function create(
  request,
  response,
  next,
) {
  try {
    const {
      name,
      scopes,
      expiresAt,
    } = request.body;

    if (!name?.trim()) {
      const error =
        new Error(
          'API key name is required.',
        );

      error.statusCode = 400;
      error.code =
        'INVALID_API_KEY_NAME';

      throw error;
    }

    const result =
      await service.create({
        name:
          name.trim(),
        scopes:
          Array.isArray(scopes)
            ? scopes
            : [],
        expiresAt:
          expiresAt ?? null,
        userId:
          request.auth.userId,
        request,
      });

    return response
      .status(201)
      .json({
        success: true,
        data: result,
      });
  } catch (error) {
    return next(error);
  }
}

async function revoke(
  request,
  response,
  next,
) {
  try {
    const result =
      await service.revoke({
        id:
          request.params.id,
        userId:
          request.auth.userId,
        request,
      });

    return response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  create,
  revoke,
};
