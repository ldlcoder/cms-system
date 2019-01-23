import mixins from '../../mixins'
import { mergeObj } from '@/utils'
import { createSelectFormItem } from '@/common'
import store from '@/store'

const bankList = Array.isArray(store.getters.bankList) ? store.getters.bankList : []

export function selectRules (required) {
  return (required ? [{ required: true, message: '请选择银行', trigger: 'blur' }] : [])
}
const selectField = (label, prop, required) => createSelectFormItem({
  label,
  rules: selectRules(required)
}, prop, '', bankList, false)

const checkboxsFiled = (label, prop, required) => ({
  props: {
    label,
    ...(required ? {rules: [{ type: 'array', required: true, message: '请选择银行', trigger: 'blur' }]} : {})
  },
  prop,
  fields: {
    component: 'ElCheckboxGroup',
    data: bankList,
    modelDef: []
  }
})
/* 默认数据部分，可单独导出 */
export function fieldData (label, prop, required, mode, config = {}) {
  const fiels = mode === 'checkbox' ? checkboxsFiled(label, prop, required) : selectField(label, prop, required)
  return mergeObj({}, fiels, config)
}
export default {
  name: 'FormItemTelphone',
  props: {
    label: {
      type: String,
      default: '银行'
    },
    mode: {
      type: String,
      default: 'select'
    }
  },
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.label, this.prop || 'bank', this.required, this.mode, this.field)
    }
  }
}
