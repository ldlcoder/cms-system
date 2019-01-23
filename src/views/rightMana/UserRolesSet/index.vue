<template>
  <div class="user-roles-set-page">
    <h4 class="page-title">用户角色管理</h4>
    <el-form :model="formData" ref="form" v-bind="formProps">
      <el-row>
        <el-col :span="20" v-loading="loading">
          <el-form-item label="用户名称">{{userInfo.name}}</el-form-item>
          <form-item-field
            class="role-checkbox"
            :fieldItem="fieldItem"
            v-model="formData.roles"
          >
          </form-item-field>
          <el-form-item>
            <form-btns
              :parent-refs="$refs"
              ref-key="form"
              isEdit
              submitConfirm
              :words="{confirmWord: '确定修改用户角色?'}"
              :submit="formDataSend"
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
.user-roles-set-page {
  @include page-module-pane;
  .page-title {
    margin-top: 0;
  }
  /deep/ .role-checkbox {
    .el-checkbox {
      margin-left: 0;
      margin-right: 30px;
    }
  }
}
</style>
