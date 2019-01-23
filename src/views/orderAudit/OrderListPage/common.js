import { checkoutTableColumns, handleFormData } from '@/common'
import { objKeysRename } from '@/utils'
import { cloneDeep } from 'lodash'
import { getOrderAuditList, handleOrder } from '@/api/orderAudit'
import { getSearchParams } from '@/api/common'

// 搜索条件项返回数据字段转换---数据
const propKeyMap = {
  orderRandomId: 'order_random_id',
  sub_company: 'company_sub_id',
  team: 'team_id'
}

// 搜索条件项返回数据字段转换---函数
export function SPpropKeyRename (obj) {
  return objKeysRename(obj, propKeyMap)
}

// 公共通用配置
// 日期格式化函数

// 获取列表头数据
export function getTableColumns (configs) {
  const commonColumns = {
  }
  let baseConfig = {}
  configs.forEach(item => {
    if (typeof item === 'string') {
      baseConfig[item] = commonColumns.hasOwnProperty(item) ? commonColumns[item] : null
    } else if (typeof item === 'object') {
      baseConfig['_column' + Math.random()] = item
    }
  })
  return checkoutTableColumns(baseConfig)
}

// tab转换函数
export function getTabsSearchForms (searchForm) {
  return [
    {
      label: '待认领案件',
      name: '1',
      ...searchForm
    }, {
      label: '待处理案件',
      name: '2',
      ...searchForm
    }
  ]
}
export const claimAndReturnBtns = () => ({
  '1': [
    {
      text: '认领',
      btnKey: 'claimOrder',
      loadingKey: 'claimOrderBtn',
      click: 'handleOrder'
    }
  ],
  '2': [
    {
      text: '退件',
      btnKey: 'returnOrder',
      type: 'confirm',
      loadingKey: 'returnOrderBtn',
      confirmMsg: '确定退回此件?',
      btype: 'warning',
      click: 'handleOrder'
    },
    {
      text: '处理',
      btnKey: 'handle',
      click: 'skipToDetail'
    }
  ]
})
export function createActionBtn (text, btnKey, click = 'skipToDetail', props = {}) {
  return { text, btnKey, click, ...props }
}
export function getCommonDetailRoute (name, idKey = 'id') {
  return function (row, scope, curBtn) {
    return { name, query: { id: row[idKey || 'id'] } }
  }
}
export function getCommonOptions ({ detailName, detailIdKey, getPowerParams, hasTab, claimAndReturn }) {
  const commonOptions = {
    handleFormData,
    needGetParams: true,
    searchParams: {},
    SPpropKeyRename,
    actionsInfo: {
      claimOrder: {
        api: handleOrder,
        msg: '认领成功',
        status: 1
      },
      returnOrder: {
        api: handleOrder,
        msg: '退件成功',
        status: 2
      }
    }
  }
  hasTab && (commonOptions.getTabsSearchForms = getTabsSearchForms)
  claimAndReturn && (commonOptions.actionBtns = claimAndReturnBtns())
  detailName && (commonOptions.getDetailRoute = getCommonDetailRoute(detailName, detailIdKey))
  return cloneDeep(commonOptions)
}
// 公共接口配置
export function getCommonApis () {
  return {
    getPageList: getOrderAuditList,
    getSearchParams: getSearchParams
  }
}
