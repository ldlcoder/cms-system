<template>
  <div class="lcomp-module-pane">
    <h4 class="item-title">
      {{title}}
      <component v-if="extraTitle && extraTitle.component" class="item-extra-title" :is="extraTitle.component" v-bind="extraTitle.props" v-on="extraTitle.events">{{extraTitle.text}}</component>
    </h4>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'ModulePane',
  props: {
    title: String,
    extraTitle: Object
  }
}

</script>
<style lang="scss" scoped>
.lcomp-module-pane {
  .item-title {
    text-align: left;
    margin: 35px 0 20px;
    padding-left: 10px;
    color: #4a4a4a;
    font-size: 16px;
    border-left: 3px solid $themeBlue;
  }
}
</style>
