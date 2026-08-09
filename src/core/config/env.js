const required = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
];

function loadEnv() {
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(
        `Missing required environment variable: ${key}`,
      );
    }
  }

  return {
    nodeEnv:
      process.env.NODE_ENV,

    port:
      Number(
        process.env.PORT,
      ),

    mongodbUri:
      process.env.MONGODB_URI,

    logLevel:
      process.env.LOG_LEVEL ||
      'info',

    frontendOrigin:
      process.env.FRONTEND_ORIGIN ||
      '',
  };
}

module.exports = {
  loadEnv,
};
