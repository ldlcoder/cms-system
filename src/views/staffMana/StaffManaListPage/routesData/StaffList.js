import { checkoutFormItems } from '@/common'
import { getTableColumns, getCommonOptions } from '../common'
import { getMembersList, getSearchParams } from '@/api/common'
import { setStaffStatus } from '@/api/staffMana'
import { objKeysRename } from '@/utils'

// 搜索条件项返回数据字段转换---数据
const propKeyMap = {
  sub_company: 'company_sub_id',
  team: 'team_id'
}

// 搜索条件项返回数据字段转换---函数
export function SPpropKeyRename (obj) {
  return objKeysRename(obj, propKeyMap)
}

const formItems = checkoutFormItems(['name', 'mobile', 'roleId', 'subCompany', 'team'])
const tableColumns = getTableColumns([
  {
    label: '姓名',
    prop: 'name'
  },
  'mobile',
  'subCompany',
  'team',
  'etime',
  'roles',
  'action'
])
export default Object.assign(getCommonOptions({ detailName: 'StaffDetail', statusKey: 'id' }), {
  RSD: {
    extraForm: { type: 1 }
  },
  statusAlias: { status: 'is_active' },
  statusParamsHandle (row) {
    const { id, is_active: isActive } = row
    return { id, 'is_active': 1 ^ isActive }
  },
  SPpropKeyRename,
  formItems,
  tableColumns,
  needGetParams: true,
  searchParams: {},
  handledApis: {
    getPageList: getMembersList,
    setRecordStatus: setStaffStatus,
    getSearchParams: getSearchParams
  }
})
