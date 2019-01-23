<template>
  <detail-page-pane class="order-detail" :getInfoFaile="getInfoFaile" >
    <h3>
      客户基本资料
       <el-button type="primary" size="mini" icon="lease-icon-yingxiangziliao" @click="openDialog('customer')" class="media-button">客户影像资料</el-button>
       <electronic-contract-tmp v-if="handleEleContractInfo.length" :data="handleEleContractInfo"></electronic-contract-tmp>
    </h3>
    <el-form ref="form" :model="orderFormData">
      <modules-info-table
        :is-edit="isEdit"
        v-loading="loading"
        :data="handleOrderInfo"
        v-model="orderFormData"
        :config="infoTableConfig"
      >
      </modules-info-table>
      <form-btns
        v-if="isEdit"
        :parentRefs="$refs"
        refKey="form"
        class="form-btns"
        is-edit
        submit-confirm
        :submit="formDataSubmit"
        :cancel="returnToList"
      >
      </form-btns>
    </el-form>
    <el-dialog :title="dialogConfig.title" :visible.sync="dialogConfig.show" width="1000px">
      <media-sets
        v-if="dialogConfig.show && handleMediasData[0].list.length"
        v-model="handleMediasData"
        :FormatData="sideMenuData"
        :authCofg ="authCfg"
        :refresh.sync="refresh"
      >
      </media-sets>
      <p v-else class="error-msg">无有效数据</p>
    </el-dialog>
  </detail-page-pane>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.order-detail {
  .media-button {
    margin-left: 20px;
  }
  .form-btns {
    margin-top: 30px;
  }
}
</style>
