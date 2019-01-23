import { getSearchFormItems, SPpropKeyRename } from '../common'
import { viewBtn, editSkipBtn } from '@/common/commonData/actionBtns'
import { getOrderAuditList } from '@/api/orderAudit'
import { checkoutTableColumns } from '@/common'
import { getSearchParams } from '@/api/common'
const formItems = getSearchFormItems()
const tableColumns = checkoutTableColumns(['orderRandomId', 'name', 'idcard', 'mobile', 'model', 'isNew', 'subCompany', 'team', 'time', 'status', 'action'])
export function handleBtns () {
  const { actions } = this.$route.meta
  let actionBtns = []
  if (actions) {
    actions.includes('edit') && actionBtns.push({
      text: '修改',
      btnKey: 'edit',
      click: typeof this.skipToEdit === 'function' ? this.skipToEdit : () => {}
    })
    actions.includes('detail') && actionBtns.push(viewBtn({ click: typeof this.skipToDetail === 'function' ? this.skipToDetail : () => {} }))
  }
  return actionBtns
}

export default {
  RSD: {
    extraForm: { status_type: 4 }
  },
  editRouteName: 'OrderEdit',
  detailRouteName: 'OrderDetail',
  SPpropKeyRename,
  formItems,
  tableColumns,
  actionBtns () {
    let btns = []
    this.RouteRights.includes('detail') && btns.push(viewBtn({ click: this.skipToDetail }))
    this.RouteRights.includes('edit') && btns.push(editSkipBtn({ click: this.skipToEdit }))
    return btns
  },
  needGetParams: true,
  searchParams: {},
  handledApis: {
    getPageList: getOrderAuditList,
    getSearchParams: getSearchParams
  }
}
