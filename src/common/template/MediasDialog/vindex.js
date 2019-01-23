import MediaSets from '@/components/MediaSets'
import {checkoutSubTree} from './moduleData'
import {cloneJsonObj} from '@/utils'
const defAuthCofg = {
  downloadShow: true,
  uploadShow: true,
  delBtnShow: true
}
const memberMap = {
  1: '主贷人',
  2: '配偶',
  3: '担保人'
}
const fileMap = {
  images: {
    label: '照片',
    type: 'image',
    checkBox: true,
    root: true,
    key: 'images',
    unit: '张',
    children: []
  },
  videos: {
    label: '视频',
    type: 'video',
    checkBox: false,
    root: true,
    key: 'videos',
    unit: '段',
    children: []
  }
}
export default {
  components: {MediaSets},
  props: {
    packageDownload: Boolean,
    data: Array,
    params: Object,
    authCofg: Object
  },
  data () {
    return {
      hasSpouse: false
    }
  },
  computed: {
    authBtnShow () {
      return Object.assign({}, defAuthCofg, this.authCofg)
    },
    FormatData () {
      const {data} = this
      let formatArr = []
      Array.isArray(data) && data.forEach((item, index) => {
        const {member_id: id, member_type: type} = item
        type == 2 && (this.hasSpouse = true)
        let suffix = this.hasSpouse ? (index - 1) : index
        let obj = {
          title: type == 3 ? memberMap[type] + suffix : memberMap[type],
          key: id,
          lists: []
        }
        Object.keys(item).forEach((p) => {
          let listObj = {}
          fileMap[p] && (listObj = cloneJsonObj(fileMap[p]))
          const {children} = listObj
          Object.keys(item[p]).length && Object.keys(item[p]).map((k) => {
            let childrenObj = {
              id: Number(k),
              files: cloneJsonObj(item[p][k]),
              ...checkoutSubTree(k)
            }
            children.push(childrenObj)
          })
          Object.keys(listObj).length && obj.lists.push(listObj)
        })
        formatArr.push(obj)
      })
      return formatArr
    }
  },
  methods: {
    updateOriginData (data) {
      this.$emit('update:data', data)
    },
    updateDownload (flag) {
      this.$emit('update:packageDownload', flag)
    }
  }
}