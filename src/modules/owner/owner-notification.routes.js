const express =
  require('express');

const {
  authenticate,
} = require(
  '../../middleware/auth',
);

const {
  ownerOnly,
} = require(
  '../../middleware/owner-only',
);

const controller =
  require(
    './owner-notification.controller',
  );

function createOwnerNotificationRoutes(
  config,
) {
  const router =
    express.Router();

  router.use(
    authenticate(config),
  );

  router.use(
    ownerOnly,
  );

  router.get(
    '/',
    controller.list,
  );

  router.post(
    '/',
    controller.create,
  );

  router.delete(
    '/:notificationId',
    controller.disable,
  );

  return router;
}

module.exports =
  createOwnerNotificationRoutes;
