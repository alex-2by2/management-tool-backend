const mongoose = require('mongoose');

const maintenanceModeSchema =
  new mongoose.Schema(
    {
      enabled: {
        type: Boolean,
        default: false,
        index: true,
      },

      title: {
        type: String,
        default: 'We are under maintenance',
        trim: true,
        maxlength: 160,
      },

      message: {
        type: String,
        default:
          'We are making improvements. Please check back soon.',
        trim: true,
        maxlength: 1000,
      },

      estimatedEndAt: {
        type: Date,
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

module.exports =
  mongoose.model(
    'MaintenanceMode',
    maintenanceModeSchema,
  );
