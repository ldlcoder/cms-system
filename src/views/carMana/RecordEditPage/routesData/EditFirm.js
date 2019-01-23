import { createInputFormItem } from '@/pages/common/moduleCommon'
import { getCompanyInfo, addCompanyInfo, sendCompanyInfo } from '@/api/companyMana'
import { parseCode, parseWord } from '@/common/provCityData'
import { createItemProps, getCommonOptions } from '../common'
import { getCommonFieldsItems } from './commonData'
import { pick } from 'lodash'

const { dist, responsible } = getCommonFieldsItems()
const fieldItems = [
  createInputFormItem(createItemProps('公司名称', true), '请输入公司名称', 'name'),
  createInputFormItem(createItemProps('公司地址', true), '请输入公司地址', 'address'),
  dist,
  responsible
]

export default Object.assign(getCommonOptions({detailParamsKey: 'company_id'}), {
  fieldItems,
  listRouteName: 'FirmList',
  editParamId: 'companyid',
  formDataHandle (data, isSend) {
    if (isSend) {
      const dist = parseCode(data.city, true)
      return Object.assign({province: dist.province, city: dist.city}, pick(data, ['companyid', 'name', 'address', 'responsible']))
    } else {
      data.city = parseWord(data.city, 'city')
      return data
    }
  },
  handledApis: {
    getDetailInfo: getCompanyInfo,
    addDetailInfo: addCompanyInfo,
    sendDetailInfo: sendCompanyInfo
  }
})
