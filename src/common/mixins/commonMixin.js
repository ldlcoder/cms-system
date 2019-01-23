import { routeWatcher } from '@/mixins'
import { cloneDeep } from 'lodash'
import { hyphenate } from '@/utils'

export default {
  mixins: [routeWatcher],
  computed: {
    // 处理搜索表单传出的数据的函数，用于对参数进行修正
    handleFormData () {
      return this.RMD.handleFormData
    },
    // 页面所有接口函数
    handledApis () {
      return this.RMD.handledApis || {}
    }
  },
  created () {
    this.getRouteParams()
  },
  filters: {
    hyphenate
  },
  methods: {
    /** utils **/
    initRMD () {
      return {}
      // 此函数必须由模板页实现
    },
    // 跳转到指定路由
    skipToRoute (route) {
      route && route.name && this.$router.push(route)
    },
    // 处理模块数据
    handleRouteMoudleData (data) {
      data = cloneDeep(data)
      const { bindFns } = data || {}
      if (Array.isArray(bindFns)) {
        bindFns.forEach(item => {
          data.hasOwnProperty(item) && (typeof data[item] === 'function') && (data[item] = data[item].bind(this))
        })
      }
      return data
    },
    // 获取路由参数
    getRouteParams () {
      this.RMD = this.initRMD()
      this.RSD = this.RMD.RSD || {}
      this.iniRouteState()
    },
    iniRouteState () {

    },
    /** business **/
    /** event **/
    // 跳转回列表页
    returnToList () {
      const { listRouteName } = this.RMD
      listRouteName && this.skipToRoute({ name: listRouteName })
    }
  }

}
