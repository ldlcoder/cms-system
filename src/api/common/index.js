// 列表类接口
import { request } from 'smartfetch'
// 登录接口
export function login (data) {
  return request('admin/auth/login', data, 'POST')
}
// 登录接口
export function modifyPwd (data) {
  return request('admin/auth/updatePasswd', data, 'POST')
}

// 获取菜单数据
export function getMenuInfo (data) {
  return request('admin/auth/menu', data)
}

// 员工、用户管理列表
export function getMembersList (data) {
  return request('admin/auth/listAdmin', data)
}

// 员工、用户详情, 管理员权限
export function getMemberInfo (data) {
  return request('admin/auth/infoAdmin', data)
}

// 订单审核模块详情的获取
export function getOrderInfo (data) {
  return request('admin/order/detail', data)
}

// 获取上传图片所需参数
export function getuploadConfig (data) {
  return request({ useCore: 'urlc' })('', data)
}

// 获取所属公司下角色列表
export function getCompanyRole (data) {
  return request('admin/auth/listCompanyRole', data)
}

// 影像资料的获取
export function getModuleMedias (data) {
  return request('admin/binaryResource/order', data)
}

// 获取车辆详情
export function getCarsConfig (data) {
  return request('common/CarProperty', data)
}

// 获取搜索条件项
export function getSearchParams (data) {
  return request('admin/config/companyStructure', data)
}

// 获取电子合同列表(地址尚未确定，仅本地测试)
export function getElectronicContracts (data) {
  return request('common/electroniccontracts', data)
}
// 第三方征信模块接口
export function getOrderCreditBrief (data) {
  return request('admin/credit/orderApplicantsCreditBrief', data)
}

export function queryOrderCreditBrief (data) {
  return request('admin/credit/userBriefDoInquiry', data, 'POST')
}

export function getUserCreditReport (data) {
  return request('admin/credit/userBrief', data)
}

export function queryCreditReportModules (data) {
  return request('admin/credit/inquiries', data, 'POST')
}
// 获取省市区的数据
export function getProvCitys (data) {
  return request('/common/listArea', data)
}
// 提交修改影像资料数据接口
export function editModuleMedias (data) {
  return request('/admin/binaryResource/replaceBinaryResourceOfOrder', data, 'POST')
}
