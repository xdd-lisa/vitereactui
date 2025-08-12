/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:03:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 15:03:00
 * @FilePath: /my-react-vite-ts/src/types/index.ts
 * @Description: 类型定义入口文件
 */

// 重新导出所有类型定义
export * from './global'
export * from './routes'

// 重新导出history相关类型
export type { RouteState, NavigationListener, NavigationUtils } from '../utils/history'

