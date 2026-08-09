const RateLimitRecord =
  require(
    '../../models/rate-limit-record.model',
  );

async function consume({
  key,
  windowMs,
  max,
}) {
  const now =
    new Date();

  const existing =
    await RateLimitRecord
      .findOne({
        key,
      });

  if (
    !existing ||
    existing.expiresAt <= now
  ) {
    await RateLimitRecord
      .findOneAndUpdate(
        {
          key,
        },
        {
          $set: {
            count: 1,
            windowStartedAt:
              now,
            expiresAt:
              new Date(
                now.getTime() +
                  windowMs,
              ),
          },
        },
        {
          upsert: true,
          new: true,
        },
      );

    return {
      allowed: true,
      remaining:
        Math.max(max - 1, 0),
    };
  }

  if (
    existing.count >= max
  ) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter:
        Math.ceil(
          (
            existing.expiresAt -
            now
          ) / 1000,
        ),
    };
  }

  existing.count += 1;

  await existing.save();

  return {
    allowed: true,
    remaining:
      Math.max(
        max -
          existing.count,
        0,
      ),
  };
}

module.exports = {
  consume,
};
