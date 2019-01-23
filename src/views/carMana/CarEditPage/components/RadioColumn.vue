<template>
  <div class="radio-column">
    <el-radio v-if="column.isEdit" :label="1" :value="scope.row.is_default" @input="column.radioChange(scope)"><span></span></el-radio>
    <el-radio v-else-if="scope.row.is_default" :label="1" :value="1"><span></span></el-radio>
  </div>
</template>

<script>
export default {
  name: 'RadioColumn',
  props: {
    scope: Object,
    column: Object
  }
}
</script>

<style lang="scss" scoped>
.radio-column{
  // /deep/ .el-radio__label{
  //   display: none;
  // }
}
</style>