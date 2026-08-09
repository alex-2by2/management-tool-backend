const mongoose = require('mongoose');

const remoteConfigSchema =
  new mongoose.Schema(
    {
      key: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 120,
      },

      value: {
        type:
          mongoose.Schema.Types.Mixed,
        required: true,
      },

      type: {
        type: String,
        enum: [
          'string',
          'number',
          'boolean',
          'json',
        ],
        required: true,
      },

      description: {
        type: String,
        default: '',
        maxlength: 500,
      },

      enabled: {
        type: Boolean,
        default: true,
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

remoteConfigSchema.index({
  enabled: 1,
});

module.exports =
  mongoose.model(
    'RemoteConfig',
    remoteConfigSchema,
  );
