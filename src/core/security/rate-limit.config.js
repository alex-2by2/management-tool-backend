const limits = {
  global: {
    windowMs:
      60 * 1000,
    max: 120,
  },

  login: {
    windowMs:
      15 * 60 * 1000,
    max: 10,
  },

  passwordReset: {
    windowMs:
      15 * 60 * 1000,
    max: 5,
  },

  commandSearch: {
    windowMs:
      60 * 1000,
    max: 30,
  },

  ownerMutation: {
    windowMs:
      60 * 1000,
    max: 30,
  },
};

module.exports = {
  limits,
};
