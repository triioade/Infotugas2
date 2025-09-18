import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
VitePWA({
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
  },
  manifest: {
    name: "Info Tugas",
    short_name: "InfoTugas",
    description: "Dashboard Mahasiswa untuk memantau tugas kuliah",
    theme_color: "#2b4539",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/icons/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
})

  ],
});
