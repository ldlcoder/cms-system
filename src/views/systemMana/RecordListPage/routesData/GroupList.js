import {getTableColumns, getFormItems, createFormItem, getCommonOptions} from '../common'
import {getGroupList, setGroupStatus} from '@/api/companyMana'
const formItems = getFormItems({
  name: createFormItem({label: '业务小组名称', labelWidth: '100px'}, '请输入业务小组名称', 'name'),
  responsible: null,
  team: createFormItem('所属团队', '请输入所属团队', 'team')
})
const tableColumns = getTableColumns({
  name: {
    label: '业务小组名称',
    prop: 'name'
  },
  responsible: null,
  compName: null,
  operationName: null,
  teamName: {
    label: '所属业务团队',
    prop: 'teamname'
  },
  time: null,
  addUser: null,
  action: null
})

export default Object.assign(getCommonOptions({statusKey: 'groupid', addBtnText: '新增业务小组'}), {
  formItems,
  tableColumns,
  createLinkInfo: {
    name: 'detailgroup',
    text: '新增业务小组'
  },
  editRouteName: 'editorgroup',
  handledApis: {
    getPageList: getGroupList,
    setRecordStatus: setGroupStatus
  }
})
