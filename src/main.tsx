/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:18:25
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 16:06:41
 * @FilePath: /my-react-vite-ts/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import RouterProvider from '@/components/RouterProvider'
import { store } from '@/models'
import './index.less'
import App from './App.tsx'
import * as Sentry from '@sentry/react';
// 自定义sentry rule插件
import {
  beforeSend,
  getIgnoreErrors,
} from '@shuhejs/sentry-rule-sdk';

if (!IS_DEV) {
  Sentry.init({
    dsn: 'https://bf9f9502f4ff4d2a9d93f1f982aba8e6@sentry.api.lattebank.com/130', // 填写 Client Keys DSN
    tracesSampleRate: 1.0,
    // 忽略配置
    ignoreErrors: getIgnoreErrors(),
    // 环境，测试不要用prod
    environment: UI_RUNTIME_ENV || 'temp',
    beforeSend: (event, hit) => {
      // 每次都会调用通用beforesend方法，包括一些额外参数，每次都调用
      return beforeSend(event, hit, {
        runEnv: UI_RUNTIME_ENV, // 当前的运行环境
      });
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
