import ListPageTpl from '@/components/ListPageTpl'
import commonMixin from './commonMixin'
import RadioTags from '@/components/RadioTags'
import { formDefProps } from '@/components/SearchForm/vindex'
import { Storage } from '@/utils'

const listPageStore = Storage.namespace('listPageStore')
export default {
  components: {
    ListPageTpl,
    RadioTags
  },
  mixins: [commonMixin],
  data () {
    return this.initCompData({
      power: {}, // 权限
      data: {}, //  数据
      loading: false, // 数据加载标记
      refresh: false, // 刷新列表
      originFormItems: [], // 表单搜索项的原始数据
      itemsParams: {}, // 表单搜索项的数据。
      formData: {}, // 表单域绑定数据
      searchParams: {}, // 存储表单搜索条件数据，处理过后的
      searching: false, // 搜索标记
      sending: false, // 操作按钮请求发送标记
      statisTags: [], // 筛选维度标签数组
      selectionKeys: [] // 选择栏选中项
    }, {
      currentTab: '', // 当前tab值
      formProp: formDefProps, // 搜索表单域同一样式
      RSD: {}, // 页面独有数据
      RMD: {},
      fetchAccessKey: ''
    })
  },
  computed: {
    // 导出按钮地址
    exportUrl () {
      const { RMD: { filterExportParams }, handledApis: { exportPageList }, power, currentTab } = this
      const api = typeof exportPageList === 'function' ? exportPageList : (exportPageList && typeof exportPageList[currentTab] === 'function' ? exportPageList[currentTab] : null)
      return (!power.hasOwnProperty('export') || power.export) && api && filterExportParams ? exportPageList(filterExportParams.call(this, this.searchParams)) : ''
    },
    // 表格组件的配置数据
    tableProps () {
      return this.RMD.table
    },
    // 是否需要维度标签，需要配合获取维度标签数据的接口使用
    needTags () {
      return this.RMD.needTags
    },
    // 是否需要动态获取搜索条件项使用数据
    needGetParams () {
      return this.RMD.needGetParams
    },
    // 是否需要维度标签，需要配合获取维度标签数据的接口使用
    independentPower () {
      return this.RMD.independentPower
    },
    // 维度标签文案
    wdLabelText () {
      return this.RMD.wdLabelText
    },
    // 处理过后的搜索条件数组
    handledFormItems () {
      this.originFormItems = this.RMD.formItems
      return this.originFormItems
    },
    // 当前表格表头数据
    curTableColumns () {
      const { tableColumns } = this.RMD
      if (Array.isArray(tableColumns)) {
        return tableColumns
      } else if (typeof tableColumns === 'object') {
        const { currentTab } = this
        return Array.isArray(tableColumns[currentTab]) ? tableColumns[currentTab] : []
      }
      return []
    },
    // 处理过后的表头项数组
    handledColumns () {
      const { curTableColumns } = this
      let actionColumn = curTableColumns.find(item => (item.action))
      actionColumn && (actionColumn.action = this.curActionBtns)
      return curTableColumns
    },
    // 页面使用按钮集合
    actionBtns () {
      const { actionBtns } = this.RMD
      let btns = actionBtns
      typeof btns === 'function' ? (btns = actionBtns.call(this)) : this.actionBtnClickHandle(actionBtns)
      return btns && (typeof btns === 'object' || Array.isArray(btns)) ? btns : []
    },
    // 当前列表使用按钮集合
    curActionBtns () {
      const { currentTab, actionBtns } = this
      return Array.isArray(actionBtns) ? actionBtns : (actionBtns && actionBtns[currentTab] ? actionBtns[currentTab] : [])
    },
    // 搜索条件模块对象
    searchForms () {
      const { searchForms, getTabsSearchForms } = this.RMD
      if (searchForms) {
        return typeof searchForms === 'function' ? searchForms.call(this) : searchForms
      }
      const searchForm = {
        items: this.handledFormItems,
        model: this.formData,
        dynaData: this.itemsParams
      }
      return (typeof getTabsSearchForms === 'function') ? getTabsSearchForms.call(this, searchForm) : searchForm
    },
    // 列表记录修改状态时的参数处理函数
    statusParamsHandle () {
      return this.RMD.statusParamsHandle
    },
    // 新增按钮数据对象，包含按钮文字，地址
    createLinkInfo () {
      return this.RMD.createLinkInfo || {}
    },
    // 操作按钮行数据
    operation () {
      const { RMD: { operation }, currentTab } = this
      if (typeof operation === 'function') return operation.call(this, currentTab)
      operation && Array.isArray(operation.btns) && (operation.btns = operation.btns.filter(btn => {
        const isHide = typeof btn.isHide === 'function' ? btn.isHide.call(this) : btn.isHide
        if (isHide) return false
        btn.events && Object.keys(btn.events).forEach(eventName => {
          const eventFn = btn.events[eventName]
          btn.events[eventName] = typeof eventFn === 'string' ? (typeof this[eventFn] === 'function' ? this[eventFn] : () => {}) : btn.events[eventName].bind(this)
        })
        return true
      }))
      operation && (operation.lockKeys = this.RSD)
      return operation
    }
  },
  methods: {
    /** utils **/
    // 存储当前路由页面数据
    storePageData () {
      const { $route: { name }, RMD: { storePageData } } = this
      typeof storePageData === 'function' && listPageStore.session(name, storePageData())
    },
    // 获取当前路由页面存储数据
    getPageStoreData () {
      const { name } = this.$route
      return listPageStore.session(name)
    },
    // 存储当前路由页面数据
    refreshPageList () {
      this.refresh = true
    },
    // 回复或清除当前页面缓存数据
    restorePageData () {
      const { $route: { name }, RMD: { restorePageData } } = this
      const storeData = listPageStore.session(name)
      this.$store.getters.remember ? (typeof restorePageData === 'function' && restorePageData.call(this, storeData)) : listPageStore.session.remove(name)
    },
    // 按钮函数转换
    actionBtnClickHandle (btns) {
      const bindThis = item => {
        const type = typeof item.click
        if (type === 'function') {
          item.click = item.click.bind(this)
        } else if (type === 'string') {
          item.click = this[item.click] || this.doNothing
        }
        return item
      }
      if (Array.isArray(btns)) {
        btns.forEach(bindThis)
      } else if (typeof btns === 'object') {
        Object.values(btns).forEach(tabBtns => tabBtns.forEach(bindThis))
      }
    },
    // 获取路由参数
    getRouteParams () {
      this.RMD = this.initRMD()
      this.RSD = this.initRSD()
      this.needGetParams && this.getOrderSearchParams()
      this.needTags && this.getStatisticsTags()
      this.independentPower && this.getPagePowerInfo()
      // 当前路由使用数据 routeModuleData
      this.restorePageData()
      this.iniRouteState()
    },
    /** business **/
    initRSD () {
      const RSD = this.RMD.RSD || {}
      return Object.assign({
        extraForm: {}, // 传给组件的额外的搜索条件,
        table: {} // 控制表格组件配置属性
      }, RSD)
    },
    // 维度标签渲染函数
    tagTextRender (item) {
      return `${item.name}`
    },
    // 获取维度标签数据
    getStatisticsTags () {
      const { getStatisticsTags } = this.handledApis
      const { tagsParams } = this.RMD
      const params = typeof tagsParams === 'function' ? tagsParams.call(this) : tagsParams
      this.$fetch(getStatisticsTags, params).done(data => {
        data.length && (this.statisTags = data)
      })
    },
    // 获取搜素表单项数据
    getOrderSearchParams () {
      const { getSearchParams } = this.handledApis
      const { searchParams, SPpropKeyRename, paramsDataHandler } = this.RMD
      const params = typeof searchParams === 'function' ? searchParams.call(this) : searchParams
      getSearchParams && params && this.$fetch(getSearchParams, params).done(data => {
        typeof paramsDataHandler === 'function' && (data = paramsDataHandler.call(this, data))
        if (Object.keys(data).length) {
          !this.independentPower && this.handlePower(data.power)
          this.handleFormParams(SPpropKeyRename ? SPpropKeyRename(data) : data)
          this.itemsParams = data
        }
      })
    },
    // 独立获取页面权限
    getPagePowerInfo () {
      const { getPagePower } = this.handledApis
      const { powerApiParams } = this.RMD
      const params = typeof powerApiParams === 'function' ? powerApiParams.call(this) : powerApiParams
      getPagePower && this.$fetch(getPagePower, params || {}).done(data => {
        data && this.handlePower(data)
      })
    },
    // 处理getOrderSearchParams获取到的数据，提供给searchform使用
    handleFormParams (params) {
      const { formParamsFilter } = this.RMD
      const isFn = typeof formParamsFilter === 'function'
      this.originFormItems && this.originFormItems.forEach(item => {
        let { prop, fields: { data } } = item
        if (prop && params[prop] && data) {
          let dataList = params[prop]
          if (Array.isArray(dataList)) {
            dataList = isFn ? formParamsFilter(dataList) : dataList
            data.splice(1, data.length, ...dataList)
          } else if (typeof dataList === 'object') {
            for (let i in dataList) {
              Array.isArray(dataList[i]) && (dataList[i] = isFn ? formParamsFilter(dataList[i]) : dataList[i])
            }
            item.cascader ? (item.cascader = dataList) : this.$set(item, 'cascader', dataList)
          }
        }
      })
    },
    // 获取列表数据，使用getListParamsHandle可处理请求参数，使用pageListFilter可处理返回数据
    getOrderList (params, fetchAccessKey) {
      const { handledApis: { getPageList }, RMD: { getListParamsHandle }, currentTab } = this
      typeof getListParamsHandle === 'function' && (params = getListParamsHandle(params))
      const api = typeof getPageList === 'function' ? getPageList : (getPageList && typeof getPageList[currentTab] === 'function' ? getPageList[currentTab] : null)
      this.fetchAccessKey = fetchAccessKey
      api && this.$fetch(api, params).lock('loading').done(data => {
        if (this.fetchAccessKey !== fetchAccessKey) return
        const { pageListFilter } = this.RMD
        this.data = (typeof pageListFilter === 'function') ? pageListFilter.call(this, data) : data
      })
    },
    // 处理页面权限内容
    handlePower (power) {
      if (typeof power === 'object') {
        const { powerHandle } = this.RMD
        typeof powerHandle === 'function' && powerHandle.call(this, power)
      }
    },
    // 跳转到指定路由
    skipToRoute (route) {
      route && route.name && this.$router.push(route)
    },
    // 处理订单认领和退件状态
    handleOrderStatus (action, row, scope, curBtn) {
      const { claimOrder, returnOrder } = this.handledApis
      const actions = {
        claimOrder: {
          api: claimOrder,
          msg: '认领成功'
        },
        returnOrder: {
          api: returnOrder,
          msg: '退件成功'
        }
      }
      const actInfo = actions[action]
      if (!actInfo) return
      const { claimReturnParamHandle } = this.RMD
      const { work_id, item_instance_id } = row
      const { $index } = scope
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      const params = typeof claimReturnParamHandle === 'function' ? claimReturnParamHandle(row, curBtn) : { work_id, item_instance_id }
      this.$set(row, loadingKey, true)
      this.$fetch(actInfo.api, params).lock('sending').done(data => {
        this.$message({
          message: actInfo.msg,
          type: 'success'
        })
        row[loadingKey] = false
        this.data.list.splice($index, 1)
        this.data.total -= 1
      }).faile(e => {
        row[loadingKey] = false
      })
    },
    // 处理记录状态，例如：禁用/启用
    handleRecordStatus (row, scope, curBtn) {
      const { handledApis: { setRecordStatus }, statusParamsHandle, RMD: { statusAlias } } = this
      const { id, status } = Object.assign({ id: 'id', status: 'status' }, statusAlias || {})
      if (!setRecordStatus || !row[id] || !statusParamsHandle) return
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      this.$set(row, loadingKey, true)
      const params = statusParamsHandle(row)
      this.$fetch(setRecordStatus, params).lock('sending').done(data => {
        row[loadingKey] = false
        row[status] = params[status]
      }).faile(e => {
        row[loadingKey] = false
      })
    },
    // 处理订单操作记录， 如认领、退件等操作
    handleOrderOperation (action, row, scope, curBtn) {
      const { handledApis: { setOrderStatus }, actionsInfo } = this.RMD
      const actInfo = actionsInfo[action]
      if (!actInfo) return
      const { orderStatusParamHandle } = this.RMD
      const { id } = row
      const { $index } = scope
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      const params = typeof orderStatusParamHandle === 'function' ? orderStatusParamHandle(row, curBtn, actInfo) : { id }
      this.$set(row, loadingKey, true)
      const api = !setOrderStatus ? actInfo.api : setOrderStatus
      this.$fetch(api, params).lock('sending').done(data => {
        this.$message({
          message: actInfo.msg,
          type: 'success'
        })
        row[loadingKey] = false
        this.data.list.splice($index, 1)
        this.data.total -= 1
      }).faile(e => {
        row[loadingKey] = false
      })
    },
    handleOrder (row, scope, curBtn) {
      const { btnKey } = curBtn
      this.handleOrderOperation(btnKey, row, scope, curBtn)
    },
    // 删除记录状态
    deleteRecord (row, scope, curBtn) {
      const { deleteRecord } = this.handledApis
      const { deleteParams } = this.RMD
      const params = typeof deleteParams === 'function' ? deleteParams(row) : null
      if (!deleteRecord || !params) return
      const { $index } = scope
      const loadingKey = curBtn.loadingKey || 'BTNSending'
      this.$set(row, loadingKey, true)
      this.$fetch(deleteRecord, params).lock('sending').done(data => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.data.list.splice($index, 1)
        this.data.total -= 1
      }).faile(e => {
        row[loadingKey] = false
      })
    },
    /** event **/
    // 空事件
    doNothing () {},
    // 订单认领
    claimOrder (row, scope, curBtn) {
      this.handleOrderStatus('claimOrder', row, scope, curBtn)
    },
    // 订单退件
    returnOrder (row, scope, curBtn) {
      this.handleOrderStatus('returnOrder', row, scope, curBtn)
    },
    // 跳转详情页
    skipToDetail (row, scope, curBtn) {
      const { getDetailRoute, detailRouteName } = this.RMD
      if (typeof getDetailRoute === 'function') {
        this.skipToRoute(getDetailRoute(row, scope, curBtn))
      } else if (detailRouteName && row.id) {
        this.skipToRoute({ name: detailRouteName, query: { id: row.id } })
      }
    },
    // 跳转到编辑页面
    skipToEdit (row) {
      const { editRouteName } = this.RMD
      if (editRouteName) {
        let route = { name: editRouteName }
        row.id && (route.query = { id: row.id })
        this.skipToRoute(route)
      }
    },
    // 跳转到新增页面
    skipToAdd (row) {
      const { addRouteName } = this.RMD
      if (addRouteName) {
        let route = { name: addRouteName }
        row.id && (route.query = { id: row.id })
        this.skipToRoute(route)
      }
    },
    // 禁用记录
    disabledRecord (...args) {
      this.handleRecordStatus(...args)
    }
  }

}
