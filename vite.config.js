import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
     '/api/polygon': {
        target: 'https://api.polygon.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/polygon/, ''),
      },
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    fs: {
      strict: false
    }
  }
});
