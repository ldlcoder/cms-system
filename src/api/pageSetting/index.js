// 页面配置模块接口
import { request } from 'smartfetch'
// 获取h5客户端首页配置数据
export function getHomepageSetting (data) {
  return request('admin/company/getPageSetting', data)
}
// 提交h5客户端首页配置数据
export function sendHomepageSetting (data) {
  return request('admin/company/companySettingStoreHome', data, 'POST')
}
// 获取h5客户端详情页配置数据
export function getDetailpageSetting (data) {
  return request('admin/company/getPageSetting', data)
}
// 提交h5客户端详情页配置数据
export function sendDetailpageSetting (data) {
  return request('admin/company/companySettingStoreDetail', data, 'POST')
}
