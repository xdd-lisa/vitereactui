/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:00:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:00:00
 * @FilePath: /my-react-vite-ts/src/types/route.ts
 * @Description: 路由类型定义
 */
import { type LazyExoticComponent, type FC } from 'react'

// 基础路由配置
export interface BaseRoute {
  path: string
  exact?: boolean
  name?: string
  hideInMenu?: boolean
}

// 重定向路由
export interface RedirectRoute extends BaseRoute {
  redirect: string
  component?: never
  title?: never
  icon?: never
}

// 组件路由
export interface ComponentRoute extends BaseRoute {
  component: LazyExoticComponent<FC>
  title: string
  icon?: string
  redirect?: never
}

// 联合路由类型
export type RouteConfig = RedirectRoute | ComponentRoute

// 菜单项类型（只包含组件路由）
export interface MenuRoute {
  path: string
  title: string
  icon?: string
  name?: string
  hideInMenu?: boolean
  component: LazyExoticComponent<FC>
}

