<template>
  <div class="lcomp-medias-dailog"  :FormatData="FormatData">
    <media-sets
      v-if="data && data.length"
      :FormatData="FormatData"
      :authCofg ="authBtnShow"
      :originData="data"
      :packageDownload="packageDownload"
      @update-download="updateDownload"
      @update-origin="updateOriginData"
    >
    </media-sets>
    <!--<p v-else-if="!loading" class="error-msg">无有效数据</p>-->
  </div>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped >
</style>
