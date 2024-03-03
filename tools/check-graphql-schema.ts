import fs from "fs";

const backendSchemaPath = "./backend/schema.graphql";
const frontendSchemaPath = "./frontend/schema/schema.graphql";

// スキーマの内容を比較する
const backendSchema = fs.readFileSync(backendSchemaPath, "utf8");
const frontendSchema = fs.readFileSync(frontendSchemaPath, "utf8");

if (backendSchema !== frontendSchema) {
  console.error(`${backendSchemaPath}と${frontendSchemaPath}が一致しません。`);
  process.exit(1);
}

console.log(`${backendSchemaPath}と${frontendSchemaPath}が一致しています。`);
