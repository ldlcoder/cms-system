<template>
  <detail-page-pane class="order-audit-detail" :getInfoFaile="getInfoFaile" >
    <h3>员工详情</h3>
    <modules-info-table
      v-loading="loading"
      :data="orderInfo"
      :config="infoTableConfig"
    >
    </modules-info-table>
  </detail-page-pane>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
</style>
