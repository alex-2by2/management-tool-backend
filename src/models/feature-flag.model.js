const mongoose = require('mongoose');

const featureFlagSchema =
  new mongoose.Schema(
    {
      key: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        maxlength: 100,
      },

      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160,
      },

      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
      },

      enabled: {
        type: Boolean,
        default: false,
        index: true,
      },

      environment: {
        type: String,
        enum: [
          'all',
          'development',
          'staging',
          'production',
        ],
        default: 'all',
      },

      updatedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },

      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

featureFlagSchema.index({
  environment: 1,
  enabled: 1,
});

module.exports =
  mongoose.model(
    'FeatureFlag',
    featureFlagSchema,
  );
