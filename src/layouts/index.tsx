/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:25:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 17:09:15
 * @FilePath: /my-react-vite-ts/src/layouts/index.tsx
 * @Description: 布局组件入口
 */
import { type FC, type ReactNode, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import { createENV } from '@dataseed/amis-utils';
import { type RendererEnv, toast, alert, confirm } from '@dataseed/amis';
import history from '@/utils/history';
import $http from '@/utils/request';
import './index.less'

interface BasicLayoutProps {
  children?: ReactNode
}

interface ENV extends RendererEnv {
  axiosInstance?: unknown;
  history?: unknown;
  authorizedConfig?: boolean | {
    appName: string;
    version: string;
  };
  theme?: string;
  enableAMISDebug?: boolean;
}
  // amis配置信息
const env: any = {
  ...createENV({
    axiosInstance: $http,
    history,
    authorizedConfig: {
      appName: 'customerportalui',
      version: 'v2', // 可配置 "v1"｜"v2"。 v1：旧版本权限中心， v2：身份一站式权限（默认）
    },
  }),
  enableAMISDebug: IS_DEV,
  theme: 'antd',
  // notify: (type, msg, conf) =>
  //   toast[type]
  //     ? toast[type](msg, conf)
  //     : console.warn('[Notify]', type, msg),
  // alert,
  // confirm,
  // copy: (content, options) => {
  //   copy(content, options);
  //   toast.success(__('System.copy'));
  // }
  // copy: (contents, options = {}) => {
  //   const ret = copy(contents);
  //   ret && options.silent !== true && toast.success('内容已复制到粘贴板');
  //   return ret;
  // },
};

export const LayoutContext = createContext<{env: ENV} | undefined>(undefined);

const BasicLayout: FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="basic-layout">
      <header className="basic-layout-header">
        <Navigation />
      </header>
      
      <main className="basic-layout-content">
        {children ? (
          <LayoutContext.Provider value={{env}}>
            {children}
          </LayoutContext.Provider>
        ) : <Outlet context={{
            env
          }}/>}
      </main>
    </div>
  )
}

export default BasicLayout