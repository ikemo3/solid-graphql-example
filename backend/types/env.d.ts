export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      S3_REGION: string;
      S3_ENDPOINT: string;
      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
      S3_PATH_STYLE_ACCESS: string;
      readonly S3_BUCKET_NAME: string;
      readonly VITEST_WORKER_ID: string;
      readonly PUBSUB_URL: string;
    }
  }
}
