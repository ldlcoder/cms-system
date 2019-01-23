import { checkoutTableColumns, createInputFormItem, checkoutFormItems, createSelectFormItem } from '@/common'
import { cloneDeep } from 'lodash'
import store from '@/store'
import { objKeysRename } from '@/utils'

export const tbColumnsFn = () => ({
})
export {
  createInputFormItem as createFormItem
}
export const formItemsFn = () => ({
})
// 获取公用表头
export function getTableColumns (keys) {
  return checkoutTableColumns(keys)
}
// 获取公用搜索条件
export function getSearchFormItems (extraItems = {}) {
  let baseConfig = {
    'orderRandomId': null,
    'name': null,
    'idcard': null,
    'mobile': null,
    'subCompany': null,
    'team': null,
    'status': createSelectFormItem('当前流程', 'status', 0, store.getters.appConfig.orderStatus)
  }
  extraItems && Object.assign(baseConfig, extraItems)
  return checkoutFormItems(baseConfig)
}
// 创建btn
export function createActionBtn (text, btnKey, click = 'skipToDetail', props = {}) {
  return { text, btnKey, click, ...props }
}

// 获取路由
export function getCommonDetailRoute (name, idKey = 'id') {
  return function (row, scope, curBtn) {
    return { name, query: { id: row[idKey || 'id'] } }
  }
}
export function getCommonOptions ({ detailName, detailIdKey }) {
  const commonOptions = {
  }
  detailName && (commonOptions.getDetailRoute = getCommonDetailRoute(detailName, detailIdKey))
  return cloneDeep(commonOptions)
}
export function formParamsFilter (data) {
  return data.map(item => ({ value: item.id, label: item.name }))
}

// 搜索条件项返回数据字段转换---数据
const propKeyMap = {
  sub_company: 'company_sub_id',
  team: 'team_id'
}

// 搜索条件项返回数据字段转换---函数
export function SPpropKeyRename (obj) {
  return objKeysRename(obj, propKeyMap)
}
