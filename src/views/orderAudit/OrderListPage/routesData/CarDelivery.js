import { getCommonOptions, getCommonApis } from '../common'
import commonData from './commonData'
export default Object.assign(getCommonOptions({ detailName: 'CarDeliveryDetail', detailIdKey: 'order_id', hasTab: true, claimAndReturn: true }), {
  RSD: {
    extraForm: { status_type: 3 }
  },
  ...commonData,
  orderStatusParamHandle: (row, btn, curActionInfo) => ({ id: row.order_id, status_type: 3, status: curActionInfo.status }),
  handledApis: getCommonApis()
})
