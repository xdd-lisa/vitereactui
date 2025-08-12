/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:18:25
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 17:07:04
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
