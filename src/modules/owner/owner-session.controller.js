const service =
  require(
    './owner-session.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const sessions =
      await service
        .listActiveSessions();

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

module.exports = {
  list,
};
