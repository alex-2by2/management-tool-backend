function validateValue(
  value,
  type,
) {
  switch (type) {
    case 'string':
      return typeof value ===
        'string';

    case 'number':
      return (
        typeof value ===
          'number' &&
        Number.isFinite(value)
      );

    case 'boolean':
      return typeof value ===
        'boolean';

    case 'json':
      return (
        value !== null &&
        typeof value ===
          'object'
      );

    default:
      return false;
  }
}

function validateKey(key) {
  return (
    typeof key ===
      'string' &&
    /^[a-z0-9_.-]+$/i.test(
      key,
    )
  );
}

module.exports = {
  validateValue,
  validateKey,
};
