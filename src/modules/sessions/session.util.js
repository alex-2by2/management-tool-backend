const crypto = require('crypto');

function hashToken(token) {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
}

function createDeviceId() {
  return crypto
    .randomBytes(16)
    .toString('hex');
}

module.exports = {
  hashToken,
  createDeviceId,
};
