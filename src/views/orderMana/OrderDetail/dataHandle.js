import { createInputFormItem, createSelectFormItem, createFiRulesProps, createDateFormItem } from '@/common'
import { idcardData, telphoneData } from '@/common/components/CommonFormItems'

const createEditFormItem = (field = {}, key) => ({
  canEdit: true,
  field: Object.assign({ propCascade: [key] }, field)
})

const createHasFieldModule = (keys, defValue) => ({
  KEYS: keys,
  ARGS: [{ hasFields: true, defValue }]
})

const createInputItem = (message, prop, placeholder) => createInputFormItem(createFiRulesProps('', message), message || placeholder, prop)

const createSelectItem = (message, prop, data, modelDef = '') => createSelectFormItem(createFiRulesProps('', message), prop, modelDef, data, false)

const createDateItem = (message, type, prop) => createDateFormItem(createFiRulesProps('', message), type, prop)

const createCustomerItem = field => createEditFormItem(field, 'customer')
const createWorkItem = field => createEditFormItem(field, 'work')
const createContactsItem = field => createEditFormItem(field, 'contacts')
const createCarReadyItem = field => createEditFormItem(field, 'car_ready')
const createFamiliesItem = field => createEditFormItem(field, 'families')

export function getEditModuleConfig (appConfig = {}) {
  const { drivingLicenceBelong, livingPeriod, houseOwnership, marriage, eduation, carUsage, incomeSource, loanDocumentation, relationship, repareInsTypes } = appConfig
  return {
    source: null,
    credit: null,
    customer: createHasFieldModule({
      name: createCustomerItem(createInputItem('请输入客户姓名', 'name')),
      idcard: createCustomerItem(idcardData('idcard', true, { props: { label: '' } })),
      mobile: createCustomerItem(telphoneData('mobile', true, { props: { label: '' } })),
      sex: null,
      age: null,
      usedname: createCustomerItem(createInputItem(false, 'usedname', '请输入曾用名')),
      idcardAddress: createCustomerItem(createInputItem('请输入身份证地址', 'idcard_address')),
      telephone: createCustomerItem(createInputItem('请输入住宅电话', 'telephone')),
      driverLicenseBelongs: createCustomerItem(createSelectItem('请选择驾驶证所属', 'driver_license_belongs', drivingLicenceBelong)),
      driverLicenseNumber: createCustomerItem(createInputItem('请输入驾驶证号', 'driver_license_number')),
      livingAddress: createCustomerItem(createInputItem('请输现住址', 'living_address')),
      livingLast: createCustomerItem(createSelectItem('请选择居住年限', 'living_last', livingPeriod)),
      lastLivingAddress: createCustomerItem(createInputItem(false, 'last_living_address', '请输前居住地址')),
      lastLivingLast: createCustomerItem(createSelectItem(false, 'last_living_last', livingPeriod)),
      residenceCondition: createCustomerItem(createSelectItem('请选择住房所有权', 'residence_condition', houseOwnership)),
      marriage: createCustomerItem(createSelectItem('请选择婚姻状态', 'marriage', marriage)),
      eduation: createCustomerItem(createSelectItem('请选择学历', 'eduation', eduation)),
      usage: createCustomerItem(createSelectItem('请选择购车目录', 'usage', carUsage)),
      incomeSource: createCustomerItem(createSelectItem('请选择收入来源', 'income_source', incomeSource)),
      annualIncome: createCustomerItem(createInputItem('请输实际年收入', 'annual_income', '请输实际年收入,单位元')),
      creditHistoryBrief: createCustomerItem(createSelectItem(false, 'credit_history_brief', loanDocumentation))
    }),
    work: createHasFieldModule({
      position: createWorkItem(createInputItem('请输入工作职位', 'position')),
      companyName: createWorkItem(createInputItem('请输入公司名称', 'work_company_name')),
      companyTelephone: createWorkItem(createInputItem('请输入单位电话', 'work_company_telephone')),
      seniority: createWorkItem(createInputItem('请输入工作年限', 'work_company_address', '请输入工作年限,单位年')),
      companyAddress: createWorkItem(createInputItem('请输入公司地址', 'work_company_address'))
    }),
    contacts: createHasFieldModule({
      contactName: createContactsItem(createInputItem('请输入联系人姓名', 'name')),
      relationship: createContactsItem(createSelectItem('请选择联系人关系', 'relationship', relationship)),
      mobile: createContactsItem(telphoneData('mobile', true, { props: { label: '' } }))
    }, () => ([])),
    families: createHasFieldModule({
      coupleName: createFamiliesItem(createInputItem('请输入配偶姓名', 'name')),
      idcard: createFamiliesItem(idcardData('idcard', true, { props: { label: '' } })),
      mobile: createFamiliesItem(telphoneData('mobile', true, { props: { label: '' } })),
      sex: null,
      age: null,
      usedname: createFamiliesItem(createInputItem(false, 'usedname', '请输入曾用名')),
      eduation: createFamiliesItem(createSelectItem('请选择学历', 'eduation', eduation)),
      livingAddress: createFamiliesItem(createInputItem('请输现住址', 'living_address')),
      incomeSource: createFamiliesItem(createSelectItem('请选择收入来源', 'income_source', incomeSource)),
      annualIncome: createFamiliesItem(createInputItem('请输实际年收入', 'annual_income', '请输实际年收入,单位元')),
      position: createFamiliesItem(createInputItem(false, 'position', '请输入工作职位')),
      companyName: createFamiliesItem(createInputItem(false, 'work_company_name', '请输入公司名称')),
      companyTelephone: createFamiliesItem(createInputItem(false, 'work_company_telephone', '请输入单位电话')),
      seniority: createFamiliesItem(createInputItem(false, 'work_company_address', '请输入工作年限,单位年')),
      companyAddress: createFamiliesItem(createInputItem(false, 'work_company_address', '请输入公司地址')),
      childNumber: createFamiliesItem(createInputItem('请输入子女人数', 'child_number')),
      cohabitNumber: createFamiliesItem(createInputItem('请输入同住人数', 'residence_contains_lodger'))
    }),
    goods: null,
    loanList: null,
    tradeAudit: null,
    tradeInfo: null,
    carReady: createHasFieldModule({
      plateNumber: createCarReadyItem(createInputItem('请输出车牌号', 'plate_number')),
      gps1: createCarReadyItem(createInputItem('请输入GPS编号1', 'gps_1')),
      gps2: createCarReadyItem(createInputItem('请输入GPS编号2', 'gps_2')),
      gpsPosition: createCarReadyItem(createInputItem('请输入安装位置', 'gps_1_position')),
      merchant: createCarReadyItem(createInputItem('请输入经销商', 'merchant')),
      buyInsuranceWay: createCarReadyItem(createSelectItem('请选择联保险购买类型', 'insurance_interval', repareInsTypes)),
      remark: createCarReadyItem(createInputItem('请输入交车备注', 'remark')),
      operator: null,
      auditTime: null
    }),
    carDeliver: createHasFieldModule({
      deliverTime: createEditFormItem(createDateItem('请选择交车日期', 'date', 'deliver_time'), 'car_deliver'),
      remark: createEditFormItem(createInputItem('请输入交车备注', 'remark'), 'car_deliver'),
      operator: null,
      auditTime: null
    })
  }
}

const filterMap = {
  customer: {
    exclude: ['age', 'sex']
  },
  work: {
    exclude: []
  },
  families: {
    exclude: []
  },
  contacts: {
    exclude: []
  },
  car_ready: {
    exclude: ['operator', 'audit_time']
  },
  car_deliver: {
    exclude: ['operator', 'audit_time'],
    filter: (key, value) => (key === 'deliver_time' ? value * 1000 : value)
  }
}

export function getFilterFormData (data) {
  let result = {}
  Object.keys(data).forEach(key => {
    const item = data[key]
    if (filterMap[key]) {
      const { exclude, filter } = filterMap[key]
      const handleObjItem = itemObj => {
        let res = {}
        Object.keys(itemObj).forEach(dkey => {
          !exclude.includes(dkey) && (res[dkey] = typeof filter === 'function' ? filter(dkey, itemObj[dkey]) : itemObj[dkey])
        })
        return res
      }
      result[key] = Array.isArray(item) ? item.map(handleObjItem) : handleObjItem(item)
    }
  })
  return result
}
