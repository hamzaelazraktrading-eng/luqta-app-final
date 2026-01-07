import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/client/src",
      "@shared": "/shared",
      "@assets": "/attached_assets",
    },
  },
  root: "client",
  build: {
    // هذا المسار مهم جداً لكي يجده Capacitor لاحقاً
    outDir: "../dist",
    emptyOutDir: true,
  },
});
