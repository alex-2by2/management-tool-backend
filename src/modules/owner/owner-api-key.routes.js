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
    './owner-api-key.controller',
  );

function createOwnerApiKeyRoutes(
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
    '/:id',
    controller.revoke,
  );

  return router;
}

module.exports =
  createOwnerApiKeyRoutes;
