import { checkoutFormItems, createInputFormItem, createSelectFormItem } from '@/common'
import { getTableColumns, getCommonOptions, handleFormData } from '../common'
import { getCarManagerList, handleCarStatus, deleteCars } from '@/api/carMana'
import { wordMoney } from '@/utils/formatter'
const formItems = checkoutFormItems({
  carBrand: createInputFormItem('车辆品牌', '车辆品牌', 'car_brand'),
  carType: null
})
const createFormItemTime = (label) => checkoutFormItems({
  time: { props: { label } }
})
const tableColumns = getTableColumns([
  {
    prop: '_select',
    hide: true,
    type: 'selection',
    className: 'selection-column'
  },
  {
    label: '序号',
    type: 'index',
    width: '80px'
  },
  {
    label: '车辆品牌',
    prop: 'car_brand'
  },
  {
    label: '车系',
    prop: 'system'
  },
  {
    label: '车辆型号',
    prop: 'model'
  },
  'isNew',
  {
    label: '厂商指导价',
    prop: 'msrp',
    formatter: (row, column, cellValue, index) => {
      return wordMoney(cellValue, '0,0.00')
    }
  },
  'time',
  {
    label: '处理人',
    prop: 'brokerage'
  },
  'action'
])
export function getTabsSearchForms (searchForm) {
  let tab = []
  this.RouteRights.includes('upList') && tab.push(Object.assign({ label: '已上架车辆', name: '1' }, searchForm, { items: searchForm.items.concat(createFormItemTime('上架时间')) }))
  this.RouteRights.includes('downList') && tab.push(Object.assign({ label: '已下架车辆', name: '2' }, searchForm, { items: searchForm.items.concat(createFormItemTime('下架时间')) }))
  return tab
}
export const claimAndReturnBtns = () => ({
  '1': [
    {
      text: '下架',
      btnKey: 'soldOut',
      type: 'confirm',
      loadingKey: 'soldOutBtn',
      confirmMsg: '确定下架此车辆?',
      btype: 'warning',
      click: 'handleOrder'
    },
    {
      text: '查看',
      btnKey: 'handle',
      click: 'skipToDetail'
    }
  ],
  '2': [
    {
      text: '上架',
      btnKey: 'putAway',
      type: 'confirm',
      loadingKey: 'putAwayBtn',
      confirmMsg: '确定上架此车辆?',
      btype: 'warning',
      click: 'handleOrder'
    },
    {
      text: '查看',
      btnKey: 'handle',
      click: 'skipToDetail'
    },
    {
      text: '修改',
      btnKey: 'handle',
      click: 'skipToEdit'
    }
  ]
})
export function createOperation () {
  const addBtn = {
    props: {
      icon: 'lr-icon-tianjia'
    },
    text: '新增车辆',
    events: {
      click: this.skipToAdd
    }
  }
  const delBtn = {
    props: {
      icon: 'lr-icon-tianjia',
      type: 'danger'
    },
    text: '删除车辆',
    events: {
      click: this.deleteRecordsConfirm
    }
  }
  return {
    show: true,
    btns: (this.RouteRights.includes('add') ? [addBtn] : []).concat(this.RouteRights.includes('delete') && this.currentTab === '2' ? [delBtn] : [])
  }
}

export default Object.assign(getCommonOptions({ detailName: 'CarDetail' }), {
  RSD: {
    deleteLoading: false
  },
  hasTab: true,
  getTabsSearchForms: getTabsSearchForms,
  actionBtns: claimAndReturnBtns(),
  actionsInfo: {
    soldOut: {
      api: handleCarStatus,
      msg: '下架成功',
      status: 2
    },
    putAway: {
      api: handleCarStatus,
      msg: '上架成功',
      status: 1
    }
  },
  orderStatusParamHandle: (row, btn, curActionInfo) => ({ id: row.id, status: curActionInfo.status }),
  editRouteName: 'CarEdit',
  addRouteName: 'CarAdd',
  formItems,
  tableColumns,
  handleFormData,
  listTableProps: {
    selectionKey: 'id'
  },
  deleteParams (row) {
    return { id: row.id }
  },
  operation: createOperation,
  handledApis: {
    getPageList: getCarManagerList,
    deleteRecords: deleteCars
  },
  handleTabChange (value, obj) {
    const curTab = (value - 1 === 0)
    if (obj.RMD.tableColumns && Array.isArray(obj.RMD.tableColumns)) {
      obj.RMD.tableColumns[0].hide = curTab
      obj.RMD.tableColumns[7].label = curTab ? '上架时间' : '下架时间'
    }
  }
})
