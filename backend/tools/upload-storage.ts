import {
  createBucketIfNeeded,
  getSignedUrl,
  initS3Client,
  uploadPlainText,
} from "@dataAccess/s3";

async function main() {
  const s3Config = initS3Client(process.env);
  const bucketName = process.env.S3_BUCKET_NAME;
  const s3Context = { ...s3Config, bucketName };

  await createBucketIfNeeded(s3Context);

  // ファイルのアップロード
  await uploadPlainText(s3Context, "/test/test.txt", "Hello World!!");

  try {
    const url = await getSignedUrl(s3Context, "/test/test.txt");
    console.log("Presigned URL:", url);
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
}

await main();
