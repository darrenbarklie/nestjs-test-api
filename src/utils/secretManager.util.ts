import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// Ref: https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets#access
// Ref: https://stackoverflow.com/questions/68405566/how-to-access-multiple-secrets-from-google-secret-manager

const client = new SecretManagerServiceClient();

export async function accessSecretVersion(
  projectId: string,
  secretId: string,
  secretVersion: string | number,
) {
  const [version] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretId}/versions/${secretVersion}`,
  });

  // Extract the payload as a string
  const payload = version.payload.data.toString();

  return payload;
}
