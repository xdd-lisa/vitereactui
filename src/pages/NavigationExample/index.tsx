/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:50:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 17:12:42
 * @FilePath: /my-react-vite-ts/src/components/NavigationExample.tsx
 * @Description: 编程式导航示例组件
 */
import { type FC } from 'react'
import { useRouter } from '../../hooks/useRouter'
import { type RouteState } from '../../utils/history'

// 组件Props接口（目前为空，但为将来扩展预留）
interface NavigationExampleProps {}

// 按钮样式接口
interface ButtonStyle {
  padding: string
  backgroundColor: string
  color: string
  border: string
  borderRadius: string
  cursor: string
}

const NavigationExample: FC<NavigationExampleProps> = () => {
  const { pathname, push, replace, goBack, goForward, go, isLoading, state } = useRouter()

  const handleNavigation = (path: string): void => {
    push(path)
  }

  const handleNavigationWithState = (): void => {
    const routeState: RouteState = { 
      from: 'navigation-example', 
      timestamp: Date.now() 
    }
    push('/about', routeState)
  }

  // 通用按钮样式
  const getButtonStyle = (backgroundColor: string, color: string = 'white'): ButtonStyle => ({
    padding: '0.5rem 1rem',
    backgroundColor,
    color,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  })

  return (
    <div style={{ 
      padding: '1rem', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      margin: '1rem 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>编程式导航示例</h3>
      <p>当前路径: <strong>{pathname}</strong></p>
      {isLoading && <p style={{ color: '#007bff' }}>正在跳转...</p>}
      {state && (
        <p>路由状态: <code>{JSON.stringify(state, null, 2)}</code></p>
      )}
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button 
          onClick={() => handleNavigation('/')}
          style={getButtonStyle('#007bff')}
        >
          跳转到首页
        </button>
        
        <button 
          onClick={() => handleNavigation('/about')}
          style={getButtonStyle('#28a745')}
        >
          跳转到关于页面
        </button>
        
        <button 
          onClick={() => handleNavigation('/contact')}
          style={getButtonStyle('#ffc107', 'black')}
        >
          跳转到联系页面
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button 
          onClick={handleNavigationWithState}
          style={getButtonStyle('#6f42c1')}
        >
          跳转并传递状态
        </button>
        
        <button 
          onClick={() => replace('/contact')}
          style={getButtonStyle('#fd7e14')}
        >
          替换当前页面
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => goBack()}
          style={getButtonStyle('#6c757d')}
          disabled={isLoading}
        >
          后退
        </button>
        
        <button 
          onClick={() => goForward()}
          style={getButtonStyle('#6c757d')}
          disabled={isLoading}
        >
          前进
        </button>
        
        <button 
          onClick={() => go(-2)}
          style={getButtonStyle('#6c757d')}
          disabled={isLoading}
        >
          后退2步
        </button>
      </div>
    </div>
  )
}

export default NavigationExample
