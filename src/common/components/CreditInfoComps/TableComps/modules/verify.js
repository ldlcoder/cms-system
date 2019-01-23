import {commonColumns} from './common'
const netDurTip = {
  '3': '0-3个月',
  '6': '3-6个月',
  '12': '6-12个月',
  '24': '12-24个月',
  '36': '24-36个月',
  '99': '大于36个月',
  '-1': '查询无记录'
}
const DurationInfo = (canRefetch) => {
  const template = canRefetch ? `
  <div>
    <template v-if="needReFetch">{{row.error ? '查询失败，无数据' : ''}}<el-button  type="text" @click="reFetchClick()" :loading="row.BTNSending">{{row.BTNSending ? '查询中...' : '点击查询'}}</el-button></template>
    <template v-else>{{durationWord|emptyCell}}</template>
  </div>` : `
  <div>
    <template v-if="needReFetch">--</template>
    <template v-else>{{durationWord|emptyCell}}</template>
  </div>`
  return {
    name: 'netDurTip',
    props: ['column', 'scope'],
    computed: {
      row () {
        return this.scope.row
      },
      needReFetch () {
        return !this.row.has_query || this.row.error
      },
      durationWord () {
        const {state} = this.scope.row
        return netDurTip[state]
      }
    },
    template,
    methods: {
      reFetchClick () {
        this.sendBaiduStatis()
        this.column.reFetch('phone_verify', this.row, this.scope)
      },
      sendBaiduStatis () {
        const {name} = this.$route
        const keysMap = {
          'detailinputrequest': '申请录入页面',
          'detailbranch': '分公司初审页面',
          'detailartificialone': '人工一审页面',
          'detailartificialtwo': '人工二审页面',
          'detailsalessupplement': '申请件补件页面'
        }
        keysMap[name] && window._hmt.push(['_trackEvent', `手机实名/在网时长查询-${keysMap[name]}`, '点击', 'lr_web_Allsjsm_click'])
      }
    }
  }
}
const {name, creditId, telphone} = commonColumns()
const getColumns = (canRefetch) => {
  const columns = [
    name,
    creditId,
    telphone,
    {
      minWidth: '18%',
      label: '实名认证结果',
      prop: 'pass',
      formatter: (row, column, cellValue) => (!row.has_query ? '--' : (cellValue ? '一致' : '不一致'))
    }, {
      minWidth: '18%',
      label: '手机在网时长',
      slotScope: DurationInfo(canRefetch)
    }
  ]
  return columns
}

export default function (canRefetch) {
  return {
    columns: getColumns(canRefetch)
  }
}