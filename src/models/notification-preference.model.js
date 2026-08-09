const mongoose = require('mongoose');

const notificationPreferenceSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },

      inApp: {
        type: Boolean,
        default: true,
      },

      email: {
        type: Boolean,
        default: true,
      },

      push: {
        type: Boolean,
        default: true,
      },

      security: {
        type: Boolean,
        default: true,
      },

      product: {
        type: Boolean,
        default: true,
      },

      marketing: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

module.exports =
  mongoose.model(
    'NotificationPreference',
    notificationPreferenceSchema,
  );
