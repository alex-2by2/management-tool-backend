function ownerOnly(request, response, next) {
  if (!request.auth) {
    return response.status(401).json({
      success: false,
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication is required.',
      },
    });
  }

  if (request.auth.role !== 'owner') {
    return response.status(403).json({
      success: false,
      error: {
        code: 'OWNER_ACCESS_REQUIRED',
        message: 'Owner access is required.',
      },
    });
  }

  return next();
}

module.exports = {
  ownerOnly,
};
