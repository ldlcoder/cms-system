<template>
  <detail-page-pane class="info-table-detail" :class="$route.name | hyphenate" :getInfoFaile="getInfoFaile" >
    <h3>
      客户基本资料
      <el-button v-if="RMD.showMedias" type="primary" size="mini" icon="lease-icon-yingxiangziliao" @click="isSHowDialog = true" class="media-button">客户影像资料</el-button>
      <electronic-contract-tmp  v-if="RMD.showElectronicContract && handleEleContractInfo.length" :data="handleEleContractInfo" ></electronic-contract-tmp>
    </h3>
    <modules-info-table
      v-loading="loading"
      :data="handleOrderInfo"
      :config="infoTableConfig"
    >
    </modules-info-table>
    <module-pane :title="formModuleTitle">
      <simple-form
        class="ltpl-simple-form"
        v-bind="formProps"
        :fieldItems="fieldItems"
        :formData="RSD.formData"
        :baseParams="detailParams"
        :api="handledApis.formInfoSend"
      >
      </simple-form>
    </module-pane>
    <el-dialog v-if="RMD.showMedias" title="客户影像资料" :visible.sync="isSHowDialog" width="1000px">
      <media-sets
        v-if="mediasData[0].list.length"
        v-model="handleMediasData"
        :FormatData="sideMenuData"
        :authCofg ="authCfg"
      >
      </media-sets>
    </el-dialog>
  </detail-page-pane>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
@import '~@/common/styles/infoTableDetail';
.risk-control-detail {
}
.car-delivery-detail {
  .ltpl-simple-form {
    /deep/ .comp-form-item-fields {
      width: 80%;
    }
  }
}
</style>
