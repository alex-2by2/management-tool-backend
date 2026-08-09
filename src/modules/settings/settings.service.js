const repository =
  require(
    './settings.repository',
  );

const audit =
  require(
    '../audit/audit.service',
  );

async function getPublic() {
  const settings =
    await repository.get();

  return sanitizePublic(
    settings,
  );
}

async function getOwner() {
  const settings =
    await repository.get();

  return sanitizeOwner(
    settings,
  );
}

async function update({
  appName,
  supportEmail,
  supportUrl,
  logoUrl,
  primaryColor,
  maintenanceMessage,
  defaultTheme,
  userId,
  request,
}) {
  const settings =
    await repository.update({
      appName,
      supportEmail,
      supportUrl,
      logoUrl,
      primaryColor,
      maintenanceMessage,
      defaultTheme,
      updatedBy: userId,
    });

  await audit.record({
    actorId: userId,
    action:
      'APP_SETTINGS_UPDATED',
    category: 'system',
    targetType:
      'app_settings',
    targetId:
      settings._id.toString(),
    metadata: {
      changed: [
        'appName',
        'supportEmail',
        'supportUrl',
        'logoUrl',
        'primaryColor',
        'maintenanceMessage',
        'defaultTheme',
      ],
    },
    request,
  });

  return sanitizeOwner(
    settings,
  );
}

function sanitizePublic(
  settings,
) {
  return {
    appName:
      settings.appName,

    logoUrl:
      settings.logoUrl,

    primaryColor:
      settings.primaryColor,

    defaultTheme:
      settings.defaultTheme,
  };
}

function sanitizeOwner(
  settings,
) {
  return {
    ...sanitizePublic(
      settings,
    ),

    supportEmail:
      settings.supportEmail,

    supportUrl:
      settings.supportUrl,

    maintenanceMessage:
      settings.maintenanceMessage,

    updatedAt:
      settings.updatedAt,
  };
}

module.exports = {
  getPublic,
  getOwner,
  update,
};
