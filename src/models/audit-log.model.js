const mongoose = require('mongoose');

const auditLogSchema =
  new mongoose.Schema(
    {
      actorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      action: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true,
      },

      category: {
        type: String,
        enum: [
          'auth',
          'user',
          'session',
          'feature',
          'notification',
          'system',
          'security',
        ],
        required: true,
        index: true,
      },

      targetType: {
        type: String,
        trim: true,
        maxlength: 80,
        default: null,
      },

      targetId: {
        type: String,
        trim: true,
        maxlength: 200,
        default: null,
      },

      metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },

      ipAddress: {
        type: String,
        trim: true,
        maxlength: 100,
        default: null,
      },

      userAgent: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: null,
      },

      success: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

auditLogSchema.index({
  actorId: 1,
  createdAt: -1,
});

auditLogSchema.index({
  category: 1,
  createdAt: -1,
});

auditLogSchema.index({
  action: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'AuditLog',
    auditLogSchema,
  );
