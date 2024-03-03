import chalk from "chalk";
import dotenv from "dotenv";
import { $ } from "execa";
import { GenericContainer, StartedTestContainer } from "testcontainers";

import {
  startPostgreSQLContainer,
  startStorageContainer,
} from "./libs/container";

dotenv.config();

let container: StartedTestContainer;
let storageContainer: StartedTestContainer;

export async function setup() {
  // テスト用のDBをセットアップ
  console.log(chalk.bgCyan("Setting up test database..."));
  const image = await GenericContainer.fromDockerfile("../database").build();
  const postgresql = await startPostgreSQLContainer(image);
  container = postgresql.container;
  console.log(chalk.bgCyan("Test database set up!"));

  // DATABASE_URLにテスト用のDBのURLをセット
  process.env.DATABASE_URL = postgresql.url;

  // テスト用のDBを作成
  console.log(chalk.bgCyan("Creating test database..."));
  // ファイルが更新されないように、--skip-generateオプションを付ける
  await $({ stdio: "inherit" })`prisma db push --skip-generate`;
  // シードデータを流し込む
  await $({ stdio: "inherit" })`prisma db seed`;
  console.log(chalk.bgCyan("Test database created!"));

  // テスト用のバケットを作成
  console.log(chalk.bgCyan("Creating test bucket..."));

  // storageコンテナを起動
  console.log(chalk.bgCyan("Starting storage container..."));
  const storageImage =
    await GenericContainer.fromDockerfile("../storage").build();
  const storage = await startStorageContainer(storageImage);
  storageContainer = storage.container;
  console.log(chalk.bgCyan("Storage container started!"));

  // 環境変数をセット
  process.env.S3_REGION = "auto";
  process.env.S3_ENDPOINT = storage.endpoint;
  process.env.S3_ACCESS_KEY_ID = storage.user;
  process.env.S3_SECRET_ACCESS_KEY = storage.password;
  process.env.S3_PATH_STYLE_ACCESS = "true";
}

export async function tearDown() {
  if (storageContainer) {
    await storageContainer.stop();
  }

  if (container) {
    await container.stop();
  }
}
