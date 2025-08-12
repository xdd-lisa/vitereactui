/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:29:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-12 14:08:17
 * @FilePath: /my-react-vite-ts/src/store/hooks.ts
 * @Description: Redux hooks with TypeScript support
 */
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/models'
import type { User } from './index'

// Custom hook to get user state
export const useUser = () => useSelector((state: RootState) => state.user)

// 类型安全的dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  
  return {
    setUser: (user: User) => dispatch({ type: 'user/setUser', payload: user }),
    clearUser: () => dispatch({ type: 'user/clearUser' }),
    setTheme: (theme: 'light' | 'dark' | 'auto') => dispatch({ type: 'user/setTheme', payload: theme }),
    setLanguage: (language: 'zh-CN' | 'en-US') => dispatch({ type: 'user/setLanguage', payload: language }),
    clearError: () => dispatch({ type: 'user/clearError' }),
  }
}

