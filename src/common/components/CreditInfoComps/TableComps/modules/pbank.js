import {commonColumns} from './common'
const resultInfo = [
  {
    class: 'pb-un-send',
    icon: 'el-icon-remove-outline',
    text: '未征信'
  }, {
    class: 'pb-pass',
    icon: 'el-icon-circle-check-outline',
    text: '通过'
  }, {
    class: 'pb-faile',
    icon: 'el-icon-circle-close-outline',
    text: '不通过'
  }, {
    class: 'pb-querying',
    icon: 'el-icon-time',
    text: '征信中...'
  }
]
const PbankResult = {
  name: 'PbankResult',
  props: ['column', 'scope'],
  computed: {
    resultInfo () {
      const {pass} = this.scope.row
      return resultInfo[pass] || resultInfo[0]
    }
  },
  template: `<span :class="resultInfo.class"><i :class="resultInfo.icon"></i>{{resultInfo.text}}</span>`
}
const ReportBtn = {
  name: 'ReportBtn',
  props: ['column', 'scope'],
  computed: {
    row () {
      return this.scope.row
    },
    canViewReport () {
      return this.row.pass !== 0 && this.row.pass !== 3
    }
  },
  template: `
    <div>
      <template v-if="canViewReport">
        <el-button v-if="row.has_report_image" type="primary" size="mini" @click="column.click && column.click(row)" >查看</el-button>
        <template v-else>无征信报告</template>
      </template>
      <template v-else>-</template>
    </div>
  `
}
const {type, name} = commonColumns()
const getColumns = (canRefetch) => {
  const columns = [
    name,
    {
      minWidth: '16%',
      label: '征信结果',
      prop: 'pass',
      slotScope: PbankResult
    }, {
      minWidth: '44%',
      label: '备注',
      prop: 'remark',
      formatter: (row, column, cellValue) => {
        return cellValue || '-'
      }
    }, {
      minWidth: '16%',
      label: '征信报告',
      prop: 'result',
      slotScope: ReportBtn
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