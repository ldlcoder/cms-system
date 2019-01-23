<template>
  <div class="lcomp-media-viewer" v-loading="loading">
    <template>
      <div class="del-btn" v-if="defConfig.show && type=='image' && data.length">
        <el-button type="danger" size="mini" plain @click="delImg">删除当前图片</el-button>
      </div>
      <div v-if="type=='image'" class="media-image">
        <image-viewer 
          :data="handleData"
          @image-change="imageChange"
        >
        </image-viewer>
      </div>
      <div class="media-video" v-if="type=='video'">
        <div class="origin-video" :curVideoIdx="curVideoIdx">
          <video-player 
            class="main-video"
            :src="data[curVideoId].file_path"
            v-if="data[curVideoId]"
          >
          </video-player>
        </div>
        <div class="thumb-video">
          <div class="thumb-container">
            <ul class="container">
              <li 
                class="item" 
                v-for="(src,index) in data" 
                :class="{'activeItem': index == curVideoId}"
                :key="src.id" 
                :dd="handleVideoData"
                @click="changeActiveItem"
              >
                <div class="del-video-btn" @click="delVideo(index)" v-if="defConfig.show">x</div>
                <div class="videoMeng" @click="videoChange(index)" :data-id="src.file_id" :data-src="src.file_path"></div>
                <video class="list-video" width="60" height="60">
                  <source :src=src.file_path  type="video/mp4">
                </video>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import ImageViewer from '@/components/ImageViewer'
  import VideoPlayer from '@/components/VideoPlayer'
  const defOptions = {
    show: true
  }
  export default {
    props: {
      data: Array,
      type: String,
      delBtn: Function,
      options: Object
    },
    components: {ImageViewer, VideoPlayer},
    data () {
      return {
        thumbStr: '?x-oss-process=image/resize,m_lfit,h_100,w_100',
        errorImg: '',
        loading: true,
        curVideoId: 0,
        curImageId: 0,
        activeItem: true
      }
    },
    computed: {
      defConfig () {
        return Object.assign({}, defOptions, this.options)
      },
      handleData () {
        return this.data.map(item => (item.file_path))
      },
      handleVideoData () {
        return this.data.map(item => (item.file_path))
      },
      viewerOpt () {
        return {
          movable: true,
          inline: true,
          navbar: true,
          url: 'data-original',
          minzoomRatio:0.2,
          loading: true,
          transition: false
        }
      },
      curVideoIdx () {
        const {data} = this
        this.curVideoId = 0
      }
    },
    mounted() {
      this.loading = false
    },
    methods: {
      //click
      changeActiveItem () {

      },
      videoChange (index) {
        this.curVideoId = index
      },
      imageChange (event) {
        const {detail: {index}} = event
        this.curImageId = index
      },
      delImg () {
         const {curImageId} = this
         this.delBtn && this.delBtn(curImageId)
      },
      delVideo (index) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delBtn && this.delBtn(index)
        })
      }
    }
  }
</script>
<style lang="scss" scoped >
  .lcomp-media-viewer{
    height: 616px;
    position: relative;
    background-color: #F6F7FA;
    .del-btn{
      position: absolute;
      bottom: 105px;
      right: 0px;
      z-index: 2000;
    }
    .media-image{
      height: 616px;
    }
    .media-video{
      .origin-video{
        width: 100%;
        height: 555px;
      }
      .thumb-video{
        border-top: 1px solid #ffffff;
        width: 100%;
        height: 65px;
        .thumb-container{
          position: relative;
          width: 100%;
          height: 84px;
          overflow-x: scroll;
          overflow-y: hidden;
          .container{
            position: absolute;
            top: 0;
            padding: 0;
            height: 60px;
            margin: 0;
            .item{
              position: relative;
              width: 60px;
              height:60px;
              margin-left: 2px;
              border: 1px solid lightgray;
              display: inline-block;
              .del-video-btn{
                position: absolute;
                right: 0px;
                top: 0px;
                width: 16px;
                font-size: 10px;
                height: 16px;
                color: #fff;
                text-align: center;
                border: 1px solid #8F8F8F;
                background: #8F8F8F;
                border-radius: 50%;
                cursor: pointer;
                z-index: 2000;
                &:hover{
                  background: #f56c6c;
                  border: 1px solid #f56c6c;
                }
              }
              .videoMeng{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                z-index: 1000;
              }
            }
            .activeItem{
              border: 1px solid #f56c6c;
            }
          }
        }
      }
    }
  }
</style>
  