// 订单审核模块接口
import { request } from 'smartfetch'
// 列表类接口
export function getOrderAuditList (data) {
  return request('admin/order/index', data)
}

// 订单审核提交接口
export function riskAuditSend (data) {
  return request('admin/order/manage/riskaudit', data, 'POST')
}

// 订单的认领/退件
export function handleOrder (data) {
  return request('admin/order/handle', data)
}

// 备车确认提交接口
export function carRepareSend (data) {
  return request('admin/order/manage/carready', data, 'POST')
}
// 交车确认提交接口
export function carDeliverySend (data) {
  return request('admin/order/manage/cardeliver', data, 'POST')
}

