<template>
  <el-table-column v-bind="newColumn" v-if="newColumn.action">
    <recursion-columns 
      v-if="Array.isArray(column.children) && column.children.length" 
      :column="column"
    >
    </recursion-columns>
    <template v-if="newColumn.action" slot-scope="scope">
      <template v-for="item of newColumn.action">
        <route-link v-if="item.type === 'link'" v-bind="item.props" >
          {{item.text}}
        </route-link>
        <el-button v-else style="margin-bottom: 8px;" v-bind="item.props" type="primary" size="mini" @click="item.click && item.click(scope)" >
          {{item.text}}
        </el-button>
      </template>
    </template>
  </el-table-column>
  <el-table-column v-bind="newColumn" v-else>
    <recursion-columns 
      v-if="Array.isArray(column.children) && column.children.length" 
      :column="column"
    >
    </recursion-columns>
  </el-table-column>
</template>

<script>
const colDefault = {
  align: 'center'
}
const RecursionColumns = {
  template: `<el-deep-column v-for="(item, index) in column" :column="item" :key="index"></el-deep-column>`,
  props: {
    column: Object
  }
}
export default {
  name: 'el-deep-column',
  props: {
    column: Object
  },
  components: {
    RecursionColumns
  },
  computed: {
    newColumn () {
      return Object.assign({}, colDefault, this.handledColumn, this.column)
    },
    handledColumn () {
      let result = {},
          { column } = this
      if (column.isSortable) {
        Object.assign(result, {sortable: 'custom'})
      }
      return result
    }
  }
}
</script>
