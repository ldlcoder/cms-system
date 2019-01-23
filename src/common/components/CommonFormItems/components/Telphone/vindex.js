import mixins from '../../mixins'
import { mergeObj } from '@/utils'
import { telphoneReg } from '@/utils/validate'
import { createInputFormItem } from '@/common'
export function telphoneRules (required) {
  return (required ? [{ required: true, message: '请输入手机号码', trigger: 'blur' }] : []).concat([
    { pattern: telphoneReg, message: '手机号码格式有误', trigger: 'blur' }
  ])
}
const field = (prop, required) => createInputFormItem({
  label: '手机号',
  rules: telphoneRules(required)
}, {
  placeholder: '请输入手机号码',
  maxlength: 11
}, prop)
/* 默认数据部分，可单独导出 */
export function fieldData (prop, required, config = {}) {
  return mergeObj({}, field(prop, required), config)
}
export default {
  name: 'FormItemTelphone',
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.prop, this.required, this.field)
    }
  }
}
