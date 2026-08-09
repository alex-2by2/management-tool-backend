const repository =
  require(
    './export.repository',
  );

async function run({
  exportJobId,
}) {
  const job =
    await repository.findById(
      exportJobId,
    );

  if (!job) {
    throw new Error(
      'Export job not found.',
    );
  }

  if (
    job.status ===
    'completed'
  ) {
    return;
  }

  await repository.update(
    exportJobId,
    {
      status: 'running',
    },
  );

  try {
    const data =
      await collectUserData(
        job.requestedBy,
      );

    const artifact =
      await createExportArtifact(
        data,
      );

    const expiresAt =
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000,
      );

    await repository.update(
      exportJobId,
      {
        status: 'completed',
        storageKey:
          artifact.storageKey,
        sizeBytes:
          artifact.sizeBytes,
        checksum:
          artifact.checksum,
        completedAt:
          new Date(),
        expiresAt,
      },
    );
  } catch (error) {
    await repository.update(
      exportJobId,
      {
        status: 'failed',
        errorCode:
          'EXPORT_FAILED',
      },
    );

    throw error;
  }
}

async function collectUserData(
  userId,
) {
  /*
   * Collect only approved
   * user-owned data.
   *
   * Never include:
   * - passwordHash
   * - refresh tokens
   * - API secrets
   * - internal credentials
   */
  return {
    profile: {},
    sessions: [],
    notifications: [],
    securityActivity: [],
  };
}

async function createExportArtifact(
  data,
) {
  /*
   * Serialize and upload using
   * the approved export-storage
   * provider.
   */
  return {
    storageKey:
      'export-placeholder',
    sizeBytes: 0,
    checksum:
      'checksum-placeholder',
  };
}

module.exports = {
  run,
};
