import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D viewer (model-viewer + three.js) is ~1 MB but only loads when a product's 3D tab is opened.
    chunkSizeWarningLimit: 1100,
  },
});
