import { createInputFormItem, createFiRulesProps, createSelectFormItem } from '@/common'
import { getCommonApis } from '../common'
import { carRepareSend } from '@/api/orderAudit'

const createFormItem = (formData, appConfig) => ([
  createInputFormItem('车牌号', '', 'plate_number'),
  createInputFormItem('GPS编号1', '', 'gps_1'),
  createInputFormItem('GPS编号2', '', 'gps_2'),
  createInputFormItem('安装位置', '', 'gps_1_position'),
  createInputFormItem(createFiRulesProps('经销商', true), '请输入经销商', 'merchant'),
  createSelectFormItem(createFiRulesProps('保险购买', '请选择保险购买渠道'), 'insurance_channel', '', appConfig.repareInsTypes, false),
  createInputFormItem({
    label: '备注',
    class: 'long-form-item'
  }, {
    type: 'textarea',
    row: 8,
    placeholder: '请输入备注'
  }, 'remark')
])

const moduleKeys = {
  'source': null,
  'customer': ['name', 'idcard', 'mobile', 'sex', 'age'],
  'goods': null,
  'loanList': null,
  'tradeInfo': ['actualFee', 'feeTime']
}

export default {
  RSD: {
    formData: {}
  },
  moduleKeys,
  hasExtra: true,
  fieldItems: createFormItem,
  formTitle: '备车管理信息',
  formProps: {
    inline: true,
    cancelSkip: 'CarPrepare'
  },
  handledApis: Object.assign(getCommonApis(), {
    formInfoSend: carRepareSend
  })
}
