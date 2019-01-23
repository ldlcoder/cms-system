<template>
  <el-button v-if="row.is_query && row.result === 'success'" v-bind="btnProps" @click="column.viewReport(scope.row)" >查看详情</el-button>
  <el-button v-else-if="canRefetch" v-bind="btnProps" :loading="scope.row.refetching" @click="column.reFetch(scope.row)" >点击查询</el-button>
  <span v-else>--</span>
</template>
<script>
export default {
  name: 'CreditInformation',
  props: {
    scope: Object,
    column: Object
  },
  computed: {
    btnProps () {
      return {
        type: 'text'
      }
    },
    row () {
      return (this.scope && this.scope.row) || {}
    },
    canRefetch () {
      return (!this.row.is_query && this.row.result !== 'server_close') || (this.row.result === 'failed')
    }
  },
  methods: {
    /** utils **/
    /** business **/
    /** events **/

  }
}
</script>
<style lang="scss" scoped>
.lcomp-credit-info {
  padding: 40px;
  .comp-title {
    margin: 0;
    height: 42px;
    font-size: 20px;
  }
  .item-tb-box {
    margin-bottom: 22px;
    .item-title {
      margin: 0;
      line-height: 1;
      font-size: 18px;
      padding: 0 24px 8px;
      span {
        padding-left: 20px;
        font-size: 16px;
        color: #666;
      }
    }
    /deep/ .fico-score {
      color: $blue;
    }
  }
  /deep/ .el-table__row {
    .pb-un-send {
      color: $themeBlue;
    }
    .pb-pass {
      color: $green;
    }
    .pb-faile {
      color: $red;
    }
  }
}
</style>
