/// <reference types="vite/client" />

// 全局常量类型声明
declare const APP_VERSION: string;
declare const BUILD_TIME: string;
declare const IS_DEV: boolean;

// 扩展 ImportMeta 接口以支持 Vite 环境变量
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_TIMEOUT?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_ENABLE_MOCK?: string;
  readonly VITE_ENABLE_DEBUG?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_GA_TRACKING_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
