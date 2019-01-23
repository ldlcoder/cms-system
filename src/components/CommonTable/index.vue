<template>
  <div class="comp-common-table">
    <el-table
      class="lr-common-tb"
      ref="table"
      v-bind="filterProp"
      v-on="$listeners"
      :data="data"
      :key="$route.name"
    >
      <el-deep-column
        v-for="(column, index) of handleColumns"
        :column="column"
        :emptyCell="emptyCellHandler"
        :key="index + Math.random()"
      >
      </el-deep-column>
    </el-table>
  </div>
</template>

<script>
import ElDeepColumn from './components/ElDeepColumn'
import { emptyCell } from '@/utils'
const tbPropsDefault = {
  border: true,
  stripe: true,
  headerCellClassName: 'tb-header-cell',
  highlightCurrentRow: false
}
export default {
  name: 'CommonTable',
  components: {
    ElDeepColumn
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => ([])
    },
    emptyCellHandler: {
      type: Function,
      default: emptyCell
    }
  },
  mounted () {
  },
  computed: {
    handleColumns () {
      return this.columns.filter(item => (!item.hide))
    },
    filterProp () {
      return Object.assign({}, tbPropsDefault, this.$attrs)
    }
  },
  methods: {
    // utils
    // bussiness
    // events
  }
}
</script>
<style lang="scss" scoped >
.comp-common-table {
  /deep/ .action-btn {
    margin: 4px 4px;
  }
}
</style>
