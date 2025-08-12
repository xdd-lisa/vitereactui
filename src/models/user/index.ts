/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:27:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:27:00
 * @FilePath: /my-react-vite-ts/src/store/slices/userSlice.ts
 * @Description: 用户状态slice
 */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

// 用户接口
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
}

// 用户状态接口
export interface UserState {
  currentUser: User | null
  isLoggedIn: boolean
  loading: boolean
  error: string | null
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: 'zh-CN' | 'en-US'
  }
}

// 初始状态
const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  preferences: {
    theme: 'light',
    language: 'zh-CN',
  },
}

// 异步action：模拟登录
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }) => {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟用户数据
    const mockUser: User = {
      id: '1',
      name: '张三',
      email: credentials.email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'user',
    }
    
    return mockUser
  }
)

// 异步action：模拟登出
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    return null
  }
)

// 创建slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置用户信息
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.error = null
    },
    
    // 清除用户信息
    clearUser: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = null
    },
    
    // 设置主题
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.preferences.theme = action.payload
    },
    
    // 设置语言
    setLanguage: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.preferences.language = action.payload
    },
    
    // 清除错误
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // 登录
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '登录失败'
      })
    
    // 登出
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.currentUser = null
        state.isLoggedIn = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '登出失败'
      })
  },
})

// 导出actions
export const {
  setUser,
  clearUser,
  setTheme,
  setLanguage,
  clearError,
} = userSlice.actions

// 导出reducer
export default userSlice.reducer
