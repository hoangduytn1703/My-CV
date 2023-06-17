import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    global: {},
    "process.env": {
      API_BASE: process.env.API_BASE,
      SOCKET_BASE: process.env.SOCKET_BASE,
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
