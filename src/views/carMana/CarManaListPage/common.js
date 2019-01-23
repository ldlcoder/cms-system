import { checkoutTableColumns } from '@/common'
import { cloneDeep } from 'lodash'
// 获取公用表头
export function getTableColumns (configs) {
  const commonColumns = {
    isNew: null,
    time: {
      label: '上架时间',
      prop: 'time'
    },
    action: null
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
  const { actions } = this.$route.meta
  let actionBtns = []
  if (actions) {
    actions.includes('edit') && actionBtns.push({
      text: '编辑',
      btnKey: 'edit',
      click: typeof this.skipToEdit === 'function' ? this.skipToEdit : () => {}
    })
    actions.includes('delete') && actionBtns.push({
      text: '删除',
      type: 'confirm',
      btnKey: 'delete',
      loadingKey: 'deleteing',
      confirmMsg: '确定要删除这条记录吗?',
      btype: 'info',
      click: typeof this.deleteRecord === 'function' ? this.deleteRecord : () => {}
    })
  }
  return actionBtns
}

// 跳转路由
export function getCommonDetailRoute (name) {
  return function (row, scope, curBtn) {
    return { name, query: { id: row.id, type: curBtn.btnKey } }
  }
}
export function getCommonOptions ({ detailName }) {
  const commonOptions = {
    actionBtns: handleBtns
  }
  detailName && (commonOptions.getDetailRoute = getCommonDetailRoute(detailName))
  return cloneDeep(commonOptions)
}

// 获取修改状态所需参数
export function getStatusSetParam (idKey) {
  return row => ({[idKey]: row.id, status: row.status})
}

export function formTimeSwtich (time, keys = ['begin', 'end']) {
  let result = {}
  if (Array.isArray(keys) && keys.length === 2) {
    time && time[0] && (result[keys[0]] = Math.round((+time[0]) / 1000))
    time && time[1] && (result[keys[1]] = Math.round((+time[1]) / 1000))
  }
  return result
}
export function handleFormData (formData, keys) { // 时间
  const {time} = formData
  const searchTimes = formTimeSwtich(time, keys)
  delete formData.time
  return Object.assign(cloneDeep(formData), searchTimes)
}