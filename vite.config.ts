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
      registerType: "autoUpdate", // 🔄 auto update service worker
      devOptions: {
        enabled: true, // aktif saat development juga
      },
      workbox: {
        skipWaiting: true, // langsung replace SW lama
        clientsClaim: true, // claim client tanpa reload manual
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 minggu
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/, // contoh API
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 jam
              },
            },
          },
        ],
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
        src: "/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },
        ],
      },
    }),
  ],
});
