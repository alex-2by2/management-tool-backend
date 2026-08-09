const service =
  require(
    './notification.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const notifications =
      await service.listForUser(
        request.auth.userId,
      );

    return response.json({
      success: true,
      data: {
        notifications,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function unreadCount(
  request,
  response,
  next,
) {
  try {
    const count =
      await service.unreadCount(
        request.auth.userId,
      );

    return response.json({
      success: true,
      data: {
        count,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function markRead(
  request,
  response,
  next,
) {
  try {
    await service.markRead({
      userId:
        request.auth.userId,
      notificationId:
        request.params
          .notificationId,
    });

    return response.json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
}

async function dismiss(
  request,
  response,
  next,
) {
  try {
    await service.dismiss({
      userId:
        request.auth.userId,
      notificationId:
        request.params
          .notificationId,
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
  unreadCount,
  markRead,
  dismiss,
};
