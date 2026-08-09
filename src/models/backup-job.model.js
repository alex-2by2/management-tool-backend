const mongoose = require('mongoose');

const backupJobSchema =
  new mongoose.Schema(
    {
      type: {
        type: String,
        enum: [
          'manual',
          'scheduled',
        ],
        required: true,
      },

      status: {
        type: String,
        enum: [
          'queued',
          'running',
          'completed',
          'failed',
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

      startedAt: {
        type: Date,
        default: null,
      },

      completedAt: {
        type: Date,
        default: null,
      },

      errorCode: {
        type: String,
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

backupJobSchema.index({
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'BackupJob',
    backupJobSchema,
  );
