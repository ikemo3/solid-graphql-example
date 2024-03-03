import chokidar from "chokidar";
import { execa } from "execa";

// 監視するファイルやディレクトリのパターン
const watchPatterns = [
  "backend/prisma/schema.prisma", // Prismaスキーマファイルを監視対象に追加
  "backend/schema.graphql",
  "backend/src/**/*.ts", // srcディレクトリ内のTypeScriptファイルを監視対象に追加
  "backend/tests/**/*.ts",
  "frontend/codegen.ts",
  "frontend/src/**/*",
  "frontend/tests/**/*",
];

// chokidarの監視設定
const watcher = chokidar.watch(watchPatterns, {
  ignored: /(^|[/\\])\../, // ドットで始まるファイル/ディレクトリを無視
  persistent: true,
});

// 'change'イベントのリスナーを設定
watcher.on("change", async (path) => {
  console.log(`File ${path} has been changed.`);

  // コマンドの選択
  let commandArgs: string[];
  let cwd: string;
  if (path === "backend/prisma/schema.prisma") {
    commandArgs = ["codegen:prisma"];
    cwd = "backend";
  } else if (path.startsWith("backend/src")) {
    commandArgs = ["codegen:graphql"];
    cwd = "backend";
  } else if (path.startsWith("backend/tests")) {
    commandArgs = ["codegen:client"];
    cwd = "backend";
  } else if (path.endsWith("backend/schema.graphql")) {
    commandArgs = ["codegen:graphql"];
    cwd = "frontend";
  } else if (path.startsWith("frontend/src/pages")) {
    commandArgs = ["codegen:router"];
    cwd = "frontend";
  } else {
    commandArgs = ["codegen:client"];
    cwd = "frontend";
  }

  // コマンドの実行
  try {
    console.log(`Running command: cd ${cwd}; pnpm ${commandArgs.join(" ")}`);
    await execa("pnpm", commandArgs, { stdio: "inherit", cwd });
  } catch (error) {
    console.error(`Failed to run command: ${error}`);
  }
});

console.log("Watching for file changes...");
