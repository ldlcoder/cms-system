<template>
  <form-item-field
    class="lcomp-fi-prov-city-area"
    :fieldItem="handleField"
    v-model="formData"
  >
  </form-item-field>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.lcomp-fi-prov-city-area {
  /deep/ .el-select {
    width: 100%;
  }
}
</style>