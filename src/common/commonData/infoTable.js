import store from '@/store'
import { parseTime, wordMoney } from '@/utils'
import { createModuleInfo } from '@/common'
import LoanPrintList from '@/common/template/LoanPrintList'
import OrderCreditInfos from '@/common/template/OrderCreditInfos'

const defPro = { md: 12, lg: 6 }
// 创建时间格式过滤器
export const timeFormatter = (format = '{y}-{m}-{d} {h}:{i}:{s}') => {
  return (value) => (parseTime(value, format))
}
export const createInfoTb = (label, key, props = defPro, others) => {
  return {
    label,
    key,
    props,
    ...others
  }
}

const moneyFilter = value => wordMoney(value, '0.00')
const switchFilter = store.getters.switchFilter

export const infoItems = () => ({
  // 公共部分
  date: createInfoTb('日期', 'time', defPro, { filter: timeFormatter('{y}-{m}-{d}') }),
  // 业务部分
  subCompany: createInfoTb('分公司', 'sub_company', defPro),
  team: createInfoTb('所属团队', 'team', defPro),
  inviter: createInfoTb('客户经理', 'inviter', defPro),
  serverArea: createInfoTb('上牌地', 'service_available_area', defPro),
  createdAt: createInfoTb('申请时间', 'apply_time', defPro, { filter: timeFormatter() }),
  name: createInfoTb('客户姓名', 'name', defPro),
  idcard: createInfoTb('身份证号', 'idcard', defPro),
  mobile: createInfoTb('手机号', 'mobile', defPro),
  sex: createInfoTb('性别', 'sex', defPro),
  age: createInfoTb('年龄', 'age', defPro),
  hasUsedname: createInfoTb('有无曾用名', 'has_usedname', defPro),
  usedname: createInfoTb('曾用名', 'usedname', defPro),
  idcardAddress: createInfoTb('身份证地址', 'idcard_address', defPro),
  telephone: createInfoTb('住宅电话', 'telephone', defPro),
  driverLicenseBelongs: createInfoTb('驾驶证', 'driver_license_belongs', defPro, { filter: switchFilter('drivingLicenceBelong') }),
  driverLicenseNumber: createInfoTb('驾驶证号', 'driver_license_number', defPro),
  livingAddress: createInfoTb('现住址', 'living_address', defPro),
  livingLast: createInfoTb('居住年限', 'living_last', defPro, { filter: switchFilter('livingPeriod') }),
  lastLivingAddress: createInfoTb('前居住地址', 'last_living_address', defPro),
  lastLivingLast: createInfoTb('前居住年限', 'last_living_last', defPro, { filter: switchFilter('livingPeriod') }),
  residenceCondition: createInfoTb('住房所有权', 'residence_condition', defPro, { filter: switchFilter('houseOwnership') }),
  marriage: createInfoTb('婚姻状况', 'marriage', defPro, { filter: switchFilter('marriage') }),
  eduation: createInfoTb('学历', 'eduation', defPro, { filter: switchFilter('eduation') }),
  usage: createInfoTb('购车目的', 'usage', defPro, { filter: switchFilter('carUsage') }),
  incomeSource: createInfoTb('收入来源', 'income_source', defPro, { filter: switchFilter('incomeSource') }),
  annualIncome: createInfoTb('实际年收入', 'annual_income', defPro, { filter: moneyFilter }),
  creditHistoryBrief: createInfoTb('贷款记录', 'credit_history_brief', defPro, { filter: switchFilter('loanDocumentation') }),
  position: createInfoTb('工作职位', 'position', defPro),
  companyName: createInfoTb('公司名称', 'work_company_name', defPro),
  companyTelephone: createInfoTb('单位电话', 'work_company_telephone', defPro),
  seniority: createInfoTb('工作年限', 'seniority', defPro, { filter: (value) => (value && (value + '年')) }),
  companyAddress: createInfoTb('公司地址', 'work_company_address', defPro),
  contactName: createInfoTb('联系人', 'name', defPro),
  relationship: createInfoTb('关系', 'relationship', defPro),
  coupleName: createInfoTb('配偶姓名', 'name', defPro),
  childNumber: createInfoTb('子女人数', 'child_number', defPro),
  cohabitNumber: createInfoTb('同住人数', 'residence_contains_lodger', defPro),
  carBrand: createInfoTb('车辆品牌', 'car_brand', defPro),
  system: createInfoTb('车系', 'system', defPro),
  carType: createInfoTb('车辆类型', 'is_new', defPro, { filter: switchFilter('carType') }),
  model: createInfoTb('车辆型号', 'model', defPro),
  msrp: createInfoTb('指导价', 'msrp', defPro, { filter: moneyFilter }),
  firstPay: createInfoTb('首付', 'downpayment_rate', defPro, { filter: moneyFilter }),
  monthlyPay: createInfoTb('月供', 'monthly_mortage_payment', defPro, { filter: moneyFilter }),
  loanTerm: createInfoTb('贷款期数', 'term', defPro),
  actualFee: createInfoTb('定金', 'actual_fee', defPro, { filter: moneyFilter }),
  feeTime: createInfoTb('支付时间', 'fee_time', defPro, { filter: timeFormatter() }),
  actualDownpayment: createInfoTb('首付款', 'actual_downpayment', defPro, { filter: moneyFilter }),
  serviceCharge: createInfoTb('服务费', 'service_charge', defPro, { filter: moneyFilter }),
  actualMonthlyPayment: createInfoTb('首期月供', 'actual_monthly_mortage_payment', defPro, { filter: moneyFilter }),
  actualMonthlyPaymentTime: createInfoTb('支付时间', 'monthly_mortage_payment_time', defPro, { filter: timeFormatter() }),
  plateNumber: createInfoTb('车牌号', 'plate_number', defPro),
  gps1: createInfoTb('GPS编号1', 'gps_1', defPro),
  gps2: createInfoTb('GPS编号2', 'gps_2', defPro),
  gpsPosition: createInfoTb('安装位置', 'gps_1_position', defPro),
  merchant: createInfoTb('经销商', 'merchant', defPro),
  buyInsuranceWay: createInfoTb('保险购买', 'insurance_interval', defPro, { filter: switchFilter('repareInsTypes') }),
  remark: createInfoTb('备注', 'remark', defPro),
  operator: createInfoTb('处理人员', 'operator', defPro),
  auditTime: createInfoTb('处理时间', 'audit_time', defPro, { filter: timeFormatter() }),
  deliverTime: createInfoTb('交车时间', 'deliver_time', defPro, { filter: timeFormatter() }),
  auditResult: createInfoTb('审核结果', 'audit_result', defPro, { filter: switchFilter('auditResult') }),
  dataPermission: createInfoTb('数据权限', 'data_permission', defPro, { filter: switchFilter('dataPermission') })
})

