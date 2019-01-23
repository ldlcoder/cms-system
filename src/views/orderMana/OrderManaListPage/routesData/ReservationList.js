import { SPpropKeyRename } from '../common'
import { checkoutTableColumns, checkoutFormItems } from '@/common'
import { getSearchParams } from '@/api/common'
import { getAppointmentList } from '@/api/orderMana'
const formItems = checkoutFormItems(['name', 'mobile', 'subCompany', 'team'])
const tableColumns = checkoutTableColumns({
  name: null,
  mobile: null,
  model: null,
  subCompany: null,
  team: null,
  time: {
    label: '预约时间',
    prop: 'created_at'
  }
})
export default{
  SPpropKeyRename,
  formItems,
  tableColumns,
  needGetParams: true,
  searchParams: {},
  handledApis: {
    getPageList: getAppointmentList,
    getSearchParams: getSearchParams
  }
}
