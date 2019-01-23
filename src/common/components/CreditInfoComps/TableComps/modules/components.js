export const ReportBtn = {
  name: 'ReportBtn',
  props: ['column', 'scope'],
  template: `
    <div>
      <template v-if="scope.row.pbank && typeof scope.row.pbank.pb_pass !== 'undefined'">
        <el-button v-if="scope.row.pbank.pb_report_list && scope.row.pbank.pb_report_list.length" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
        <template v-else>无征信报告</template>
      </template>
      <template v-else>-</template>
    </div>
  `
}
//  百融
export const CourtInfoBtn = {
  name: 'CourtInfoBtn',
  props: ['column', 'scope'],
  template: `
    <div>
      <el-button v-if="scope.row.need_query || scope.row.error" type="text" @click="column.reFetch('bank100', scope.row, scope)" :loading="scope.row.BTNSending">{{scope.row.BTNSending ? '查询中...' : '点击查询'}}</el-button>
      <el-button v-else-if="scope.row.hasInfo" type="primary" size="mini" @click="column.click && column.click(scope.row)" >查看</el-button>
      <template v-else>-</template>
    </div>
  `
}

const resultInfo = {
  unSend: {
    class: 'pb-un-send',
    icon: 'el-icon-remove-outline',
    text: '未征信'
  },
  pass: {
    class: 'pb-pass',
    icon: 'el-icon-circle-check-outline',
    text: '通过'
  },
  faile: {
    class: 'pb-faile',
    icon: 'el-icon-circle-close-outline',
    text: '不通过'
  }
}
export const PbankResult = {
  name: 'PbankResult',
  props: ['column', 'scope'],
  computed: {
    result () {
      const {pbank} = this.scope.row
      if (!pbank || typeof pbank.pb_pass === 'undefined') {
        return 'unSend'
      }
      return pbank.pb_pass ? 'pass' : 'faile'
    },
    resultInfo () {
      return resultInfo[this.result]
    }
  },
  template: `<span :class="resultInfo.class"><i :class="resultInfo.icon"></i>{{resultInfo.text}}</span>`
}

const netDurTip = {
  '3': '0-3个月',
  '6': '3-6个月',
  '12': '6-12个月',
  '24': '12-24个月',
  '36': '24-36个月',
  '99': '大于36个月',
  '-1': '查询无记录'
}
export const DurationInfo = {
  name: 'netDurTip',
  props: ['column', 'scope'],
  computed: {
    durationWord () {
      const {state} = this.scope.row
      return netDurTip[state]
    }
  },
  template: `
    <div>
      <template v-if="scope.row.need_query || scope.row.error">{{scope.row.error ? '查询失败，无数据' : ''}}<el-button  type="text" @click="column.reFetch('verify', scope.row, scope)" :loading="scope.row.BTNSending">{{scope.row.BTNSending ? '查询中...' : '点击查询'}}</el-button></template>
      <template v-else>{{durationWord|emptyCell}}</template>
    </div>
  `
}
