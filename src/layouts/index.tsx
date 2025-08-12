/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:25:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:11:12
 * @FilePath: /my-react-vite-ts/src/layouts/index.tsx
 * @Description: 布局组件入口
 */
import { type FC, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import './index.less'

interface BasicLayoutProps {
  children?: ReactNode
}

const BasicLayout: FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="basic-layout">
      <header className="basic-layout-header">
        <Navigation />
      </header>
      
      <main className="basic-layout-content">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default BasicLayout