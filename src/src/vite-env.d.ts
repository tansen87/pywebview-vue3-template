/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_NAME: string
  readonly APP_API_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
