const express =
  require('express');

const {
  authenticate,
} = require(
  '../../middleware/auth',
);

const controller =
  require(
    './session.controller',
  );

function createSessionRoutes(
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

  router.delete(
    '/:sessionId',
    controller.revoke,
  );

  router.post(
    '/revoke-others',
    controller.revokeAllExcept,
  );

  return router;
}

module.exports =
  createSessionRoutes;
