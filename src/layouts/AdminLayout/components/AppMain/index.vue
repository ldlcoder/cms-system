<template>
  <section class="lcomp-app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>
<style lang="scss">
.lcomp-app-main {
  position: relative;
  padding: 32px 25px;
}
</style>
