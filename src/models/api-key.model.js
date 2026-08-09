const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    prefix: {
      type: String,
      required: true,
      trim: true,
    },

    keyHash: {
      type: String,
      required: true,
      unique: true,
    },

    scopes: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        'active',
        'revoked',
      ],
      default: 'active',
      index: true,
    },

    createdBy: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    lastUsedAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

apiKeySchema.index({
  createdBy: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    'ApiKey',
    apiKeySchema,
  );
