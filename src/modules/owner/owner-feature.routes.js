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
    '../features/feature-flag.controller',
  );

function createOwnerFeatureRoutes(
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

  router.patch(
    '/:key',
    controller.update,
  );

  return router;
}

module.exports =
  createOwnerFeatureRoutes;
