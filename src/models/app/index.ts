/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:28:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 17:24:43
 * @FilePath: /my-react-vite-ts/src/store/slices/appSlice.ts
 * @Description: 应用状态slice
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// 通知接口
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  timestamp: number
}

// 应用状态接口
export interface AppState {
  loading: boolean
  sidebarCollapsed: boolean
  notifications: Notification[]
  currentRoute: string
  breadcrumbs: Array<{
    path: string
    title: string
  }>
}

// 初始状态
const initialState: AppState = {
  loading: false,
  sidebarCollapsed: false,
  notifications: [],
  currentRoute: '/',
  breadcrumbs: [],
}

// 创建slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    // 切换侧边栏
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    
    // 设置侧边栏状态
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    
    // 添加通知
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        duration: 4000,
        ...action.payload,
      }
      state.notifications.push(notification)
    },
    
    // 移除通知
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    
    // 清空所有通知
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // 设置当前路由
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload
    },
    
    // 设置面包屑
    setBreadcrumbs: (state, action: PayloadAction<Array<{ path: string; title: string }>>) => {
      state.breadcrumbs = action.payload
    },
  },
})

// 导出actions
export const {
  setLoading,
  toggleSidebar,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  setCurrentRoute,
  setBreadcrumbs,
} = appSlice.actions

// 导出reducer
export default appSlice.reducer
