<template>
  <common-table
    ref="commonTb"
    v-bind="tableProps"
    :columns="handleColumns"
    :data="dataList"
  >
  </common-table>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import { getLoanListConfigs } from '@/common'
import { deleteBtn } from '@/common/commonData/actionBtns'
import { cloneDeep } from 'lodash'
import RadioColumn from './RadioColumn'
export default {
  name: 'LoansTable',
  components: {
    CommonTable,
    RadioColumn
  },
  data () {
    return {
      configs: getLoanListConfigs(),
      selfValue: []
    }
  },
  props: {
    value: Array
  },
  watch: {
    value () {
      this.selfValue = Array.isArray(this.value) ? cloneDeep(this.value) : []
    }
  },
  computed: {
    tableProps () {
      return Object.assign({}, { spanMethod: this.configs.spanMethod })
    },
    handleColumns () {
      const { configs: { columns } } = this
      const selectColumn = [
        {
          label: '序号',
          type: 'index',
          width: '80px'
        }
      ]
      const radioColumn = [
        {
          label: '默认方案',
          isEdit: true,
          radioChange: this.radioChange,
          slotScope: RadioColumn
        }
      ]
      const actionColumn = [
        {
          label: '操作',
          action: [
            deleteBtn(this.deleteRecord)
          ]
        }
      ]
      return radioColumn.concat(selectColumn).concat(columns).concat(actionColumn)
    },
    dataList () {
      const { dataHandler } = this.configs
      return dataHandler(this.selfValue)
    }
  },
  methods: {
    /** utils **/
    /** business **/
    /** event **/
    radioChange (scope) {
      const { $index } = scope
      this.selfValue.forEach((item, index) => {
        item.is_default = index === $index ? 1 : 0
      })
      this.changeHandle()
    },
    deleteRecord (row, scope) {
      this.selfValue.splice(scope.$index, 1)
      this.changeHandle()
    },
    changeHandle () {
      this.$emit('input', this.selfValue)
    }
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
