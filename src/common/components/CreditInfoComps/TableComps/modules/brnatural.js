import {commonColumns, dataHandler} from './common'

const {index} = commonColumns()
const getColumns = (canRefetch) => {
  const columns = [
    index,
    {
      minWidth: '40%',
      label: '类型',
      prop: 'type'
    },
    {
      minWidth: '60%',
      label: '信息日期/信息距今间隔区间（年）',
      prop: 'duration'
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