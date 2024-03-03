/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_OAUTH2_AUDIENCE: string;
  readonly VITE_OAUTH2_CLIENT_ID: string;
  readonly VITE_AUTH0_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface FileData {
  toJSON(): string;
}
