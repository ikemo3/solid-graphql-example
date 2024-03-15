import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import Docker from "dockerode";
import { Hono } from "hono";
import { Writable } from "stream";
import { StringDecoder } from "string_decoder";
import { z } from "zod";

// リクエストボディのスキーマを定義
const schema = z.object({
  bucketName: z.string(),
});

// リクエストボディのバリデーションを行う
const validator = zValidator("json", schema, (result, c) => {
  if (!result.success) {
    return c.text("Invalid!", 400);
  }
});

const app = new Hono();
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

function generateBackendContainerName(projectName: string) {
  return `${projectName}-backend-1`;
}

app.post("/:secret_path", validator, async (c) => {
  const secretPath = c.req.param("secret_path");
  if (secretPath !== process.env.INCOMING_WEBHOOK_PATH) {
    return c.text("Not Found", { status: 404 });
  }

  const { bucketName } = c.req.valid("json"); // リクエストボディを取得
  const container = docker.getContainer(
    generateBackendContainerName(process.env.PROJECT_NAME),
  );

  // コンテナ内でlist-bucket.tsを実行
  // Tty: falseにすると、Streamのstdout, stderrを区別する必要があり面倒なのでtrueにしている
  // https://docs.docker.com/engine/api/v1.37/#operation/ContainerAttach
  const exec = await container.exec({
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: ["tsx", "./tools/list-bucket.ts", bucketName],
  });

  const output = await exec.start({ Detach: false, Tty: true });

  // ストリームからデータを収集
  let result = "";
  const decoder = new StringDecoder("utf8");
  const stream = new Writable({
    write(chunk, encoding, callback) {
      result += decoder.write(chunk);
      callback();
    },
  });

  output.pipe(stream);

  // ストリームの終了を待つ
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
    output.on("end", () => stream.end()); // ストリーム終了時にstreamも終了させる
  });

  return c.text(result); // 実行結果をレスポンスとして返す
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
