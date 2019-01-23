import { checkoutFormItems } from '@/common'
// 获取搜索表单项数据
export function getSearchFormItems (hasOperation, extraItems = {}) {
  let baseConfig = {
    'customerName': null,
    'idNo': {
      prop: 'idcard',
      fields: {
        component: 'ElInput',
        props: {
          placeholder: '身份证号'
        }
      }
    }
  }
  hasOperation && (baseConfig.operation = null)
  extraItems && Object.assign(baseConfig, extraItems)
  return checkoutFormItems(baseConfig)
}
