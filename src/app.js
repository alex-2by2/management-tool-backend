const createOwnerFeatureRoutes =
  require(
    './modules/owner/owner-feature.routes',
  );

app.use(
  '/api/v1/owner/features',
  createOwnerFeatureRoutes(config),
);
