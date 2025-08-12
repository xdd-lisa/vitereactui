/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:29:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-12 14:03:57
 * @FilePath: /my-react-vite-ts/src/store/hooks.ts
 * @Description: Redux hooks with TypeScript support
 */
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../index'

// 类型安全的dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useApp = () =>useSelector((state: RootState) => state.app)

export const useAppActions = () => {
  const dispatch = useAppDispatch()
  
  return {
    setLoading: (loading: boolean) => dispatch({ type: 'app/setLoading', payload: loading }),
    toggleSidebar: () => dispatch({ type: 'app/toggleSidebar' }),
    setSidebarCollapsed: (collapsed: boolean) => dispatch({ type: 'app/setSidebarCollapsed', payload: collapsed }),
    addNotification: (notification: any) => dispatch({ type: 'app/addNotification', payload: notification }),
    removeNotification: (id: string) => dispatch({ type: 'app/removeNotification', payload: id }),
    clearNotifications: () => dispatch({ type: 'app/clearNotifications' }),
    setCurrentRoute: (route: string) => dispatch({ type: 'app/setCurrentRoute', payload: route }),
    setBreadcrumbs: (breadcrumbs: any) => dispatch({ type: 'app/setBreadcrumbs', payload: breadcrumbs }),
  }
}
