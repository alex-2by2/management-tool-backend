const repository =
  require(
    './release.repository',
  );

const {
  getRuntimeInfo,
} = require(
  './runtime-info',
);

async function runtime() {
  return getRuntimeInfo();
}

async function history({
  environment,
  limit,
}) {
  return repository.findRecent(
    environment,
    limit,
  );
}

async function createRelease({
  version,
  environment,
  commitSha,
  userId,
}) {
  return repository.create({
    version,
    environment,
    commitSha,
    status: 'pending',
    triggeredBy: userId,
  });
}

module.exports = {
  runtime,
  history,
  createRelease,
};
