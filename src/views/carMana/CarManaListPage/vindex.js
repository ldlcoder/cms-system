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
  watch: {
    'currentTab' (newVal) {
      const { handleTabChange } = this.RMD
      typeof handleTabChange === 'function' && handleTabChange(newVal, this)
    }
  },
  methods: {
    /** utils **/
    initRMD () {
      const { name } = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    },
    /** business **/
    /** event **/
    deleteRecordsConfirm () {
      const selectionKeys = this.selectionKeys.slice(0)
      if (selectionKeys.length) {
        this.$confirm('删除后不可恢复,确定删除所选中项吗？', '系统提示', {
          type: 'warning',
          callback: (action, instance) => {
            action === 'confirm' && this.deleteRecords(selectionKeys)
          }
        })
      } else {
        this.$alert('请选择需要删除的记录', '系统提示').catch((e) => {})
      }
    },
    deleteRecords (selectionKeys) {
      const { deleteRecords } = this.handledApis
      this.RSD.deleteLoading = true
      deleteRecords && this.$fetch(deleteRecords, { delids: selectionKeys }).done(data => {
        this.$message({
          message: data ? '已删除！' : '删除失败，请稍后重试',
          type: data ? 'success' : 'error'
        })
        selectionKeys.forEach(id => {
          const idx = this.data.list.findIndex(item => (item.id === id))
          idx > -1 && this.data.list.splice(idx, 1)
        })
        this.data.total -= selectionKeys.length
        this.selectionKeys = []
        this.RSD.deleteLoading = false
      }).faile(e => {
        this.RSD.deleteLoading = false
      })
    }
  }

}
