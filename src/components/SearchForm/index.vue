<template>
  <div class="comp-search-form">
    <el-form :inline="true" :model="formData" v-bind="formProp" @submit.native.prevent>
      <div v-if="items && items.length" class="base-form-panel">
        <form-item-fields
          :fieldItems="handleItems"
          v-model="formData"
        >
          <el-form-item class="comp-form-item-field" style="width: 110px">
            <el-button type="primary" @click="onSearch" :loading="sending" style="width: 100px" plain>{{btnText ||
              '查询'}}
            </el-button>
          </el-form-item>
        </form-item-fields>
      </div>
      <slot></slot>
    </el-form>
  </div>
</template>

<script src="./vindex.js"></script>
<style lang="scss" scoped>
.comp-search-form {
  .base-form-panel {
    padding: 16px 0;
    background-color: #fff;
    border-radius: 4px;
  }
  /deep/ .comp-form-item-fields {
    .field-item {
      width: 100%;
    }
    .comp-form-item-field {
      margin: 9px 0 9px 40px;
      label {
        font-weight: normal;
      }
      & > .el-form-item__content {
        width: 220px;
      }
    }
  }
}
</style>
