const {
  initializeDefaults,
} = require(
  '../modules/features/feature-flag.service',
);

async function initializeFeatures() {
  await initializeDefaults();
}

module.exports =
  initializeFeatures;
