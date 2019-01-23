<template>
  <div class="detail-page-pane">
    <el-row :gutter="10">
      <el-alert
        v-if="getInfoFaile"
        title="获取数据失败"
        type="error"
        show-icon>
      </el-alert>
      <template v-else-if="twoPane">
        <el-col :span="span">
          <div class="page-module-pane">
            <slot></slot>
          </div>
        </el-col>
        <el-col :span="24 - span">
          <div class="page-module-pane">
            <slot name="right"></slot>
          </div>
        </el-col>
      </template>
      <div v-else class="page-module-pane clearfix">
        <el-col :span="span">
          <slot></slot>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    getInfoFaile: Boolean,
    twoPane: Boolean,
    span: {
      type: Number,
      default: 18
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-page-pane {
  .page-module-pane {
    @include page-module-pane;
  }
}
</style>
