const SecurityEvent =
  require(
    '../../models/security-event.model',
  );

async function create(data) {
  return SecurityEvent.create(data);
}

async function findForUser(
  userId,
  limit = 30,
) {
  return SecurityEvent.find({
    userId,
  })
    .select(
      '-ipAddress -userAgent -metadata',
    )
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 30,
          1,
        ),
        100,
      ),
    )
    .lean();
}

async function findRecent(
  limit = 50,
) {
  return SecurityEvent.find({})
    .select(
      'userId type createdAt deviceId',
    )
    .populate(
      'userId',
      'fullName username',
    )
    .sort({
      createdAt: -1,
    })
    .limit(
      Math.min(
        Math.max(
          Number(limit) || 50,
          1,
        ),
        100,
      ),
    )
    .lean();
}

async function countFailedSince(
  userId,
  since,
) {
  return SecurityEvent.countDocuments({
    userId,
    type: 'login_failed',
    createdAt: {
      $gte: since,
    },
  });
}

module.exports = {
  create,
  findForUser,
  findRecent,
  countFailedSince,
};
