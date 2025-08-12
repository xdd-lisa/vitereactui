/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:18:25
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 15:49:07
 * @FilePath: /my-react-vite-ts/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { type FC, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts'
import { routes } from '@/routes'
import { type RouteConfig } from '@/types/route'
import './App.less'

// 加载中组件
const Loading: FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '16px',
    color: '#666'
  }}>
    页面加载中...
  </div>
)

// 404页面组件
const NotFound: FC = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
  </div>
)

const App: FC = () => {
  return (
    <BasicLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route: RouteConfig) => {
            // 处理重定向路由
            if (route.redirect) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Navigate to={route.redirect} replace />}
                />
              )
            }
            
            // 处理普通路由
            if (route.component) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              )
            }
            
            return null
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BasicLayout>
  )
}

export default App
