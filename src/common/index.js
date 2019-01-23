import { parseTime, cloneJsonObj, percent, commaNum, Storage } from '@/utils'
import store from '@/store'  

export const switchFilter = store.getters.switchFilter

// 处理角色
export const defOptionFn = (defaultVal) => ([
  {
    value: typeof defaultVal !== 'undefined' ? defaultVal : 0,
    label: '全部'
  }
])
// 创建日期转换表头项
export const dateFormatter = (format = '{y}-{m}-{d}') => ({
  formatter: (row, column, cellValue, index) => parseTime(cellValue, format)
})

export function createFiRulesProps (label, required, rules = [], others) {
  return {
    label,
    rules: (required ? [{ required: true, message: typeof required === 'string' ? required : '请输入' + label, trigger: 'blur' }] : []).concat(rules),
    ...others
  }
}

export function createInputFormItem (label, placeholder, prop, extraProps = {}, slotText) {
  const slotComp = typeof slotText === 'string' ? { slotComp: { component: 'div', text: slotText } } : {}
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: 'ElInput',
      props: typeof placeholder === 'object' ? placeholder : {
        placeholder: placeholder || ('请输入' + label)
      },
      ...slotComp
    },
    prop,
    ...extraProps
  }
}
export function createSelectFormItem (label, prop, modelDef, data, allDef, others = {}, placeholder, events = {}) {
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: 'ElSelect',
      data: (allDef !== false ? defOptionFn(allDef) : []).concat(Array.isArray(data) ? data : []),
      props: typeof placeholder === 'object' ? placeholder : {
        placeholder: placeholder
      },
      events
    },
    modelDef,
    prop,
    ...others
  }
}
const dateTypeProps = () => ({
  date: {
    type: 'date',
    valueFormat: 'timestamp'
  },
  daterange: {
    type: 'daterange',
    defaultTime: ['00:00:00', '23:59:59'],
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  }
})
export function createDateFormItem (label, type, prop, others = {}) {
  const typeProps = dateTypeProps()
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: 'ElDatePicker',
      props: typeof type === 'object' ? type : typeProps[type] || {
        type
      }
    },
    prop,
    ...others
  }
}
export const formItemsFn = () => ({
  orderRandomId: createInputFormItem('订单编号', '订单编号', 'order_random_id'),
  name: createInputFormItem('客户姓名', '客户姓名', 'name'),
  mobile: createInputFormItem('手机号', '客户手机号', 'mobile'),
  idcard: createInputFormItem('身份证号', '客户身份证号', 'idcard'),
  roleId: createSelectFormItem('角色', 'role_id', 0, store.getters.roles),
  carType: createSelectFormItem('车辆类型', 'is_new', 0, store.getters.appConfig.carType),
  payType: createSelectFormItem('支付类型', 'type', '', store.getters.appConfig.payType, ''),
  date: createDateFormItem('日期', 'date', 'date'),
  subCompany: createSelectFormItem('所属分公司', 'company_sub_id', 0, null),
  team: createSelectFormItem('所属团队', 'team_id', 0, null, 0, { cascaderModel: 'company_sub_id' }),
  time: {
    props: {
      label: '时间'
    },
    prop: 'time',
    fields: {
      component: 'ElDatePicker',
      props: {
        type: 'daterange',
        defaultTime: ['00:00:00', '23:59:59'],
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期'
      }
    }
  },
  company: createInputFormItem('所属公司', { disabled: true }, 'companyName'),
  compSubCompany: createInputFormItem(createFiRulesProps('分公司名称', true), null, 'name'),
  compTeam: createInputFormItem(createFiRulesProps('团队名称', true), null, 'name'),
  responsible: createInputFormItem(createFiRulesProps('负责人', true), null, 'responsible')
})

export function createTbItem (label, prop, others) {
  return {
    label,
    prop,
    ...others
  }
}

const tbFormatters = {
  tbMoneyFormatter: (row, column, cellValue) => (cellValue && commaNum(cellValue, '0,0.00')),
  dataPermission: (row, column, cellValue) => (switchFilter('dataPermission')(cellValue))
}

export const tbColumnsFn = () => ({
  'subCompany': createTbItem('所属分公司', 'sub_company'),
  'team': createTbItem('所属团队', 'team'),
  'nickname': createTbItem('微信昵称', 'nickname'),
  // 订单部分
  'index': createTbItem('序号', '', { type: 'index', width: '80px' }),
  'orderRandomId': createTbItem('订单编号', 'order_random_id'),
  'name': createTbItem('客户姓名', 'name'),
  'idcard': createTbItem('身份证号', 'idcard'),
  'mobile': createTbItem('手机号', 'mobile'),
  'model': createTbItem('车辆型号', 'model'),
  'isNew': createTbItem('车辆类型', 'is_new', {
    formatter: (row, column, cellValue, index) => ({ '1': '新车', '2': '二手车' }[cellValue])
  }),
  'payType': createTbItem('支付类型', 'type'),
  'subComp': createTbItem('所属分公司', 'sub_company'),
  'inviter': createTbItem('客户经理', 'inviter'),
  'time': createTbItem('申请时间', 'apply_time', dateFormatter('{y}-{m}-{d} {h}:{i}:{s}')),
  'ctime': createTbItem('创建时间', 'created_at', dateFormatter('{y}-{m}-{d} {h}:{i}:{s}')),
  'etime': createTbItem('入职日期', 'entry_time', dateFormatter()),
  'status': createTbItem('当前流程', 'status', {
    formatter: (row, column, cellValue, index) => {
      const orderFilter = switchFilter('orderStatus')
      return Array.isArray(cellValue) ? cellValue.map(orderFilter).join(',') : ''
    }
  }),
  'roles': createTbItem('角色', 'roles', {
    formatter: (row, column, cellValue, index) => {
      return Array.isArray(cellValue) ? cellValue.map(item => (item.name)).join(',') : ''
    }
  }),
  'responsible': createTbItem('负责人', 'responsible'),
  'createrAdmin': createTbItem('创建人', 'created_admin_user'),
  'dataPermission': createTbItem('数据访问权限', 'data_permission', { formatter: tbFormatters.dataPermission }),
  'money': createTbItem('金额', 'money', { formatter: tbFormatters.tbMoneyFormatter }),
  'action': {
    label: '操作',
    action: []
  }
})

