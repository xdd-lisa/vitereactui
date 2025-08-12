/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:15:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 15:15:00
 * @FilePath: /my-react-vite-ts/src/hooks/useRouter.ts
 * @Description: 路由状态管理钩子
 */
import { useState, useEffect } from 'react'
import { type Location } from 'history'
import { navigationUtils, type RouteState } from '../utils/history'

// 路由状态接口
export interface RouterState {
  location: Location
  pathname: string
  hash: string
  search: string
  state: RouteState | null
}

// 导航函数接口
export interface NavigationMethods {
  push: (path: string, state?: RouteState) => void
  replace: (path: string, state?: RouteState) => void
  goBack: () => void
  goForward: () => void
  go: (delta: number) => void
}

// useRouter hook返回值类型
export interface UseRouterReturn extends RouterState, NavigationMethods {
  isLoading: boolean
}

/**
 * 自定义路由hook，提供路由状态和导航方法
 */
export const useRouter = (): UseRouterReturn => {
  const [location, setLocation] = useState<Location>(navigationUtils.getCurrentLocation())
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // 监听路由变化
    const unlisten = navigationUtils.listen((newLocation) => {
      setLocation(newLocation)
      setIsLoading(false)
    })

    // 清理监听器
    return unlisten
  }, [])

  // 包装导航方法以添加loading状态
  const push = (path: string, state?: RouteState): void => {
    setIsLoading(true)
    navigationUtils.push(path, state)
  }

  const replace = (path: string, state?: RouteState): void => {
    setIsLoading(true)
    navigationUtils.replace(path, state)
  }

  const goBack = (): void => {
    setIsLoading(true)
    navigationUtils.goBack()
  }

  const goForward = (): void => {
    setIsLoading(true)
    navigationUtils.goForward()
  }

  const go = (delta: number): void => {
    setIsLoading(true)
    navigationUtils.go(delta)
  }

  // 解析路径信息
  const pathname = location.hash ? location.hash.replace('#', '') : location.pathname
  const hash = location.hash || ''
  const search = location.search || ''
  const state = (location.state as RouteState) || null

  return {
    // 路由状态
    location,
    pathname,
    hash,
    search,
    state,
    isLoading,
    
    // 导航方法
    push,
    replace,
    goBack,
    goForward,
    go
  }
}
