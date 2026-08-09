async function detectSuspiciousLogin({
  userId,
  request,
  deviceId,
}) {
  if (!userId) {
    return false;
  }

  const since =
    new Date(
      Date.now() -
        15 * 60 * 1000,
    );

  const failed =
    await repository
      .countFailedSince(
        userId,
        since,
      );

  if (failed < 5) {
    return false;
  }

  await record({
    userId,
    type:
      'suspicious_login',
    request,
    deviceId,
    metadata: {
      reason:
        'multiple_recent_failures',
      failedAttempts:
        failed,
    },
  });

  return true;
}
