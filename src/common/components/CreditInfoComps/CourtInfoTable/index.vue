<template>
  <div class="lcomp-court-info">
    <table class="lr-common-tb native-tb executed-tb">
      <thead>
        <tr>
          <th class="tb-header-cell" colspan="7" >身份证命中失信被执行人</th>
        </tr>
        <tr class="text-left">
          <th class="tb-header-cell" width="6%">序号</th>
          <th class="tb-header-cell">姓名</th>
          <th class="tb-header-cell">执行案号</th>
          <th class="tb-header-cell">执行法院</th>
          <th class="tb-header-cell">立案日期</th>
          <th class="tb-header-cell">发布日期</th>
          <th class="tb-header-cell" width="8%">操作</th>
        </tr>
      </thead>
      <tbody class="text-left" v-if="executedData.length">
          <template v-for="(item, index) in executedData">
            <tr>
              <td :rowspan="item.expand ? 6 : 1">{{index + 1}}</td>
              <td>{{item.bad_name|emptyCell}}</td>
              <td>{{item.bad_casenum|emptyCell}}</td>
              <td>{{item.bad_court|emptyCell}}</td>
              <td>{{item.bad_time | parseTime('{y}-{m}-{d}') | emptyCell}}</td>
              <td>{{item.bad_posttime | parseTime('{y}-{m}-{d}') | emptyCell}}</td>
              <td :rowspan="item.expand ? 6 : 1">
                <a class="expand-btn" @click="executedExpand(item)">{{item.expand ? '收起' : '展开'}}<i :class="item.expand ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i></a>
              </td>
            </tr>
            <template v-if="item.expand">
              <tr>
                <th class="tb-header-cell">执行文号依据</th>
                <th class="tb-header-cell">做出执行依据单位</th>
                <th class="tb-header-cell">被执行人履行情况</th>
                <th class="tb-header-cell">已履行</th>
                <th class="tb-header-cell">未履行</th>
              </tr>
              <tr>
                <td>{{item.bad_base|emptyCell}}</td>
                <td>{{item.bad_basecompany|emptyCell}}</td>
                <td>{{item.bad_performance|emptyCell}}</td>
                <td>{{item.bad_performedpart|emptyCell}}</td>
                <td>{{item.bad_unperformpart|emptyCell}}</td>
              </tr>
              <tr>
                <th class="tb-header-cell">生效法律文书确定的义务</th>
                <td colspan="4">{{item.bad_obligation|emptyCell}}</td>
              </tr>
              <tr>
                <th class="tb-header-cell">生效法律文书确定的最后履行义务截止时间</th>
                <td colspan="4">{{item.bad_lasttime | parseTime('{y}-{m}-{d}') | emptyCell}}</td>
              </tr>
              <tr>
                <th class="tb-header-cell">失信被执行人行为具体情形</th>
                <td colspan="4">{{item.bad_concretesituation | emptyCell}}</td>
              </tr>
            </template>
          </template>
      </tbody>
      <tbody v-else class="text-center">
        <tr><td colspan="7" style="color: #909399">暂无数据</td></tr>
      </tbody>
    </table>
    <common-table
      class="executeing-tb"
      :columns="columns"
      :data="executingData"
    >
    </common-table>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import { emptyCell, parseTime, wordMoney, cloneJsonObj} from '@/utils'
const columns = [
  {
    label: '身份证命中被执行人',
    children: [
      {
        label: '序号',
        type: 'index',
        minWidth: '6%'
      }, {
        label: '姓名',
        prop: 'ex_name'
      }, {
        label: '执行案号',
        prop: 'ex_casenum'
      }, {
        label: '执行法院',
        prop: 'ex_court'
      }, {
        label: '立案日期',
        prop: 'ex_time',
        formatter: (row, column, cellValue) => (parseTime(cellValue, '{y}-{m}-{d}'))
      }, {
        label: '执行标的',
        prop: 'ex_money',
        formatter: (row, column, cellValue) => (wordMoney(cellValue))
      }, {
        label: '案件状态',
        prop: 'ex_statute'
      }
    ]
  }
]

export default {
  name: 'CourtInfoTable',
  components: {
    CommonTable
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      badArr: [],
      columns
    }
  },
  filters: {
    emptyCell,
    parseTime
  },
  computed: {
    executedData () {
      const {bad} = this.data
      if (!Array.isArray(bad)) return []
      this.badArr = bad.map(item => {
        let newItem = cloneJsonObj(item)
        newItem.expand = false
        return newItem
      })
      return this.badArr
    },
    executingData () {
      const {excute} = this.data
      return Array.isArray(excute) ? excute : []
    }
  },
  watch: {
  },
  methods: {
    // utils
    // business
    // events
    executedExpand (item) {
      item.expand = !item.expand
    }
  }

}
</script>
<style lang="scss" scoped>
.lcomp-court-info {
  .lr-common-tb.executed-tb {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    margin-bottom: 22px;
    th, td {
      border: 1px solid #ebeef5;
      min-height: 43px;
    }
    .text-left {
      text-align: left;
      text-indent: 10px;
    }
    .expand-btn {
      color: $themeBlue;
    }
  }
  .executeing-tb {
    /deep/ .tb-header-cell {
      padding: 9px 0;
    }
  }
}
</style>
