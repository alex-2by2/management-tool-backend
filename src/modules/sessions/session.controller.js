const service =
  require(
    './session.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const sessions =
      await service.listForUser(
        request.auth.userId,
      );

    return response.json({
      success: true,
      data: {
        sessions,
      },
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
    const session =
      await service.revoke({
        userId:
          request.auth.userId,
        sessionId:
          request.params.sessionId,
      });

    return response.json({
      success: true,
      data: {
        session,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function revokeAllExcept(
  request,
  response,
  next,
) {
  try {
    await service.revokeAllExcept({
      userId:
        request.auth.userId,
      sessionId:
        request.auth.sessionId,
    });

    return response.json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  revoke,
  revokeAllExcept,
};
