const UserNotification =
  require(
    '../../models/user-notification.model',
  );

async function createMany(
  records,
) {
  if (!records.length) {
    return [];
  }

  return UserNotification.insertMany(
    records,
    {
      ordered: false,
    },
  );
}

async function findForUser(
  userId,
  limit = 50,
) {
  return UserNotification.find({
    userId,
    dismissedAt: null,
  })
    .populate(
      'notificationId',
      'title message type channel publishedAt status',
    )
    .sort({
      createdAt: -1,
    })
    .limit(limit)
    .lean();
}

async function markRead({
  userId,
  notificationId,
}) {
  return UserNotification.findOneAndUpdate(
    {
      userId,
      notificationId,
    },
    {
      $set: {
        readAt: new Date(),
      },
    },
    {
      new: true,
    },
  ).lean();
}

async function dismiss({
  userId,
  notificationId,
}) {
  return UserNotification.findOneAndUpdate(
    {
      userId,
      notificationId,
    },
    {
      $set: {
        dismissedAt: new Date(),
      },
    },
    {
      new: true,
    },
  ).lean();
}

async function unreadCount(
  userId,
) {
  return UserNotification.countDocuments({
    userId,
    readAt: null,
    dismissedAt: null,
  });
}

module.exports = {
  createMany,
  findForUser,
  markRead,
  dismiss,
  unreadCount,
};
