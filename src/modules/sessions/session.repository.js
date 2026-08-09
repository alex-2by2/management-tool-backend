const Session =
  require(
    '../../models/session.model',
  );

async function create(data) {
  return Session.create(data);
}

async function findByRefreshTokenHash(
  refreshTokenHash,
) {
  return Session.findOne({
    refreshTokenHash,
    revokedAt: null,
    expiresAt: {
      $gt: new Date(),
    },
  });
}

async function findUserSessions(
  userId,
) {
  return Session.find({
    userId,
    revokedAt: null,
    expiresAt: {
      $gt: new Date(),
    },
  })
    .select(
      '-refreshTokenHash',
    )
    .sort({
      lastUsedAt: -1,
    })
    .lean();
}

async function revoke(
  sessionId,
  userId,
) {
  return Session.findOneAndUpdate(
    {
      _id: sessionId,
      userId,
      revokedAt: null,
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    },
    {
      new: true,
    },
  )
    .select(
      '-refreshTokenHash',
    )
    .lean();
}

async function revokeAllForUser(
  userId,
  exceptSessionId = null,
) {
  const query = {
    userId,
    revokedAt: null,
  };

  if (exceptSessionId) {
    query._id = {
      $ne: exceptSessionId,
    };
  }

  return Session.updateMany(
    query,
    {
      $set: {
        revokedAt: new Date(),
      },
    },
  );
}

module.exports = {
  create,
  findByRefreshTokenHash,
  findUserSessions,
  revoke,
  revokeAllForUser,
};
