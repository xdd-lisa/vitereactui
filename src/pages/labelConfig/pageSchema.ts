import { enumConfig, KEYS, LABELS } from './constant';

export const editDialog = (modelType) => ({
  title: modelType === 'add' ? '新增标签' : '编辑标签',
  body: {
    type: 'form',
    labelWidth: 75,
    data:
      modelType === 'add'
        ? {
            [KEYS.labelName]: '',
            [KEYS.description]: '',
            [KEYS.status]: '',
          }
        : {},
    api: {
      url: modelType === 'add' ? `${APIURL}/label` : `${APIURL}/label/\${id}`,
      method: 'post',
      data: {
        '&': '$$',
      },
      adaptor: (payload, response) => {
        return {
          ...payload,
          status: payload.code === 200 ? 0 : payload.code,
        };
      },
    },
    body: [
      {
        type: 'input-text',
        name: KEYS.labelName,
        label: LABELS.labelName,
        required: true,
        placeholder: `请输入${LABELS.labelName}，最多20个字符并确保唯一性`,
        static: modelType === 'edit',
        maxLength: 20,
      },
      {
        type: 'textarea',
        name: KEYS.description,
        label: LABELS.description,
        placeholder: `请输入${LABELS.description}`,
        required: true,
        showCounter: true,
        maxLength: 100,
      },
      {
        type: 'select',
        name: KEYS.status,
        label: LABELS.status,
        placeholder: `请选择${LABELS.status}`,
        options: enumConfig.STSTUS_OPTION,
        required: true,
        clearable: true,
      },
    ],
    onEvent: {
      submitSucc: {
        actions: [
          {
            actionType: 'reload',
            componentId: KEYS.createdByList, // 更新创建人枚举
          },
        ],
      },
    },
  },
});
