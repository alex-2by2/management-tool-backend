function getRuntimeInfo() {
  return {
    version:
      process.env.APP_VERSION ??
      '0.0.0',

    environment:
      process.env.NODE_ENV ??
      'development',

    commitSha:
      process.env.GIT_COMMIT_SHA ??
      null,

    buildTime:
      process.env.BUILD_TIME ??
      null,

    nodeVersion:
      process.version,

    uptimeSeconds:
      Math.floor(
        process.uptime(),
      ),
  };
}

module.exports = {
  getRuntimeInfo,
};
