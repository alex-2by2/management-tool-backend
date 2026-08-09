async function sendPush({
  userIds,
  title,
  message,
}) {
  if (!userIds.length) {
    return {
      attempted: 0,
      sent: 0,
    };
  }

  /*
   * Firebase Admin SDK integration
   * will be connected here.
   *
   * Do not place credentials in source code.
   */

  return {
    attempted:
      userIds.length,
    sent: 0,
    provider:
      'firebase',
    status:
      'not_configured',
  };
}

module.exports = {
  sendPush,
};
