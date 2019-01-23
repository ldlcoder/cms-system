import { createInputFormItem, createFiRulesProps, createSelectFormItem } from '@/common'
import { getCommonApis } from '../common'
import { riskAuditSend } from '@/api/orderAudit'

const createFormItem = (formData, appConfig) => ([
  createSelectFormItem(createFiRulesProps('审核结果', '请选择审核结果'), 'status', '', appConfig.auditStatus, false),
  createInputFormItem(createFiRulesProps('审核备注', false, [
    {
      validator (rule, value, callback) {
        return (formData && formData.status - 2 === 0 && !value) ? callback(new Error('请填写备注信息')) : callback()
      },
      trigger: 'blur'
    }
  ], {
    class: 'long-form-item'
  }), {
    type: 'textarea',
    row: 8
  }, 'remark', {

  })
])

export default {
  RSD: {
    formData: {}
  },
  moduleKeys: ['source', 'credit', 'customer', 'work', 'contacts', 'families', 'goods', 'loanList'],
  fieldItems: createFormItem,
  formTitle: '风控审核',
  formProps: {
    cancelSkip: 'RiskControl'
  },
  showMedias: true,
  handledApis: Object.assign(getCommonApis(), {
    formInfoSend: riskAuditSend
  })
}
