import { readFileSync } from "fs";

// KEY=VALUE 形式の行から KEY を抽出する
export const extractVariableNames = (filePath: string): string[] => {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const variableNames: string[] = [];

  lines.forEach((line) => {
    // KEY=VALUE 形式の行から KEY を抽出する
    const match = line.match(/^([A-Z0-9_]+)/);
    if (match) {
      variableNames.push(match[1]);
    }
  });

  return variableNames;
};
