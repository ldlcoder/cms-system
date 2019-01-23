import { checkoutTableColumns } from '@/common'
import { viewBtn, statusBtn } from '@/common/commonData/actionBtns'
import { cloneDeep } from 'lodash'
// 获取公用表头
export function getTableColumns (configs) {
  const commonColumns = {
    'name': null,
    'mobile': null,
    'subCompany': null,
    'team': null,
    'etime': null,
    'roles': null,
    'ctime': null,
    'action': null
  }
  let baseConfig = {}
  configs.forEach(item => {
    if (typeof item === 'string') {
      commonColumns.hasOwnProperty(item) && (baseConfig[item] = commonColumns[item])
    } else if (typeof item === 'object') {
      baseConfig['_column' + Math.random()] = item
    }
  })
  return checkoutTableColumns(baseConfig)
}
// 公共通用配置
export function handleBtns () {
  const { RouteRights } = this
  let actionBtns = []
  if (RouteRights) {
    RouteRights.includes('detail') && actionBtns.push(viewBtn({
      click: typeof this.skipToDetail === 'function' ? this.skipToDetail : () => {}
    }))
    RouteRights.includes('disabled') && actionBtns.push(statusBtn('is_active', {
      click: typeof this.disabledRecord === 'function' ? this.disabledRecord : () => {}
    }))
  }
  return actionBtns
}

// 跳转路由
export function getCommonDetailRoute (name) {
  return function (row, scope, curBtn) {
    return { name, query: { id: row.id } }
  }
}
export function getCommonOptions ({ statusKey, detailName }) {
  const commonOptions = {
    actionBtns: handleBtns,
    statusParamsHandle: getStatusSetParam(statusKey)
  }
  detailName && (commonOptions.getDetailRoute = getCommonDetailRoute(detailName))
  return cloneDeep(commonOptions)
}

// 获取修改状态所需参数
export function getStatusSetParam (idKey) {
  return row => ({[idKey]: row.id, status: row.status})
}