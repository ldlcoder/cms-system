<template>
  <div class="company-mana-edit-tpl" :class="$route.name | hyphenate">
    <el-form :model="formData" ref="form" v-bind="formProps">
      <el-row>
        <el-col :span="9" v-loading="loading">
          <form-item-fields
            :fieldItems="fieldItems"
            v-model="formData"
          >
          </form-item-fields>
          <el-form-item>
            <form-btns
              :parent-refs="$refs"
              ref-key="form"
              isEdit
              submitConfirm
              :words="{confirmWord: '是否确定保存'}"
              :submit="formSubmit"
              :cancel="returnToList"
            >
            </form-btns>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.company-mana-edit-tpl {
  @include page-module-pane;
  /deep/ .comp-form-item-fields {
    .el-select {
      width: 100%;
    }
  }
}
</style>
