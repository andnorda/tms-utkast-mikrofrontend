import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import { ConfigEnv } from "vite";
import { UserConfigExport } from "vitest/config";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { terser } from "rollup-plugin-terser";
import { resolve } from "path";

const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl = "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

const imports = {
  react: reactUrl,
  "react-dom": reactDomUrl,
};

export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [
    react(),
    terser(),
    cssInjectedByJsPlugin(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
    }),
    {
      ...rollupImportMapPlugin([{ imports }]),
      enforce: "pre",
      apply: "build",
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/Mikrofrontend.tsx"),
      name: "tms-utkast-mikrofrontend",
      formats: ["es"],
      fileName: () => `tms-utkast-mikrofrontend.js`,
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
  },
});
