<template>
  <div class="pwd-modify-page">
    <el-form class="card-box pwd-form" ref="form" v-bind="formProps" :model="formData">
      <form-item-fields
        :fieldItems="fieldItems"
        v-model="formData"
      >
      </form-item-fields>
      <el-form-item>
        <el-button class="submit-btn" type="primary" :loading="sending" @click.native.prevent="pwdModifySubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createInputFormItem, commonFormProps } from '@/common'
import { md5 } from '@/utils' // 用于md5
import FormItemFields from '@/components/FormItemFields'
import { passwordsData } from '@/common/components/CommonFormItems'
import { modifyPwd } from '@/api/common'

const requiredRule = (msg) => ([{ required: true, message: msg + '不能为空' }])
const fieldItems = (formData) => ([
  createInputFormItem({ label: '原密码', rules: requiredRule('原密码') }, { placeholder: '请输入原密码',
    type: 'password' }, 'oldPwd')
].concat(passwordsData({}, true, formData)))

export default {
  name: 'ModifyPwd',
  components: {
    FormItemFields
  },
  data () {
    return {
      formProps: commonFormProps(),
      formData: {
        oldpwd: '',
        password: '',
        confirmPwd: ''
      },
      sending: false,
      isRemember: false
    }
  },
  computed: {
    fieldItems () {
      return fieldItems(this.formData)
    }
  },
  created () {
  },
  methods: {
    /** business **/
    pwdModifySend () {
      const { oldPwd, password } = this.formData
      const params = { oldPwd: md5(oldPwd), password: md5(password) }
      this.$fetch(modifyPwd, params).lock('sending').done(data => {
        this.$leaseMessage(data, data ? '修改成功，需重新登录' : '修改失败', () => {
          this.$store.commit('LOGIN_OUT')
        })
      })
    },
    /** events **/
    pwdModifySubmit () {
      this.$refs.form.validate(res => {
        res && this.pwdModifySend()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pwd-modify-page {
  @include page-module-pane;
  .submit-btn {
    width: 100%;
    margin-bottom: 30px;
  }

}
</style>
