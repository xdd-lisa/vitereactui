/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 14:34:54
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 17:10:23
 * @FilePath: /my-react-vite-ts/src/pages/Home/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, type FC } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg?url'
import './index.less'

const Home: FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="home-page">
      <div className="logos">
        <a href="https://vite.dev" target="_blank" className="logo-link">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="logo-link">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1 className="title">Vite + React</h1>
      
      <div className="counter-card">
        <button 
          className="counter-button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="description">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home
