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
    './owner-maintenance.controller',
  );

function createOwnerMaintenanceRoutes(
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
    controller.status,
  );

  router.patch(
    '/',
    controller.update,
  );

  return router;
}

module.exports =
  createOwnerMaintenanceRoutes;
