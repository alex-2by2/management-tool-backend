const {
  limits,
} = require(
  '../core/security/rate-limit.config',
);

const {
  consume,
} = require(
  '../core/security/rate-limit.service',
);

function rateLimit(
  category,
  keyResolver,
) {
  return async (
    request,
    response,
    next,
  ) => {
    try {
      const config =
        limits[category];

      const key =
        `${category}:${keyResolver(
          request,
        )}`;

      const result =
        await consume({
          key,
          windowMs:
            config.windowMs,
          max:
            config.max,
        });

      response.setHeader(
        'X-RateLimit-Limit',
        config.max,
      );

      response.setHeader(
        'X-RateLimit-Remaining',
        result.remaining,
      );

      if (!result.allowed) {
        if (
          result.retryAfter
        ) {
          response.setHeader(
            'Retry-After',
            result.retryAfter,
          );
        }

        return response
          .status(429)
          .json({
            success: false,
            error: {
              code:
                'RATE_LIMITED',
              message:
                'Too many requests. Please try again later.',
            },
          });
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

module.exports =
  rateLimit;
