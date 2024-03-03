import { $ } from "execa";

// relay-page-info-spec は、relay のページネーションのための仕様で、relay を使っていないので無視する
// https://github.com/cjoudrey/graphql-schema-linter/issues/269
console.log(
  "The --only and --except command line options have been deprecated. と出ますが、無視してください。",
);
await $({
  stdio: "inherit",
})`graphql-schema-linter ./schema.graphql --except relay-page-info-spec`;
