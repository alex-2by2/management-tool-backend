const mongoose = require('mongoose');

const scheduledJobSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 120,
      },

      jobType: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      enabled: {
        type: Boolean,
        default: true,
        index: true,
      },

      cronExpression: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      timezone: {
        type: String,
        default: 'UTC',
        trim: true,
        maxlength: 100,
      },

      payload: {
        type:
          mongoose.Schema.Types.Mixed,
        default: {},
      },

      lastRunAt: {
        type: Date,
        default: null,
      },

      nextRunAt: {
        type: Date,
        default: null,
        index: true,
      },

      lastJobId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'BackgroundJob',
        default: null,
      },

      updatedBy: {
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

scheduledJobSchema.index({
  enabled: 1,
  nextRunAt: 1,
});

module.exports =
  mongoose.model(
    'ScheduledJob',
    scheduledJobSchema,
  );
