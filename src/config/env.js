const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = [
  "NODE_ENV",
  "PORT",
  "MONGODB_URI"
];

const missingVariables = requiredVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(", ")}`
  );
}

const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  appName: process.env.APP_NAME || "Easy life",
  apiPrefix: process.env.API_PREFIX || "/api",
  apiVersion: process.env.API_VERSION || "v1",
  mongodbUri: process.env.MONGODB_URI,
  logLevel: process.env.LOG_LEVEL || "info"
});

if (!Number.isInteger(env.port) || env.port < 1 || env.port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

module.exports = env;
