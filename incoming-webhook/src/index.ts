import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
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

app.post("/:secret_path", validator, async (c) => {
  const secretPath = c.req.param("secret_path");
  if (secretPath !== process.env.INCOMING_WEBHOOK_PATH) {
    return c.text("Not Found", { status: 404 });
  }

  const { bucketName } = c.req.valid("json"); // リクエストボディを取得

  return c.text(bucketName);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
