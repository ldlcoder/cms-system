import { checkoutTableColumns, checkoutFormItems, handleFormData } from '@/common'
import { viewBtn, editSkipBtn } from '@/common/commonData/actionBtns'
import { getOrderPayList } from '@/api/orderMana'
import store from '@/store'

const formItems = checkoutFormItems({
  'name': { prop: 'customer_name' },
  'idcard': { prop: 'customer_idcard' },
  'payType': { prop: 'fund_type' },
  'time': null
})
const tableColumns = checkoutTableColumns({
  orderRandomId: { prop: 'order_sn' },
  name: { prop: 'customer_name' },
  idcard: { prop: 'customer_idcard' },
  mobile: { prop: 'customer_mobile' },
  payType: { prop: 'fund_type_name' },
  money: { label: '支付金额', prop: 'pay_money' },
  time: { label: '支付时间', prop: 'pay_time' }
})

export default {
  RSD: {},
  handleFormData: formData => handleFormData(formData, ['pay_start_time', 'pay_end_time']),
  table: {
    showSummary: true,
    summaryMethod (params) {
      const { columns, data } = params
      if (!data.length) return []
      const sums = []
      columns.forEach((item, index) => {
        sums.push(index === 0 ? '汇总' : (item.property === 'pay_money' ? store.state.routePageData.OrderPayList.moneySum : ''))
      })
      return sums
    }
  },
  pageListFilter (data) {
    this.$store.commit('SET_PAGE_DATA', { routeName: 'OrderPayList', key: 'moneySum', value: data.total_money })
    return data
  },
  editRouteName: 'OrderEdit',
  detailRouteName: 'OrderDetail',
  formItems,
  tableColumns,
  actionBtns () {
    let btns = []
    this.RouteRights.includes('detail') && btns.push(viewBtn({ click: this.skipToDetail }))
    this.RouteRights.includes('edit') && btns.push(editSkipBtn({ click: this.skipToEdit }))
    return btns
  },
  handledApis: {
    getPageList: getOrderPayList
  }
}
