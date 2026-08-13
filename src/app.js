const createOwnerSessionRoutes =
  require(
    './modules/owner/owner-session.routes',
  );

app.use(
  '/api/v1/owner/sessions',
  createOwnerSessionRoutes(
    config,
  ),
);
const createOwnerFeatureRoutes =
  require(
    './modules/owner/owner-feature.routes',
  );

app.use(
  '/api/v1/owner/features',
  createOwnerFeatureRoutes(config),
);
