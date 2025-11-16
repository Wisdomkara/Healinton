import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // ✅ PWA Plugin
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Healinton Healthcare",
        short_name: "Healinton",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0EA5E9",
        description:
          "Complete healthcare management platform for chronic care, appointments, symptoms, and AI-powered health insights.",
        icons: [
          {
            src: "/healinton-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/healinton-logo.png",
            sizes: "512x512",
            type: "image/png",
          }
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
