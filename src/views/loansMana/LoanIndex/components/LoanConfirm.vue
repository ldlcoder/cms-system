<template>
  <el-dialog
    visible
    title="贷款方案信息确认"
    :show-close="false"
    width="50%"
  >
    <info-table
      :config="configs"
      :data="data"
    >
    </info-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('on-cancel')">取 消</el-button>
      <el-button type="primary" :loading="sending" @click="$emit('on-sure')">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import InfoTable from '@/components/InfoTable'
import { percent } from '@/utils'

const percentFilter = value => percent(value, '', true)
const getInfoConfig = (switchFilter) => {
  const defPro = { md: 12, lg: 8 }
  return [
    { label: '贷款方案', key: 'name', props: defPro },
    { label: '贷款期数', key: 'term', props: defPro, filter: value => (value + '期') },
    { label: '首付比例', key: 'downpayment_rate', props: defPro, filter: percentFilter },
    { label: '贷款利率', key: 'loan_rate', props: defPro, filter: value => percentFilter(value / 100) },
    { label: '购置税', key: 'tax', props: defPro, filter: switchFilter('loanTax') },
    { label: '保险', key: 'insurance_interval', props: defPro, filter: switchFilter('loanInsurance') },
    { label: '保养', key: 'after_sales_service', props: defPro, filter: switchFilter('afterSalesService') }
  ]
}

export default {
  name: 'LoansList',
  components: {
    InfoTable
  },
  data () {
    return {
      configs: getInfoConfig(this.$store.getters.switchFilter)
    }
  },
  props: {
    sending: Boolean,
    data: Object
  },
  computed: {
  },
  methods: {
    /** utils **/
    /** business **/
    /** event **/
  }

}

</script>
<style lang="scss" scoped>
.loan-index-page {
  /deep/ .loan-form{
    padding: 30px;
  }
}
</style>
