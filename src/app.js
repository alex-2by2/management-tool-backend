const createOwnerDashboardRoutes =
  require(
    './modules/owner/owner-dashboard.routes',
  );

app.use(
  '/api/v1/owner',
  createOwnerDashboardRoutes(
    config,
  ),
);

const createSessionRoutes =
  require(
    './modules/sessions/session.routes',
  );

app.use(
  '/api/v1/sessions',
  createSessionRoutes(
    config,
  ),
);

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
