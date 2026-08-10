const service = require(
  './owner-user.service',
);

async function list(
  request,
  response,
  next,
) {
  try {
    const data = await service.listUsers({
      search: request.query.search,
      role: request.query.role,
      status: request.query.status,
      page: request.query.page,
      limit: request.query.limit,
    });

    return response.json({
      success: true,
      data,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateStatus(
  request,
  response,
  next,
) {
  try {
    const user = await service.updateStatus({
      userId: request.params.userId,
      status: request.body.status,
      ownerUserId: request.auth.userId,
    });

    return response.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function revokeSessions(
  request,
  response,
  next,
) {
  try {
    await service.revokeUserSessions({
      userId: request.params.userId,
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
  updateStatus,
  revokeSessions,
};
