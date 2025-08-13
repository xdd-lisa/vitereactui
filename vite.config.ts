import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { name} from './package.json';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${name}/`,
  // 定义全局常量
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    BUILD_TIME: JSON.stringify(new Date().toISOString()),
    IS_DEV: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  server: {
    port: 9000,
    // 代理配置
    proxy: {
      // // 代理所有 /api 开头的请求
      // '/api': {
      //   target: 'http://localhost:3000', // 后端服务地址
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 前缀
      // },
      // // 代理特定路径
      // '/upload': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      // },
      // // 代理到外部API
      // '/external-api': {
      //   target: 'https://api.example.com',
      //   changeOrigin: true,
      //   secure: true, // 如果是 https 目标，设置为 true
      //   rewrite: (path) => path.replace(/^\/external-api/, '/v1'),
      // },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
