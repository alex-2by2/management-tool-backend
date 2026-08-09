const commands = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    keywords: [
      'home',
      'overview',
      'dashboard',
    ],
    route: '/dashboard',
    category: 'navigation',
    ownerOnly: false,
  },

  {
    id: 'notifications',
    title: 'Notifications',
    keywords: [
      'alerts',
      'messages',
      'notifications',
    ],
    route: '/notifications',
    category: 'navigation',
    ownerOnly: false,
  },

  {
    id: 'security',
    title: 'Security',
    keywords: [
      'security',
      'sessions',
      'devices',
      'login',
    ],
    route: '/security',
    category: 'security',
    ownerOnly: false,
  },

  {
    id: 'owner_users',
    title: 'User Control',
    keywords: [
      'users',
      'accounts',
      'members',
    ],
    route: '/owner/users',
    category: 'owner',
    ownerOnly: true,
  },

  {
    id: 'owner_features',
    title: 'Feature Toggles',
    keywords: [
      'features',
      'flags',
      'toggles',
    ],
    route: '/owner/features',
    category: 'owner',
    ownerOnly: true,
  },

  {
    id: 'owner_remote_config',
    title: 'Remote Config',
    keywords: [
      'config',
      'remote',
      'settings',
    ],
    route: '/owner/remote-config',
    category: 'owner',
    ownerOnly: true,
  },

  {
    id: 'owner_notifications',
    title: 'Global Notifications',
    keywords: [
      'broadcast',
      'announcement',
      'global',
    ],
    route: '/owner/notifications',
    category: 'owner',
    ownerOnly: true,
  },

  {
    id: 'owner_api_keys',
    title: 'API Keys',
    keywords: [
      'api',
      'keys',
      'tokens',
      'integration',
    ],
    route: '/owner/api-keys',
    category: 'security',
    ownerOnly: true,
  },

  {
    id: 'owner_audit',
    title: 'Audit Timeline',
    keywords: [
      'audit',
      'activity',
      'logs',
      'history',
    ],
    route: '/owner/audit',
    category: 'security',
    ownerOnly: true,
  },

  {
    id: 'owner_release',
    title: 'Release Center',
    keywords: [
      'release',
      'version',
      'deployment',
    ],
    route: '/owner/deployment',
    category: 'system',
    ownerOnly: true,
  },

  {
    id: 'owner_health',
    title: 'System Health',
    keywords: [
      'health',
      'status',
      'server',
      'database',
    ],
    route: '/owner/health',
    category: 'system',
    ownerOnly: true,
  },

  {
    id: 'owner_maintenance',
    title: 'Maintenance Mode',
    keywords: [
      'maintenance',
      'offline',
      'downtime',
    ],
    route: '/owner/maintenance',
    category: 'system',
    ownerOnly: true,
  },

  {
    id: 'owner_settings',
    title: 'App Settings',
    keywords: [
      'branding',
      'theme',
      'logo',
      'settings',
    ],
    route: '/owner/settings',
    category: 'configuration',
    ownerOnly: true,
  },
];

module.exports = {
  commands,
};
