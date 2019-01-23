<template>
  <div class="role-rights-set-page">
    <h4 class="page-title">{{isEdit ? '设置角色权限' : '添加角色'}}</h4>
    <el-form :model="formData" ref="form" v-bind="formProps">
      <el-row>
        <el-col :span="23" v-loading="loading">
          <form-item-field
            class="role-name-item"
            :fieldItem="roleNameField"
            v-model="formData.name"
          >
          </form-item-field>
          <el-form-item label="web端权限" prop="right_ids" :rules="rightsRule">
            <el-tree
              class="rights-tree"
              ref="rightsTree"
              :props="{label: 'title'}"
              node-key="id"
              show-checkbox
              default-expand-all
              check-strictly
              :data="rightsList"
              :expand-on-click-node="false"
              :default-checked-keys="formData.right_ids"
              @check="rightChange"
            >
            </el-tree>
          </el-form-item>
          <el-form-item>
            <form-btns
              :parent-refs="$refs"
              ref-key="form"
              isEdit
              submitConfirm
              :words="{confirmWord: isEdit ? '确定修改角色权限?' : '确定提交角色信息'}"
              :submit="formDataSubmit"
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
.role-rights-set-page {
  @include page-module-pane;
  .page-title {
    margin-top: 0;
  }
  .role-name-item {
    width: 400px;
  }
  /deep/ .rights-tree {
    margin-top: 8px;
    & > .el-tree-node {
      float: left;
      width: 180px;
      min-height: 200px;
    }
  }
}
</style>
