import { createInputFormItem, createSelectFormItem, createFiRulesProps } from '@/common'
import { passwordsData, telphoneData, FormItemProvCityArea } from '@/common/components/CommonFormItems'

export function createDateFormItem (label, placeholder, prop, extraProps = {}) {
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: 'ElDatePicker',
      props: typeof placeholder === 'object' ? placeholder : {
        placeholder
      }
    },
    prop,
    ...extraProps
  }
}

export function getFormFields (formData, isEdit, formConfig) {
  return [
    createInputFormItem(createFiRulesProps('姓名', true), '请输入姓名', 'name'),
    createSelectFormItem(createFiRulesProps('所属分公司'), 'company_sub_id', '', formConfig.subCompany, false, {}),
    createSelectFormItem(createFiRulesProps('所属团队'), 'team_id', '', null, false, { cascaderModel: 'company_sub_id', cascader: formConfig.team }),
    {
      props: {
        prop: 'city_code',
        required: true,
        sourceData: { province: formConfig.provCity.province, city: formConfig.provCity.city }
      },
      component: FormItemProvCityArea
    },
    createSelectFormItem(createFiRulesProps('数据访问权限', '请选择数据访问权限'), 'data_permission', '', formConfig.dataPermission, false, {}),
    createDateFormItem(createFiRulesProps('入职日期', '请选择入职日期'), { placeholder: '请输入选择入职日期', type: 'date', class: 'date' }, 'entry_time'),
    telphoneData('mobile', true, { props: { label: '账号' }, ...(isEdit ? { fields: { props: { disabled: true } } } : {}) }),
    ...(isEdit ? [] : passwordsData({ confirmPwd: 'password_confirm' }, true, formData))
  ]
}
