import listPageMixin from '@/pages/common/mixins/listPageMixin'
import routeData from './routesData'
export default {
  name: 'CompanyManaListPage',
  mixins: [listPageMixin],
  computed: {
    createLinkInfo () {
      return this.RMD.createLinkInfo || {}
    }
  },
  methods: {
    /** utils **/
    initRMD () {
      const {name} = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    }
    /** business **/
    /** event **/
  }

}
