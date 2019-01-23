<template>
  <div class="staff-mana-list-page" :class="$route.name | hyphenate">
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
