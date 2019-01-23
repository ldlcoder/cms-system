<template>
  <div class="order-list-tpl" :class="$route.name | hyphenate">
    <router-link v-if="createLinkInfo.name" :to="{name: createLinkInfo.name}">
      <el-button icon="lr-icon-tianjia" type="primary" size="mini"> {{createLinkInfo.text}}</el-button>
    </router-link>
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
      :key="$route.name"
    >
    </list-page-tpl>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped></style>
