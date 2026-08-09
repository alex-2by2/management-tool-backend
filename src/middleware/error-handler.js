function errorHandler(
  error,
  request,
  response,
  next,
) {
  const statusCode =
    Number(error.statusCode) || 500;

  const code =
    error.code ||
    'INTERNAL_ERROR';

  const message =
    statusCode >= 500
      ? 'Something went wrong. Please try again.'
      : error.message;

  if (statusCode >= 500) {
    request.log?.error?.({
      error,
      path: request.path,
      method: request.method,
    });
  }

  return response
    .status(statusCode)
    .json({
      success: false,
      error: {
        code,
        message,
        ...(error.details
          ? {
              details:
                error.details,
            }
          : {}),
      },
    });
}

module.exports =
  errorHandler;
