import mixins from '../../mixins'
import FormItemFields from '@/components/FormItemFields'
import { mergeObj } from '@/utils'
import { createInputFormItem } from '@/common'

export function verifyCodeRules (required, message) {
  return (required ? [{ required: true, message, trigger: 'blur' }] : [])
}
const passWordField = (prop, required) => createInputFormItem({
  label: '密码',
  rules: verifyCodeRules(required, '请输入密码')
}, {
  placeholder: '请输入密码',
  type: 'password'
}, prop)

const confirmPwdField = (prop, required, pwdProp, formData) => createInputFormItem({
  label: '确认密码',
  rules: verifyCodeRules(required, '请输入确认密码').concat([
    {
      validator (rule, value, callback) {
        if (formData[pwdProp] !== value) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      message: '两次输入密码不一致',
      trigger: 'blur'
    }
  ])
}, {
  placeholder: '再次确认密码',
  type: 'password'
}, prop)
/* 默认数据部分，可单独导出 */
export function fieldData (props = {}, required, formData = {}, configs = {}) {
  let pwdProp = props.password || 'password'
  const pwdField = mergeObj({}, passWordField(pwdProp, required), configs.password)
  pwdProp = Array.isArray(pwdField.propCascade) ? pwdField.propCascade.concat([pwdProp]).join('.') : pwdProp
  return [
    pwdField,
    mergeObj({}, confirmPwdField(props.confirmPwd || 'confirmPwd', required, pwdProp, formData), configs.confirmPwd)
  ]
}
export default {
  name: 'FormItemPasswords',
  components: {
    FormItemFields
  },
  props: {
    fields: Object,
    props: Object
  },
  mixins: [mixins],
  computed: {
    handleField () {
      return fieldData(this.props, this.required, this.value, this.fields)
    }
  },
  methods: {
  }
}
