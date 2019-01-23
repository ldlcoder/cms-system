export const adminComponents = {
  ModifyPwd: () => import('@/views/ModifyPwd'),
  UserProfile: () => import('@/views/userCenter/UserProfile'),
  RiskControl: () => import('@/views/orderAudit/OrderListPage'),
  RiskControlDetail: () => import('@/views/orderAudit/OrderDetailPage'),
  CarPrepare: () => import('@/views/orderAudit/OrderListPage'),
  CarPrepareDetail: () => import('@/views/orderAudit/OrderDetailPage'),
  CarDelivery: () => import('@/views/orderAudit/OrderListPage'),
  CarDeliveryDetail: () => import('@/views/orderAudit/OrderDetailPage'),
  CustomerList: () => import('@/views/customerMana/CustomerManaListPage'),
  OrderList: () => import('@/views/orderMana/OrderManaListPage'),
  OrderPayList: () => import('@/views/orderMana/OrderManaListPage'),
  OrderEdit: () => import('@/views/orderMana/OrderDetail'),
  OrderDetail: () => import('@/views/orderMana/OrderDetail'),
  ReservationList: () => import('@/views/orderMana/OrderManaListPage'),
  CarList: () => import('@/views/carMana/CarManaListPage'),
  CarDetail: () => import('@/views/carMana/CarDetailPage'),
  CarEdit: () => import('@/views/carMana/CarEditPage'),
  CarAdd: () => import('@/views/carMana/CarEditPage'),
  CarCitySetPage: () => import('@/views/carMana/CarCitySetPage'),
  LoanIndex: () => import('@/views/loansMana/LoanIndex'),
  StaffList: () => import('@/views/staffMana/StaffManaListPage'),
  StaffDetail: () => import('@/views/staffMana/StaffDetail'),
  AccountList: () => import('@/views/rightMana/RightManaListPage'),
  AccountEdit: () => import('@/views/rightMana/UserAddPage'),
  AccountAdd: () => import('@/views/rightMana/UserAddPage'),
  UserRolesSet: () => import('@/views/rightMana/UserRolesSet'),
  RoleMana: () => import('@/views/rightMana/RoleMana'),
  RoleAdd: () => import('@/views/rightMana/RoleRightsEdit'),
  RoleEdit: () => import('@/views/rightMana/RoleRightsEdit'),
  ComStructure: () => import('@/views/rightMana/CompanyStructure'),
  WapPageSetting: () => import('@/views/pageSetting/WapPageSetting'),
  CompanyList: () => import('@/views/Login'),
  CompanyEdit: () => import('@/views/Login'),
  CompsInfo: () => import('@/views/contractMana/CompsInfo')
}

export const menuItemIcons = {
  // 订单审核
  OrderAudit: 'lease-icon-dingdanshenhe',
  // 客户管理
  CustomerMana: 'lease-icon-kehuguanli',
  // 订单管理
  OrderMana: 'lease-icon-dingdanguanli',
  // 车辆管理
  CarsMana: 'lease-icon-cheliangguanli',
  // 贷款方案
  LoansMana: 'lease-icon-cheliangguanli',
  // 员工管理
  StaffMana: 'lease-icon-yuangongguanli',
  // 权限管理
  RightMana: 'lease-icon-quanxianguanli',
  // 页面管理
  PageSetting: 'lease-icon-yemianpeizhi',
  // 合同管理
  ContractMana: 'lease-icon-hetongguanli',
  // 系统管理
  SystemMana: 'lease-icon-xitongguanli'
}

