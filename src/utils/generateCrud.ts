import { cloneDeep } from 'lodash';

export default (
  KEYS = [],
  { api, columns, ...ret },
  { dealKeyCallback } = {},
) => ({
  type: 'crud',
  pageField: 'pageNo',
  perPageField: 'pageSize',
  canAccessSuperData: false, // 阻断数据向上层数据链上找
  api: {
    url: api.url,
    method: api.method || 'get',
    adaptor: (payload, response) => {
      console.log(payload, 'payload');
      const responseData = cloneDeep({ ...payload });
      // 此处少了一层data,接口直接返回了list
      if (!payload.data) {
        responseData.status = payload?.status || payload?.code || 0;
        responseData.data = {
          list: payload?.list || [],
          count: payload?.totalCount || payload?.total || 0,
          msg:
            payload?.msg ||
            payload?.message ||
            payload?.developerMessage ||
            '请求成功',
        };
      } else {
        responseData.data.count =
          payload?.data?.totalCount || payload?.data?.total || 0;
      }

      responseData.data.list?.forEach((item) => {
        Object.values(KEYS).forEach((key) => {
          if (item && item[key] === undefined) {
            item[key] = '';
          }
          dealKeyCallback?.({ item, key });
        });
      });
      return responseData;
    },
    ...api,
  },
  columns,
  ...ret,
});