export function checkoutTableColumns (keys, originData) {
  const tbColumns = originData || tbColumnsFn()
  if (Array.isArray(keys)) {
    return keys.map(item => (tbColumns[item]))
  } else if (keys && typeof keys === 'object') {
    return Object.keys(keys).map(item => (Object.assign({}, tbColumns[item] || {}, keys[item] || {})))
  }
  return Object.values(tbColumns)
}
export function checkoutFormItems (keys, originData) {
  const formItems = originData || formItemsFn()
  if (Array.isArray(keys)) {
    return keys.map(item => (formItems[item]))
  } else if (keys && typeof keys === 'object') {
    return Object.keys(keys).map(item => (Object.assign({}, formItems[item] || {}, keys[item] || {})))
  }
  return Object.values(formItems)
}

export function filterExportParams (params) {
  if (!params) return params
  let filterParams = cloneJsonObj(params)
  filterParams.size && (delete filterParams.size)
  filterParams.page && (delete filterParams.page)
  return filterParams
}
export function formTimeSwtich (time, keys = ['start_time', 'end_time']) {
  let result = {}
  if (Array.isArray(keys) && keys.length === 2) {
    time && time[0] && (result[keys[0]] = Math.round((+time[0]) / 1000))
    time && time[1] && (result[keys[1]] = Math.round((+time[1]) / 1000))
  }
  return result
}
export function handleFormData (formData, keys) { // 时间
  const { time } = formData
  const searchTimes = formTimeSwtich(time, keys)
  delete formData.time
  return Object.assign(cloneJsonObj(formData), searchTimes)
}
// 排序提示tip
export function sortTipRender (h, { column }) {
  // 添加表头排序提示
  let content
  if (!column.order) {
    content = '默认-点击按升序排列'
  } else if (column.order === 'ascending') {
    content = '升序-点击按降序排列'
  } else if (column.order === 'descending') {
    content = '降序-点击按默认排列'
  }
  return (
    <el-tooltip
      class="item"
      effect="dark"
      content={content}
      placement="top"
    >
      <span>{column.label}</span>
    </el-tooltip>
  )
}

// 获取贷款方案通用表头数据
export function getLoanListConfigs (isCommon) {
  const percentFormatter = (row, column, cellValue) => percent(cellValue, '', true)
  const moneyFormatter = (row, column, cellValue) => (typeof cellValue === 'number' && (commaNum(cellValue, '0,0.00') + '元'))
  const taxFormatter = (row, column, cellValue) => switchFilter('loanTax')(cellValue)
  const insFormatter = (row, column, cellValue) => switchFilter('loanInsurance')(cellValue)
  const serviceFormatter = (row, column, cellValue) => switchFilter('afterSalesService')(cellValue)
  return {
    dataHandler (data) {
      let sortItem = {}
      return Array.isArray(data) ? data.map(item => {
        let newItem = Object.assign({}, item)
        if (sortItem.name !== newItem.name) {
          newItem.rowSpan = 1
          sortItem = newItem
        } else {
          sortItem.rowSpan++
        }
        return newItem
      }) : []
    },
    columns: [
      createTbItem('贷款方案', 'name'),
      createTbItem('贷款期数', 'term', { formatter: (row, column, cellValue) => (cellValue + '期') }),
      ...(isCommon ? [
        createTbItem('首付比例', 'downpayment_rate', { formatter: percentFormatter }),
        createTbItem('贷款利率', 'loan_rate', { formatter: percentFormatter })
      ] : [
        createTbItem('首付金额', 'downpayment_money', { formatter: moneyFormatter }),
        createTbItem('月供金额', 'month_pay', { formatter: moneyFormatter }),
        createTbItem('尾款金额', 'last_pay', { formatter: moneyFormatter })
      ]),
      createTbItem('购置税', 'tax', { formatter: taxFormatter }),
      createTbItem('保险', 'insurance_interval', { formatter: insFormatter }),
      createTbItem('保养', 'after_sales_service', { formatter: serviceFormatter })
    ],
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'name') {
        return [row.rowSpan, 1]
      }
    }
  }
}

// 导出表单页面通用配置数据
export function commonFormProps (isInline, props = {}) {
  return Object.assign({ labelPosition: 'right' }, isInline ? {
    class: 'lease-common-form-inline',
    inline: true,
    labelWidth: '100px',
    size: 'small'
  } : {
    class: 'lease-common-form',
    labelWidth: '120px',
    size: 'small'
  }, props || {})
}
// 创建ModulePane组件用模块信息
export const createModuleInfo = (title, key, component, props, others) => ({
  title,
  key,
  component,
  props,
  ...others
})
