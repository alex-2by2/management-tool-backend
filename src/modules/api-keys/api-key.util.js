const crypto = require('crypto');

function generateApiKey() {
  const random =
    crypto.randomBytes(32)
      .toString('hex');

  return `el_live_${random}`;
}

function hashApiKey(key) {
  return crypto
    .createHash('sha256')
    .update(key)
    .digest('hex');
}

function getPrefix(key) {
  return `${key.slice(0, 12)}...`;
}

module.exports = {
  generateApiKey,
  hashApiKey,
  getPrefix,
};