export function checkoutInfoTb (keys, originData) {
  const infoTb = originData || infoItems()
  if (Array.isArray(keys)) {
    return keys.map(item => (infoTb[item]))
  } else if (keys && typeof keys === 'object') {
    return Object.keys(keys).map(item => (Object.assign({}, infoTb[item] || {}, keys[item] || {})))
  }
  return Object.values(infoTb)
}
export function getInfoTableProps (config, extra = {}) {
  return (data, origin) => ({ data, config, extraData: origin, ...extra })
}

export function getTabsInfoProps (label, config) {
  return (data, origin) => ({
    labelCreater: (item, index) => (label + (index + 1)),
    config,
    data,
    extraData: origin
  })
}

export function createModule (title, key, component, configKeys, moduleExtra, extraProps) {
  return createModuleInfo(title, key, component, getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createSource (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['subCompany', 'team', 'inviter', 'createdAt', 'serverArea']
  return createModuleInfo('来源信息', 'source', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createCustomer (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['name', 'idcard', 'mobile', 'sex', 'age', 'usedname', 'idcardAddress', 'telephone', 'driverLicenseBelongs', 'driverLicenseNumber', 'livingAddress', 'livingLast', 'lastLivingAddress', 'lastLivingLast', 'residenceCondition', 'marriage', 'eduation', 'usage', 'incomeSource', 'annualIncome', 'creditHistoryBrief']
  return createModuleInfo('基本信息', 'customer', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createWork (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['position', 'companyName', 'companyTelephone', 'seniority', 'companyAddress']
  return createModuleInfo('工作信息', 'work', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createContacts (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['contactName', 'relationship', 'mobile']
  return createModuleInfo('联系人信息', 'contacts', 'TabsInfoTable', getTabsInfoProps('联系人', checkoutInfoTb(configKeys)), {
    isHide: (data) => (!data.contacts || !data.contacts.length),
    ...moduleExtra
  })
}
export function createFamilies (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['coupleName', 'idcard', 'mobile', 'sex', 'age', 'usedname', 'eduation', 'livingAddress', 'incomeSource', 'annualIncome', 'position', 'companyName', 'companyTelephone', 'seniority', 'companyAddress', 'childNumber', 'cohabitNumber']
  return createModuleInfo('配偶信息', 'families', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), {
    isHide: (data) => (!data.families || !data.customer || data.customer.marriage - 2 !== 0),
    ...moduleExtra
  })
}
export function createGoods (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['carBrand', 'system', 'carType', 'model', 'msrp', 'firstPay', 'monthlyPay', 'loanTerm']
  return createModuleInfo('车辆信息', 'goods', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createLoanList (configKeys, moduleExtra, extraProps) {
  return createModuleInfo('贷款方案', 'loan_choice', LoanPrintList, getInfoTableProps(checkoutInfoTb(configKeys), extraProps), moduleExtra)
}
export function createRiskControl (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['auditResult', 'remark', 'operator', 'auditTime']
  return createModuleInfo('风控审核信息', 'trade_audit', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), {
    isHide: (data) => (!data.trade_audit),
    ...moduleExtra
  })
}

export function createTradeInfo (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['actualFee', 'feeTime', 'actualDownpayment', 'serviceCharge', 'actualMonthlyPayment', 'actualMonthlyPaymentTime']
  return createModuleInfo('客户支付信息', 'trade_info', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), {
    isHide: (data) => (!data.trade_info),
    ...moduleExtra
  })
}

export function createCarReady (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['plateNumber', 'gps1', 'gps2', 'gpsPosition', 'merchant', 'buyInsuranceWay', 'remark', 'operator', 'auditTime']
  return createModuleInfo('备车管理信息', 'car_ready', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), {
    isHide: (data) => (!data.car_ready),
    ...moduleExtra
  })
}

export function createCreditList () {
  return createModuleInfo('第三方征信信息', '', OrderCreditInfos, (data, origin) => ({ id: data.orderId }))
}

export function createCarDeliver (configKeys, moduleExtra, extraProps) {
  configKeys = configKeys || ['deliverTime', 'remark', 'operator', 'auditTime']
  return createModuleInfo('交车管理信息', 'car_deliver', 'InfoTable', getInfoTableProps(checkoutInfoTb(configKeys), extraProps), {
    isHide: (data) => (!data.car_deliver),
    ...moduleExtra
  })
}

const moduleInfoTb = {
  source: createSource,
  credit: createCreditList,
  customer: createCustomer,
  work: createWork,
  contacts: createContacts,
  families: createFamilies,
  goods: createGoods,
  loanList: createLoanList,
  tradeAudit: createRiskControl,
  tradeInfo: createTradeInfo,
  carReady: createCarReady,
  carDeliver: createCarDeliver
}

export function checkoutModuleInfo (keys, extra) {
  if (Array.isArray(keys)) {
    return keys.map(item => (moduleInfoTb[item] ? moduleInfoTb[item]() : {}))
  } else if (keys && typeof keys === 'object') {
    return Object.keys(keys).map(item => {
      const { KEYS, ARGS } = keys[item] || {}
      return moduleInfoTb[item] ? (KEYS ? moduleInfoTb[item](KEYS, ...ARGS) : moduleInfoTb[item](keys[item])) : {}
    })
  }
  return Object.values(moduleInfoTb).map(item => item())
}
