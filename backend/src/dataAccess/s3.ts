import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getSignedUrlApi } from "@aws-sdk/s3-request-presigner";

import { S3Config, S3Context } from "../types";

type S3Env = {
  S3_REGION: string;
  S3_ENDPOINT: string;
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  S3_PATH_STYLE_ACCESS: string;
};

export function initS3Client(env: S3Env): S3Config {
  // S3のPathStyleAccessを強制するかどうか
  const isPathStyle = env.S3_PATH_STYLE_ACCESS === "true";

  // S3Clientの初期化
  const client = new S3Client({
    region: env.S3_REGION,
    endpoint: env.S3_ENDPOINT,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: isPathStyle,
  });

  return { client, isPathStyle };
}

export async function listBuckets(s3: S3Context): Promise<string[]> {
  const listCommand = new ListBucketsCommand({});
  const listResult = await s3.client.send(listCommand);
  return listResult.Buckets?.map((bucket) => bucket.Name!) ?? [];
}

export async function listObjects(
  s3: S3Context,
  prefix: string | undefined = undefined,
) {
  // Minio(forcePathStyle=true)の場合、パスの先頭に / を付けると取得できないため、除去する
  let adjustedPrefix;
  if (s3.isPathStyle && prefix?.startsWith("/")) {
    adjustedPrefix = prefix.slice(1);
  } else {
    adjustedPrefix = prefix;
  }

  const listCommand = new ListObjectsV2Command({
    Bucket: s3.bucketName,
    Prefix: adjustedPrefix,
  });

  const response = await s3.client.send(listCommand);
  if (response.Contents) {
    const keyList = response.Contents.map((file) => file.Key ?? "");
    return keyList;
  }

  return [];
}

export async function createBucketIfNeeded(s3: S3Context) {
  // バケットの存在確認
  // ListBucketsCommandの初期化
  const listCommand = new ListBucketsCommand({});

  // ListBucketsCommandの実行
  const listResult = await s3.client.send(listCommand);

  // バケットの存在確認
  if (listResult.Buckets?.find((bucket) => bucket.Name === s3.bucketName)) {
    console.log("Bucket already exists");
  } else {
    console.log("Bucket does not exist");
    // CreateBucketCommandの初期化
    const createCommand = new CreateBucketCommand({
      Bucket: s3.bucketName,
    });

    // CreateBucketCommandの実行
    await s3.client.send(createCommand);
    console.log("Bucket created!!");
  }
}

export async function deleteBucketIfExists(s3: S3Context) {
  // バケットが存在するか確認
  const listCommand = new ListBucketsCommand({});
  const listResult = await s3.client.send(listCommand);
  const bucketExists = listResult.Buckets?.some(
    (bucket) => bucket.Name === s3.bucketName,
  );

  // バケットが存在する場合のみ削除
  if (bucketExists) {
    // 一旦バケット内のオブジェクトを全て削除
    await truncateBucket(s3);

    // バケットを削除
    const deleteCommand = new DeleteBucketCommand({
      Bucket: s3.bucketName,
    });

    await s3.client.send(deleteCommand);
  }
}

export async function truncateBucket(s3: S3Context) {
  // バケット内のオブジェクトを全て削除する
  const listCommand = new ListObjectsCommand({
    Bucket: s3.bucketName,
  });
  const listResult = await s3.client.send(listCommand);

  if (listResult.Contents) {
    for (const content of listResult.Contents) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: s3.bucketName,
        Key: content.Key!,
      });
      await s3.client.send(deleteCommand);
    }
  }
}

export async function uploadPlainText(
  s3: S3Context,
  key: string,
  text: string,
) {
  const putCommand = new PutObjectCommand({
    Bucket: s3.bucketName,
    Key: key,
    Body: Buffer.from(text, "utf-8"),
    ContentType: "text/plain",
  });

  await s3.client.send(putCommand);
}

export async function uploadContent(
  s3: S3Context,
  key: string,
  content: Buffer,
  contentType: string,
) {
  const putCommand = new PutObjectCommand({
    Bucket: s3.bucketName,
    Key: key,
    Body: content,
    ContentType: contentType,
  });

  await s3.client.send(putCommand);
}

export async function getSignedUrl(
  s3: S3Context,
  key: string,
  expiresIn: number = 3600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: s3.bucketName,
    Key: key,
  });

  return getSignedUrlApi(s3.client, command, {
    expiresIn,
  });
}
