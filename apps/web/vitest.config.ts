import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)", "src/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    environment: "jsdom",
    environmentMatch: [["src/**/*.node.test.?(c|m)[jt]s?(x)", "node"]],
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    css: true,
  },
});
