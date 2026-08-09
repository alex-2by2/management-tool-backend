const express =
  require('express');

const {
  authenticate,
} = require(
  '../../middleware/auth',
);

const controller =
  require(
    './notification.controller',
  );

function createNotificationRoutes(
  config,
) {
  const router =
    express.Router();

  router.use(
    authenticate(config),
  );

  router.get(
    '/',
    controller.list,
  );

  router.get(
    '/unread-count',
    controller.unreadCount,
  );

  router.patch(
    '/:notificationId/read',
    controller.markRead,
  );

  router.patch(
    '/:notificationId/dismiss',
    controller.dismiss,
  );

  return router;
}

module.exports =
  createNotificationRoutes;
