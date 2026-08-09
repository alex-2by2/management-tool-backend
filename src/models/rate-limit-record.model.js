const mongoose = require('mongoose');

const rateLimitRecordSchema =
  new mongoose.Schema(
    {
      key: {
        type: String,
        required: true,
        unique: true,
      },

      count: {
        type: Number,
        default: 0,
      },

      windowStartedAt: {
        type: Date,
        required: true,
      },

      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },
    },
    {
      versionKey: false,
    },
  );

rateLimitRecordSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  },
);

module.exports =
  mongoose.model(
    'RateLimitRecord',
    rateLimitRecordSchema,
  );
