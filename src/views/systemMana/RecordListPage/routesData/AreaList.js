import {getTableColumns, getFormItems, createFormItem, getCommonOptions} from '../common'
import {getOperationList, setOperationStatus} from '@/api/companyMana'
const formItems = getFormItems({
  name: createFormItem({label: '业务地区名称', labelWidth: '100px'}, '请输入业务地区名称', 'name'),
  responsible: null
})
const tableColumns = getTableColumns({
  name: {
    label: '业务地区名称',
    prop: 'name'
  },
  responsible: null,
  compName: null,
  bank: {
    label: '默认合作银行'
  },
  time: null,
  addUser: null,
  action: null
})

export default Object.assign(getCommonOptions({statusKey: 'operationid', addBtnText: '新增业务地区'}), {
  formItems,
  tableColumns,
  editRouteName: 'EditArea',
  handledApis: {
    getPageList: getOperationList,
    setRecordStatus: setOperationStatus
  }
})
