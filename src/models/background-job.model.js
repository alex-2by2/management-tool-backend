const mongoose = require('mongoose');

const backgroundJobSchema =
  new mongoose.Schema(
    {
      type: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true,
      },

      status: {
        type: String,
        enum: [
          'queued',
          'running',
          'completed',
          'failed',
          'cancelled',
        ],
        default: 'queued',
        index: true,
      },

      payload: {
        type:
          mongoose.Schema.Types.Mixed,
        default: {},
      },

      attempts: {
        type: Number,
        default: 0,
      },

      maxAttempts: {
        type: Number,
        default: 3,
      },

      availableAt: {
        type: Date,
        default: Date.now,
        index: true,
      },

      startedAt: {
        type: Date,
        default: null,
      },

      completedAt: {
        type: Date,
        default: null,
      },

      failedAt: {
        type: Date,
        default: null,
      },

      lastError: {
        type: String,
        default: null,
        maxlength: 500,
      },

      lockedAt: {
        type: Date,
        default: null,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

backgroundJobSchema.index({
  status: 1,
  availableAt: 1,
});

module.exports =
  mongoose.model(
    'BackgroundJob',
    backgroundJobSchema,
  );
