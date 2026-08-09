const service =
  require(
    '../notifications/notification.service',
  );

async function create(
  request,
  response,
  next,
) {
  try {
    const {
      title,
      message,
      type,
      target,
      channel,
    } = request.body;

    if (
      !title?.trim() ||
      !message?.trim()
    ) {
      const error =
        new Error(
          'Title and message are required.',
        );

      error.statusCode = 400;
      error.code =
        'INVALID_NOTIFICATION';

      throw error;
    }

    const result =
      await service.createGlobal({
        title:
          title.trim(),
        message:
          message.trim(),
        type:
          type ?? 'announcement',
        target:
          target ?? 'all',
        channel:
          channel ?? 'in_app',
        createdBy:
          request.auth.userId,
      });

    return response.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function list(
  request,
  response,
  next,
) {
  try {
    const notifications =
      await service.listRecent();

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

async function disable(
  request,
  response,
  next,
) {
  try {
    const notification =
      await service.disable(
        request.params.notificationId,
      );

    return response.json({
      success: true,
      data: {
        notification,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  list,
  disable,
};
