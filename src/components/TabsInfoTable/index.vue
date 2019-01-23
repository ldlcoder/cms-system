<template>
  <div class="lcomp-tabs-info-table">
    <el-tabs v-if="data && data.length">
      <el-tab-pane
        v-for="(item, index) in data"
        :label="createTabLabel(item, index)"
        :closable ="item.closable"
        :key="index"
      >
        <info-table v-bind="handleItemProps(item)"></info-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import InfoTable from '../InfoTable'
export default {
  name: 'TabsInfoTable',
  components: {
    InfoTable
  },
  props: {
    data: Array,
    labelCreater: Function,
    config: Array
  },
  computed: {
  },
  methods: {
    /** utils **/
    /** business **/
    createTabLabel (item, index) {
      const labelCreater = typeof item.labelCreater === 'function' ? item.labelCreater  : this.labelCreater
      return item.label || (labelCreater ? labelCreater(item, index) : null) || ('选项' + index)
    },
    handleItemProps (item) {
      const config = item.config || this.config
      return { config, data: item }
    }
    /** events **/
  }

}
</script>
<style lang="scss" scoped>
.lcomp-tabs-info-table {
}
</style>
