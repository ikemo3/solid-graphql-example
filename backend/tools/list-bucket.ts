import { initS3Client, listObjects } from "@dataAccess/s3";

async function main(bucketName: string) {
  const s3Config = initS3Client(process.env);
  const s3Context = { ...s3Config, bucketName };
  const objects = await listObjects(s3Context);

  // オブジェクトの一覧を表示
  for (const object of objects) {
    console.log(object);
  }
}

const bucketName = process.env.S3_BUCKET_NAME;
await main(bucketName);
