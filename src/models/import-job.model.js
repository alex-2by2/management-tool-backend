const mongoose = require('mongoose');

const importJobSchema =
  new mongoose.Schema(
    {
      requestedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      entity: {
        type: String,
        enum: [
          'users',
          'notifications',
        ],
        required: true,
      },

      format: {
        type: String,
        enum: [
          'csv',
          'json',
        ],
        required: true,
      },

      status: {
        type: String,
        enum: [
          'uploaded',
          'validating',
          'ready',
          'running',
          'completed',
          'failed',
          'cancelled',
        ],
        default: 'uploaded',
        index: true,
      },

      storageKey: {
        type: String,
        default: null,
      },

      totalRows: {
        type: Number,
        default: 0,
      },

      validRows: {
        type: Number,
        default: 0,
      },

      invalidRows: {
        type: Number,
        default: 0,
      },

      importedRows: {
        type: Number,
        default: 0,
      },

      duplicateRows: {
        type: Number,
        default: 0,
      },

      errorReportKey: {
        type: String,
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
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

importJobSchema.index({
  requestedBy: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'ImportJob',
    importJobSchema,
  );
