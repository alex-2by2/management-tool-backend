const mongoose = require('mongoose');

const workerStatusSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },

      status: {
        type: String,
        enum: [
          'healthy',
          'degraded',
          'stopped',
        ],
        default: 'stopped',
      },

      lastSeenAt: {
        type: Date,
        default: null,
      },

      processedJobs: {
        type: Number,
        default: 0,
      },

      failedJobs: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

module.exports =
  mongoose.model(
    'WorkerStatus',
    workerStatusSchema,
  );
