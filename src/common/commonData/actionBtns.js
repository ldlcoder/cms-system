export function viewBtn (props) {
  return Object.assign({
    text: '查看',
    btnKey: 'view',
    click: 'skipToDetail'
  }, props || {})
}
export function editSkipBtn (props) {
  return Object.assign({
    text: '编辑',
    btnKey: 'edit',
    click: 'skipToDetail'
  }, props || {})
}
export function editFuncBtn (props) {
  return Object.assign({
    text: '编辑',
    btnKey: 'edit'
  }, props || {})
}

export function statusBtn (statusKey = 'status', props) {
  return Object.assign({
    text: row => (row[statusKey] === 0 ? '启用' : '禁用'),
    type: 'confirm',
    btnKey: 'disabled',
    confirmMsg: row => {
      const isAccess = row[statusKey] === 1
      const keyWord = isAccess ? '禁用' : '启用'
      return `${keyWord}后，该层级及其下属层级的所有账号将${isAccess ? '不可使用' : '恢复使用'}，确定${keyWord}吗?`
    },
    loadingKey: 'statusSetting',
    btype: row => (row[statusKey] === 1 ? 'info' : 'success'),
    click: 'disabledRecord'
  }, props || {})
}
export function deleteBtn (deleteHandler, props) {
  return Object.assign({
    text: '删除',
    type: 'confirm',
    btnKey: 'delete',
    loadingKey: 'deleteing',
    confirmMsg: '确定要删除这条记录吗?',
    btype: 'info',
    click: typeof deleteHandler === 'function' ? deleteHandler : () => {}
  }, props || {})
}
