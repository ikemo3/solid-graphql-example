import { $ } from "execa";

// 自動生成されるファイル
const generatedFiles = ["prisma/pothos-types.ts", "prisma/README.md"];

// ファイルの自動生成
await $({ stdio: "inherit" })`prisma generate`;

// ファイルのフォーマット
await $({
  stdio: "inherit",
})`prettier --write ${generatedFiles}`;
