const {
  commands,
} = require(
  './command-catalog',
);

function search({
  query,
  isOwner,
}) {
  const normalized =
    String(query ?? '')
      .trim()
      .toLowerCase();

  if (!normalized) {
    return [];
  }

  return commands
    .filter(
      (command) => {
        if (
          command.ownerOnly &&
          !isOwner
        ) {
          return false;
        }

        const haystack = [
          command.title,
          command.id,
          command.category,
          ...command.keywords,
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(
          normalized,
        );
      },
    )
    .slice(0, 20)
    .map(
      ({
        id,
        title,
        route,
        category,
      }) => ({
        id,
        title,
        route,
        category,
      }),
    );
}

module.exports = {
  search,
};
