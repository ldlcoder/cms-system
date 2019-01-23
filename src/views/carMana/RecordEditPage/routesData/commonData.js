import { createInputFormItem, createSelectFormItem } from '@/pages/common/moduleCommon'
import { createItemProps } from '../common'
import { FormItemProvCityArea, banksData } from '#comps/CommonFormItems'
import { province, city } from '@/common/provCityData'

export function getCommonFieldsItems (bankArgs = []) {
  return {
    dist: {
      props: {
        prop: 'city',
        required: true,
        sourceData: {province: province(), city: city()}
      },
      component: FormItemProvCityArea
    },
    company: createSelectFormItem(createItemProps('所属公司', true), 'company_id', '', null, false),
    operation: createSelectFormItem(createItemProps('所属业务地区', true), 'operation_id', '', null, false, {cascaderModel: 'company_id'}),
    bank: banksData(...bankArgs),
    responsible: createInputFormItem(createItemProps('负责人', true), '请输入负责人', 'responsible')
  }
}

export function formDynamicDataHandler (rmd, data, modules) {
  const findField = prop => rmd.fieldItems.find(item => (item.prop === prop))
  const itemSwitch = item => ({label: item.name, value: item.id})
  const companyField = findField('company_id')
  if (Array.isArray(data)) {
    companyField && (companyField.fields.data = data.map(itemSwitch))
    if (modules.operation) {
      let cascader = {}
      const operationField = findField('operation_id')
      data.forEach(item => {
        cascader[item.id] = Array.isArray(item.has_many_operation) ? item.has_many_operation.map(itemSwitch) : []
      })
      operationField && (operationField.cascader = cascader)
    }
    if (modules.team) {
      let cascader = {}
      const teamField = findField('team_id')
      data.forEach(item => {
        Array.isArray(item.has_many_operation) && item.has_many_operation.forEach(oitem => {
          cascader[oitem.id] = Array.isArray(oitem.has_many_team) ? oitem.has_many_team.map(itemSwitch) : []
        })
      })
      teamField && (teamField.cascader = cascader)
    }
  }
}