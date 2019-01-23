<template>
  <div  class="lcomp-sub-menu">
    <el-checkbox 
      v-if="checkBox"
      :indeterminate="isIndeterminate" 
      v-model="checkAll" 
      @change="handleCheckAllChange"
    >
      <span class="title">{{data.label}}</span>
    </el-checkbox>
    <span v-else class="title">{{data.label}}</span>
    <el-checkbox-group @change="handleChange" v-model="checkedValues">
      <ul>
        <li
          v-for="(val, idx) in data.children"
          :key="idx"
          :index="val.id + ''"
          @click="handleMenuItemChange(val.id, val, data.type, data.key, index, idx)"
          :class="{'is-active': val.id == activeId}"
        >
          <el-checkbox :label="val.id" :key="val.id" v-if="checkBox">
            <i v-if="val.icon" class="icon-font" :class="val.icon"></i>
            <span class="label-text">{{val.label}}({{val.num}}{{data.unit}})</span>
          </el-checkbox>
          <span v-else>
            <i v-if="val.icon" class="icon-font" :class="val.icon"></i>
            <span class="label-text">{{val.label}}({{val.num}}{{data.unit}})</span>
          </span>
        </li>
      </ul>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'SubMenu',
  model: {
    prop: 'values',
    event: 'change'
  },
  props: {
    data: Object,
    checkBox: Boolean,
    values: {
      type: Array,
      default: () => ([])
    },
    isCheckAll: Boolean,
    activeId: Number,
    index: Number
  },
  data () {
    return {
     checkAll: true,
     checkedValues: this.isCheckAll ? this.getAllItemId(this.data) : this.values,
     isIndeterminate: false
    }
  },
  computed: {
    allItemIds () {
      return this.getAllItemId(this.data)
    }
  },
  created() {
    this.$emit('change', this.checkedValues)
  },
  methods: {
    // utils
    // bussiness
    getAllItemId (data) {
      let arr = data && Array.isArray(data.children) ? data.children.map(item => (item.id)) : []
      return  arr
    },
    // events
    handleChange (data) {
      this.$emit('change', data)
      const {allItemIds} = this
      let checkedCount = data.length
      this.checkAll = checkedCount === allItemIds.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < allItemIds.length
    },
		handleCheckAllChange(checked) {
      this.checkedValues = checked ? this.allItemIds.slice(0) : []
      this.$emit('change', this.checkedValues)
      this.isIndeterminate = false
    },
    handleMenuItemChange (id, item, type, key, index, subIndex) {
      !this.checkBox && this.$emit('item-change', id, item, type, key, index, subIndex)
    }
   
  }
}
</script>
<style lang="scss" scoped >
  .lcomp-sub-menu{
    span{
      font-size: 14px;
    }
    .title{
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      font-weight: bold;
    }
    ul{
      padding-left: 0px; 
    }
    li{
      height: 30px;
      line-height: 30px;
      color: #303133;
      cursor: pointer;
      position: relative;
      font-weight: 500;
      margin-top: 2px;
      &:hover{
        background-color: #ecf5ff;
      }
      &.is-active{
        background-color: #ecf5ff;
        color: #409EFF;
      }
      .icon-font{
        color: #CE2A20;
        position: absolute;
        font-size: 14px;
      }
      .label-text{
        margin-left: 18px;
      }
      /deep/ .el-checkbox__label{
        font-weight: 500;
      }
    }
  }
</style>

