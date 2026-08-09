const Notification =
  require(
    '../../models/notification.model',
  );

async function create(data) {
  return Notification.create(
    data,
  );
}

async function findForUser(
  userId,
  limit = 30,
) {
  return Notification.find({
    userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 30,
          1,
        ),
        100,
      ),
    )
    .lean();
}

async function unreadCount(
  userId,
) {
  return Notification.countDocuments({
    userId,
    readAt: null,
  });
}

async function markRead(
  id,
  userId,
) {
  return Notification.findOneAndUpdate(
    {
      _id: id,
      userId,
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

async function markAllRead(
  userId,
) {
  return Notification.updateMany(
    {
      userId,
      readAt: null,
    },
    {
      $set: {
        readAt: new Date(),
      },
    },
  );
}

module.exports = {
  create,
  findForUser,
  unreadCount,
  markRead,
  markAllRead,
};
