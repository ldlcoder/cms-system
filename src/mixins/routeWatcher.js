// watch the route change and refresh data
import { cloneDeep } from 'lodash'
let initData = null
export default {
  watch: {
    '$route': 'refreshRoute'
  },
  methods: {
    initCompData (constData, dynamicData) {
      if (typeof constData !== 'object') return {}
      initData = constData
      return Object.assign({}, cloneDeep(initData), dynamicData)
    },
    _resetVueData () {
      initData && Object.assign(this.$data, cloneDeep(initData))
    },
    refreshRoute (to, from) {
      this._resetVueData()
      this.getRouteParams()
    },
    getRouteParams () {}
  }
}
