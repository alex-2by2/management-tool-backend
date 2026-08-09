const mongoose = require('mongoose');

const restorePointSchema =
  new mongoose.Schema(
    {
      backupId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'BackupJob',
        required: true,
      },

      status: {
        type: String,
        enum: [
          'available',
          'restoring',
          'restored',
          'failed',
        ],
        default: 'available',
      },

      verifiedAt: {
        type: Date,
        default: null,
      },

      restoredAt: {
        type: Date,
        default: null,
      },

      restoredBy: {
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

module.exports =
  mongoose.model(
    'RestorePoint',
    restorePointSchema,
  );
