import {commonColumns, dataHandler} from './common'

const {index} = commonColumns()
const getColumns = (canRefetch) => {
  const columns = [
    index,
    {
      minWidth: '88%',
      label: '风险类型',
      prop: 'type'
    }
  ]
  return columns
}

export default function (canRefetch) {
  return {
    columns: getColumns(canRefetch),
    dataHandler
  }
}