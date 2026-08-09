class BackupStorage {
  async upload({
    stream,
    key,
  }) {
    throw new Error(
      'Backup storage provider is not configured.',
    );
  }

  async download(key) {
    throw new Error(
      'Backup storage provider is not configured.',
    );
  }

  async remove(key) {
    throw new Error(
      'Backup storage provider is not configured.',
    );
  }
}

module.exports =
  BackupStorage;
