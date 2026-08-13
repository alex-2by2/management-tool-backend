const {
  getSystemHealth,
} = require(
  './system-health.service',
);

const {
  getUserStatistics,
} = require(
  './user-statistics.service',
);

async function getOverview() {
  const [
    system,
    users,
  ] = await Promise.all([
    getSystemHealth(),
    getUserStatistics(),
  ]);

  return {
    system,
    users,
    version:
      process.env.APP_VERSION ??
      '1.0.0',
    environment:
      process.env.NODE_ENV ??
      'development',
  };
}

module.exports = {
  getOverview,
};
