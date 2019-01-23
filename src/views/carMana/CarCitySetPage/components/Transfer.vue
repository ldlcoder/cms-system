<template>
  <div class="transfer">
    <transfer-panel
      class="left-panel"
      :options="handleLeftTreeOptions"
      :title="titles[0]"
      :data="sourceData"
      @check-change="onSourceCheckedChange"
    >
    </transfer-panel>
    <div class="transfer-button">
      <el-button
        type="primary"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <i class="el-icon-arrow-left"></i>
      </el-button>

      <el-button
        type="primary"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      class="right-panel"
      :options="handleRightTreeOptions"
      :title="titles[1]"
      :data="targetData"
      @check-change="onTargetCheckedChange"
    >
    </transfer-panel>
  </div>
</template>
<script>
import TransferPanel from './TransferPanel'
import { cloneDeep } from 'lodash'
export default {
  name: 'Transfer',
  components: {
    TransferPanel
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props:{
    titles: {
      type: Array,
      default: () => (['Source', 'Target'])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    targetData: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Array,
      default: () => ([])
    },
    treeOptions: {
      type: Object,
      default: () => ({})
    }
     
  },
  data() {
    return {
      leftChecked: [],
      rightChecked: []
    }
  },
  created () {
  },
  computed: {
    sourceData () {
      const { data, value } = this
      return data.filter(item => {
        if (!item.children) {
          return value.indexOf(item.value) === -1
        } 
        item.children = item.children.filter(subItem => value.indexOf(subItem.value) === -1)
        return item.children.length
      })
    },
    handleLeftTreeOptions () {
      return Object.assign({ref: 'leftPanel'},this.treeOptions)
    },
    handleRightTreeOptions () {
      return Object.assign({ref: 'rightPanel'},this.treeOptions)
    }
  },
  methods: {
    addToLeft () {
      const { rightChecked } = this
      let valKeys = cloneDeep(this.value).filter(item => rightChecked.indexOf(item) === -1)
      this.$emit('change', valKeys)
      this.rightChecked = []
    },
    addToRight () {
      this.$emit('change', [].concat(this.leftChecked, this.value))
      this.leftChecked = []
    },
    onSourceCheckedChange (checkedKeys) {
      this.leftChecked = checkedKeys
      this.$emit('left-check-change', checkedKeys)
    },
    onTargetCheckedChange (checkedKeys) {
      this.rightChecked = checkedKeys
      this.$emit('right-check-change', checkedKeys)
    }
  }
}
</script>
<style lang="scss" scoped>
.transfer{
  min-width: 800px;
  .transfer-panel{
    display: inline-block;
    vertical-align: middle;
  }
  .transfer-button{
     display: inline-block;
     vertical-align: middle;
     padding:0px 20px;
  }
}
</style>
