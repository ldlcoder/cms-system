<template>
  <div class="lcomp-tab-images">
   <el-tabs type="border-card" v-model="curTab" v-if="handleImages.length">
      <el-tab-pane
        v-for="(item, index) in handleImages"
        :name="index + ''"
        :key="index + ''"
      >
        <span slot="label">{{item.name}}({{item.list ? item.list.length : 0}})张</span>
      </el-tab-pane>
      <el-tab-pane :disabled="true" v-if="handleDelShow">
        <span slot="label">
          <files-upload
            :attach="{idx: curTab}"
            :limit="{size: 0}"
            @on-success="success"
          >
            <span class="loadstyle" slot="trigger"><i class="lease-icon-tianjia"></i>上传{{btnTitle}}</span>
          </files-upload>
        </span>
      </el-tab-pane>
      <el-col :span="24" style="height: 170px;background-color: #F6F7FA;padding: 20px">
        <swiper
          :data="thumbImages"
          :delBtn="handleDelShow"
          :options="swiperOpts"
          @active-index="delImg"
          @preview-img="openViwer"
        ></swiper>
        <viewer-dailog
          v-if="shadowShow"
          :title="vdTitle"
          :data="handleImgShow"
          :viewerShow.sync="shadowShow"
        >
        </viewer-dailog>
      </el-col>
    </el-tabs>
  </div>
</template>
<script>
import { cloneJsonObj } from '@/utils'
import FilesUpload from '@/common/template/FilesUpload'
import Swiper from '@/components/Swiper'
import ViewerDailog from '@/components/ViewerDailog'
export default {
  name: 'TabImages',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    thumbStr: {
      type: String,
      default: '?x-oss-process=image/resize,m_lfit,h_140'
    },
    delShow: Boolean,
    swiperOpts: Object,
    activeTab: Number
  },
  components: {
    FilesUpload,
    Swiper,
    ViewerDailog
  },
  data () {
    return {
      vdTitle: '查看图片',
      shadowShow: false,
      imageArr: [],
      currIndex: 0
    }
  },
  computed: {
    handleImages () {
      this.imageArr = this.images
      return this.imageArr.filter(item => (!item.disabled))
    },
    curTab: {
      get () {
        this.currIndex = this.activeTab || this.currIndex
        return String(this.currIndex)
      },
      set (v) {
        this.currIndex = Number(v)
        this.$emit('update:activeTab', this.currIndex)
      }
    },
    images () {
      return Array.isArray(this.value) ? cloneJsonObj(this.value) : []
    },
    imgShow () {
      const { curTab, handleImages: images } = this
      return images[curTab] ? images[curTab].list.map(item => ({ src: item.file_path })) : []
    },
    handleDelShow () {
      const { curTab, handleImages: images } = this
      return images[curTab] && images[curTab].hasOwnProperty('isHideDel') ? images[curTab].isHideDel : this.delShow
    },
    btnTitle () {
      const { curTab, handleImages: images } = this
      return images[curTab] ? images[curTab].title : ''
    },
    thumbImages () {
      const { imgShow } = this
      return imgShow.length ? imgShow.map(item => ({ src: item.src + this.thumbStr })) : []
    },
    handleImgShow () {
      const { imgShow } = this
      return imgShow.length ? imgShow.map(item => (item.src)) : []
    }
  },
  methods: {
    // utils
    // business
    success (response, file, fileList) {
      const { attach: { idx } } = file.raw
      const { fid, url } = response
      const { imageArr } = this
      if (!imageArr[idx].list) {
        this.$set(imageArr[idx], 'list', [])
      }
      imageArr[idx].list.push({ file_id: fid, file_path: url })
      this.$emit('input', imageArr)
    },
    // events
    delImg (index) {
      const { imageArr, curTab } = this
      imageArr[curTab].list.splice(index, 1)
      this.$emit('input', imageArr)
    },
    openViwer () {
      this.shadowShow = true
    },
    changeTitle (tab) {
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-tab-images{
  /deep/ .el-tabs__item{
    height: 30px;
    line-height: 30px;
  }
  .loadstyle{
    font-size: 14px;
    color: #357CED;
  }
  /deep/ .el-tabs--border-card{
    box-shadow: none
  }
}
</style>
