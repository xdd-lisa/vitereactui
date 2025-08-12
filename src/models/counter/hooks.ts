/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:29:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-12 14:03:18
 * @FilePath: /my-react-vite-ts/src/store/hooks.ts
 * @Description: Redux hooks with TypeScript support
 */
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../index'

// 类型安全的dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useCounter = () => useSelector((state: RootState) => state.counter)

// 便捷的操作hooks
export const useCounterActions = () => {
  const dispatch = useAppDispatch()
  
  return {
    increment: () => dispatch({ type: 'counter/increment' }),
    decrement: () => dispatch({ type: 'counter/decrement' }),
    setValue: (value: number) => dispatch({ type: 'counter/setValue', payload: value }),
    setStep: (step: number) => dispatch({ type: 'counter/setStep', payload: step }),
    reset: () => dispatch({ type: 'counter/reset' }),
    clearHistory: () => dispatch({ type: 'counter/clearHistory' }),
  }
}