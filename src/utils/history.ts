/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:48:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 14:55:42
 * @FilePath: /my-react-vite-ts/src/utils/history.ts
 * @Description: 路由历史管理工具
 */
import { createHashHistory, type HashHistory, type Location, type Action } from 'history'

// 路由状态接口
export interface RouteState {
  from?: string
  timestamp?: number
  [key: string]: string | number | boolean | undefined
}

// 导航监听器类型
export type NavigationListener = (location: Location, action: Action) => void

// 创建hash history实例
export const history: HashHistory = createHashHistory()

// 导航工具函数接口
export interface NavigationUtils {
  push: (path: string, state?: RouteState) => void
  replace: (path: string, state?: RouteState) => void
  goBack: () => void
  goForward: () => void
  go: (delta: number) => void
  getCurrentLocation: () => Location
  listen: (listener: NavigationListener) => () => void
}

// 导航工具函数实现
export const navigationUtils: NavigationUtils = {
  // 跳转到指定路径
  push: (path: string, state?: RouteState): void => {
    history.push(path, state)
  },
  
  // 替换当前路径
  replace: (path: string, state?: RouteState): void => {
    history.replace(path, state)
  },
  
  // 后退
  goBack: (): void => {
    history.back()
  },
  
  // 前进
  goForward: (): void => {
    history.forward()
  },
  
  // 跳转到历史记录中的指定位置
  go: (delta: number): void => {
    history.go(delta)
  },
  
  // 获取当前位置信息
  getCurrentLocation: (): Location => {
    return history.location
  },
  
  // 监听路由变化
  listen: (listener: NavigationListener): (() => void) => {
    return history.listen(({ location, action }) => listener(location, action))
  }
}

// 导出默认的history实例
export default history
