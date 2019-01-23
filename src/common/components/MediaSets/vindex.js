import MediasViewer from './components/MediasViewer'
import MenuTree from './components/MenuTree'
import FilesUpload from '@/common/template/FilesUpload'
import LoadBtn from '@/components/LoadBtn'
import { cloneJsonObj } from '@/utils'
import { mapGetters } from 'vuex'
const acceptTypes = {
  image: 'image/*',
  video: 'video/*'
}
const originData = () => ({ curType: '', fileIndex: 0, mediaIndex: 0, isPackageLoad: false, activeMember: '0', downLoading: false, upLoading: false })
export default {
  name: 'MediaSets',
  components: {
    MediasViewer,
    FilesUpload,
    MenuTree,
    LoadBtn
  },
  props: {
    refresh: Boolean,
    packageDownload: Boolean,
    FormatData: Array,
    value: {
      type: Array,
      default: () => ([])
    },
    authCofg: Object // 权限控制打包下载、删除、上传按钮显示与否

  },
  data () {
    return Object.assign({}, originData())
  },
  created () {
  },
  computed: {
    ...mapGetters(['treeCheckedVals']),
    handleAcceptType () {
      const { curType } = this
      return curType ? { accept: acceptTypes[curType] } : {}
    },
    handleValue () {
      return cloneJsonObj(this.value)
    },
    viewerFiles () {
      const { activeMember, mediaIndex, handleValue } = this
      return handleValue[activeMember] && handleValue[activeMember].list[mediaIndex] && Array.isArray(handleValue[activeMember].list[mediaIndex].list) ? handleValue[activeMember].list[mediaIndex].list : []
    }
  },
  watch: {
    activeMember () {
      this.initConfigParams()
    },
    refresh (newVal) {
      newVal && this.initConfigParams()
    },
    'treeCheckedVals': {
      handler (newVal, oldVal) {
        this.$emit('update-values', newVal)
      },
      deep: true
    }
  },
  methods: {
    // events
    initConfigParams () {
      Object.assign(this.$data, originData())
      this.$emit('update:refresh', false)
    },
    success (response, file, fileList) {
      const { attach: { mediaIndex, activeMember } } = file.raw
      const { handleValue } = this
      const { fid, url } = response
      handleValue[activeMember].list[mediaIndex].list.push({ file_id: fid, file_path: url })
      this.$emit('input', this.handleValue)
      this.upLoading = false
    },
    getCurrentId (data, type) {
      const { id, index } = data
      this.mediaIndex = index
      this.curType = type
    },
    getCheckedValues (values) {
      this.$emit('change-values', values)
    },
    // click
    delMedias (index) {
      const { viewerFiles } = this
      viewerFiles.splice(index, 1)
      this.$emit('input', this.handleValue)
    },
    lockUpLoading () {
      this.upLoading = true
    },
    loadBtn () {
      this.isPackageLoad = true
    },
    confirmLoad () {
      this.$emit('update-download', true)
      this.isPackageLoad = false
    },
    cancelLoad () {
      this.isPackageLoad = false
    }
  }
}
