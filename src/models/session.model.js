const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    deviceId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    deviceName: {
      type: String,
      default: 'Unknown device',
      trim: true,
      maxlength: 200,
    },

    platform: {
      type: String,
      default: 'unknown',
      trim: true,
      maxlength: 50,
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

    lastUsedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.index({
  userId: 1,
  revokedAt: 1,
});

sessionSchema.index({
  expiresAt: 1,
});

module.exports =
  mongoose.model(
    'Session',
    sessionSchema,
  );
