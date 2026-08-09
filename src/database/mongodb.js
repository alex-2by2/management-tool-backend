const mongoose = require("mongoose");

const logger = require("../utils/logger");
const env = require("../config/env");

const connectDatabase = async () => {
  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established");
  });

  mongoose.connection.on("error", (error) => {
    logger.error(
      {
        error: error.message
      },
      "MongoDB connection error"
    );
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB connection disconnected");
  });

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 2,
    autoIndex: env.nodeEnv !== "production"
  });
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
  logger.info("MongoDB connection closed");
};

module.exports = {
  connectDatabase,
  disconnectDatabase
};
