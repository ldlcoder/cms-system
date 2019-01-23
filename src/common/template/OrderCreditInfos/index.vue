<template>
  <div class="lcomp-credit-info">
    <common-table
      :columns="columns"
      :data="list"
    >
    </common-table>
    <credit-report v-if="reportId" :id="reportId" @close="reportId = 0" >
    </credit-report>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import { getOrderCreditBrief, queryOrderCreditBrief } from '@/api/common'
import { getTableColumns } from './dataHandle'
import CreditReport from '../CreditReport'
export default {
  name: 'CreditInformation',
  components: {
    CommonTable,
    CreditReport
  },
  props: {
    id: [Number, String]
  },
  data () {
    return {
      columns: getTableColumns.call(this),
      list: [],
      config: [],
      loading: false,
      reportId: 0
    }
  },
  computed: {
    baseParams () {
      return this.id ? { id: this.id } : {}
    },
    handleConfig () {
      return this.config.filter(item => {
        return !this.exclude.includes(item.key) && this.data && this.data.hasOwnProperty([item.key])
      })
    },
    modeConfig () {
      return this.cusModeConfig || this.modeConfigs[this.mode] || {}
    }
  },
  created () {
    this.getCreditBrief()
  },
  watch: {
    id () {
      this.getCreditBrief()
    }
  },
  methods: {
    /** utils **/
    // 处理模块组件参数将绑定事件函数上下文修改为本组件
   
    /** business **/
    getCreditBrief () {
      this.$fetch(getOrderCreditBrief, this.baseParams).done(data => {
        this.list = Array.isArray(data) ? data.map(item => (Object.assign(item, { refetching: false }))) : []
      })
    },
    /** events **/
    viewReport (row) {
      this.reportId = row.id
    },
    reFetch (row) {
      if (row.id) {
        row.refetching = true
        this.$fetch(queryOrderCreditBrief, { id: row.id }).done(data => {
          data && Object.assign(row, data)
          row.refetching = false
        }).faile(()=> { row.refetching = false })
      } else {
        this.$message({ type: 'error', message: '无有效id' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-credit-info {
  .comp-title {
    margin: 0;
    height: 42px;
    font-size: 20px;
  }
  .item-tb-box {
    margin-bottom: 22px;
    .item-title {
      margin: 0;
      line-height: 1;
      font-size: 18px;
      padding: 0 24px 8px;
      span {
        padding-left: 20px;
        font-size: 16px;
        color: #666;
      }
    }
    /deep/ .fico-score {
      color: $blue;
    }
  }
  /deep/ .el-table__row {
    .pb-un-send {
      color: $themeBlue;
    }
    .pb-pass {
      color: $green;
    }
    .pb-faile {
      color: $red;
    }
  }
}
</style>
