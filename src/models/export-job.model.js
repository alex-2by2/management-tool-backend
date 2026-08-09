const mongoose = require('mongoose');

const exportJobSchema =
  new mongoose.Schema(
    {
      requestedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      scope: {
        type: String,
        enum: [
          'my_data',
          'users',
          'audit',
          'notifications',
        ],
        required: true,
      },

      format: {
        type: String,
        enum: [
          'json',
          'csv',
        ],
        default: 'json',
      },

      status: {
        type: String,
        enum: [
          'queued',
          'running',
          'completed',
          'failed',
          'expired',
        ],
        default: 'queued',
        index: true,
      },

      storageKey: {
        type: String,
        default: null,
      },

      sizeBytes: {
        type: Number,
        default: null,
      },

      checksum: {
        type: String,
        default: null,
      },

      expiresAt: {
        type: Date,
        default: null,
        index: true,
      },

      completedAt: {
        type: Date,
        default: null,
      },

      errorCode: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

exportJobSchema.index({
  requestedBy: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'ExportJob',
    exportJobSchema,
  );
