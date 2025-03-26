import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Egkdd.github.io/",
  plugins: [react()],

  esbuild: {
    loader: "jsx",
  },
  resolve: {
    alias: {
      "./runtimeConfig": "runtimeConfig.browser",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        "js": "jsx",
      },
    },
  },
});
