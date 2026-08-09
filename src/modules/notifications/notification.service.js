const notificationRepository =
  require(
    './notification.repository',
  );

const userNotificationRepository =
  require(
    './user-notification.repository',
  );

const targetService =
  require(
    './notification-target.service',
  );

const pushProvider =
  require(
    './push-provider',
  );

async function createGlobal({
  title,
  message,
  type,
  target,
  channel,
  createdBy,
}) {
  const notification =
    await notificationRepository.create({
      title,
      message,
      type,
      target,
      channel,
      createdBy,
      status: 'published',
      publishedAt: new Date(),
    });

  const users =
    await targetService.findTargetUsers(
      target,
    );

  const records =
    users.map(
      (user) => ({
        notificationId:
          notification._id,
        userId:
          user._id,
      }),
    );

  await userNotificationRepository
    .createMany(records);

  let pushResult = null;

  if (
    channel === 'push' ||
    channel === 'both'
  ) {
    pushResult =
      await pushProvider.sendPush({
        userIds:
          users.map(
            (user) =>
              user._id.toString(),
          ),
        title,
        message,
      });
  }

  return {
    notification:
      sanitize(notification),
    recipients:
      users.length,
    push:
      pushResult,
  };
}

async function listRecent() {
  const items =
    await notificationRepository
      .findRecent();

  return items.map(
    sanitize,
  );
}

async function disable(
  notificationId,
) {
  const item =
    await notificationRepository
      .disable(
        notificationId,
      );

  if (!item) {
    throw notFound();
  }

  return sanitize(item);
}

async function listForUser(
  userId,
) {
  const items =
    await userNotificationRepository
      .findForUser(userId);

  return items.map(
    (item) => ({
      id:
        item.notificationId
          ?._id
          ?.toString(),

      title:
        item.notificationId
          ?.title,

      message:
        item.notificationId
          ?.message,

      type:
        item.notificationId
          ?.type,

      channel:
        item.notificationId
          ?.channel,

      publishedAt:
        item.notificationId
          ?.publishedAt,

      readAt:
        item.readAt,

      dismissedAt:
        item.dismissedAt,
    }),
  );
}

async function markRead({
  userId,
  notificationId,
}) {
  return userNotificationRepository
    .markRead({
      userId,
      notificationId,
    });
}

async function dismiss({
  userId,
  notificationId,
}) {
  return userNotificationRepository
    .dismiss({
      userId,
      notificationId,
    });
}

async function unreadCount(
  userId,
) {
  return userNotificationRepository
    .unreadCount(userId);
}

function sanitize(item) {
  return {
    id:
      item._id.toString(),
    title:
      item.title,
    message:
      item.message,
    type:
      item.type,
    target:
      item.target,
    channel:
      item.channel,
    status:
      item.status,
    publishedAt:
      item.publishedAt,
    createdAt:
      item.createdAt,
  };
}

function notFound() {
  const error =
    new Error(
      'Notification was not found.',
    );

  error.statusCode = 404;
  error.code =
    'NOTIFICATION_NOT_FOUND';

  return error;
}

module.exports = {
  createGlobal,
  listRecent,
  disable,
  listForUser,
  markRead,
  dismiss,
  unreadCount,
};
const repository =
  require(
    './notification.repository',
  );

const preferences =
  require(
    './notification-preference.repository',
  );

async function send({
  userId,
  type,
  title,
  message,
  data = {},
}) {
  const pref =
    await preferences.get(
      userId,
    );

  const category =
    getCategory(type);

  if (
    !isCategoryEnabled(
      pref,
      category,
    )
  ) {
    return null;
  }

  return repository.create({
    userId,
    type,
    title,
    message,
    data,
  });
}

async function list(
  userId,
  limit,
) {
  return repository.findForUser(
    userId,
    limit,
  );
}

async function countUnread(
  userId,
) {
  return repository.unreadCount(
    userId,
  );
}

async function markRead(
  userId,
  notificationId,
) {
  return repository.markRead(
    notificationId,
    userId,
  );
}

async function markAllRead(
  userId,
) {
  return repository.markAllRead(
    userId,
  );
}

function getCategory(type) {
  if (
    type.startsWith(
      'security.',
    )
  ) {
    return 'security';
  }

  if (
    type.startsWith(
      'marketing.',
    )
  ) {
    return 'marketing';
  }

  return 'product';
}

function isCategoryEnabled(
  preferences,
  category,
) {
  if (
    category === 'security'
  ) {
    return preferences.security;
  }

  if (
    category === 'marketing'
  ) {
    return preferences.marketing;
  }

  return preferences.product;
}

module.exports = {
  send,
  list,
  countUnread,
  markRead,
  markAllRead,
};
