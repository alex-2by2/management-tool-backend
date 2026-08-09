const pino = require("pino");
const env = require("../config/env");

const logger = pino({
  level: env.logLevel,
  base: {
    service: env.appName
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "token",
      "accessToken",
      "refreshToken"
    ],
    censor: "[REDACTED]"
  }
});

module.exports = logger;
