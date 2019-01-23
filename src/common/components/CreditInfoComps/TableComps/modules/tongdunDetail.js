import TdRulesDetail from '../components/TdRulesDetail'
const getColumns = (hasNum, detailTitle = '规则详情') => ([
  {
    label: '规则名称',
    prop: 'rule'
  },
  ...(hasNum ? [{
    label: '总个数',
    prop: 'sum',
    width: '120px'
  }] : []),
  {
    label: detailTitle,
    slotScope: TdRulesDetail
  }
])
export default function (hasNum, detailTitle) {
  const listKey = hasNum ? 'dt_list' : 'net_list'
  return function () {
    return {
      columns: getColumns(hasNum, detailTitle),
      dataHandler: (data) => (data && Array.isArray(data[listKey]) ? data[listKey] : [])
    }
  }
}