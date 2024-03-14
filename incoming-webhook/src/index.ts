import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.post("/:secret_path", async (c) => {
  const secretPath = c.req.param("secret_path");
  if (secretPath !== process.env.INCOMING_WEBHOOK_PATH) {
    return c.text("Not Found", { status: 404 });
  }

  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
