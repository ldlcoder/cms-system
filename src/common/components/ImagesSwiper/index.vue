<template>
  <div class="lcomp-images-swiper">
    <viewer-dailog
      v-if="shadowShow"
      :title="vdTitle"
      :data="handleImgShow"
      :viewerShow.sync="shadowShow"
      :options="{'initialViewIndex': curImg}"
    >
    </viewer-dailog>
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(item,index) in imgShow"
        :key="index"
        class="swiper-slide"
      >
        <div class="del-btn" v-if="delShow" @click="delImg(index)">
          <span class="el-icon-error"></span>
        </div>
        <img
          :src="srcSuffix(item.file_path)"
          alt=""
          @click="shadowShowFun(index)"
          style="width: 100%; height: 100%;"
        >
      </swiper-slide>
      <div class="swiper-button-prev" id="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" id="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" id="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ViewerDailog from '@/components/ViewerDailog'
export default {
  name: 'ImagesSwiper',
  props: {
    imgShow: Array,
    delShow: Boolean,
    delImg: Function,
    thumbSuffix: String
  },
  components: {
    swiper,
    swiperSlide,
    ViewerDailog
  },
  data () {
    return {
      swiperOption: {
        observer: true,
        observeParents: true,
        slidesPerView: 6,
        spaceBetween: 10,
        // init: false,
        pagination: {
          el: '#swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '#swiper-button-next',
          prevEl: '#swiper-button-prev'
        }
      },
      vdTitle: '查看图片',
      shadowShow: false,
      curImg: 1
    }
  },
  computed: {
    handleImgShow () {
      const {imgShow} = this
      return imgShow.map(item => (item.file_path))
    }
  },
  filters: {
  },
  methods: {
    shadowShowFun (index) {
      this.curImg = index
      this.shadowShow = true
    },
    srcSuffix (path) {
      return this.thumbSuffix ? (path + '?' + this.thumbSuffix) : path
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-images-swiper{
  .swiper-slide{
    height: 130px;
    width: 50px;
  }
  .swiper-pagination-bullet{
    border: 1px solid #007aff;
    background: #fff;
    opacity: 100;
  }
  .del-btn{
    background-color: #ffffff;
    border-radius: 15px;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
    .el-icon-error{
      font-size: 20px
    }
  }
}
</style>
