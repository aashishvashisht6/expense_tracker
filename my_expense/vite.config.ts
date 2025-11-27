import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  base: '/assets/expense_tracker/my_expense/',
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    includeAssets: ['favicon.ico', 'robots.txt'],
    outDir: "../expense_tracker/public/my_expense",
    manifest: {
      name: "my_expense",
      short_name: "Expense",
      description: "My Expense Tracker",
      start_url: '/my_expense/',      // must be in scope
      scope: '/my_expense/',          // explicitly set scope
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#4caf50",
      "icons": [
        {
          src: '/assets/expense_tracker/my_expense/vite.svg',
          sizes: '192x192',
          type: 'image/svg'
        },
        {
          src: '/assets/expense_tracker/my_expense/vite.svg',
          sizes: '512x512',
          type: 'image/svg'
        }
      ],
    }
  })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: `../expense_tracker/public/my_expense`,
    emptyOutDir: true,
    target: "es2015",
  },
});
