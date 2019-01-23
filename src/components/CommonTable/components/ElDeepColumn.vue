<template>
  <el-table-column v-bind="newColumn" v-if="newColumn.slotScope">
    <template v-if="Array.isArray(column.children) && column.children.length">
      <el-deep-column v-for="(item, index) in column.children" :column="item" :key="index"></el-deep-column>
    </template>
    <template slot-scope="scope">
      <component :is="newColumn.slotScope" :column="newColumn" :scope="scope"></component>
    </template>
  </el-table-column>
  <el-table-column v-bind="newColumn" v-else>
    <template v-if="Array.isArray(column.children) && column.children.length">
      <el-deep-column v-for="(item, index) in column.children" :column="item" :key="index"></el-deep-column>
    </template>
  </el-table-column>
</template>

<script>
import ElActionBtns from './ElActionBtns'
import {cloneDeep} from 'lodash'
const colDefault = {
  align: 'center'
}

export default {
  name: 'ElDeepColumn',
  props: {
    column: Object,
    slotsNode: Object,
    emptyCell: Function
  },
  components: {
  },
  computed: {
    newColumn () {
      let column = this.column
      if (!column.slotScope && column.prop) {
        column = cloneDeep(this.column)
        const {formatter} = column
        column.formatter = (row, column, cellValue, index) => {
          const result = formatter ? formatter(row, column, cellValue, index) : cellValue
          return this.emptyCell ? this.emptyCell(result) : result
        }
      }
      return Object.assign({}, colDefault, this.handledColumn, column)
    },
    handledColumn () {
      let result = {}
      let { column } = this
      column.isSortable && Object.assign(result, {sortable: 'custom'})
      column.action && Object.assign(result, {slotScope: ElActionBtns})
      return result
    },
    getColumnSlot () {
      const {column: {slot}, slotsNode} = this
      return slot && slotsNode[slot]
    }
  },
  methods: {
    // event handle
  }
}
</script>
