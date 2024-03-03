import { FileReader } from "@tanker/file-reader";

export async function readFile(file: File): Promise<FileData> {
  const reader = new FileReader(file);
  const dataUrl = await reader.readAsDataURL();

  // 正規表現でdata:から始まる部分を削除。遅くならない正規表現を使っている
  return new FileData(dataUrl.replace(/^data:([^,]+);base64,/, ""));
}

class FileData {
  constructor(public data: string) {
    this.data = data;
  }

  toJSON() {
    return this.data;
  }
}
