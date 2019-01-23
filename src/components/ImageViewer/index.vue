<template>
  <div class="image-viewer" v-show="data.length">
    <div class="image-inner">
      <img 
        v-for="(src, index) in data"
        :key="src + index"
        :src="src + defOpts.thumbStr"
        :data-original="src" 
      >
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
const defOpts = {
  inline: true,
  minWidth: 400,
  minHeight: 200,
  url: 'data-original'
}

export default {
  name: 'ImageViwer',
  components: {
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      $viewer: null
    }
  },
  created () {
  },
  mounted () {
    this.$el.firstChild.addEventListener('view', (event) => {
      this.$emit('image-change', event)
    })
    this.$viewer = new Viewer(this.$el.firstChild, {
      ...this.defOpts,
     viewed: function () {}
    })
  },
  computed: {
    defOpts () {
      return Object.assign({ thumbStr: '?x-oss-process=image/resize,m_lfit,h_100,w_100' }, defOpts, this.options)
    }
  },
  watch: {
    data: {
      handler () {
        this.$viewer && this.$nextTick(() => {
          this.$viewer.view(0)
          this.$viewer.update()
        })
      },
      deep: true
    }
  },
  methods: {
    // utils
    // bussiness
    // events
  },
  beforeDestroy() {
    this.$viewer && this.$viewer.destroy()
  },
}
</script>
<style lang="scss" scoped >
.image-viewer {
  width: 100%;
  height: 100%;
  .image-inner{
    width: 100%;
    height: 100%;
    img{
      display: none;
    }
  }
}
</style>
