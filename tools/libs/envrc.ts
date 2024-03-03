import { readFileSync } from "fs";

// export KEY=VALUE 形式の行から KEY を抽出する
export const extractEnvVarNames = (filePath: string): string[] => {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const envVarNames: string[] = [];

  lines.forEach((line) => {
    const match = line.match(/^export\s+([A-Z0-9_]+)=/);
    if (match) {
      envVarNames.push(match[1]);
    }
  });

  return envVarNames;
};
