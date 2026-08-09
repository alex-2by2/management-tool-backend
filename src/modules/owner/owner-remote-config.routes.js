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
    './owner-remote-config.controller',
  );

function createOwnerRemoteConfigRoutes(
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

  router.put(
    '/',
    controller.update,
  );

  router.delete(
    '/:key',
    controller.remove,
  );

  return router;
}

module.exports =
  createOwnerRemoteConfigRoutes;
