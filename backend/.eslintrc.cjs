module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["tests/generated/**"],
  overrides: [
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/schema-recommended",
      rules: {
        "@graphql-eslint/known-type-names": "error",
      },
      parserOptions: {
        schema: "./schema.graphql",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
