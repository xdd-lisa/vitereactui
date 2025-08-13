/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:00:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 17:04:28
 * @FilePath: /my-react-vite-ts/src/types/routes.ts
 * @Description: 路由相关类型定义
 */

// 路由路径枚举
export type RoutePathsEnum = '/' | '/about' | '/contact' | '/label'

export const RoutePaths = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const

// 路由配置接口
export interface RouteConfig {
  path: string
  name: string
  component: React.ComponentType
  exact?: boolean
}

// 路由元数据接口
export interface RouteMetadata {
  title: string
  description?: string
  keywords?: string[]
  requireAuth?: boolean
}

// 完整路由信息接口
export interface RouteInfo extends RouteConfig {
  metadata: RouteMetadata
}

// 导航菜单项接口
export interface NavigationItem {
  path: RoutePathsEnum
  label: string
  icon?: string
  disabled?: boolean
}

// 面包屑导航项接口
export interface BreadcrumbItem {
  path: string
  label: string
  isActive?: boolean
}

// 路由守卫结果类型
export type RouteGuardResult = boolean | string | Promise<boolean | string>

// 路由守卫函数类型
export type RouteGuard = (to: string, from: string) => RouteGuardResult
