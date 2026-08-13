const Session =
  require(
    '../../models/session.model',
  );

async function listActiveSessions() {
  const sessions =
    await Session.find({
      revokedAt: null,
      expiresAt: {
        $gt: new Date(),
      },
    })
      .populate(
        'userId',
        'fullName username email role',
      )
      .sort({
        lastActiveAt: -1,
      })
      .limit(500)
      .lean();

  return sessions.map(
    (session) => ({
      sessionId:
        session.sessionId,

      user:
        session.userId
          ? {
              id:
                session.userId
                  ._id
                  .toString(),
              fullName:
                session.userId
                  .fullName,
              username:
                session.userId
                  .username,
              email:
                session.userId
                  .email,
              role:
                session.userId
                  .role,
            }
          : null,

      deviceName:
        session.deviceName,

      platform:
        session.platform,

      ipAddress:
        session.ipAddress,

      lastActiveAt:
        session.lastActiveAt,

      createdAt:
        session.createdAt,

      expiresAt:
        session.expiresAt,
    }),
  );
}

module.exports = {
  listActiveSessions,
};
