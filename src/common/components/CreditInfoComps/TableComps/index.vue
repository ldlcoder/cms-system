<template>
  <common-table
    v-if="moduleConfig.columns"
    class="lcomp-credit-table-comps"
    :columns="moduleConfig.columns"
    :data="handleData"
    v-bind="moduleConfig.table"
  >
  </common-table>
</template>
<script>
import CommonTable from '@/components/CommonTable'
import moduleData from './modules'

export default {
  name: 'TableComps',
  components: {
    CommonTable
  },
  props: {
    data: [Array, Object],
    module: String,
    configHandle: Function,
    canRefetch: Boolean
  },
  computed: {
    moduleConfig () {
      const {module, configHandle} = this
      const curModuleData = typeof moduleData[module] === 'function' ? moduleData[module](this.canRefetch) : {}
      curModuleData.columns && configHandle && configHandle(curModuleData.columns, module)
      return curModuleData
    },
    handleData () {
      const {moduleConfig: {dataHandler}, data} = this
      const handleData = (typeof dataHandler === 'function') ? dataHandler(data) : data
      return Array.isArray(handleData) ? handleData : []
    }
  },
  watch: {
  },
  methods: {
    // utils
    // business
    addBtnEvent () {
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-credit-table-comps {
  /deep/ .fico-score {
    color: $blue;
  }
  /deep/ .el-table__row {
    .pb-un-send {
    }
    .pb-pass {
      color: $green;
    }
    .pb-faile {
      color: $red;
    }
    .pb-querying {
      color: $themeBlue;
    }
  }
}
</style>
