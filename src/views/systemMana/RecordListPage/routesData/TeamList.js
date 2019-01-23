import {getTableColumns, getFormItems, createFormItem, getCommonOptions} from '../common'
import {getTeamList, setTeamStatus} from '@/api/companyMana'
const formItems = getFormItems({
  name: createFormItem({label: '业务团队名称', labelWidth: '100px'}, '请输入业务团队名称', 'name'),
  responsible: null,
  operation: createFormItem({label: '所属业务地区', labelWidth: '100px'}, '请输入所属业务地区', 'operation')
})
const tableColumns = getTableColumns({
  name: {
    label: '业务团队名称',
    prop: 'name'
  },
  responsible: null,
  compName: null,
  operationName: null,
  time: null,
  addUser: null,
  action: null
})

export default Object.assign(getCommonOptions({statusKey: 'teamid', addBtnText: '新增业务团队'}), {
  formItems,
  tableColumns,
  editRouteName: 'EditTeam',
  handledApis: {
    getPageList: getTeamList,
    setRecordStatus: setTeamStatus
  }
})
