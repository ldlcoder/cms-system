import { createInputFormItem, createSelectFormItem, createFiRulesProps } from '@/common'
import { checkoutCommonRules, formulaValidate, rulesCreater } from '@/utils/validate'
import store from '@/store'

export function getFormFields () {
  const { loanTerm, loanRates, loanTax, loanInsurance, afterSalesService } = store.getters.appConfig
  const { rangeValue } = rulesCreater
  const rateRules = checkoutCommonRules(['number', 'notLessZero']).concat([rangeValue(100)])
  return [
    createInputFormItem(createFiRulesProps('贷款方案', true), '贷款方案名称', 'name'),
    createSelectFormItem(createFiRulesProps('贷款期数', '请选择贷款期数'), 'term', '', loanTerm, false),
    createSelectFormItem(createFiRulesProps('首付比例', '请选择首付比例 '), 'downpayment_rate', '', loanRates, false),
    createInputFormItem(createFiRulesProps('贷款利率', true, rateRules), {
      placeholder: '贷款利率',
      suffixIcon: 'lease-icon-precent'
    }, 'loan_rate', { isNumber: true }),
    createSelectFormItem(createFiRulesProps('购置税', '请选择购置税'), 'tax', '', loanTax, false),
    createSelectFormItem(createFiRulesProps('保险', '请选择保险'), 'insurance_interval', 0, loanInsurance, false),
    createSelectFormItem(createFiRulesProps('保养', '请选择保养'), 'after_sales_service', 0, afterSalesService, false)
  ]
}
function isFormulaValidate (rule, value, callback) {
  formulaValidate(value, ['D', 'S', 'L', 'P']) ? callback() : callback(new Error('公式格式有误'))
}
export function getFormulaField (isEdit) {
  return createInputFormItem(createFiRulesProps('月供金额=', '请输入月供公式', [
    { validator: isFormulaValidate, message: '公式格式有误', trigger: 'blur' }
  ]), { disabled: !isEdit, placeholder: '请输入月供公式' }, 'formula')
}
