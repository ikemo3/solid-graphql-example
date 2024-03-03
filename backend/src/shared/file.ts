// contentTypeの検証
export function isValidContentType(contentType: string) {
  // MIMEタイプの基本的なパターンをチェックする正規表現
  // 例: text/plain, application/json, image/jpeg など
  const pattern = /^[a-z]+\/[a-z0-9\-+.]+$/i;

  // MIMEタイプが正規表現にマッチするか検証
  return pattern.test(contentType);
}
