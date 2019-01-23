<template>
  <div class="load-btn">
    <el-button 
      :type="defConfig.type" 
      :size="defConfig.size"
      :loading="loading"
      :icon="defConfig.icon"
    >
      {{loading ? defConfig.loadText : defConfig.text}}
    </el-button>
  </div>
</template>

<script>
const defOptions = {
  type: 'primary',
  icon: 'el-icon-upload',
  text: '点击上传',
  loadText: '上传中...',
  size: 'mini'
}
export default {
  props: {
    loading: Boolean,
    options: Object
  },
  data () {
    return {

    }
  },
  computed: {
    defConfig () {
      return Object.assign({}, defOptions, this.options)
    }
  },
}
</script>
<style lang="scss" scoped>
.load-btn{

}
</style>
