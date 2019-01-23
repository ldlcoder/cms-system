import { createInputFormItem } from '@/pages/common/moduleCommon'
import { getOperationInfo, addOperationInfo, sendOperationInfo } from '@/api/companyMana'
import { parseCode, parseWord } from '@/common/provCityData'
import { createItemProps, getCommonOptions } from '../common'
import { getCommonFieldsItems, formDynamicDataHandler } from './commonData'
import { objKeysRename } from '@/utils'

const { company, dist, bank, responsible } = getCommonFieldsItems(['默认合作银行', 'bank', true])
const fieldItems = [
  company,
  createInputFormItem(createItemProps('业务地区名称', true), '请输入业务地区名称', 'name'),
  dist,
  bank,
  responsible
]

export default Object.assign(getCommonOptions({detailParamsKey: 'operation_id'}), {
  fieldItems,
  hasDynamData: true,
  listRouteName: 'AreaList',
  editParamId: 'operationid',
  handleFormDynamicData (data) {
    formDynamicDataHandler(this.RMD, data.data)
  },
  formDataHandle (data, isSend) {
    if (isSend) {
      const dist = parseCode(data.city, true)
      let params = objKeysRename(data, {'company_id': 'companyid', operationid: 'operationid', name: 'name', bank: 'bank', responsible: 'responsible'})
      return Object.assign({province: dist.province, city: dist.city}, params)
    } else {
      data.city = parseWord(data.city, 'city')
      return data
    }
  },
  handledApis: {
    getDetailInfo: getOperationInfo,
    addDetailInfo: addOperationInfo,
    sendDetailInfo: sendOperationInfo
  }
})
