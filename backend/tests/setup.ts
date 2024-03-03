import {
  createBucketIfNeeded,
  deleteBucketIfExists,
  initS3Client,
} from "@dataAccess/s3";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { AsyncExecutor, ExecutionRequest } from "@graphql-tools/utils";
import { ExecutionResult } from "graphql";
import { createPubSub } from "graphql-yoga";
import { test } from "vitest";

import { schema } from "../src/api";
import { createGraphQLServer } from "../src/api/server";
import { S3Context } from "../src/types";

type Executor = AsyncExecutor<ExecutionRequest, ExecutionResult>;

const counterCreator = () => {
  let count = 0;
  return () => count++;
};

const counter = counterCreator();
const s3Config = initS3Client(process.env);

const graphQLTestBase = test.extend<{ s3: S3Context }>({
  // eslint-disable-next-line no-empty-pattern
  s3: async ({}, use) => {
    const bucketName = `test-bucket-${counter()}-${
      process.env.VITEST_WORKER_ID
    }`;
    const s3Context = { ...s3Config, bucketName };

    // バケットを削除してから再作成
    await deleteBucketIfExists(s3Context);
    await createBucketIfNeeded(s3Context);

    // テスト実行
    await use(s3Context);

    // バケットを削除
    await deleteBucketIfExists(s3Context);
  },
});

// PubSubの設定
const pubsub = createPubSub();

export const graphQLTest = graphQLTestBase.extend<{
  executor: Executor;
}>({
  executor: async ({ s3 }, use) => {
    const yoga = createGraphQLServer(schema, s3, pubsub);

    const executor = buildHTTPExecutor({
      fetch: yoga.fetch,
    });

    await use(executor);
  },
});
