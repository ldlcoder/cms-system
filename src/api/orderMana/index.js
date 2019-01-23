// 订单管理模块接口
import { request } from 'smartfetch'

// 订单的审核详情
export function getWorkFlowDetail (data) {
  return request('admin/order/manage/detail', data)
}

// 提交订单修改信息
export function editOrderDetailInfo (data) {
  return request('admin/order/storeTrade', data, 'POST')
}
// 获取预约记录列表
export function getAppointmentList (data) {
  return request('admin/appointment/index', data)
}
// 获取支付记录列表
export function getOrderPayList (data) {
  return request('admin/bill/pay', data)
}
