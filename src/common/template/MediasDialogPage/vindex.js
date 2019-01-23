import MediaSets from '@/common/components/MediaSets'
import { checkoutSubTree } from './moduleData'
import { cloneJsonObj } from '@/utils'
const defAuthCofg = {
  downloadShow: true,
  uploadShow: true,
  delBtnShow: true
}

const createTypeMap = () => ({
  image: {
    label: '照片',
    type: 'image',
    checkBox: true,
    root: true,
    key: 'images',
    unit: '张',
    children: []
  },
  video: {
    label: '视频',
    type: 'video',
    checkBox: false,
    root: true,
    key: 'videos',
    unit: '段',
    children: []
  }
})
export default {
  components: { MediaSets },
  props: {
    packageDownload: Boolean,
    mediasData: Array,
    params: Object,
    authCofg: Object
  },
  data () {
    return {
      hasSpouse: false
    }
  },
  created () {
  },
  computed: {
    authBtnShow () {
      return Object.assign({}, defAuthCofg, this.authCofg)
    },
    sideMenuData () {
      const fileMap = createTypeMap()
      const { mediasData } = this
      return mediasData.map((tabItem, index) => {
        const { title, key, list } = tabItem
        let listsObj = {}
        list.forEach((typeItem, index) => {
          !listsObj[typeItem.type] && (listsObj[typeItem.type] = fileMap[typeItem.type])
          listsObj[typeItem.type].children.push({
            id: typeItem.id,
            label: typeItem.name,
            index: index
          })
        })
        return { title, key, lists: Object.values(listsObj) }
      })
    }
    // FormatData () {
    //   const { mediasData } = this
    //   let formatArr = []
    //   mediasData.forEach((tabItem, index) => {
    //     const { title, key, list } = tabItem
    //     const tabObj = (title, key) => ({ title, key, lists: [] })
    //     list.forEach(item => {
    //       !formatArr[item.type] && (formatArr[item.type] = tabObj())
    //     })
    //     let fileType = {}
    //     fileType.image = list.filter(typeItem => typeItem.type === 'image')
    //     fileType.video = list.filter(typeItem => typeItem.type === 'video')
    //     Object.keys(fileType).forEach(type => {
    //       if (fileMap[type]) {
    //         let listObj = {}
    //         listObj = cloneJsonObj(fileMap[type])
    //         fileType[type] && fileType[type].length && (listObj.children = fileType[type].map(childItem => (
    //           {
    //             id: childItem.id,
    //             label: childItem.name,
    //             files: cloneJsonObj(childItem.list)
    //           }
    //         )))
    //         tabObj.lists.push(listObj)
    //       }
    //     })
    //     formatArr.push(tabObj)
    //   })
    //   return formatArr
    // }
    // FormatData () {
    //   const { mediasData } = this
    //   let formatArr = []
    //   mediasData.forEach((item, index) => {
    //     const { title, key } = item
    //     let obj = { title, key, lists: [] }
    //     Object.keys(item).forEach((p) => {
    //       if (fileMap[p]) {
    //         let listObj = {}
    //         listObj = cloneJsonObj(fileMap[p])
    //         const { children } = listObj
    //         Object.keys(item[p]).length && Object.keys(item[p]).map((k) => {
    //           let childrenObj = {
    //             id: Number(k),
    //             files: cloneJsonObj(item[p][k]),
    //             ...checkoutSubTree(k)
    //           }
    //           children.push(childrenObj)
    //         })
    //         Object.keys(listObj).length && obj.lists.push(listObj)
    //       }
    //     })
    //     formatArr.push(obj)
    //   })
    //   return formatArr
    // }
  },
  created () {
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
