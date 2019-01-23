// 员工管理模块接口
import { request } from 'smartfetch'
// 列表类接口
export function getBindCustomerList (data) {
  return request('admin/auth/listAdminInvite', data)
}

// 禁用启用员工
export function setStaffStatus (data) {
  return request('admin/auth/updateAdminActive', data)
}
