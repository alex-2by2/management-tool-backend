function validateCron(
  expression,
) {
  if (
    typeof expression !==
      'string' ||
    expression.trim().length === 0
  ) {
    return false;
  }

  /*
   * Use the project's approved
   * cron parser here.
   */
  return expression
    .trim()
    .split(/\s+/)
    .length >= 5;
}

function validateTimezone(
  timezone,
) {
  try {
    Intl.DateTimeFormat(
      'en-US',
      {
        timeZone: timezone,
      },
    );

    return true;
  } catch {
    return false;
  }
}

module.exports = {
  validateCron,
  validateTimezone,
};
