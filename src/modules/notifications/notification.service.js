const repository =
  require(
    './notification.repository',
  );

const preferences =
  require(
    './notification-preference.repository',
  );

async function send({
  userId,
  type,
  title,
  message,
  data = {},
}) {
  const pref =
    await preferences.get(
      userId,
    );

  const category =
    getCategory(type);

  if (
    !isCategoryEnabled(
      pref,
      category,
    )
  ) {
    return null;
  }

  return repository.create({
    userId,
    type,
    title,
    message,
    data,
  });
}

async function list(
  userId,
  limit,
) {
  return repository.findForUser(
    userId,
    limit,
  );
}

async function countUnread(
  userId,
) {
  return repository.unreadCount(
    userId,
  );
}

async function markRead(
  userId,
  notificationId,
) {
  return repository.markRead(
    notificationId,
    userId,
  );
}

async function markAllRead(
  userId,
) {
  return repository.markAllRead(
    userId,
  );
}

function getCategory(type) {
  if (
    type.startsWith(
      'security.',
    )
  ) {
    return 'security';
  }

  if (
    type.startsWith(
      'marketing.',
    )
  ) {
    return 'marketing';
  }

  return 'product';
}

function isCategoryEnabled(
  preferences,
  category,
) {
  if (
    category === 'security'
  ) {
    return preferences.security;
  }

  if (
    category === 'marketing'
  ) {
    return preferences.marketing;
  }

  return preferences.product;
}

module.exports = {
  send,
  list,
  countUnread,
  markRead,
  markAllRead,
};
