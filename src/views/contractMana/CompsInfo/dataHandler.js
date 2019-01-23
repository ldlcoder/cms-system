import { createInputFormItem, createSelectFormItem, createFiRulesProps, createModuleInfo } from '@/common'
import { idcardData, telphoneData } from '@/common/components/CommonFormItems'
import { getInfoTableProps } from '@/common/commonData/infoTable'
import store from '@/store'

export function getFormFields () {
  return [
    createInputFormItem(createFiRulesProps('企业名称', true), '企业名称', 'ent_name'),
    createInputFormItem(createFiRulesProps('工商注册号', true), '工商注册号', 'reg_code'),
    createInputFormItem(createFiRulesProps('组织机构代码', true), '组织机构代码', 'org_code'),
    createInputFormItem(createFiRulesProps('税务登记证号', true), '税务登记证号', 'tax_code'),
    telphoneData('mobile', true, { props: { label: '联系手机号' } }),
    createSelectFormItem(createFiRulesProps('签约类型', '请选择签约类型'), 'side', '', store.getters.appConfig.signType, false)
  ]
}

export function getLegalFormFields () {
  return [
    createInputFormItem(createFiRulesProps('姓名', true), '姓名', 'legal_name'),
    createSelectFormItem(createFiRulesProps('证件类型', '请选择证件类型'), 'legal_cert_type', null, store.getters.appConfig.IDType, false, {}, { disabled: true }),
    idcardData('legal_cert_no', true),
    telphoneData('legal_mobile', false)
  ]
}

const defPro = { md: 24, lg: 24 }
export function getCompInfoConfig (switchFilter) {
  return [
    { label: '企业名称', key: 'ent_name', props: defPro },
    { label: '工商注册号', key: 'reg_code', props: defPro },
    { label: '组织机构代码', key: 'org_code', props: defPro },
    { label: '税务登记证号', key: 'tax_code', props: defPro },
    { label: '联系手机号', key: 'mobile', props: defPro },
    { label: '签约类型', key: 'side', props: defPro, filter: switchFilter('signType') }
  ]
}
export function getLegalInfoConfig (switchFilter) {
  return [
    { label: '姓名', key: 'legal_name', props: defPro },
    { label: '证件类型', key: 'legal_cert_type', props: defPro, filter: switchFilter('IDType') },
    { label: '身份证号', key: 'legal_cert_no', props: defPro },
    { label: '手机号', key: 'legal_mobile', props: defPro }
  ]
}
export function getModuleConfig (switchFilter) {
  return [
    createModuleInfo('企业信息', '', 'InfoTable', getInfoTableProps(getCompInfoConfig(switchFilter))),
    createModuleInfo('企业法定代表人信息', '', 'InfoTable', getInfoTableProps(getLegalInfoConfig(switchFilter)))
  ]
}
