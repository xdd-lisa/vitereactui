/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:55:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:27:32
 * @FilePath: /my-react-vite-ts/src/layouts/Navigation.tsx
 * @Description: 基于routes配置自动生成的导航组件
 */
import { type FC, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../routes'
import { type RouteConfig, type MenuRoute } from '../types/route'

const Navigation: FC = () => {
  const location = useLocation()
  
  // 过滤可显示在菜单中的路由
  const menuRoutes = useMemo(() => {
    return routes.filter((route: RouteConfig): route is MenuRoute => 
      'component' in route &&  // 确保是组件路由
      route.hideInMenu !== true && 
      Boolean(route.title) && 
      route.path !== '/' &&  // 排除重定向路由
      route.component !== undefined  // 确保有组件
    ) as MenuRoute[]
  }, [])

  // 判断当前路由是否激活
  const isActive = (path: string): boolean => {
    if (path === '/home' && location.pathname === '/') {
      return true  // 首页特殊处理
    }
    return location.pathname === path
  }

  return (
    <nav className="navigation">
      <div className="navigation-container">
        {/* 菜单区域 */}
        <div className="navigation-menu">
          {menuRoutes.map((route: MenuRoute) => (
            <Link
              key={route.name || route.path}
              to={route.path}
              className={`navigation-item ${isActive(route.path) ? 'active' : ''}`}
              title={route.title}
            >
              <span className="nav-icon">{route.icon}</span>
              <span className="nav-text">{route.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation