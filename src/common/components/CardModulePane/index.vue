<template>
  <div class="lcomp-card-module-pane">
    <div class="modul-title" v-if="title"><b>{{title}}</b></div>
    <slot class="modul-title" name="title"></slot>
    <div class="modul-container" v-loading="loading">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardModulePane',
  props: {
    title: String,
    loading: Object
  },
  computed: {
  },
  methods: {
    /** utils **/
    /** business **/
    /** events **/
  }
}
</script>
<style lang="scss" scoped>
.lcomp-card-module-pane {
  .modul-title {
    padding-left: 10px;
    line-height: 40px;
    font-size: 14px;
    color: #606266;
  }
  .modul-container {
    @include shadow-card;
  }
}
</style>
