/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:18:25
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 14:43:09
 * @FilePath: /my-react-vite-ts/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { name} from './package.json';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${name}/`,
  server: {
    port: 9000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
