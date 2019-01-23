<template>
  <common-table
    v-bind="tableProps"
    :columns="columns"
    :data="dataList"
  >
  </common-table>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import { getLoanListConfigs } from '@/common'

export default {
  components: {
    CommonTable
  },
  props: {
    getInfoFaile: Boolean,
    data: Array,
    span: {
      type: Number,
      default: 20
    }
  },
  data () {
    const { columns, spanMethod, dataHandler } = getLoanListConfigs()
    return {
      columns,
      dataHandler,
      tableProps: { spanMethod }
    }
  },
  computed: {
    dataList () {
      return this.dataHandler(this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-pane {
  @include page-module-pane;
}
</style>
