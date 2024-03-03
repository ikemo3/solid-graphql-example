import {
  createBucketIfNeeded,
  deleteBucketIfExists,
  listBuckets,
  listObjects,
  truncateBucket,
  uploadPlainText,
} from "@dataAccess/s3";

import { graphQLTest } from "../setup";

describe("createBucketIfNeeded", () => {
  graphQLTest("should create a bucket if it does not exist", async ({ s3 }) => {
    // バケットが存在する場合は削除
    await deleteBucketIfExists(s3);

    // バケットを作成
    await createBucketIfNeeded(s3);

    // バケットが存在することを確認
    const buckets = await listBuckets(s3);
    expect(buckets).toContain(s3.bucketName);

    // もう一度createBucketIfNeededを実行してもエラーにならないことを確認
    await createBucketIfNeeded(s3);
  });
});

describe("deleteBucketIfExists", () => {
  graphQLTest("should delete a bucket if it exists", async ({ s3 }) => {
    // バケットを削除
    await deleteBucketIfExists(s3);

    // バケットが存在しないことを確認
    const buckets = await listBuckets(s3);
    expect(buckets).not.toContain(s3.bucketName);

    // もう一度deleteBucketIfExistsを実行してもエラーにならないこを確認
    await deleteBucketIfExists(s3);
  });
});

describe("listObjects", () => {
  graphQLTest(
    "should return an empty array if the bucket is empty",
    async ({ s3 }) => {
      // バケット内のオブジェクトを取得
      const objects = await listObjects(s3);
      expect(objects).toStrictEqual([]);
    },
  );
});

describe("truncateBucket", () => {
  graphQLTest("should delete all objects in a bucket", async ({ s3 }) => {
    // オブジェクトをアップロード
    await uploadPlainText(s3, "test-object", "test-body");

    // バケット内のオブジェクトを削除
    await truncateBucket(s3);

    // バケット内のオブジェクトが削除されていることを確認
    const objects = await listObjects(s3);
    expect(objects).toStrictEqual([]);

    // もう一度truncateBucketを実行してもエラーにならないことを確認
    await truncateBucket(s3);
  });
});
