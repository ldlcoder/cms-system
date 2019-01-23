import PaginationList from '../PaginationList'
import CommonTable from '../CommonTable'
import Store from 'store2'
const propsDefault = {
  highlightCurrentRow: false
}
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
  name: 'ListTable',
  components: {
    PaginationList,
    CommonTable
  },
  props: {
    table: Object,
    tableEvents: Object,
    pagination: Object,
    columns: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    refresh: Boolean,
    data: Object,
    listExtraForm: Object,
    getDataList: {
      type: Function,
      required: true
    },
    selectionKey: [String, Function],
    selectionKeys: Array,
    autoSendcreat: {
      type: Boolean,
      default: true
    },
    pageSizeKey: {
      type: String,
      default: 'size'
    },
    curPageKey: {
      type: String,
      default: 'page'
    },
    storeKey: String,
    createdAutoSend: Boolean,
    remember: Boolean
  },
  data () {
    const data = {
      sort: {}
    }
    return this.remember && compSession('listTable', 'data') ? Object.assign({}, data, compSession('listTable', 'data')) : data
  },
  computed: {
    handleRefresh: {
      get () { return this.refresh },
      set (value) { this.$emit('update:refresh', value) }
    },
    extraForm () {
      return Object.assign({}, this.sort, this.listExtraForm)
    }
  },
  watch: {
    selectionKeys: {
      handler () {
        !this.selectionKeys.length && this.$refs.commonTable && this.$refs.commonTable.$refs.table.clearSelection()
      },
      deep: true
    }
  },
  methods: {
    // utils
    filterProp (obj, prop) {
      const defaultSort = this.defaultSort()
      return Object.assign({}, propsDefault, defaultSort, obj)
    },
    defaultSort () {
      return this.remember && this.sort.orderby ? {defaultSort: {prop: this.sort.orderby, order: this.sort.sort}} : {}
    },
    // bussiness
    // events
    handleSelectionChange (values) {
      if (!this.selectionKeys) return
      let { selectionKey } = this
      let keys = selectionKey
        ? values.map(item => {
          if (typeof selectionKey === 'string') {
            return item[selectionKey]
          } else if (typeof selectionKey === 'function') {
            return selectionKey(item)
          }
        })
        : values
      this.$emit('update:selectionKeys', keys)
    },
    handleSortChange (values) {
      if (values.column && values.column.sortable === 'custom' && values.prop && values.order) {
        const sort = {
          orderby: values.prop,
          order: (values.order === 'descending' ? 'desc' : 'asc')
        }
        compSession('listTable', 'data', { sort })
        this.sort = sort
      }
    }

  }
}
