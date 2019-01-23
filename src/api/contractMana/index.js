// 合同管理模块接口
import { request } from 'smartfetch'
// 企业认证接口
export function getCompanyCerti (data) {
  return request('admin/company/storeEnterprise', data, 'POST')
}
// 获取已认证企业信息接口
export function getCompanyCertiedList (data) {
  return request('admin/company/enterpriseList', data)
}
