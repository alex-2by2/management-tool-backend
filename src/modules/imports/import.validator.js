function validateUserRow(
  row,
) {
  const errors = {};

  const email =
    String(
      row.email ?? '',
    )
      .trim()
      .toLowerCase();

  const name =
    String(
      row.fullName ?? '',
    ).trim();

  if (!email) {
    errors.email =
      'Email is required.';
  } else if (
    !isEmail(email)
  ) {
    errors.email =
      'Invalid email address.';
  }

  if (!name) {
    errors.fullName =
      'Full name is required.';
  }

  return {
    valid:
      Object.keys(errors)
        .length === 0,
    errors,
    normalized: {
      email,
      fullName: name,
    },
  };
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(value);
}

module.exports = {
  validateUserRow,
};
