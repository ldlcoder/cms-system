import {getTableColumns, getFormItems, createFormItem, getCommonOptions} from '../common'
import {getOperationalList, setOperationalStatus} from '@/api/companyMana'
const formItems = getFormItems({
  name: createFormItem({label: '运营中心名称', labelWidth: '100px'}, '请输入运营中心名称', 'name'),
  responsible: null
})
const tableColumns = getTableColumns({
  name: {
    label: '运营中心名称',
    prop: 'name'
  },
  responsible: null,
  compName: null,
  bank: null,
  time: null,
  addUser: null,
  action: null
})

export default Object.assign(getCommonOptions({statusKey: 'operationalid', addBtnText: '新增运营中心'}), {
  formItems,
  tableColumns,
  editRouteName: 'EditOperation',
  handledApis: {
    getPageList: getOperationalList,
    setRecordStatus: setOperationalStatus
  }
})
