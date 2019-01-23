<template>
  <common-table
    v-bind="tableProps"
    :columns="handleColumns"
    :data="dataList"
  >
  </common-table>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import { getLoanListConfigs } from '@/common'

export default {
  name: 'LoansList',
  components: {
    CommonTable
  },
  data () {
    return {
      configs: getLoanListConfigs(true)
    }
  },
  props: {
    data: Array,
    editRecord: Function,
    deleteRecord: Function
  },
  computed: {
    tableProps () {
      return Object.assign({}, { spanMethod: this.configs.spanMethod })
    },
    actionBtns () {
      const isEdit = this.RouteRights.includes('edit')
      const isDel = this.RouteRights.includes('delete')
      return {
        label: '操作',
        action: (isEdit ? [
          {
            text: '编辑',
            btnKey: 'edit',
            btype: 'primary',
            click: this.editRecord
          }
        ] : []).concat(isDel ? [
          {
            text: '删除',
            btype: 'danger',
            type: 'confirm',
            loadingKey: 'deleteBtn',
            confirmMsg: '删除后不可恢复，确定删除此方案?',
            btnKey: 'delete',
            click: this.deleteRecord
          }
        ] : [])
      }
    },
    handleColumns () {
      const { configs: { columns }, actionBtns } = this
      return columns.concat(actionBtns)
    },
    dataList () {
      const { dataHandler } = this.configs
      return dataHandler(this.data)
    }
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
