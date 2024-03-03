import { readFileSync } from "fs";
import { parse } from "yaml";

// ymlファイルからenvを抽出
export const extractEnvFromDeployStep = (filePath: string): string[] => {
  const fileContents = readFileSync(filePath, "utf8");
  const yamlContents = parse(fileContents);

  // "deploy"ジョブのステップを探索
  const deploySteps = yamlContents.jobs?.deploy?.steps || [];

  // "Deploy"ステップのenvを抽出
  for (const step of deploySteps) {
    if (step.name === "Deploy") {
      const envKeys = Object.keys(step.env || {});
      return envKeys;
    }
  }

  return [];
};
