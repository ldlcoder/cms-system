import ActionBtn from './components/ActionBtn'
const resultWords = { 'success': '查询成功', 'failed': '查询失败', 'server_close': '服务已关闭' }
export function getTableColumns () {
  return [
    {
      label: '类型',
      prop: 'type'
    },
    {
      label: '姓名',
      prop: 'name'
    },
    {
      label: '查询结果',
      prop: 'result',
      formatter: (row, column, cellValue) => ((row.is_query || row.result === 'server_close') ? resultWords[cellValue] : '')
    },
    {
      label: '操作',
      slotScope: ActionBtn,
      viewReport: this.viewReport,
      reFetch: this.reFetch
    }
  ]
}
