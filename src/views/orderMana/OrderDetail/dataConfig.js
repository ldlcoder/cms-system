import { defPro, createInfoTb, createModuleInfo, checkoutModuleInfo, createSource, createGoods, createLoanList, createRiskControl, createTradeInfo, createCarReady, createCreditList, createCarDeliver } from '@/common/commonData/infoTable'
import { idCardReg, idCardValidate } from '@/utils/validate'
import { idCardRules } from '@/common/components/CommonFormItems/components/Idcard'
import { createSelectFormItem } from '@/common'
import store from '@/store'
import FieldItem from '@/components/FieldItem'
const createInputField = (placeholder, rules) => ({
  props: {
    rules: rules || [{ required: true, message: placeholder, trigger: 'blur' }]
  },
  component: 'ElInput',
  componentProps: {
    placeholder
  }
})
const createSelectField = (placeholder, rules, data) => ({
  props: {
    rules: rules || [{ required: true, message: placeholder, trigger: 'blur' }]
  },
  component: FieldItem,
  data,
  componentProps: {
    placeholder,
    field: {
      component: 'ElSelect',
      data,
      props: typeof placeholder === 'object' ? placeholder : { placeholder }
    }
  }
})

export const infoItems = (propKey) => ({
  name: createInfoTb('客户姓名', 'name', defPro, { canEdit: true, field: createInputField('请输入客户姓名'), prop: propKey }),
  idcard: createInfoTb('身份证号', 'idcard', defPro, { canEdit: true, field: createInputField('请输入客户身份证号', idCardRules()), prop: propKey }),
  mobile: createInfoTb('手机号', 'mobile', defPro, { canEdit: true, field: createInputField('请输入客户手机号'), prop: propKey }),
  sex: createInfoTb('性别', 'sex', defPro, { canEdit: true, field: createInputField('请输入客户性别'), prop: propKey }),
  age: createInfoTb('年龄', 'age', defPro, { canEdit: true, field: createInputField('请输入客户年龄'), prop: propKey }),
  usedname: createInfoTb('曾用名', 'usedname', defPro, { canEdit: true, field: createInputField('请输入客户曾用名'), prop: propKey }),
  idcardAddress: createInfoTb('身份证地址', 'idcard_address', defPro, { canEdit: true, field: createInputField('请输入身份证地址'), prop: propKey }),
  telephone: createInfoTb('住宅电话', 'telephone', defPro, { canEdit: true, field: createInputField('请输入客户住宅电话'), prop: propKey }),
  driverLicenseBelongs: createInfoTb('驾驶证', 'driver_license_belongs', defPro, { canEdit: true, field: createSelectField('请选择驾驶证', true, store.getters.appConfig.drivingLicenceBelong), prop: propKey }),
  driverLicenseNumber: createInfoTb('驾驶证号', 'driver_license_number', defPro, { canEdit: true, field: createInputField('请输入客户驾驶证号'), prop: propKey }),
  livingAddress: createInfoTb('现住址', 'living_address', defPro, { canEdit: true, field: createInputField('请输入客户现住址'), prop: propKey }),
  livingLast: createInfoTb('居住年限', 'living_last', defPro, { canEdit: true, field: createSelectField('请选择居住年限', true, store.getters.appConfig.livingPeriod), prop: propKey }),
  lastLivingAddress: createInfoTb('前居住地址', 'last_living_address', defPro, { canEdit: true, field: createInputField('请输入客户前居住地址'), prop: propKey }),
  lastLivingLast: createInfoTb('前居住年限', 'last_living_last', defPro, { canEdit: true, field: createSelectField('请选择前居住年限', true, store.getters.appConfig.livingPeriod), prop: propKey }),
  residenceCondition: createInfoTb('住房所有权', 'residence_condition', defPro, { canEdit: true, field: createSelectField('请选择住房所有权', true, store.getters.appConfig.houseOwnership), prop: propKey }),
  marriage: createInfoTb('婚姻状况', 'marriage', defPro, { canEdit: true, field: createSelectField('请选择婚姻状况', true, store.getters.appConfig.marriage), prop: propKey }),
  eduation: createInfoTb('学历', 'eduation', defPro, { canEdit: true, field: createSelectField('请选择学历', true, store.getters.appConfig.eduation), prop: propKey }),
  usage: createInfoTb('购车目的', 'usage', defPro, { canEdit: true, field: createSelectField('请选择购车目的', true, store.getters.appConfig.carUsage), prop: propKey }),
  incomeSource: createInfoTb('收入来源', 'income_source', defPro, { canEdit: true, field: createSelectField('请选择收入来源', true, store.getters.appConfig.incomeSource), prop: propKey }),
  annualIncome: createInfoTb('实际年收入', 'annual_income', defPro, { canEdit: true, field: createInputField('请输入客户实际年收入'), prop: propKey }),
  creditHistoryBrief: createInfoTb('贷款记录', 'credit_history_brief', defPro, { canEdit: true, field: createSelectField('请选择贷款记录', true, store.getters.appConfig.loanDocumentation), prop: propKey }),
  position: createInfoTb('工作职位', 'position', defPro, { canEdit: true, field: createInputField('请输入工作职位'), prop: propKey }),
  companyName: createInfoTb('公司名称', 'work_company_name', defPro, { canEdit: true, field: createInputField('请输入公司名称'), prop: propKey }),
  companyTelephone: createInfoTb('单位电话', 'work_company_telephone', defPro, { canEdit: true, field: createInputField('请输入单位电话'), prop: propKey }),
  seniority: createInfoTb('工作年限', 'seniority', defPro, { canEdit: true, field: createInputField('请输入工作年限'), prop: propKey }),
  companyAddress: createInfoTb('公司地址', 'work_company_address', defPro, { canEdit: true, field: createInputField('请输入公司地址'), prop: propKey }),
  coupleName: createInfoTb('配偶姓名', 'name', defPro, { canEdit: true, field: createInputField('请输入配偶姓名'), prop: propKey }),
  childNumber: createInfoTb('子女人数', 'child_number', defPro, { canEdit: true, field: createInputField('请输入子女人数'), prop: propKey }),
  cohabitNumber: createInfoTb('同住人数', 'residence_contains_lodger', defPro, { canEdit: true, field: createInputField('请输入同住人数'), prop: propKey }),
})

