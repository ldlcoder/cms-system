// 车辆管理模块接口
import { request } from 'smartfetch'
// 列表类接口
export function getCarManagerList (data) {
  return request('admin/goods/index', data)
}
// 上架/下架车辆
export function handleCarStatus (data) {
  return request('admin/goods/shelfoperate', data)
}

// 从已下架车辆中删除车辆
export function deleteCars (data) {
  return request('admin/goods/destroy', data, 'POST')
}

// 获取车辆详情
export function getCarsInfo (data) {
  return request('admin/goods/detail', data)
}

// 新增车辆
export function addCar (data) {
  return request('admin/goods/store', data, 'POST')
}

// 修改车辆
export function editCar (data) {
  return request('admin/goods/update', data, 'POST')
}

// 获取已选择的贷款方案列表
export function getSelectedLoanList (data) {
  return request('admin/loanchoice/goodsloanchoices', data)
}

// 获取已选上牌地数据
export function getLicensePlates (data) {
  return request('admin/company/getCompanyLicensePlates', data)
}

// 修改已选上牌地数据
export function setLicensePlates (data) {
  return request('admin/company/setLicensePlates', data, 'POST')
}
