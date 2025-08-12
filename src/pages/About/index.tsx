import { type FC } from 'react'
import './index.less'

const About: FC = () => {
  return (
    <div className="about-page">
      <h1 className="title">关于我们</h1>
      <p className="description">
        这是一个使用 Vite + React + TypeScript 构建的示例应用，
        采用现代化的开发技术栈和最佳实践。
      </p>
      
      <div className="tech-stack">
        <h2 className="tech-title">技术栈</h2>
        <ul className="tech-list">
          <li className="tech-item">
            <span className="tech-icon">⚡</span>
            <span className="tech-name">Vite - 快速构建工具</span>
          </li>
          <li className="tech-item">
            <span className="tech-icon">⚛️</span>
            <span className="tech-name">React 19 - 用户界面库</span>
          </li>
          <li className="tech-item">
            <span className="tech-icon">🔷</span>
            <span className="tech-name">TypeScript - 类型安全</span>
          </li>
          <li className="tech-item">
            <span className="tech-icon">🛣️</span>
            <span className="tech-name">React Router - 路由管理</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
