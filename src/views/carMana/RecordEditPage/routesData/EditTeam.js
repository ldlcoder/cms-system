import { createInputFormItem } from '@/pages/common/moduleCommon'
import { getTeamInfo, addTeamInfo, sendTeamInfo } from '@/api/companyMana'
import { parseCode, parseWord } from '@/common/provCityData'
import { createItemProps, getCommonOptions } from '../common'
import { getCommonFieldsItems, formDynamicDataHandler } from './commonData'
import { objKeysRename } from '@/utils'

const { company, dist, operation, responsible } = getCommonFieldsItems(['默认合作银行', 'bank', true])
const fieldItems = [
  company,
  operation,
  createInputFormItem(createItemProps('业务团队名称', true), '请输入业务团队名称', 'name'),
  dist,
  responsible
]

export default Object.assign(getCommonOptions({detailParamsKey: 'team_id'}), {
  fieldItems,
  hasDynamData: true,
  listRouteName: 'TeamList',
  editParamId: 'teamid',
  handleFormDynamicData (data) {
    formDynamicDataHandler(this.RMD, data.data, {operation: true})
  },
  formDataHandle (data, isSend) {
    if (isSend) {
      const dist = parseCode(data.city, true)
      let params = objKeysRename(data, {'company_id': 'companyid', teamid: 'teamid', 'operation_id': 'operationid', name: 'name', bank: 'bank', responsible: 'responsible'})
      return Object.assign({province: dist.province, city: dist.city}, params)
    } else {
      data.city = parseWord(data.city, 'city')
      return data
    }
  },
  handledApis: {
    getDetailInfo: getTeamInfo,
    addDetailInfo: addTeamInfo,
    sendDetailInfo: sendTeamInfo
  }
})