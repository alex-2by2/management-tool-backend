const User = require('../../models/user.model');
const Session = require('../../models/session.model');

async function listUsers({
  search = '',
  role,
  status,
  page = 1,
  limit = 30,
}) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(
    Math.max(Number(limit) || 30, 1),
    100,
  );

  const query = {};

  if (role) {
    query.role = role;
  }

  if (status) {
    query.status = status;
  }

  if (search.trim()) {
    const regex = new RegExp(
      escapeRegex(search.trim()),
      'i',
    );

    query.$or = [
      { fullName: regex },
      { username: regex },
      { email: regex },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
      .select(
        'fullName username email role status createdAt lastLoginAt',
      )
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .lean(),

    User.countDocuments(query),
  ]);

  return {
    users: users.map(sanitizeUser),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.ceil(total / safeLimit),
    },
  };
}

async function updateStatus({
  userId,
  status,
  ownerUserId,
}) {
  if (userId === ownerUserId) {
    throw forbidden(
      'The owner cannot disable their own account.',
    );
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
    },
  )
    .select(
      'fullName username email role status createdAt lastLoginAt',
    )
    .lean();

  if (!user) {
    throw notFound();
  }

  if (status === 'disabled') {
    await Session.updateMany(
      {
        userId,
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
          revokeReason: 'account_disabled',
        },
      },
    );
  }

  return sanitizeUser(user);
}

async function revokeUserSessions({
  userId,
}) {
  await Session.updateMany(
    {
      userId,
      revokedAt: null,
    },
    {
      $set: {
        revokedAt: new Date(),
        revokeReason: 'owner_revoked',
      },
    },
  );
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt ?? null,
  };
}

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );
}

function forbidden(message) {
  const error = new Error(message);
  error.statusCode = 403;
  error.code = 'OWNER_ACTION_FORBIDDEN';
  return error;
}

function notFound() {
  const error = new Error(
    'User was not found.',
  );
  error.statusCode = 404;
  error.code = 'USER_NOT_FOUND';
  return error;
}

module.exports = {
  listUsers,
  updateStatus,
  revokeUserSessions,
};
