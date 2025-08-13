/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 15:43:54
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 17:12:00
 * @FilePath: /my-react-vite-ts/routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { lazy } from "react";

export const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/home",
  },
  {
    path: "/home",
    component: lazy(() => import("@/pages/Home")),
    exact: true,
    name: "home",
    title: "首页",
    icon: '🏠',
  },
  {
    path: "/about",
    component: lazy(() => import("@/pages/About")),
    name: "about",
    title: "关于我们",
    icon: "ℹ️",
  },
  {
    path: "/contact",
    component: lazy(() => import("@/pages/Contact")),
    name: "contact",
    title: "联系我们",
    icon: "📞",
  },
  {
    path: "/navigationExample",
    component: lazy(() => import("@/pages/NavigationExample")),
    name: "navigationExample",
    title: "history demo",
    icon: "📞",
  },
  {
    path: "/reduxDemo",
    component: lazy(() => import("@/pages/ReduxDemo")),
    name: "reduxDemo",
    title: "redux demo",
    icon: "📞",
  },
  // {
  //   path: "/label",
  //   component: lazy(() => import("@/pages/labelConfig")),
  //   name: "labelConfig",
  //   title: "labelConfig",
  //   icon: "📞",
  // }
];
