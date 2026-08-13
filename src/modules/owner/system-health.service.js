const mongoose = require('mongoose');

async function getSystemHealth() {
  const memory = process.memoryUsage();

  const database =
    await getDatabaseHealth();

  return {
    api: {
      status: 'healthy',
      uptimeSeconds:
        Math.floor(
          process.uptime(),
        ),
    },

    database,

    process: {
      nodeVersion:
        process.version,
      memory: {
        rss:
          memory.rss,
        heapUsed:
          memory.heapUsed,
        heapTotal:
          memory.heapTotal,
      },
    },

    timestamp:
      new Date().toISOString(),
  };
}

async function getDatabaseHealth() {
  const state =
    mongoose.connection.readyState;

  const connected =
    state === 1;

  if (!connected) {
    return {
      status: 'unhealthy',
      state,
    };
  }

  const started =
    Date.now();

  try {
    await mongoose.connection
      .db
      .command({
        ping: 1,
      });

    return {
      status: 'healthy',
      state,
      responseTimeMs:
        Date.now() -
        started,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      state,
      responseTimeMs:
        Date.now() -
        started,
    };
  }
}

module.exports = {
  getSystemHealth,
};
