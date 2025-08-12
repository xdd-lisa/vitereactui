/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:10:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 15:10:00
 * @FilePath: /my-react-vite-ts/src/components/RouterProvider.tsx
 * @Description: 自定义路由提供者组件，解决路由同步问题
 */
import { useState, useEffect, type FC, type ReactNode } from 'react'
import { Router } from 'react-router-dom'
import { type Location } from 'history'
import { history } from '../utils/history'

interface RouterProviderProps {
  children: ReactNode
}

const RouterProvider: FC<RouterProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location>(history.location)

  useEffect(() => {
    // 监听history变化并更新location状态
    const unlisten = history.listen(({ location: newLocation }) => {
      setLocation(newLocation)
    })

    // 清理监听器
    return unlisten
  }, [])

  return (
    <Router location={location} navigator={history}>
      {children}
    </Router>
  )
}

export default RouterProvider
