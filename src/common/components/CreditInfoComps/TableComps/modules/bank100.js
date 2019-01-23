import {commonColumns} from './common'

const {type, name} = commonColumns()
const subTypesMap = {court: '法院信息', natural: '自然人识别', special: '特殊名单验证'}
const subResultMap = ['查询成功，无相关信息', '查询成功，有相关信息', '查询失败']

const Bank100ActionBtn = (canRefetch) => {
  const template = canRefetch ? `
  <div>
    <el-button v-if="canRefetch" type="text" @click="column.reFetch('bank100', scope.row, scope)" :loading="scope.row.BTNSending">{{scope.row.BTNSending ? '查询中...' : '点击查询'}}</el-button>
    <el-button v-else-if="pass" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
    <template v-else>-</template>
  </div>`
    : `<div>
    <el-button v-if="pass" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
    <template v-else>-</template>
  </div>`
  return {
    name: 'NoRefetchBtn',
    props: ['column', 'scope'],
    computed: {
      row () {
        return this.scope.row
      },
      canRefetch () {
        return this.row.error || !this.row.has_query
      },
      pass () {
        const {sub_types: subTypes} = this.scope.row
        return Object.values(subTypes).some(item => (item === 1))
      }
    },
    template
  }
}

const getColumns = (canRefetch) => {
  const columns = [
    name,
    {
      minWidth: '18%',
      label: '数据类型',
      prop: 'subType',
      formatter: (row, column, cellValue) => {
        return subTypesMap[cellValue]
      }
    }, {
      minWidth: '42%',
      label: '查询结果',
      prop: 'subResult',
      formatter: (row, column, cellValue) => {
        return row.has_query ? subResultMap[cellValue] : ''
      }
    }, {
      minWidth: '16%',
      label: '操作',
      prop: 'ACTIONS',
      slotScope: Bank100ActionBtn(canRefetch)
    }
  ]
  canRefetch && columns.unshift(type)
  return columns
}
const dataHandler = (data) => {
  let result = []
  if (Array.isArray(data) && data.length) {
    data.forEach(item => {
      const {sub_types: subTypes} = item
      for (let i in subTypes) {
        result.push({subType: i, subResult: subTypes[i], ...item})
      }
    })
  }
  return result
}
const spanColumnKeys = ['member_type', 'name', 'ACTIONS']
const table = {
  spanMethod ({row, column, rowIndex, columnIndex}) {
    const {property} = column
    if (spanColumnKeys.includes(property)) {
      return (rowIndex % 3 === 0) ? [3, 1] : [0, 0]
    }
  }
}

export default function (canRefetch) {
  return {
    columns: getColumns(canRefetch),
    dataHandler,
    table
  }
}
