<template>
  <div class="car-mana-list-page" :class="$route.name | hyphenate">
    <div class="car_license_location">
      <router-link to="/cars/cityset" v-if="RouteRights.includes('citySet')">
        <el-button type="primary" size="mini">上牌地管理</el-button>
      </router-link>
    </div>
    <list-page-tpl
      tabFormKey="type"
      :exportUrl="exportUrl"
      :data="data"
      :table="tableProps"
      :loading="loading"
      :columns="handledColumns"
      :operation="operation"
      :createdAutoSend="true"
      :searchForms="searchForms"
      :getDataList="getOrderList"
      :handleFormData="handleFormData"
      :extraForm="RSD.extraForm"
      :searchParams.sync="searchParams"
      :currentTab.sync="currentTab"
      :remember="$store.getters.remember"
      :listTableProps="RMD.listTableProps"
      :selectionKeys.sync="selectionKeys"
      :key="$route.name"
    >
    </list-page-tpl>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.car-mana-list-page{
  position: relative;
  .car_license_location{
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 2;
    overflow: hidden;
    /deep/ .el-button{
      float: right;
    }
  }
}
</style>
