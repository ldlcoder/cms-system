import { getCustomerManageList } from '@/api/customerMana'
import { checkoutTableColumns, createSelectFormItem, checkoutFormItems, createTbItem } from '@/common'
import store from '@/store'
import customerManaTemp from '../template/customerManaTemp'
import { viewBtn } from '@/common/commonData/actionBtns'

export const switchFilter = store.getters.switchFilter
const formItems = checkoutFormItems({
  name: null,
  mobile: null,
  accountManagerName: createSelectFormItem('客户经理', 'hasAccountManager', 0, store.getters.appConfig.customerManager),
  hasAppointment: createSelectFormItem('预约看车', 'hasAppointment', 0, store.getters.appConfig.appointmentSeeCar),
  hasOrder: createSelectFormItem('有无订单', 'hasOrder', 0, store.getters.appConfig.hasOrder)
}
)
const tableColumns = checkoutTableColumns({
  nickname: null,
  name: null,
  mobile: null,
  appointmentCounter: createTbItem('预约看车', 'appointmentCounter', {
    formatter: (row, column, cellValue, index) => {
      const filter = switchFilter('appointmentSeeCar')
      return filter(cellValue)
    }
  }),
  tradeCounter: createTbItem('有无订单', 'tradeCounter', {
    formatter: (row, column, cellValue, index) => {
      const filter = switchFilter('hasOrder')
      return filter(cellValue)
    }
  }),
  time: {
    label: '注册时间',
    prop: 'created_at'
  },
  address: createTbItem('所在地区', 'address'),
  inviter: null,
  action: null
})
// 公共通用配置
export function handleBtns () {
  const { RouteRights } = this
  let actionBtns = []
  if (RouteRights) {
    RouteRights.includes('change') && actionBtns.push(viewBtn({
      text: '换绑客户经理',
      btnKey: 'edit',
      click: (row) => {
        Object.assign(this.RSD.changeConfirm, { show: true, data: row })
      }
    }))
  }
  return actionBtns
}

export default{
  RSD: {
    changeConfirm: {
      show: false,
      data: {}
    }
  },
  pageTemplate: customerManaTemp,
  formItems,
  tableColumns,
  handledApis: {
    getPageList: getCustomerManageList
  },
  actionBtns: handleBtns
}
