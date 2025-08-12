/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:25:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 17:26:40
 * @FilePath: /my-react-vite-ts/src/store/index.ts
 * @Description: Redux store配置
 */
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter'
import userSlice from './user'
import appSlice from './app'

// 配置store
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

// 导出类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 导出默认store
export default store
