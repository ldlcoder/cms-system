<template>
  <div class="car-detail-page">
    <card-module-pane>
      <detail-page-pane>
        <info-table
            v-loading="loading"
            :data="carInfo"
            :config="infoTableConfig"
          >
        </info-table>
      </detail-page-pane>
    </card-module-pane>
    <card-module-pane>
      <detail-page-pane>
        <tab-images
          :value="tabImages.images"
          :uploadConfig="{}"
        >
        </tab-images>
      </detail-page-pane>
    </card-module-pane>
   <card-module-pane>
    <detail-page-pane>
      <common-table
        :data="configs.dataHandler(this.carInfo.choices)"
        v-bind="{ spanMethod: configs.spanMethod }"
        :columns="columns"
      >
      </common-table>
    </detail-page-pane>
    </card-module-pane>
  </div>
</template>

<script src="./vindex"></script>
<style lang="scss" scoped>
.car-detail-page {
  .lcomp-card-module-pane {
    margin-bottom: 20px;
  }
}
</style>