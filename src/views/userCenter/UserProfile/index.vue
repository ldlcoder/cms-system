<template>
  <detail-page-pane class="user-profile-page" :getInfoFaile="getInfoFaile" :span="24" >
    <h3>个人中心</h3>
    <modules-info-table
      class="info-table-pane"
      v-loading="loading"
      :data="userInfo"
      :config="infoTableConfig"
    >
    </modules-info-table>
    <el-row :gutter="40">
      <el-col v-for="(item, index) in listTableConfig" :span="12" :key="index">
        <module-pane
          :title="item.title"
        >
          <component :is="item.component" v-loading="loading" v-bind="item.props(item.key ? userInfo[item.key] : userInfo, userInfo)"></component>
        </module-pane>
      </el-col>
    </el-row>
  </detail-page-pane>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.user-profile-page {
  .info-table-pane {
    width: 80%;
  }
}
</style>
