// 权限模块接口
import { request } from 'smartfetch'
// 删除用户接口
export function deleteUser (data) {
  return request('admin/auth/removeAdmin', data)
}
// 新增用户接口
export function addUser (data) {
  return request('admin/auth/saveAdmin', data, 'POST')
}

// 编辑用户接口
export function editUser (data) {
  return request('admin/auth/updateAdmin', data, 'POST')
}
// 设置用户角色
export function setUserRoles (data) {
  return request('admin/auth/authorizeRole', data, 'POST')
}
// 获取当前公司所有权限点树
export function getCompanyRights (data) {
  return request('admin/auth/rolePermission', data)
}

// 获取当前公司所有角色列表
export function getAdminCompanyRoles (data) {
  return request('admin/auth/listCompanyRoleWithUserNum', data)
}
// 新增角色
export function addRole (data) {
  return request('admin/auth/saveRole', data, 'POST')
}
// 获取角色权限信息
export function getRoleInfo (data) {
  return request('admin/auth/roleMenuId', data)
}
// 设置角色权限
export function setRoleRights (data) {
  return request('admin/auth/updateRole', data, 'POST')
}
// 删除角色
export function deleteRole (data) {
  return request('admin/auth/delRole', data)
}

// 获取当前公司所有分公司列表
export function getSubCompanyList (data) {
  return request('admin/company/index', data)
}
// 新增分公司, 暂时用编辑分公司
export function addSubCompany (data) {
}
// 编辑分公司
export function editSubCompany (data) {
  return request('admin/company/storeSubCompany', data, 'POST')
}
// 禁用/启用分公司
export function setSubCompanyStatus (data) {
  return request('admin/company/operateSubCompany', data)
}
// 获取指定分公司所有团队列表
export function getTeamList (data) {
  return request('admin/company/teamList', data)
}
// 新增团队
export function addSubCompTeam (data) {
}
// 编辑团队
export function editSubCompTeam (data) {
  return request('admin/company/storeTeam', data, 'POST')
}
// 禁用/启用团队
export function setTeamStatus (data) {
  return request('admin/company/operateTeam', data)
}
