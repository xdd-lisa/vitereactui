/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:02:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-12 15:15:45
 * @FilePath: /my-react-vite-ts/src/types/global.ts
 * @Description: 全局类型定义
 */
// 通用API响应类型
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

// 分页参数类型
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

// 分页响应类型
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationParams
}

// 表单验证错误类型
export interface FormError {
  field: string
  message: string
  code?: string
}

// 应用状态类型
export interface AppState {
  loading: boolean
  error: string | null
  user: User | null
}

// 用户信息类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

// 用户角色类型
export type UserRole = 'admin' | 'user' | 'guest'

// 用户角色常量
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const

// 主题类型
export type Theme = 'light' | 'dark' | 'auto'

// 语言类型
export type Language = 'zh-CN' | 'en-US'

// 环境类型
export type Environment = 'development' | 'production' | 'testing'

// 配置类型
export interface AppConfig {
  apiBaseUrl: string
  environment: Environment
  version: string
  theme: Theme
  language: Language
  features: {
    enableAnalytics: boolean
    enableNotifications: boolean
    enableOfflineMode: boolean
  }
}

// 事件处理器类型
export type EventHandler<T = unknown> = (event: T) => void

// 异步函数类型
export type AsyncFunction<T = unknown, R = unknown> = (params?: T) => Promise<R>

// 键值对类型
export type KeyValuePair<T = unknown> = Record<string, T>

// ID类型
export type ID = string | number

// 时间戳类型
export type Timestamp = number

// 颜色类型
export type Color = string

// 尺寸类型
export interface Size {
  width: number
  height: number
}

// 位置类型
export interface Position {
  x: number
  y: number
}

// 矩形区域类型
export interface Rectangle extends Position, Size {}

// 状态更新函数类型
export type StateUpdater<T> = (prevState: T) => T

// 可选字段类型工具
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 必需字段类型工具
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }
