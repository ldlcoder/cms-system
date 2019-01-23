<template>
  <p class="module-info-word">
    <span>{{moduleInfoWord}}</span>
    <el-button v-if="canRefetch" type="text" v-on="$listeners">点击查询</el-button>
  </p>
</template>
<script>
const wordsMap = { 'failed': '查询失败', 'server_close': '服务已关闭' }
export default {
  name: 'ModuleInfoBox',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    canRefetch () {
      return !this.data.is_query || this.data.result === 'failed'
    },
    moduleInfoWord () {
      return (this.data.is_query || this.data.result === 'server_close') ? (wordsMap[this.data.result] || '暂无数据') : '--'
    }
  }
}
</script>
<style lang="scss" scoped>
.module-info-word {
  text-align: center;
  line-height: 40px;
  border: 1px solid $borderColor;
  .el-button {
    margin: 0 10px;
  }
}
</style>