const rememberMeta = (listPageName) => ({ activeTarget: listPageName, remember: true })
export const adminDynaRoutes = () => ([
  // 订单审核模块页面
  {
    path: 'orderaudit/rclist',
    title: '风控审核列表',
    name: 'RiskControl',
    meta: {}
  },
  {
    path: 'orderaudit/rcdetail',
    title: '风控审核详情',
    name: 'RiskControlDetail',
    powerRelevance: 'RiskControl',
    meta: { ...rememberMeta('RiskControl') }
  },
  {
    path: 'orderaudit/cplist',
    title: '备车确认列表',
    name: 'CarPrepare',
    meta: {}
  },
  {
    path: 'cpdetail',
    title: '备车记录详情',
    name: 'CarPrepareDetail',
    powerRelevance: 'CarPrepare',
    meta: { ...rememberMeta('CarPrepare') }
  },
  {
    path: 'cdlist',
    title: '交车确认列表',
    name: 'CarDelivery',
    meta: {}
  },
  {
    path: 'cddetail',
    title: '交车记录详情',
    name: 'CarDeliveryDetail',
    powerRelevance: 'CarDelivery',
    meta: { ...rememberMeta('CarDelivery') }
  },
  // 客户管理模块页面
  {
    path: 'customer/list',
    title: '客户管理列表',
    name: 'CustomerList',
    meta: {}
  },
  // 订单管理模块页面
  {
    path: 'order/list',
    title: '订单管理列表',
    name: 'OrderList',
    meta: {}
  },
  {
    path: 'order/detail',
    title: '订单管理详情',
    name: 'OrderDetail',
    powerRelevance: ['OrderList', (actions) => (actions.includes('detail'))],
    meta: { ...rememberMeta('OrderList') }
  },
  {
    path: 'order/edit',
    title: '订单编辑详情',
    name: 'OrderEdit',
    powerRelevance: ['OrderList', (actions) => (actions.includes('edit'))],
    meta: { ...rememberMeta('OrderList') }
  },
  {
    path: 'order/reservation',
    title: '预约记录',
    name: 'ReservationList',
    meta: {}
  },
  {
    path: 'order/pay',
    title: '支付记录',
    name: 'OrderPayList',
    meta: {}
  },
  // 车辆管理模块页面
  {
    path: 'cars/list',
    title: '车辆信息列表',
    name: 'CarList',
    meta: {}
  },
  {
    path: 'cars/detail',
    title: '车辆信息详情',
    name: 'CarDetail',
    powerRelevance: ['CarList', (actions) => (actions.includes('upList') || actions.includes('downList'))],
    meta: { ...rememberMeta('CarList') }
  },
  {
    path: 'cars/add',
    title: '新增车辆信息',
    name: 'CarAdd',
    powerRelevance: ['CarList', (actions) => (actions.includes('add'))],
    meta: { ...rememberMeta('CarList') }
  },
  {
    path: 'cars/edit',
    title: '编辑车辆信息',
    name: 'CarEdit',
    powerRelevance: ['CarList', (actions) => (actions.includes('downList'))],
    meta: { ...rememberMeta('CarList') }
  },
  {
    path: 'cars/cityset',
    title: '上牌地管理',
    name: 'CarCitySetPage',
    powerRelevance: ['CarList', (actions) => (actions.includes('citySet'))],
    meta: { ...rememberMeta('CarList') }
  },
  // 贷款方案模块页面
  {
    path: 'loans',
    title: '贷款方案列表',
    name: 'LoanIndex',
    meta: {}
  },
  // 员工管理模块页面
  {
    path: 'staffs/list',
    title: '员工列表',
    name: 'StaffList',
    meta: {}
  },
  {
    path: 'staffs/detail',
    title: '员工信息详情',
    name: 'StaffDetail',
    powerRelevance: ['StaffList', (actions) => (actions.includes('detail'))],
    meta: { ...rememberMeta('StaffList') }
  },
  // 权限管理模块页面
  {
    path: 'rights/acclist',
    title: '用户列表',
    name: 'AccountList',
    meta: {}
  },
  {
    path: 'rights/accadd',
    title: '用户新增',
    name: 'AccountAdd',
    powerRelevance: ['AccountList', (actions) => (actions.includes('add'))],
    meta: { ...rememberMeta('AccountList') }
  },
  {
    path: 'rights/accedit',
    title: '用户编辑',
    name: 'AccountEdit',
    powerRelevance: ['AccountList', (actions) => (actions.includes('edit'))],
    meta: { ...rememberMeta('AccountList') }
  },
  {
    path: 'rights/roleset',
    title: '分配角色',
    name: 'UserRolesSet',
    powerRelevance: ['AccountList', (actions) => (actions.includes('allotRole'))],
    meta: { ...rememberMeta('AccountList') }
  },
  {
    path: 'rights/roles',
    title: '角色管理',
    name: 'RoleMana',
    meta: {}
  },
  {
    path: 'rights/roleadd',
    title: '添加角色',
    name: 'RoleAdd',
    powerRelevance: ['RoleMana', (actions) => (actions.includes('add'))],
    meta: { ...rememberMeta('RoleMana') }
  },
  {
    path: 'rights/roleedit',
    title: '设置角色权限',
    name: 'RoleEdit',
    powerRelevance: ['RoleMana', (actions) => (actions.includes('setAuth'))],
    meta: { ...rememberMeta('RoleMana') }
  },
  {
    path: 'rights/comstructure',
    title: '公司部门',
    name: 'ComStructure',
    meta: {}
  },
  // 合同管理模块页面
  {
    path: 'contract/compsInfo',
    title: '企业信息',
    name: 'CompsInfo'
  },
  // 页面管理模块页面
  {
    path: 'pages/wpset',
    title: '商户页面配置',
    name: 'WapPageSetting',
    meta: {}
  },
  // 系统管理模块页面
  {
    path: 'system/comlist',
    title: '公司列表',
    name: 'CompanyList',
    meta: {}
  },
  {
    path: 'system/comedit',
    title: '编辑公司信息',
    name: 'CompanyEdit',
    meta: { ...rememberMeta('CompanyList') }
  }
])

// 后台静态权限路由
export const adminStaticRoutes = () => ([
  {
    path: 'modifypwd',
    name: 'ModifyPwd'
  },
  {
    path: 'userprofile',
    name: 'UserProfile'
  },
  { path: '*', redirect: '/404' }
])
