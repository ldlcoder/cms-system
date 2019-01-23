export default {
  // 基础信息部分
  appVersion: state => state.app.appVersion,
  // 属性部分
  companyName: state => state.user.companyName,
  sidebar: state => state.app.sidebar,
  apiConfig: state => state.app.apiConfig,
  remember: state => state.app.remember,
  rememberRoute: state => state.app.rememberRoute,
  appConfig: state => state.app.appConfig,
  uploadConfig: state => state.app.uploadConfig,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  treeCheckedVals: state => state.component.subMenu,
  roles: state => state.app.roles,
  provCity: state => state.app.provCity,
  isGetRoles: state => state.app.isGetRoles,
  adminLayoutSwitch: state => state.app.adminLayoutSwitch,
  // 函数部分
  switchFilter: state => key => value => (state.app.cfgKeyValueMap[key] ? state.app.cfgKeyValueMap[key][value] : '')
}
