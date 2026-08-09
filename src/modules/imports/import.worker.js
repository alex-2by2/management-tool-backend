const repository =
  require(
    './import.repository',
  );

async function run({
  importJobId,
}) {
  const job =
    await repository.findById(
      importJobId,
    );

  if (!job) {
    throw new Error(
      'Import job not found.',
    );
  }

  if (
    job.status ===
    'completed'
  ) {
    return;
  }

  await repository.update(
    importJobId,
    {
      status: 'running',
    },
  );

  try {
    const rows =
      await readImportFile(
        job.storageKey,
      );

    let imported = 0;
    let duplicates = 0;

    for (
      const row of rows
    ) {
      const result =
        await processRow(
          row,
        );

      if (
        result ===
        'duplicate'
      ) {
        duplicates++;
        continue;
      }

      if (
        result ===
        'imported'
      ) {
        imported++;
      }
    }

    await repository.update(
      importJobId,
      {
        status: 'completed',
        importedRows:
          imported,
        duplicateRows:
          duplicates,
        completedAt:
          new Date(),
      },
    );
  } catch (error) {
    await repository.update(
      importJobId,
      {
        status: 'failed',
        errorCode:
          'IMPORT_FAILED',
      },
    );

    throw error;
  }
}

async function readImportFile(
  storageKey,
) {
  // Use approved storage/parser.
  return [];
}

async function processRow(row) {
  // Validate + duplicate check +
  // controlled persistence.
  return 'imported';
}

module.exports = {
  run,
};
