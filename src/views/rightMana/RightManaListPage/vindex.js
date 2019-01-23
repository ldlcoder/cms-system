import listPageMixin from '@/common/mixins/listPageMixin'
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
      const { name } = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    },
    /** business **/
    iniRouteState () {
      this.$route.name === 'AccountList' && this.$store.commit('SET_ADMIN_LAYOUT_SWITCH', { key: 'roles', value: true })
    },
    /** event **/
    skipToRolesSet (row) {
      row.id && this.$router.push({ name: 'UserRolesSet', query: { row: JSON.stringify({ id: row.id, name: row.name, roles: row.roles }) } })
    }
  }

}
