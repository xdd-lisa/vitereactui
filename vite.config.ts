/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:18:25
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 17:02:44
 * @FilePath: /vitereactui/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { name} from './package.json';
import path from 'path';
// @ts-expect-error - Third-party module without type definitions
import sentry from '@shuhejs/umi-plugin-sentry';

const proxyEnv = 'sit';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentry],
  base: `/${name}/`,
  // 定义全局常量
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    BUILD_TIME: JSON.stringify(new Date().toISOString()),
    IS_DEV: JSON.stringify(process.env.NODE_ENV === 'development'),
    UI_RUNTIME_ENV: JSON.stringify(process.env.UI_RUNTIME_ENV || 'temp'),
    APIURL: JSON.stringify('/customerportal'),
  },
  server: {
    port: 9000,
    // 代理配置
    proxy: {
    '/midwareopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/registryopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/authopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/infraopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/idaasui': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/idaasui-sub': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/idaasopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/campaignopr': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/staticui': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/mainui': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    // '/customerportal/workOrder/': {
    //   // target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
    //   target: `http://192.168.112.243:8080/`,
    //   changeOrigin: true,
    // },
    '/customerportal/': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/copilot': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/callcenterimcc': {
      target: `http://moka.dmz.${proxyEnv}.caijj.net/`,
      changeOrigin: true,
    },
    '/apicenter': {
      target: `http://openapi.api.huanbeiapi.com/`,
      changeOrigin: true,
    },
  }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
