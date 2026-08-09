const crypto = require('crypto');

function createResetToken() {
  return crypto
    .randomBytes(32)
    .toString('hex');
}

function hashResetToken(token) {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
}

module.exports = {
  createResetToken,
  hashResetToken,
};
