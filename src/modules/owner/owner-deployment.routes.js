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
    './owner-deployment.controller',
  );

function createOwnerDeploymentRoutes(
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
    '/runtime',
    controller.runtime,
  );

  router.get(
    '/history',
    controller.history,
  );

  router.post(
    '/releases',
    controller.prepareRelease,
  );

  return router;
}

module.exports =
  createOwnerDeploymentRoutes;
