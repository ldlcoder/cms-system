import mixins from '../../mixins'
import { mergeObj } from '@/utils'
import { idCardReg, idCardValidate } from '@/utils/validate'
import { createInputFormItem } from '@/common'
export function idCardRules (required) {
  return (required ? [{ required: true, message: '请输入身份证号码', trigger: 'blur' }] : []).concat([
    { pattern: idCardReg, message: '身份证号码格式有误', trigger: 'blur' },
    { validator: idCardValidate, message: '身份证号码不合法', trigger: 'blur' }
  ])
}
const field = (prop, required) => createInputFormItem({
  label: '身份证号',
  rules: idCardRules(required)
}, {
  placeholder: '请输入身份证号码',
  maxlength: 18
}, prop)
/* 默认数据部分，可单独导出 */
export function fieldData (prop = '', required, config = {}) {
  return mergeObj({}, field(prop, required), config)
}
export default {
  name: 'FormItemIdcard',
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.prop, this.required, this.field)
    }
  }
}
