<template>
  <div class="page-503">
  </div>
</template>

<script>
  import { login } from '@/api/common'
  export default {
    name: 'Page503',
    created () {
      this.jumpPage()
    },
    methods: {
      jumpPage () {
        this.$fetch(login).silence().done(data => {
          this.$router.push({name: 'Dashboard'})
        })
      }
     }
  }
</script>

<style lang="scss" scoped>
.page-503{
  position: relative;
  min-width: 1200px;
  margin: 20px auto 60px;
  height: 900px;
  background: url('./images/503.png') no-repeat center center;
  overflow: hidden;
}
</style>