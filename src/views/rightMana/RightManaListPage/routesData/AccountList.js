import { checkoutFormItems } from '@/common'
import { getTableColumns, getCommonOptions } from '../common'
import { getMembersList, getSearchParams } from '@/api/common'
import { deleteUser } from '@/api/rightMana'
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
  'dataPermission',
  'roles',
  'ctime',
  {
    label: '创建人',
    prop: 'created_admin_user'
  },
  'action'
])
export default Object.assign(getCommonOptions(), {
  RSD: {
    extraForm: { type: 2 }
  },
  editRouteName: 'AccountEdit',
  addRouteName: 'AccountAdd',
  SPpropKeyRename,
  formItems,
  tableColumns,
  deleteParams (row) {
    return { id: row.id }
  },
  operation: {
    show: true,
    btns: [
      {
        isHide () {
          return !(this.$route.meta && this.$route.meta.actions && this.$route.meta.actions.includes('add'))
        },
        props: {
          icon: 'lr-icon-tianjia'
        },
        text: '新增用户',
        events: {
          click: 'skipToAdd'
        }
      }
    ]
  },
  needGetParams: true,
  searchParams: {},
  handledApis: {
    getPageList: getMembersList,
    deleteRecord: deleteUser,
    getSearchParams: getSearchParams
  }
})
