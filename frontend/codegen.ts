import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: ["./src/**/*.ts"],
  schema: "./schema/schema.graphql",
  generates: {
    "src/shared/lib/generated/": {
      preset: "client",
      config: {
        scalars: {
          DateTime: "Date",
          Byte: "FileData",
        },
      },
    },
  },
};

export default config;
