/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:32:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-12 15:14:08
 * @FilePath: /my-react-vite-ts/src/components/ReduxDemo.tsx
 * @Description: Redux使用示例组件
 */
import { type FC, useState } from 'react'
import { useUser } from '@/models/user/hooks';
import { useApp, useAppDispatch } from '@/models/app/hooks';
import { useCounter } from '@/models/counter/hooks';
import { increment, decrement, setValue, setStep, reset, clearHistory } from '@/models/counter'
import { loginUser, logoutUser, setTheme, setLanguage } from '@/models/user'
import { addNotification, removeNotification, toggleSidebar } from '@/models/app'
import './index.less'

const ReduxDemo: FC = () => {
  const dispatch = useAppDispatch()
  const counter = useCounter();
  const user = useUser();
  const app = useApp();
  
  const [customValue, setCustomValue] = useState('')
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('123456')

  // 计数器操作
  const handleIncrement = () => dispatch(increment())
  const handleDecrement = () => dispatch(decrement())
  const handleSetValue = () => {
    const value = parseInt(customValue)
    if (!isNaN(value)) {
      dispatch(setValue(value))
      setCustomValue('')
    }
  }
  const handleSetStep = (step: number) => dispatch(setStep(step))
  const handleReset = () => dispatch(reset())
  const handleClearHistory = () => dispatch(clearHistory())

  // 用户操作
  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
  }
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    dispatch(setTheme(theme))
  }
  const handleLanguageChange = (language: 'zh-CN' | 'en-US') => {
    dispatch(setLanguage(language))
  }

  // 应用操作
  const handleAddNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    dispatch(addNotification({
      type,
      title: `${type.toUpperCase()} 通知`,
      message: `这是一个${type}类型的通知示例`,
    }))
  }
  const handleToggleSidebar = () => dispatch(toggleSidebar())

  return (
    <div className="redux-demo">
      <h2>Redux Toolkit 示例</h2>
      
      {/* 计数器示例 */}
      <div className="demo-section">
        <h3>计数器状态</h3>
        <div className="counter-display">
          <div className="counter-value">当前值: {counter.value}</div>
          <div className="counter-step">步长: {counter.step}</div>
          <div className="counter-history">
            历史记录: [{counter.history.join(', ')}]
          </div>
        </div>
        
        <div className="counter-controls">
          <button onClick={handleDecrement} className="btn btn-danger">
            - {counter.step}
          </button>
          <button onClick={handleIncrement} className="btn btn-success">
            + {counter.step}
          </button>
          <button onClick={handleReset} className="btn btn-secondary">
            重置
          </button>
          <button onClick={handleClearHistory} className="btn btn-warning">
            清空历史
          </button>
        </div>
        
        <div className="counter-inputs">
          <div className="input-group">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="设置值"
              className="form-input"
            />
            <button onClick={handleSetValue} className="btn btn-primary">
              设置
            </button>
          </div>
          
          <div className="step-buttons">
            步长:
            {[1, 2, 5, 10].map(step => (
              <button
                key={step}
                onClick={() => handleSetStep(step)}
                className={`btn ${counter.step === step ? 'btn-active' : 'btn-outline'}`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 用户状态示例 */}
      <div className="demo-section">
        <h3>用户状态</h3>
        <div className="user-info">
          {user.isLoggedIn ? (
            <div className="user-logged-in">
              <div className="user-avatar">
                {user.currentUser?.avatar && (
                  <img src={user.currentUser.avatar} alt="Avatar" />
                )}
              </div>
              <div className="user-details">
                <div>姓名: {user.currentUser?.name}</div>
                <div>邮箱: {user.currentUser?.email}</div>
                <div>角色: {user.currentUser?.role}</div>
              </div>
              <button onClick={handleLogout} className="btn btn-danger" disabled={user.loading}>
                {user.loading ? '登出中...' : '登出'}
              </button>
            </div>
          ) : (
            <div className="user-login">
              <div className="login-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="邮箱"
                  className="form-input"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="密码"
                  className="form-input"
                />
                <button onClick={handleLogin} className="btn btn-primary" disabled={user.loading}>
                  {user.loading ? '登录中...' : '登录'}
                </button>
              </div>
              {user.error && <div className="error-message">{user.error}</div>}
            </div>
          )}
        </div>
        
        <div className="user-preferences">
          <div className="preference-group">
            <label>主题:</label>
            <select
              value={user.preferences.theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'auto')}
              className="form-select"
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
              <option value="auto">自动</option>
            </select>
          </div>
          
          <div className="preference-group">
            <label>语言:</label>
            <select
              value={user.preferences.language}
              onChange={(e) => handleLanguageChange(e.target.value as 'zh-CN' | 'en-US')}
              className="form-select"
            >
              <option value="zh-CN">中文</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* 应用状态示例 */}
      <div className="demo-section">
        <h3>应用状态</h3>
        <div className="app-controls">
          <button onClick={handleToggleSidebar} className="btn btn-info">
            侧边栏: {app.sidebarCollapsed ? '已收起' : '已展开'}
          </button>
          
          <div className="notification-buttons">
            通知:
            {(['success', 'error', 'warning', 'info'] as const).map(type => (
              <button
                key={type}
                onClick={() => handleAddNotification(type)}
                className={`btn btn-${type}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="notifications">
          <h4>通知列表 ({app.notifications.length})</h4>
          {app.notifications.map(notification => (
            <div key={notification.id} className={`notification notification-${notification.type}`}>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                {notification.message && (
                  <div className="notification-message">{notification.message}</div>
                )}
              </div>
              <button
                onClick={() => dispatch(removeNotification(notification.id))}
                className="notification-close"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReduxDemo
