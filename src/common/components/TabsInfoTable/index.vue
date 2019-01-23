<template>
  <div class="lcomp-tabs-info-table">
    <el-tabs v-if="data && data.length">
      <el-tab-pane
        v-for="(item, index) in listData"
        :label="createTabLabel(item, index)"
        :closable ="item.closable"
        :key="index"
      >
        <info-table :is-edit="isEdit" v-bind="handleItemProps(item, index)" :value="item"></info-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import InfoTable from '@/components/InfoTable'
import { cloneDeep } from 'lodash'
export default {
  name: 'TabsInfoTable',
  components: {
    InfoTable
  },
  props: {
    isEdit: Boolean,
    data: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Array,
      default: () => ([])
    },
    labelCreater: Function,
    config: Array
  },
  computed: {
    listData () {
      return this.isEdit ? this.value : this.data
    }
  },
  methods: {
    /** utils **/
    setValue () {

    },
    /** business **/
    createTabLabel (item, index) {
      const labelCreater = typeof item.labelCreater === 'function' ? item.labelCreater : this.labelCreater
      return item.label || (labelCreater ? labelCreater(item, index) : null) || ('选项' + index)
    },
    handleItemProps (item, index) {
      const config = cloneDeep(item.config || this.config)
      Array.isArray(config) && config.forEach(item => {
        item.field && Array.isArray(item.field.propCascade) && item.field.propCascade.push(index)
      })
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
