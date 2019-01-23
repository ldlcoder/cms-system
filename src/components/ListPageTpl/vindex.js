import ListTable from '@/components/ListTable'
import SearchForm from '@/components/SearchForm'
import Store from 'store2'
import { cloneJsonObj } from '@/utils'

const compSession = (namespace, key, value) => {
  const data = Store.session(namespace) || {}
  if (typeof value !== 'undefined') {
    data[key] = value
    Store.session(namespace, data)
  } else {
    return data[key]
  }
}

export default {
  name: 'ListPageTpl',
  components: {
    SearchForm,
    ListTable
  },
  props: {
    exportEvents: {
      type: Object,
      default: () => ({})
    },
    data: Object,
    loading: Boolean,
    columns: Array, // 表头
    tabFormKey: String,
    getDataList: Function, // 获得表单数据的方法
    searchForms: [Array, Object], // 顶部切换
    formProps: Object,
    extraForm: Object,
    table: Object,
    exportUrl: String,
    handleFormData: Function,
    createdAutoSend: Boolean,
    searchParams: Object,
    currentTab: String,
    remember: Boolean,
    refresh: Boolean,
    listTableProps: {
      type: Object,
      default: () => ({})
    },
    operation: Object,
    selectionKeys: Array
  },
  data () {
    const { name } = this.$route
    return {
      curTab: this.remember && compSession('tabKey', name) ? compSession('tabKey', name) : this.getActiveTab(),
      searchForm: this.remember && compSession('searchForm', name) ? compSession('searchForm', name) : {},
      hasTabs: (Array.isArray(this.searchForms) && this.searchForms.length > 0)
    }
  },
  computed: {
    handleSelectionKeys: {
      get () {
        return this.selectionKeys
      },
      set (value) {
        this.$emit('update:selectionKeys', value)
      }
    },
    handleRefresh: {
      get () { return this.refresh },
      set (value) { this.$emit('update:refresh', value) }
    },
    storeKey () {
      return this.$route.name
    },
    checkListShow () {
      const { columns, remember, data: { list } } = this
      return columns.length && (!remember || (remember && list))
    },
    currentTabKey () {
      compSession('tabKey', this.storeKey, this.curTab)
      this.$emit('update:currentTab', this.curTab)
    },
    handledSearchForms () {
      const result = {}
      this.hasTabs && this.searchForms.forEach(item => {
        const { name, items, model, dynaData } = item
        result[name] = { items: items, model: model || {}, dynaData: dynaData || {} }
      })
      return result
    },
    curSearchForm () {
      const { searchForm, curTab, hasTabs, tabFormKey } = this
      const curSearchForm = hasTabs ? (searchForm[curTab] || {}) : searchForm
      hasTabs && tabFormKey && (curSearchForm[tabFormKey] = curTab)
      return curSearchForm
    },
    handleExtraForm () {
      const searchParams = { ...this.extraForm, ...this.curSearchForm }
      this.$emit('update:searchParams', searchParams)
      return searchParams
    }
  },
  created () {
  },
  watch: {
    'searchForms' () {
      this.hasTabs = Array.isArray(this.searchForms) && this.searchForms.length > 0
    },
    '$route.name' () {
      this.curTab = this.getActiveTab()
      this.searchForm = {}
    }
  },
  methods: {
    // utils
    getActiveTab () {
      return Array.isArray(this.searchForms) && this.searchForms[0].name ? this.searchForms[0].name : ''
    },
    // business
    // 合并操作按钮默认属性
    opeBtnProps (props = {}) {
      return Object.assign({ type: 'primary', size: 'medium' }, props)
    },
    formSearching (formData) {
      const formdata = cloneJsonObj(this.handleFormData ? this.handleFormData(formData) : formData)
      const { hasTabs, curTab, searchForm, $route: { name } } = this
      hasTabs ? this.$set(searchForm, curTab, formdata) : (this.searchForm = formdata)
      compSession('searchForm', name, cloneJsonObj(this.searchForm))
    }
      
  }
}
