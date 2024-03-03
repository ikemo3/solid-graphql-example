import generouted from "@generouted/solid-router/plugin";
import mdx from "@mdx-js/rollup";
import emoji from "remark-emoji";
import devtools from "solid-devtools/vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    target: "es2022",
  },
  plugins: [
    // .mdx ファイルも alias が効くようにする
    tsconfigPaths({ loose: true }),
    devtools({
      /* features options - all disabled by default */
      autoname: true, // e.g. enable autoname
    }),
    solid(),
    generouted(),
    mdx({ jsxImportSource: "solid-js/h", remarkPlugins: [emoji] }),
  ],
  test: {
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    server: {
      deps: {
        // https://github.com/solidjs/solid-testing-library/issues/52
        inline: [/solid-js/],
      },
    },
    coverage: {
      provider: "istanbul",
    },
  },
});
