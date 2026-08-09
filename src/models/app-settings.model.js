const mongoose = require('mongoose');

const appSettingsSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      default: 'Easy Life',
      trim: true,
      maxlength: 100,
    },

    supportEmail: {
      type: String,
      default: '',
      trim: true,
      maxlength: 200,
    },

    supportUrl: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
    },

    logoUrl: {
      type: String,
      default: '',
      trim: true,
      maxlength: 1000,
    },

    primaryColor: {
      type: String,
      default: '#A78BFA',
      trim: true,
      maxlength: 20,
    },

    maintenanceMessage: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
    },

    defaultTheme: {
      type: String,
      enum: [
        'system',
        'light',
        'dark',
      ],
      default: 'system',
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
    'AppSettings',
    appSettingsSchema,
  );
