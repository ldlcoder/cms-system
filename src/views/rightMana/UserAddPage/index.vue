<template>
  <div class="user-add-page">
    <el-form class="add-form" ref="addForm" :model="formData" v-bind="formProps">
          <form-item-fields
            class="form-item-fields"
            ref="fields"
            :fieldItems="fieldItems"
            v-model="formData"
          >
            <el-form-item>
              <form-btns
                is-edit
                submit-confirm
                :parent-refs="$refs"
                ref-key="addForm"
                :cancel="loanEditCancel"
                :submit="loanFormSubmit"
                :sending="sending"
              >
              </form-btns>
            </el-form-item>
          </form-item-fields>
    </el-form>
  </div>
</template>

<script src="./vindex"></script>
<style lang="scss" scoped>
.user-add-page{
@include page-module-pane;
  .form-item-fields {
    width: 500px;
  }
  /deep/ .sub-item-panel{
    .el-form-item{
      margin-bottom: 0px;
    }
  }
}
</style>