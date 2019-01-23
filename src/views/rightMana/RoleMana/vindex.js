import DetailPagePane from '@/common/template/DetailPagePane'
import { getAdminCompanyRoles, deleteRole } from '@/api/rightMana'
import { getMembersList } from '@/api/common'
import { checkoutTableColumns } from '@/common'
import ListTable from '@/components/ListTable'

const getAccountListColumns = () => (checkoutTableColumns({
  'name': { label: '用户姓名' },
  'mobile': { label: '账号' },
  'subComp': null,
  'team': null
}))

export default {
  components: {
    DetailPagePane,
    ListTable
  },
  data () {
    return {
      loading: false,
      accLoading: false,
      roleList: [],
      curRole: {},
      btnProp: { size: 'mini' },
      accountData: {},
      columns: getAccountListColumns()
    }
  },
  created () {
    this.getRouteParams()
  },
  computed: {
    canAdd () {
      return this.RouteRights.includes('add')
    },
    canEdit () {
      return this.RouteRights.includes('setAuth')
    },
    canDelete () {
      return this.RouteRights.includes('delete')
    },
    accountParam () {
      return this.curRole.id ? { 'role_id': this.curRole.id } : null
    }
  },
  methods: {
    /* utils */
    getRouteParams () {
      this.getRolesList()
    },
    /* business */
    // 获取当前公司所有角色列表
    getRolesList () {
      this.$fetch(getAdminCompanyRoles).lock('loading').done(data => {
        this.roleList = Array.isArray(data) ? data : []
      })
    },
    getRoleAccountList (params) {
      const { accountParam } = this
      accountParam && this.$fetch(getMembersList, Object.assign(params || {}, accountParam)).lock('accLoading').done(data => {
        data && Array.isArray(data.list) && (this.accountData = data)
      })
    },
    deleteRoleSend (item, index) {
      this.$confirm('角色删除后无法恢复，确定删除?', '提示', { type: 'warning' }).then(() => {
        this.$set(item, 'isdeling', true)
        this.$fetch(deleteRole, { 'role_id': item.id }).done(data => {
          this.$leaseMessage(data, data ? '角色删除成功' : '角色删除失败')
          data && this.roleList.splice(index, 1)
        }).faile(e => {
          item.isdeling = false
        })
      }).catch(() => {})
    },
    /* events */
    searchRoleAccList (item) {
      this.curRole = item
      this.getRoleAccountList()
    },
    deleteRole (item, index) {
      this.deleteRoleSend(item, index)
    },
    skipToEdit (item) {
      this.$router.push({ name: 'RoleEdit', query: { id: item.id } })
    }
  }
}
