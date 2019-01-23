// 客户管理模块接口
import { request } from 'smartfetch'
// 列表类接口
export function getCustomerManageList (data) {
  return request('admin/customer/index', data)
}
// 获取可换绑的客户经理信息
export function getManagerList (data) {
  return request('admin/customer/listAccountManagerByName', data)
}

// 换绑客户经理
export function changeManager (data) {
  return request('admin/customer/replaceAccountManager', data, 'POST')
}
