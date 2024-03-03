import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: ["./tests/**/*.ts"],
  schema: "./schema.graphql",
  generates: {
    "tests/generated/": {
      preset: "client",
    },
  },
};

export default config;
