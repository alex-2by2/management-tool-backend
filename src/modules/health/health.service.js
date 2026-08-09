const mongoose = require('mongoose');

async function getHealth() {
  const checks = {};

  checks.database =
    await checkDatabase();

  checks.application =
    checkApplication();

  const healthy =
    Object.values(checks)
      .every(
        (check) =>
          check.status ===
          'healthy',
      );

  return {
    status:
      healthy
        ? 'healthy'
        : 'degraded',

    timestamp:
      new Date(),

    checks,
  };
}

async function checkDatabase() {
  try {
    if (
      mongoose.connection
        .readyState !== 1
    ) {
      return {
        status: 'unhealthy',
      };
    }

    await mongoose.connection
      .db
      .admin()
      .ping();

    return {
      status: 'healthy',
    };
  } catch {
    return {
      status: 'unhealthy',
    };
  }
}

function checkApplication() {
  return {
    status: 'healthy',
  };
}

module.exports = {
  getHealth,
};
