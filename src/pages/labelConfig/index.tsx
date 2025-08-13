/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-13 16:50:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-13 17:11:37
 * @FilePath: /vitereactui/src/pages/labelConfig/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { render } from '@dataseed/amis';
import { useContext } from "react";

import { generateCrud } from '@/utils';
import { LayoutContext } from '@/layouts';

import { enumConfig, KEYS, LABELS } from './constant';
import { editDialog } from './pageSchema';

function LabelConfig() {
  const context = useContext(LayoutContext);
  const { env } = context;

  // react版本没升上来，暂时不能用
  console.log(context, 'context');

  return (
    <div>
      {render(
        {
          type: 'page',
          authorizedConfig: true,
          body: generateCrud(KEYS, {
            id: 'labelconfig-list-id',
            api: {
              url: `${APIURL}/label/list`,
              method: 'post',
            },
            topToolbar: [
              {
                type: 'button',
                label: '新增标签',
                level: 'primary',
                actionType: 'dialog',
                dialog: editDialog('add'),
                visibleOn: '${CHECKAUTHORITY("LABEL_ADD")}',
              },
            ],
            columns: [
              {
                name: KEYS.labelName,
                label: LABELS.labelName,
                // width: 250,
                type: 'typography',
                ellipsis: {
                  rows: 1,
                  width: 150,
                },
                searchable: {
                  type: 'input-text',
                  name: KEYS.labelName,
                  label: LABELS.labelName,
                  placeholder: `请输入${LABELS.labelName}`,
                },
              },
              {
                name: KEYS.description,
                label: LABELS.description,
                type: 'typography',
                ellipsis: {
                  rows: 1,
                },
              },
              {
                name: KEYS.markCount,
                label: LABELS.markCount,
                width: 80,
              },

              {
                name: KEYS.status,
                label: LABELS.status,
                width: 80,
                type: 'select',
                static: true,
                options: enumConfig.STSTUS_OPTION,
                staticShowPlaceholder: false,
                searchable: {
                  type: 'select',
                  options: enumConfig.STSTUS_OPTION,
                  placeholder: `请选择${LABELS.status}`,
                  clearable: true,
                },
              },
              {
                name: KEYS.createdBy,
                label: LABELS.createdBy,
                width: 120,
                searchable: {
                  type: 'select',
                  placeholder: `请选择${LABELS.createdBy}`,
                  name: KEYS.createdByList,
                  label: LABELS.createdBy,
                  multiple: true,
                  clearable: true,
                  searchable: true,
                  joinValues: false,
                  extractValue: true,
                  source: `${APIURL}/label/created_by`,
                  id: KEYS.createdByList,
                },
              },
              {
                name: KEYS.createdAt,
                label: LABELS.createdAt,
                format: 'YYYY-MM-DD HH:mm:ss',
                valueFormat: 'x',
                type: 'date',
                width: 180,
              },
              {
                name: KEYS.updatedBy,
                label: LABELS.updatedBy,
                width: 120,
                type: 'tpl',
                tpl: `\${${KEYS.updatedBy} || ${KEYS.createdBy}}`,
              },
              {
                name: KEYS.updatedAt,
                label: LABELS.updatedAt,
                format: 'YYYY-MM-DD HH:mm:ss',
                valueFormat: 'x',
                type: 'date',
                width: 180,
              },
              {
                type: 'operation',
                label: '操作',
                width: 80,
                fixed: 'right',
                hiddenOn:
                  '${!CHECKAUTHORITY("LABEL_EDIT") && !CHECKAUTHORITY("LABEL_DELETE")}',
                buttons: [
                  {
                    type: 'button',
                    label: '编辑',
                    level: 'link',
                    actionType: 'dialog',
                    dialog: editDialog('edit'),
                    visibleOn: '${CHECKAUTHORITY("LABEL_EDIT")}',
                  },
                  {
                    label: '删除',
                    type: 'button',
                    level: 'link',
                    visibleOn: '${CHECKAUTHORITY("LABEL_DELETE")}',
                    confirmText: '确定删除该标签？',
                    disabledOn: '${status != 0}',
                    onEvent: {
                      click: {
                        actions: [
                          {
                            actionType: 'ajax',
                            args: {
                              api: {
                                url: `${APIURL}/label/\${id}`,
                                method: 'delete',
                                data: {
                                  id: '${id}',
                                },
                                adaptor: (payload) => {
                                  return {
                                    ...payload,
                                    // 不知道具体什么原因，但是如果返回了删除的单笔数据详情，如果筛选项默认值不存在，会影响筛选项字段的值
                                    data: {},
                                  };
                                },
                              },
                            },
                          },
                          {
                            actionType: 'broadcast', // 触发广播事件
                            args: {
                              eventName: 'broadcast_1',
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            ],
            // 创建一个广播事件，更新列表CRUD和创建人下拉枚举
            onEvent: {
              broadcast_1: {
                actions: [
                  {
                    actionType: 'query',
                    componentId: 'labelconfig-list-id', // 更新crud,
                    args: {
                      queryParams: {
                        pageNo: 1,
                      },
                    },
                  },
                  {
                    actionType: 'reload',
                    componentId: KEYS.createdByList, // 更新创建人枚举
                  },
                ],
              },
            },
          }),
        },
        {
          // 针对整个页面应用新规范
          standardMode: true,
        },
        env,
      )}
    </div>
  );
}

export default LabelConfig;
