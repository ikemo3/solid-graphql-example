import { readFileSync } from "fs";

// ファイルから環境変数名を抽出する関数
export const extractEnvFromFile = (filePath: string): string[] => {
  // ファイルを同期的に読み込む
  const content = readFileSync(filePath, "utf8");

  // 環境変数名を抽出する正規表現
  const envVarRegex = /\$\{([^}:-]+)(?::-[^}]+)?\}/g;
  let match: string[] | null;
  const envVars: string[] = [];

  // 正規表現を使用して環境変数名を抽出
  while ((match = envVarRegex.exec(content)) !== null) {
    envVars.push(match[1]); // 抽出した環境変数名を配列に追加
  }

  return envVars;
};
