export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INCOMING_WEBHOOK_PATH: string;
      PROJECT_NAME: string;
    }
  }
}