export function checkoutInfoTb (keys, originData) {
  const infoTb = originData || infoItems()
  let formObj = {}
  if (Array.isArray(keys)) {
    keys.map(item => { formObj[item] = infoTb[item] })
  } else if (keys && typeof keys === 'object') {
    Object.keys(keys).map(item => {
      formObj[item] = Object.assign({}, infoTb[item] || {}, keys[item] || {})
    })
  }
  return formObj
}
export const customerInfo = checkoutInfoTb(['idcard'], infoItems('customer'))
//export const customerInfo = checkoutInfoTb(['name', 'idcard', 'mobile', 'sex', 'age', 'usedname', 'idcardAddress', 'telephone', 'driverLicenseBelongs', 'driverLicenseNumber', 'livingAddress', 'livingLast', 'lastLivingAddress', 'lastLivingLast', 'residenceCondition', 'marriage', 'eduation', 'usage', 'incomeSource', 'annualIncome', 'creditHistoryBrief'], infoItems('customer.'))
export const workInfo = checkoutInfoTb(['position', 'companyName', 'companyTelephone', 'seniority', 'companyAddress'], infoItems('work.'))
export const spouseInfo = checkoutInfoTb(['coupleName', 'idcard', 'mobile', 'sex', 'age', 'usedname', 'eduation', 'livingAddress', 'incomeSource', 'annualIncome', 'position', 'companyName', 'companyTelephone', 'seniority', 'companyAddress', 'childNumber', 'cohabitNumber'], infoItems('families.'))
