import { checkoutTableColumns } from '@/common'
import { cloneDeep } from 'lodash'
// 获取公用表头
export function getTableColumns (configs) {
  const commonColumns = {
    'name': null,
    'mobile': null,
    'subCompany': null,
    'team': null,
    'etime': null,
    'dataPermission': {
      label: '数据访问权限',
      prop: 'data_permission'
    },
    'roles': null,
    'ctime': null,
    'action': {
      minWidth: '140px'
    }
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
    actions.includes('allotRole') && actionBtns.push({
      text: '分配角色',
      btnKey: 'setRole',
      btype: 'primary',
      click: typeof this.skipToRolesSet === 'function' ? this.skipToRolesSet : () => {}
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
export function getCommonOptions () {
  const commonOptions = {
    actionBtns: handleBtns
  }
  return cloneDeep(commonOptions)
}

// 获取修改状态所需参数
export function getStatusSetParam (idKey) {
  return row => ({[idKey]: row.id, status: row.status})
}
