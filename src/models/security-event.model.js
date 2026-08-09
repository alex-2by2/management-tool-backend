const mongoose = require('mongoose');

const securityEventSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        index: true,
      },

      type: {
        type: String,
        enum: [
          'login_success',
          'login_failed',
          'logout',
          'session_revoked',
          'password_changed',
          'password_reset_requested',
          'suspicious_login',
        ],
        required: true,
        index: true,
      },

      ipAddress: {
        type: String,
        default: null,
      },

      userAgent: {
        type: String,
        default: null,
        maxlength: 1000,
      },

      deviceId: {
        type: String,
        default: null,
        maxlength: 200,
      },

      metadata: {
        type:
          mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

securityEventSchema.index({
  userId: 1,
  createdAt: -1,
});

securityEventSchema.index({
  type: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'SecurityEvent',
    securityEventSchema,
  );
