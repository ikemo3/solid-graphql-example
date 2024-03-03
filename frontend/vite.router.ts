import { defineConfig } from "vitest/config";

import config from "./vite.config.ts";

export default defineConfig({
  ...config,
  build: {
    ...config.build,
    rollupOptions: {
      input: {
        dummy: "./dummy.html",
      },
    },
  },
});
