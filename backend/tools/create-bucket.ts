import { createBucketIfNeeded, initS3Client } from "@dataAccess/s3";

async function main(bucketName: string) {
  const s3Config = initS3Client(process.env);
  const s3Context = { ...s3Config, bucketName };
  await createBucketIfNeeded(s3Context);
}

const bucketName = process.argv[2];
if (!bucketName) {
  console.error(
    "Error: Please provide a bucket name as a command line argument.",
  );
  process.exit(1);
}

await main(bucketName);
