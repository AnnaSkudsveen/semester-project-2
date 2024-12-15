import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      external: [
        // Add external dependencies here
        "../../ui/global/logout.js"
      ]
    }
  }
});
