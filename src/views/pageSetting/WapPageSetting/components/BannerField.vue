<template>
  <el-row class="lcomp-banner-field" :gutter="20">
    <el-col :span="8" v-for="(item, index) in value" :key="index">
      <el-card class="banner-item-card">
        <el-button v-if="index > 0" class="delete-btn" type="danger" icon="lease-icon-shanchu" size="mini" @click="deleteBannerItem(index)"></el-button>
        <el-form-item class="img-form-item" :prop="'banner.'+index+'.img_src'" :rules="bannerImageRules">
          <div class="img-pane">
            <img :src="item.img_src" >
            <files-upload
              class="upload-btn"
              @on-success="imageUploadHanlder(index, $event)"
            >
              <el-button :icon="item.img_src ? 'lease-icon-bianji' : 'lease-icon-tianjia'" slot="trigger">{{item.img_src ? '替换' : '上传'}}</el-button>
            </files-upload>
          </div>
        </el-form-item>
        <form-item-field class="skip-type-radio" :fieldItem="skipTypeField(index)" v-model="item.type"></form-item-field>
        <form-item-field v-if="item.type !== 'img'" :fieldItem="skipUrlField(item.type, index)" v-model="item.type_value"></form-item-field>
      </el-card>
    </el-col>
    <el-col :span="8" v-if="value.length < 3">
      <el-card class="banner-item-card banner-add-card"><el-button icon="lease-icon-tianjia1" @click="addBannerItem"></el-button></el-card>
    </el-col>
  </el-row>
</template>
<script>
import FormItemField from '@/components/FormItemFields/FormItemField'
import FilesUpload from '@/common/template/FilesUpload'
import { bannerSkipTypeField, bannerSkipUrlField, bannerImageRules } from '../dataHandle'
export default {
  name: 'WapPageSetting',
  components: {
    FormItemField,
    FilesUpload
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      bannerImageRules
    }
  },
  methods: {
    skipTypeField (index) {
      return bannerSkipTypeField(index)
    },
    skipUrlField (type, index) {
      return bannerSkipUrlField(type, index)
    },
    /* events */
    imageUploadHanlder (index, result) {
      this.value[index].img_src ? (this.value[index].img_src = result.url) : this.$set(this.value[index], 'img_src', result.url)
    },
    deleteBannerItem (index) {
      this.value.splice(index, 1)
    },
    addBannerItem () {
      this.value.push({ type: 'img' })
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-banner-field {
  /deep/ .banner-item-card {
    position: relative;
    height: 330px;
    .delete-btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 5px 10px;
      z-index: 2;
    }
    .img-form-item {
      margin-bottom: 12px;
    }
    .img-pane {
      position: relative;
      width: 100%;
      height: 100px;
      text-align: center;
      border: 1px solid $borderColor;
      background-color: $borderColor;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &.banner-add-card {
      text-align: center;
      .el-button {
        margin-top: 50%;
        border: none;
        i {
          font-size: 40px;
        }
      }
    }
    .upload-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80px;
      margin-left: -40px;
      margin-top: -15px;
      button {
        padding: 6px 16px;
        opacity: .7;
      }
    }
    .skip-type-radio {
      .el-radio {
        margin: 0 10px 10px 0;
      }
      .el-radio__label {
        padding-left: 4px;
      }
    }
  }
}
</style>
