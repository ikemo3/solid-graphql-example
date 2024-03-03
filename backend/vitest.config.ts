import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    globalSetup: ["./tests/globalSetup.ts"],
    env: {
      NODE_ENV: "test",
    },
    coverage: {
      provider: "istanbul",
    },
  },
});
