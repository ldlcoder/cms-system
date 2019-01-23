<template>
  <detail-page-pane class="role-mana-page" two-pane :span="12">
    <div class="roles-list-pane">
      <div class="module-title clearfix"><b>角色列表</b><span class="title-tip">提示：关联账号数不为0的角色无法删除</span><router-link  v-if="canAdd" :to="{ name: 'RoleAdd' }"><el-button v-bind="btnProp" icon="lease-icon-icon-test">新增角色</el-button></router-link></div>
      <ul class="roles-list clearfix" v-loading="loading">
        <template v-if="roleList.length">
          <li v-for="(item, index) in roleList" :class="{ active: curRole.id === item.id }" :key="index">
            <span class="role-name" @click="searchRoleAccList(item)">{{item.name}}【{{item.account_num}}】</span>
            <div class="action-btns">
              <el-button v-if="canEdit" icon="lease-icon-bianji" type="primary" v-bind="btnProp" @click="skipToEdit(item)">设置权限</el-button>
              <el-button v-if="canDelete" icon="lease-icon-bianji" :disabled="item.account_num > 0" type="danger" v-bind="btnProp" :loading="item.isdeling" @click="deleteRole(item, index)">删除角色</el-button>
            </div>
          </li>
        </template>
        <li v-else class="no-data-li">暂无数据</li>
      </ul>

    </div>
    <div class="role-account-list" slot="right">
      <template v-if="curRole.id">
        <div class="module-title"><b>角色: {{curRole.name}}</b></div>
        <list-table
          class="account-list-tb"
          :columns="columns"
          :data="accountData"
          :getDataList="getRoleAccountList"
          :loading="accLoading"
        >
        </list-table>
      </template>
      <el-alert
        v-else
        class="tips"
        title="点击角色名称可查看该角色下所有账号"
        type="info">
      </el-alert>
    </div>
  </detail-page-pane>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.role-mana-page {
  .roles-list-pane {

  }
  .module-title {
    padding-bottom: 10px;
    font-size: 15px;
    line-height: 32px;
    border-bottom: 2px solid $borderColor;
    .el-button {
      float: right;
    }
  }
  .title-tip {
    padding-left: 30px;
    font-size: 12px;
    color: $red;
  }
  .roles-list {
    li {
      width: 100%;
      padding: 8px 0 8px 10px;
      float: left;
      font-size: 14px;
      line-height: 32px;
      border-bottom: 1px solid $borderColor;
    }
    .no-data-li {
      text-align: center;
      color: #999999;
    }
    .active {
      background-color: $themeColor;
    }
    .role-name {
      float: left;
      height: 100%;
      cursor: pointer;
    }
  }
  .action-btns {
    float: right;
  }
  .account-list-tb {
    margin-top: 20px;
  }
}
</style>
