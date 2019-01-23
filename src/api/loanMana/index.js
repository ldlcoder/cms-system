// 贷款方案管理模块接口
import { request } from 'smartfetch'
// 列表类接口
export function getLoanPrintList (data) {
  return request('admin/loanchoice/index', data)
}

// 贷款方案新增
export function addLoanPrint (data) {
  return request('admin/loanchoice/store', data, 'POST')
}

// 贷款方案删除
export function deleteLoanPrint (data) {
  return request('admin/loanchoice/destroy', data, 'POST')
}

// 贷款方案修改
export function editLoanPrint (data) {
  return request('admin/loanchoice/update', data, 'POST')
}

// 获取月供计算公式
export function getMonthlyformula (data) {
  return request('admin/loanchoice/getMonthly', data)
}
// 设置月供计算公式
export function setMonthlyformula (data) {
  return request('admin/loanchoice/setMonthly', data, 'POST')
}
