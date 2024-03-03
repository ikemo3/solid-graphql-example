import typeUtils from "node:util/types";

import { readFileSync, writeFileSync } from "fs";
import { printSchema } from "graphql";
import prettier from "prettier";

import { schema } from "../src/api";

// Node.jsのエラーかどうかを判定する
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return typeUtils.isNativeError(error);
}

const schemaFilePath = "./schema.graphql";

// 既存のスキーマを読み込む。ファイルが存在しない場合は空文字列を返す。
let oldSchema = "";
try {
  oldSchema = readFileSync(schemaFilePath, "utf8");
} catch (error) {
  // ファイルが存在しない場合のみ無視する
  if (isNodeError(error) && error.code !== "ENOENT") {
    console.error("ファイルの読み込み中にエラーが発生しました:", error);
    process.exit(1);
  }
}

// 新しいスキーマを生成する
const newSchema = printSchema(schema) + "\n";
const formatted = await prettier.format(newSchema, { parser: "graphql" });

if (oldSchema !== formatted) {
  writeFileSync(schemaFilePath, formatted, "utf8");
  console.log("GraphQLスキーマが更新され、ファイルに書き込まれました。");
} else {
  console.log("GraphQLスキーマは更新されていません。");
}
