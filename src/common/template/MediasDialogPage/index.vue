<template>
  <div class="lcomp-medias-dailog"  :FormatData="sideMenuData">
    <media-sets
      v-if="mediasData[0].list.length"
      :FormatData="sideMenuData"
      :authCofg ="authBtnShow"
      :originData="mediasData"
      :packageDownload="packageDownload"
      @update-download="updateDownload"
      @update-origin="updateOriginData"
    >
    </media-sets>
    <p v-else class="error-msg">无有效数据</p>
  </div>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped >
</style>
