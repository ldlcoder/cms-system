import { handleFormData } from '@/common'
import { cloneDeep } from 'lodash'
import { getOrderInfo } from '@/api/common'
import { getWorkFlowDetail } from '@/api/orderMana'

export function getCommonOptions ({ }) {
  const commonOptions = {
    handleFormData
  }
  return cloneDeep(commonOptions)
}
// 公共接口配置
export function getCommonApis () {
  return {
    getDetailInfo: getOrderInfo,
    getExtraDetailInfo: getWorkFlowDetail
  }
}
