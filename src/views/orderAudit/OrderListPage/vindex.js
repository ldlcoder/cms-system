import listPageMixin from '@/common/mixins/listPageMixin'
import routeData from './routesData'
export default {
  name: 'OrderAuditListPage',
  mixins: [listPageMixin],
  methods: {
    /** utils **/
    initRMD () {
      const { name } = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    },
    /** business **/
    // 跳转到编辑页
    skipToEditPage (name, id) {
      let route = { name }
      id && (route.query = { id })
      this.skipToRoute(route)
    }
    /** event **/
  }

}
