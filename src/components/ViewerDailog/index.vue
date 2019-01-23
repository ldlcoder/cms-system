<template>
  <el-dialog  class="comp-viewer-dailog" :title="title" :visible.sync="visible" append-to-body>
    <div class="dailog-viewer" v-loading="loading">
      <image-viewer
        v-if="data.length"
        :data="data"
        :options="defOpts"
      >
      </image-viewer>
    </div>
  </el-dialog>
</template>

<script>
import ImageViewer from '@/components/ImageViewer'

export default {
  name: 'ViewerDailog',
  components: {
    ImageViewer
  },
  props: {
    options: {
      type: Object
    },
    title: {
      type: String,
      default: '查看图片'
    },
    data: {
      type: Array,
      required: true
    },
    loading: Boolean,
    viewerShow: Boolean,
    appendToBody: Boolean
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    visible: {
      get () {
        return this.viewerShow
      },
      set (val) {
        this.$emit('update:viewerShow', val)
      }
    },
    defOpts () {
      return Object.assign({}, this.options)
    }
  },
  methods: {
    // utils
    // bussiness
    // events
  }
}
</script>
<style lang="scss" scoped >
.comp-viewer-dailog {
  .viewer-image-temp {
    display: none;
  }
  .dailog-viewer {
    position: relative;
    height: 100%;
    background-color: #efefef;
  }
  .viewer-container {
    height: 100%;
  }
  /deep/ .el-dialog {
    width: 80%;
    .el-dialog__body {
      height: 70vh;
    }
  }
  
}
</style>
