/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_GTM_ID?: string;
  readonly NEXT_PUBLIC_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
