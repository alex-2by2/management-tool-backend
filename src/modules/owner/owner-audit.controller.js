const audit =
  require(
    '../audit/audit.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const logs =
      await audit.recent({
        limit:
          request.query.limit,
        category:
          request.query.category,
        action:
          request.query.action,
      });

    return response.json({
      success: true,
      data: {
        logs,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
};
