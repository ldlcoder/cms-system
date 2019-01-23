import {getTableColumns, getFormItems, createFormItem, getCommonOptions} from '../common'
import {getCompanyList, setCompanyStatus} from '@/api/companyMana'
const formItems = getFormItems({
  name: createFormItem('公司名称', '请输入公司名称', 'name'),
  responsible: null
})
const tableColumns = getTableColumns({
  name: {
    label: '公司名称',
    prop: 'name'
  },
  address: {
    label: '公司地址',
    prop: 'address'
  },
  responsible: null,
  time: null,
  addUser: null,
  action: null
})

export default Object.assign(getCommonOptions({statusKey: 'companyid', addBtnText: '新增公司'}), {
  formItems,
  tableColumns,
  editRouteName: 'EditFirm',
  handledApis: {
    getPageList: getCompanyList,
    setRecordStatus: setCompanyStatus
  }
})
