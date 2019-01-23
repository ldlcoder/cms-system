import { createInputFormItem } from '@/pages/common/moduleCommon'
import { getOperationalInfo, addOperationalInfo, sendOperationalInfo } from '@/api/companyMana'
import { parseCode, parseWord } from '@/common/provCityData'
import { createItemProps, getCommonOptions } from '../common'
import { getCommonFieldsItems, formDynamicDataHandler } from './commonData'
import { objKeysRename } from '@/utils'

const { company, dist, bank, responsible } = getCommonFieldsItems(['合作银行', 'bank', true, 'checkbox'])
const fieldItems = [
  company,
  createInputFormItem(createItemProps('运营中心名称', true), '请输入运营中心名称', 'name'),
  dist,
  bank,
  responsible
]

export default Object.assign(getCommonOptions({detailParamsKey: 'operational_id'}), {
  fieldItems,
  hasDynamData: true,
  listRouteName: 'OperationList',
  editParamId: 'operationalid',
  handleFormDynamicData (data) {
    formDynamicDataHandler(this.RMD, data.data)
  },
  formDataHandle (data, isSend) {
    if (isSend) {
      const dist = parseCode(data.city, true)
      let params = objKeysRename(data, {'company_id': 'companyid', operationalid: 'operationalid', name: 'name', bank: 'bank', responsible: 'responsible'})
      params.bank = params.bank.join(',')
      return Object.assign({province: dist.province, city: dist.city}, params)
    } else {
      data.city = parseWord(data.city, 'city')
      data.bank = data.bank.split(',')
      return data
    }
  },
  handledApis: {
    getDetailInfo: getOperationalInfo,
    addDetailInfo: addOperationalInfo,
    sendDetailInfo: sendOperationalInfo
  }
})
