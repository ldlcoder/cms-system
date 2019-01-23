import { createInputFormItem } from '../../common/moduleCommon'

export function createItemProps (label, required, rules, others) {
  const requiredRule = required ? [{ required: true, message: (typeof required === 'string' ? required : '请输入' + label), trigger: 'blur' }] : []
  return {
    label,
    rules: requiredRule.concat(Array.isArray(rules) ? rules : []),
    ...others
  }
}

export function getCommonOptions ({detailParamsKey}) {
  return {
    onSendSuccess (data) {
      this.returnToList()
    },
    getDetailParamsHandle (id) {
      return {[detailParamsKey || 'id']: id}
    }
  }
}