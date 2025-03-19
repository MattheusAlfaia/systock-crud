/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VUE_APP_API_URL: string;
    readonly VUE_APP_API_KEY: string;
    // Adicione outras variáveis de ambiente aqui
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}