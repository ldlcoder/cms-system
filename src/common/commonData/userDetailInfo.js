import { createModule, createInfoTb } from './infoTable'
import { checkoutTableColumns, createTbItem, createModuleInfo } from '@/common'
import ListTable from '@/components/ListTable'

const bindCusColumns = () => (checkoutTableColumns({
  'index': null,
  'name': { label: '微信昵称' },
  'mobile': null,
  'ctime': { label: '注册时间' }
}))
const orderCusColumns = () => (checkoutTableColumns({
  'index': null,
  'name': null,
  'mobile': null,
  '_carModel': createTbItem('预约车型', 'model', {
    formatter: (row, column, cellValue, index) => ([row.model, row.brand_name, row.system].join(' '))
  }),
  'time': { label: '预约时间', prop: 'appointment_time' }
}))

export function createInfoTableConfig (keys) {
  const configs = {
    base: createModule('基本信息', '', 'InfoTable', {
      name: { label: '员工姓名' },
      mobile: null,
      subCompany: { key: 'company_sub_name' },
      team: null,
      '_area': createInfoTb('所在地区', 'area'),
      dataPermission: null,
      date: { label: '入职日期', key: 'entry_time' }
    }),
    inviteCode: createModule('客户邀请码', '', 'InfoTable', {
      '_invCode': createInfoTb('邀请码', 'invite_code'),
      '_invUrl': createInfoTb('邀请链接', 'invite_link', { md: 12, lg: 12 }, {
        filter: (value, data) => (value && `${value}${value.indexOf('?') > -1 ? '&' : '?'}invite_code=${data.invite_code}`)
      })
    })
  }
  return Array.isArray(keys) ? keys.map(item => (configs[item] || {})) : Object.values(configs)
}

export function createListTableConfig (title, key, columns, getDataList, others) {
  return createModuleInfo(title, key, ListTable, (data, origin) => ({ data, columns, getDataList }), others)
}

export function createListModuleConfig (getBindCusList, getOrderCusList) {
  const bindListConfig = getBindCusList ? [createListTableConfig('绑定客户', 'bindCusData', bindCusColumns(), getBindCusList)] : []
  const orderListConfig = getOrderCusList ? [createListTableConfig('预约客户', 'orderCusData', orderCusColumns(), getOrderCusList)] : []
  return orderListConfig.concat(bindListConfig)
}
