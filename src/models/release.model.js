const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: true,
      trim: true,
    },

    environment: {
      type: String,
      enum: [
        'development',
        'staging',
        'production',
      ],
      required: true,
    },

    commitSha: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        'pending',
        'running',
        'success',
        'failed',
        'cancelled',
      ],
      default: 'pending',
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

    triggeredBy: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    errorMessage: {
      type: String,
      default: null,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

releaseSchema.index({
  environment: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'Release',
    releaseSchema,
  );
