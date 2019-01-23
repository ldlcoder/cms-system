<template>
  <div class="comp-swiper swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in data" :key="index">
        <div class="del-btn" @click="delImg" v-if="delBtn">
          <span class="el-icon-error"></span>
        </div>
        <img :src="item.src" @click="previewImg">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <!-- 如果需要滚动条 -->
   <!--<div class="swiper-scrollbar"></div>-->
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
const defOpts = {
  loop: false, // 循环播放
  lazy: true, //延时加载
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 6, // 每一活动块显示图片数
  spaceBetween: 20 // 每张图片间距
}
export default {
  name: 'Swiper',
  components: {
  },
  props: {
    data: {
      type: Array
    },
    options: Object,
    delBtn: Boolean
  },
  data () {
    return {
      $swiper: null
    }
  },
  mounted () {
    this.$swiper = new Swiper(this.$el, this.defOpts)
  },
  computed: {
    defOpts () {
      return Object.assign({}, defOpts, this.options)
    }
  },
  watch: {
    data () {
      this.$swiper && this.$nextTick(() => {
        this.$swiper.update()
      })
    },
    options: {
      handler () {
        this.$swiper && this.$nextTick(() => {
          this.$swiper.update()
        })
      },
      deep: true
    }
  },
  methods: {
    // utils
    // bussiness
    // events
    delImg () {
      this.$emit('active-index', this.$swiper.clickedIndex)
    },
    previewImg () {
      this.$emit('preview-img', this.$swiper.clickedIndex)
    }
  },
  beforeDestroy () {
    this.$swiper && this.$swiper.destroy()
  }
}
</script>
<style lang="scss" scoped >
.comp-swiper {
  width: 100%;
  height: 100%;
  .swiper-slide{
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    .del-btn{
      position: absolute;
      top: 0;
      right: 4px;
      font-size: 18px;
      z-index: 20000;
      &:hover{
        color: #F56C6C
      }
    }
    .el-icon-error{
      border: 1px solid #fff;
      border-radius: 50%;
      background: #fff;
    }
  }
}
</style>
