/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:26:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:26:00
 * @FilePath: /my-react-vite-ts/src/store/slices/counterSlice.ts
 * @Description: 计数器状态slice
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// 状态接口
export interface CounterState {
  value: number
  step: number
  history: number[]
}

// 初始状态
const initialState: CounterState = {
  value: 0,
  step: 1,
  history: [0],
}

// 创建slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 增加
    increment: (state) => {
      state.value += state.step
      state.history.push(state.value)
    },
    
    // 减少
    decrement: (state) => {
      state.value -= state.step
      state.history.push(state.value)
    },
    
    // 设置具体值
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload
      state.history.push(state.value)
    },
    
    // 设置步长
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },
    
    // 重置
    reset: (state) => {
      state.value = 0
      state.step = 1
      state.history = [0]
    },
    
    // 清空历史
    clearHistory: (state) => {
      state.history = [state.value]
    },
  },
})

// 导出actions
export const {
  increment,
  decrement,
  setValue,
  setStep,
  reset,
  clearHistory,
} = counterSlice.actions

// 导出reducer
export default counterSlice.reducer
