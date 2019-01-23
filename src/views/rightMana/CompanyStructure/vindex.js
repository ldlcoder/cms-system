import DetailPagePane from '@/common/template/DetailPagePane'
import { getSubCompanyList, setSubCompanyStatus, getTeamList, setTeamStatus } from '@/api/rightMana'
import { checkoutTableColumns, createTbItem } from '@/common'
import { editFuncBtn, statusBtn } from '@/common/commonData/actionBtns'
import ListTable from '@/components/ListTable'
import CommonEditForm from './components/CommonEditForm'
import { pick } from 'lodash'

const createTbColumns = nameLabel => action => (checkoutTableColumns({
  '_name': createTbItem(nameLabel, 'name'),
  'responsible': null,
  'ctime': { width: '160px' },
  'createrAdmin': null,
  'action': { width: '170px', action }
}))

const getSubCompanyColumns = createTbColumns('分公司名称')
const getTeamColumns = createTbColumns('团队名称')

export default {
  name: 'CompanyStructure',
  components: {
    DetailPagePane,
    ListTable,
    CommonEditForm
  },
  data () {
    return {
      loading: false,
      subCompLoading: false,
      teamLoading: false,
      refreshs: {
        subCompany: false,
        team: false
      },
      subCompanyData: {},
      teamData: {},
      curSubCompany: {},
      btnProp: { size: 'mini' },
      editFormCfg: this.initEditFormCfg(),
      tableProps: { highlightCurrentRow: true, stripe: false },
      statusBtnProps: {
        confirmMsg: row => {
          const isAccess = row[status] === 1
          const keyWord = isAccess ? '禁用' : '启用'
          return `${keyWord}后，该层级及其下属层级的所有用户账号将${isAccess ? '被冻结' : '解冻'}，确定${keyWord}吗?`
        },
        click: this.handleRecordStatus
      },
      setRecordStatusApis: {
        subCompDisabled: setSubCompanyStatus,
        teamDisabled: setTeamStatus
      }
    }
  },
  created () {
    this.getRouteParams()
  },
  computed: {
    canAddComp () {
      return this.RouteRights.includes('addFiliale')
    },
    canAddTeam () {
      return this.RouteRights.includes('addTeam')
    },
    subCompanyColumns () {
      const actionBtns = [editFuncBtn({ click: this.editSubCompany }), statusBtn('status', { btnKey: 'subCompDisabled', ...this.statusBtnProps })]
      return getSubCompanyColumns(actionBtns)
    },
    teamColumns () {
      const actionBtns = [editFuncBtn({ click: this.editTeam }), statusBtn('status', { btnKey: 'teamDisabled', ...this.statusBtnProps })]
      return getTeamColumns(actionBtns)
    },
    subCompParam () {
      return this.curSubCompany.id ? { 'id': this.curSubCompany.id } : null
    }
  },
  methods: {
    /* utils */
    getRouteParams () {
      this.getSubCompanyList()
      // this.editSubCompany()
    },
    initEditFormCfg () {
      return {
        show: false,
        type: '',
        data: { companyName: this.$store.getters.companyName }
      }
    },
    /* business */
    // 获取当前公司所有分公司列表
    getSubCompanyList (params) {
      this.$fetch(getSubCompanyList, params || {}).lock('subCompLoading').done(data => {
        this.subCompanyData = data && Array.isArray(data.list) ? data : {}
      })
    },
    getTeamList (params) {
      const { subCompParam } = this
      subCompParam && this.$fetch(getTeamList, Object.assign(params || {}, subCompParam)).lock('teamLoading').done(data => {
        this.teamData = data && Array.isArray(data.list) ? data : {}
      })
    },
    /* events */
    refreshList (type) {
      typeof this.refreshs[type] === 'boolean' && (this.refreshs[type] = true)
    },
    updateTableRow (row, newInfo) {

    },
    subCompChoose (row, old) {
      if (!row) return
      this.curSubCompany = row
      this.getTeamList()
    },
    editSubCompany (data = {}) {
      const formData = data.id ? pick(data, ['id', 'name', 'responsible']) : {}
      Object.assign(this.editFormCfg, {
        show: true,
        type: 'subCompany',
        data: Object.assign(this.editFormCfg.data, formData),
        submitSuccess: (isEdit, newInfo) => {
          isEdit ? Object.assign(data, newInfo) : (this.refreshs.subCompany = true)
        }
      })
    },
    editTeam (data = {}) {
      const formData = Object.assign({ subCompanyName: this.curSubCompany.name }, data.id ? pick(data, ['id', 'name', 'responsible']) : { cid: this.curSubCompany.id })
      Object.assign(this.editFormCfg, {
        show: true,
        type: 'team',
        data: Object.assign(this.editFormCfg.data, formData),
        submitSuccess: (isEdit, newInfo) => {
          isEdit ? Object.assign(data, newInfo) : (this.refreshs.team = true)
        }
      })
    },
    editFormClose () {
      this.editFormCfg = this.initEditFormCfg()
    },
    handleRecordStatus (row, scope, curBtn) {
      const setRecordStatus = this.setRecordStatusApis[curBtn.btnKey]
      if (!setRecordStatus || !row.id) return
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      this.$set(row, loadingKey, true)
      const params = { id: row.id, status: 1 ^ row.status }
      this.$fetch(setRecordStatus, params).done(data => {
        row[loadingKey] = false
        row.status = params.status
      }).faile(e => {
        row[loadingKey] = false
      })
    }
  }
}
