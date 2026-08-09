const DEFAULT_FEATURES = [
  {
    key: 'notifications',
    name: 'Notifications',
    description:
      'In-app notification center and notification features.',
    enabled: true,
    environment: 'all',
  },

  {
    key: 'firebase_push',
    name: 'Firebase Push',
    description:
      'Firebase push notification delivery.',
    enabled: true,
    environment: 'all',
  },

  {
    key: 'offline_mode',
    name: 'Offline Mode',
    description:
      'Allow the application to operate with cached data while offline.',
    enabled: false,
    environment: 'all',
  },

  {
    key: 'auto_update_check',
    name: 'Auto Update Check',
    description:
      'Check whether a newer application version is available.',
    enabled: false,
    environment: 'all',
  },

  {
    key: 'maintenance_screen',
    name: 'Maintenance Screen',
    description:
      'Display the maintenance screen to normal users.',
    enabled: false,
    environment: 'all',
  },

  {
    key: 'advanced_dashboard',
    name: 'Advanced Dashboard',
    description:
      'Enable advanced personal dashboard functionality.',
    enabled: true,
    environment: 'all',
  },
];

module.exports =
  DEFAULT_FEATURES;
