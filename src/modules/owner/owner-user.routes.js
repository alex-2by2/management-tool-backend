const express = require('express');

const {
  authenticate,
} = require('../../middleware/auth');

const {
  ownerOnly,
} = require('../../middleware/owner-only');

const controller = require(
  './owner-user.controller',
);

function createOwnerUserRoutes(config) {
  const router = express.Router();

  router.use(authenticate(config));
  router.use(ownerOnly);

  router.get(
    '/',
    controller.list,
  );

  router.patch(
    '/:userId/status',
    controller.updateStatus,
  );

  router.post(
    '/:userId/revoke-sessions',
    controller.revokeSessions,
  );

  return router;
}

module.exports = createOwnerUserRoutes;
