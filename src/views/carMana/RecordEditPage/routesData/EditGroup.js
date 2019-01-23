import { createInputFormItem, createSelectFormItem } from '@/pages/common/moduleCommon'
import { getGroupInfo, addGroupInfo, sendGroupInfo } from '@/api/companyMana'
import { parseCode, parseWord } from '@/common/provCityData'
import { createItemProps, getCommonOptions } from '../common'
import { getCommonFieldsItems, formDynamicDataHandler } from './commonData'
import { objKeysRename } from '@/utils'

const { company, dist, operation, responsible } = getCommonFieldsItems(['默认合作银行', 'bank', true])
const fieldItems = [
  company,
  operation,
  createSelectFormItem(createItemProps('所属业务团队', true), 'team_id', '', null, false, {cascaderModel: 'operation_id'}),
  createInputFormItem(createItemProps('业务小组名称', true), '请输入业务小组名称', 'name'),
  dist,
  responsible
]

export default Object.assign(getCommonOptions({detailParamsKey: 'group_id'}), {
  fieldItems,
  hasDynamData: true,
  listRouteName: 'GroupList',
  editParamId: 'groupid',
  handleFormDynamicData (data) {
    formDynamicDataHandler(this.RMD, data.data, {operation: true, team: true})
  },
  formDataHandle (data, isSend) {
    if (isSend) {
      const dist = parseCode(data.city, true)
      let params = objKeysRename(data, {'company_id': 'companyid', groupid: 'groupid', 'team_id': 'teamid', 'operation_id': 'operationid', name: 'name', bank: 'bank', responsible: 'responsible'})
      return Object.assign({province: dist.province, city: dist.city}, params)
    } else {
      data.city = parseWord(data.city, 'city')
      return data
    }
  },
  handledApis: {
    getDetailInfo: getGroupInfo,
    addDetailInfo: addGroupInfo,
    sendDetailInfo: sendGroupInfo
  }
})