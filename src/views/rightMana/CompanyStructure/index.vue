<template>
  <detail-page-pane class="role-mana-page" two-pane :span="12">
    <div class="roles-list-pane">
      <div class="module-title clearfix">
        <b>分公司列表</b>
        <el-button v-if="canAddComp" v-bind="btnProp" icon="lease-icon-icon-test" @click="editSubCompany()">新增分公司</el-button>
      </div>
      <list-table
        class="account-list-tb"
        :columns="subCompanyColumns"
        :data="subCompanyData"
        :getDataList="getSubCompanyList"
        :loading="subCompLoading"
        :table="tableProps"
        :refresh.sync="refreshs.subCompany"
        :tableEvents="{ 'current-change': subCompChoose }"
      >
      </list-table>
    </div>
    <div class="role-account-list" slot="right">
      <template v-if="curSubCompany.id">
        <div class="module-title">
          <b>分公司: {{curSubCompany.name}}</b>
          <el-button  v-if="canAddTeam" v-bind="btnProp" icon="lease-icon-icon-test" @click="editTeam()">新增团队</el-button>
        </div>
        <list-table
          class="account-list-tb"
          :columns="teamColumns"
          :data="teamData"
          :getDataList="getTeamList"
          :loading="teamLoading"
          :refresh.sync="refreshs.team"
          :table="tableProps"
        >
        </list-table>
      </template>
      <el-alert
        v-else
        class="tips"
        title="点击分公司记录可查看该角色下所有团队"
        type="info">
      </el-alert>
    </div>
    <common-edit-form
      v-if="editFormCfg.show"
      :type="editFormCfg.type"
      :data="editFormCfg.data"
      @close="editFormClose"
      @submit-success="editFormCfg.submitSuccess"
    >
    </common-edit-form>
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
  .roles-list {
    li {
      width: 100%;
      padding: 8px 0 8px 10px;
      float: left;
      font-size: 14px;
      line-height: 32px;
      border-bottom: 1px solid $borderColor;
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
