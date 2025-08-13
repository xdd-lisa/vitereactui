/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-13 16:24:13
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 16:24:39
 * @FilePath: /vitereactui/src/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import $http from '@lattebank/webadmin-http';

// 业务自己实现401拦截
$http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error && error.status === 401) {
      const redirect = `${window.location.pathname}${window.location.hash}`;
      $http
        .get(
          '/idaasopr/login-config',
          {
            tenantIdOrCode: 'shuhe',
            redirect,
          },
          { noToken: true },
        )
        .then((res) => {
          if (res?.data?.type?.[0]?.redirect) {
            window.location.href = res.data.type[0].redirect;
          }
        })
        .catch((jumpErr) => {
          console.log('[$http]:新版login地址跳转异常', jumpErr); // eslint-disable-line
        });
      // 如果是401错误，直接抛出错误
      return Promise.reject(error);
    }

    /*
      模拟@lattebank/webadmin-http的amis适配，业务侧模拟
    */
    const { _response } = error || {};
    const { config } = _response || {};
    if (config && config.isAmis) {
      return Promise.resolve(_response);
    }
    // 其他错误，交给全局错误处理
    return Promise.reject(error);
  },
);

$http.interceptors.response.use(
  (response) => {
    // 针对amis，若code为200，赋值status为0，表示接口成功
    if (
      response?.data &&
      response?.data?.toString() !== '[object Blob]' &&
      Object.prototype.toString.call(response?.data) === '[object Object]' &&
      response.data.status === undefined
    ) {
      response.data.status =
        response.data.code === 200 ? 0 : response.data.code;
    }
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

const request = $http;

export default request;
