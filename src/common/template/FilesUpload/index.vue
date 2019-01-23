<template>
   <el-upload
    v-if="uploadConfig.host || uploadProp.httpRequest"
    class="lcomp-files-upload"
    ref="upload"
    v-bind="uploadProp"
    :action="uploadConfig.host"
    :data ="imgData"
    :on-success="uploadSuccess"
    :before-upload="beforeUpload"
    :on-error="uploadError"
    :disabled="upLoading"
  >
    <slot name="trigger" :loading="upLoading"></slot>
  </el-upload>
</template>
<script>
import { md5, objKeysRename, byteToWord, cloneJsonObj } from '@/utils'
import { getuploadConfig } from '@/api/common'
import apiConfig, { codeErrorHandler } from '@/plugins/apiHandles'
const typeRegMap = {
  'image/*': /image+/,
  'video/*': /video+/
}
const defProp = {
  accept: 'image/*',
  multiple: true,
  limit: 100,
  showFileList: false
}
const defLimit = {
  type: ['image/bmp', 'image/jpeg', 'image/png', /^(video\/)/],
  size: 1024 * 1024 * 2
}
const map = {
  policy: 'policy',
  accessid: 'OSSAccessKeyId',
  callback: 'callback',
  token: 'x-oss-security-token',
  acl: 'x-oss-object-acl',
  signature: 'signature'
}
export default {
  name: 'FilesUpload',
  props: {
    uploadProps: Object,
    limit: Object,
    attach: Object,
    cache: Boolean
  },
  components: {
  },
  data () {
    return {
      config: {},
      imgData: {
        success_action_status: 200
      },
      upLoading: false
    }
  },
  created () {
    this.checkUseOss() && this.checkOssExpired() && this.getUploadConfig()
  },
  computed: {
    uploadConfig () {
      return this.$store.getters.uploadConfig.data || {}
    },
    getRenameCfg () {
      const { uploadConfig } = this
      return objKeysRename(uploadConfig, map)
    },
    uploadProp () {
      return Object.assign({}, defProp, this.uploadProps)
    },
    limitOpts () {
      return Object.assign({}, defLimit, this.limit)
    }
  },
  methods: {
    // utils
    checkUseOss () {
      const { httpRequest } = this.uploadProps || {}
      return !httpRequest
    },
    checkFileType (type, file) {
      const { accept } = this.uploadProp
      if (typeRegMap[accept] && !typeRegMap[accept].test(type)) return false
      const { type: limitType } = this.limitOpts
      return !Array.isArray(limitType) || (limitType.length === 0) || limitType.some((val) => {
        if (typeof val === 'string') {
          return val === type
        } else if (typeof val === 'function') {
          return val(type, file)
        } else if (val instanceof RegExp) {
          return val.test(type)
        }
        return false
      })
    },
    checkFileSize (size) {
      const { size: limitSize } = this.limitOpts
      return (limitSize <= 0 || size < limitSize)
    },
    handleImgData (file) {
      const { name, uid } = file
      const fileInfo = name.split('.')
      if (fileInfo.length < 2) return
      let { imgData, uploadConfig: { fid, dir }, getRenameCfg } = this
      const filenameMd5 = name + uid + fid + (+new Date())
      const fileEx = fileInfo.pop().toLowerCase() // 大写后缀转小写
      const md5Fid = md5(filenameMd5)
      const fileName = md5Fid + '.' + fileEx
      Object.assign(imgData, { name: fileName, key: dir + fileName }, getRenameCfg)
    },
    // business
    uploadSuccess (res, file, fileList) {
      const { resCheck } = apiConfig
      if (resCheck(res)) {
        this.$emit('on-success', res.result, file, fileList)
      } else {
        codeErrorHandler(res)
      }
      this.upLoading = false
    },
    uploadError (e, file, fileList) {
      this.upLoading = false
    },
    beforeUpload (file) {
      const { type, size } = file
      if (!this.checkFileType(type, file)) {
        this.errorTip('文件类型有误！')
        return false
      } else if (!this.checkFileSize(size)) {
        this.errorTip(`文件大小超过限制！,单文件最大不超过${byteToWord(size)}`)
        return false
      }
      if (!this.checkUseOss()) return
      if (this.checkOssExpired()) {
        return new Promise(this.getUploadConfig).then(() => {
          this.prepareUpload(file)
        }).catch(e => {
          console.log(e)
        })
      } else {
        this.prepareUpload(file)
      }
    },
    checkOssExpired () {
      const { storeTimeStamp } = this.$store.getters.uploadConfig
      return !storeTimeStamp || (+new Date() - storeTimeStamp >= 600000)
    },
    prepareUpload (file) {
      const { attach } = this
      attach && (file.attach = cloneJsonObj(attach))
      this.handleImgData(file)
      this.upLoading = true
    },
    getUploadConfig (resolve, reject) {
      this.$fetch(getuploadConfig, { file_type: 'image', project: 'saasyc' }).done(data => {
        data && this.$store.commit('SET_UPLOAD_CONFIG', { storeTimeStamp: +new Date(), data })
        resolve && resolve()
      }).faile(e => {
        reject && reject()
      })
    },
    // events
    errorTip (msg) {
      this.$message.error(msg)
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-files-upload{
  /deep/ .el-tabs__item{
    height: 30px;
    line-height: 30px;
  }
}
</style>
