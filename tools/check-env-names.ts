import { extractEnvFromDeployStep } from "./libs/workflow-yml";
import { extractEnvVarNames } from "./libs/envrc";
import { extractVariableNames } from "./libs/env";
import { extractEnvFromFile } from "./libs/compose";
import assert from "assert";

// 環境変数を抽出してソートする関数
const extractSortUniqueEnvVars = (
  extractFunc: (filePath: string) => string[],
  filePath: string,
): string[] => {
  return Array.from(new Set(extractFunc(filePath))).sort();
};

// 配列をマージしてソートする関数
const mergeSortUnique = (
  arr1: string[],
  arr2: string[],
  arr3: string[] = [],
  arr4: string[] = [],
): string[] => {
  return Array.from(new Set([...arr1, ...arr2, ...arr3, ...arr4])).sort();
};

// compose.production(本番環境)用の環境変数名
const productionEnvVarNames = [
  "API_FQDN",
  "DATABASE_HOST",
  "DATABASE_NAME",
  "DATABASE_PASSWORD",
  "DATABASE_USER",
  "FLUENTD_HOSTNAME",
  "FLUENTD_TAG_PREFIX",
  "FRONTEND_FQDN",
  "MY_HOME_IP",
  "OAUTH2_AUDIENCE",
  "OAUTH2_CLIENT_ID",
  "OAUTH2_ISSUER_FQDN",
  "OWNER",
  "PUBSUB_URL",
  "REPOSITORY_NAME",
  "S3_ACCESS_KEY_ID",
  "S3_BUCKET_NAME",
  "S3_ENDPOINT",
  "S3_PATH_STYLE_ACCESS",
  "S3_REGION",
  "S3_SECRET_ACCESS_KEY",
  "TAG",
  "TRAEFIK_FQDN",
];

// デプロイ用の環境変数名(Ansible, 証明書(ファイルとして渡す元の環境変数))
const deployOnlyEnvVarNames = [
  "ANSIBLE_HOST",
  "ANSIBLE_USER",
  "CERTIFICATE",
  "PRIVATE_KEY",
];

// .github/workflows/*.yml でのみ使われている環境変数
const workflowOnlyEnvVarNames = ["GITHUB_TOKEN"];

// 各ファイルから環境変数を抽出
/**
 * compose.production.yml から環境変数を抽出したリスト
 */
const uniqueComposeYmlEnvVars = extractSortUniqueEnvVars(
  extractEnvFromFile,
  "./compose.production.yml",
);
assert.deepStrictEqual(
  uniqueComposeYmlEnvVars,
  productionEnvVarNames,
  "compose.production.yml から環境変数を抽出したリストが一致しません。",
);

/**
 * deploy/.env.j2 から環境変数を抽出したリスト
 */
const uniqueDotEnvVarNames = extractSortUniqueEnvVars(
  extractVariableNames,
  "./deploy/.env.j2",
);
assert.deepStrictEqual(
  uniqueDotEnvVarNames,
  productionEnvVarNames,
  "deploy/.env.j2 から環境変数を抽出したリストが一致しません。",
);

/**
 * deploy/.envrc.example から環境変数を抽出したリスト
 */
const uniqueEnvrcEnvVarNames = extractSortUniqueEnvVars(
  extractEnvVarNames,
  "./deploy/.envrc.example",
);
assert.deepStrictEqual(
  uniqueEnvrcEnvVarNames,
  mergeSortUnique(productionEnvVarNames, deployOnlyEnvVarNames),
  "deploy/.envrc.example から環境変数を抽出したリストが一致しません。",
);

/**
 * .github/workflows/build-and-deploy.yml から環境変数を抽出したリスト
 */
const uniqueBuildDeployStepEnvNames = extractSortUniqueEnvVars(
  extractEnvFromDeployStep,
  "./.github/workflows/build-and-deploy.yml",
);
assert.deepStrictEqual(
  uniqueBuildDeployStepEnvNames,
  mergeSortUnique(
    productionEnvVarNames,
    deployOnlyEnvVarNames,
    workflowOnlyEnvVarNames,
  ),
  "build-and-deploy.yml から環境変数を抽出したリストが一致しません。",
);

/**
 * .github/workflows/deploy-only.yml から環境変数を抽出したリスト
 */
const uniqueDeployOnlyStepEnvNames = extractSortUniqueEnvVars(
  extractEnvFromDeployStep,
  "./.github/workflows/deploy-only.yml",
);
assert.deepStrictEqual(
  uniqueDeployOnlyStepEnvNames,
  mergeSortUnique(
    productionEnvVarNames,
    deployOnlyEnvVarNames,
    workflowOnlyEnvVarNames,
  ),
  "deploy-only.yml から環境変数を抽出したリストが一致しません。",
);

console.log("All assertions passed.");
