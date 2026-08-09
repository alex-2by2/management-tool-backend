const mongoose = require('mongoose');

const userNotificationSchema =
  new mongoose.Schema(
    {
      notificationId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
        required: true,
        index: true,
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      readAt: {
        type: Date,
        default: null,
      },

      dismissedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

userNotificationSchema.index(
  {
    userId: 1,
    notificationId: 1,
  },
  {
    unique: true,
  },
);

userNotificationSchema.index({
  userId: 1,
  readAt: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'UserNotification',
    userNotificationSchema,
  );
