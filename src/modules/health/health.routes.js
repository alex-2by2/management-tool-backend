const express =
  require('express');

const controller =
  require(
    './health.controller',
  );

function createHealthRoutes() {
  const router =
    express.Router();

  router.get(
    '/',
    controller.health,
  );

  return router;
}

module.exports =
  createHealthRoutes;
