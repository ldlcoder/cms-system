import {commonColumns} from './common'
const {type, name} = commonColumns()

const getColumns = (canRefetch) => {
  const columns = [
    name,
    {
      minWidth: '16%',
      label: '评分分数',
      prop: 'score'
    }, {
      minWidth: '60%',
      label: '得分理由',
      prop: 'reason'
    }
  ]
  canRefetch && columns.unshift(type)
  return columns
}

export default function (canRefetch) {
  return {
    columns: getColumns(canRefetch)
  }
}