import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "http://89.191.225.217",
        changeOrigin: true,
        secure: false,
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },
});
