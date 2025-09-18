/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // kalau nanti ada tambahan ENV, taruh di sini juga
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
