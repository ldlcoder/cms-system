import {commonColumns} from './common'
const {type, name} = commonColumns()
const subResultMap = ['查询成功，无相关信息', '查询成功，有相关信息']

const TongdunActionBtn = (canRefetch) => {
  const template = canRefetch ? `
  <div>
    <el-button v-if="needReFetch" type="text" @click="column.reFetch('tongdun', scope.row, scope)" :loading="scope.row.BTNSending">{{scope.row.BTNSending ? '查询中...' : '点击查询'}}</el-button>
    <el-button v-else-if="row.result" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
    <template v-else>-</template>
  </div>`
    : `<div>
    <el-button v-if="row.result" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
    <template v-else>-</template>
  </div>`
  return {
    name: 'NoRefetchBtn',
    props: ['column', 'scope'],
    computed: {
      row () {
        return this.scope.row
      },
      needReFetch () {
        return !this.row.has_query || this.row.error
      }
    },
    template
  }
}

const getColumns = (canRefetch) => {
  const columns = [
    name,
    {
      minWidth: '42%',
      label: '查询结果',
      prop: 'has_query',
      formatter: (row, column, cellValue) => (row.has_query ? (row.error ? '查询失败' : subResultMap[row.result]) : '')
    },
    {
      minWidth: '16%',
      label: '操作',
      prop: 'ACTIONS',
      slotScope: TongdunActionBtn(canRefetch)
    }
  ]
  canRefetch && columns.unshift(type)
  return columns
}

const table = {
  spanMethod ({row, column, rowIndex, columnIndex}) {
    if (column.property === 'ACTIONS' && row.rowSpan) {
      return [row.rowSpan, 1]
    }
  }
}

export default function (canRefetch) {
  return {
    columns: getColumns(canRefetch),
    table
  }
}
