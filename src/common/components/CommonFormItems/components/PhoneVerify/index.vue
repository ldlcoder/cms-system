<template>
  <form-item-fields
    class="lcomp-fi-phone-verify"
    :fieldItems="handleField"
    v-model="handleValue"
  >
  </form-item-fields>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.lcomp-fi-phone-verify {
  /deep/ .fi-verify-code {
    .el-input {
      width: 80%;
    }
    .fi-verify-btn {
      width: 18%;
      margin-left: 1%;
      display: inline-block;
    }
  }
}
</style>