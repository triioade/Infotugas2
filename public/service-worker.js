const CACHE_NAME = "info-tugas-cache-v1";
const urlsToCache = [
  "/",               
  "/index.html",     
  "/manifest.json",  
  "/favicon.png",    
  "/icons/manifest-icon-192.maskable.png",
  "/icons/manifest-icon-512.maskable.png",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log("✅ Service Worker Installed");
});

// Fetch: serve from cache first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // kalau ada di cache, ambil dari cache
      if (response) {
        return response;
      }
      // kalau tidak ada, fetch dari network
      return fetch(event.request);
    })
  );
});

// Activate: hapus cache lama
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  console.log("🚀 Service Worker Activated");
});
