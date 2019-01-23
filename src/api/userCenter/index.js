// 用户个人中心模块接口
import { request } from 'smartfetch'

// 个人资料详情
export function getUserProfileInfo (data) {
  return request('admin/auth/infoMember', data)
}
// 个人资料-绑定客户列表接口
export function getUserBindCustomerList (data) {
  return request('admin/auth/listMemberInvite', data)
}
// 个人资料-预约客户列表接口
export function getUserOrderCustomerList (data) {
  return request('admin/appointment/listManagerCustomer', data)
}
