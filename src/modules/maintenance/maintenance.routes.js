const express =
  require('express');

const controller =
  require(
    './maintenance.controller',
  );

function createMaintenanceRoutes() {
  const router =
    express.Router();

  router.get(
    '/',
    controller.status,
  );

  return router;
}

module.exports =
  createMaintenanceRoutes;
