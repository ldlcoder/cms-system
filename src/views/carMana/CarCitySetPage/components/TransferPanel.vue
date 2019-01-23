<template>
  <div class="transfer-panel">
    <div class="panel-header">{{title}}</div>
    <div class="panel-content">
      <el-tree
        :class="{showCheckbox: handleOptions.isShowCheckbox, noShowCheckBox: !handleOptions.isShowCheckbox}"
        v-bind="handleOptions"
        :data="data"
        @check="checkChange"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
const defOpt = {
  ref: 'tree',
  showCheckbox: true,
  nodeKey: 'value',
  props: {
    children: 'children',
    label: 'label'
  }
}
export default {
  name: 'TransferPanel',
  props: {
    options: Object,
    props: Object,
    title: String,
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      key: 'value'
    }
  },
  created () {
  },
  computed: {
    handleOptions () {
      return Object.assign({}, defOpt, this.options)
    }
  },
  methods: {
    getSelectedKeys () {
      const { ref } = this.handleOptions
      return this.$refs[ref].getCheckedKeys(true)
    },
    checkChange (dataObj, isChecked, children) {
      this.$emit('check-change', this.getSelectedKeys())
    }
  }
}
</script>
<style lang="scss" scoped>
.transfer-panel{
  width:250px;
  .panel-header{
    height: 40px;
    line-height: 40px;
    background: #ccc;
    padding-left: 20px;
  }
  .panel-content{
    height: 600px;
    overflow-y: scroll;
    background-color: $thinBorderColor;
    /deep/ .el-tree{
      background-color: transparent;
      padding-left: 20px;
    }
  }

  .showCheckbox{
    /deep/ .el-checkbox{
      display: inline-block;
    }
  }
  .noShowCheckBox {
     /deep/ .el-checkbox{
      display: none;
    }
  }
}
</style>
