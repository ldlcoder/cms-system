<template>
  <div class="login-page">
    <el-form class="card-box login-form" ref="loginForm" autoComplete="on" :model="loginForm">
      <div class="img-title"></div>
      <form-item-fields
        :fieldItems="fieldItems"
        v-model="loginForm"
      >
      </form-item-fields>
      <el-checkbox v-model="isRemember" class="remember-checkbox">记住密码</el-checkbox>
      <el-button class="submit-btn" type="primary" :loading="sending" @click.native.prevent="adminLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { createInputFormItem } from '@/common'
import { md5 } from '@/utils' // 用于md5
import FormItemFields from '@/components/FormItemFields'
import { login } from '@/api/common'

const requiredRule = (msg) => ([{ required: true, message: msg + '不能为空' }])
const fieldItems = [
  createInputFormItem({ rules: requiredRule('账号') }, { prefixIcon: 'lease-icon-zhanghao', placeholder: '账号', maxLength: 11, autoComplete: 'on' }, 'account'),
  createInputFormItem({ rules: requiredRule('密码') }, { prefixIcon: 'lease-icon-mima', placeholder: '密码', type: 'password', autoComplete: 'on' }, 'password')
]

export default {
  components: {
    FormItemFields
  },
  name: 'Login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      fieldItems,
      sending: false,
      isRemember: false
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    /** business **/
    loginSend () {
      const { account, password } = this.loginForm
      const params = { account, password: md5(password) }
      this.$fetch(login, params).lock('sending').done(data => {
        if (data && data.token) {
          this.$store.commit('LOGIN_IN', { token: data.token, userInfo: data.user_info })
          this.$router.push({ name: 'AdminIndex' })
          // location.reload()
        }
      })
    },
    /** events **/
    adminLogin () {
      this.$refs.loginForm.validate(res => {
        res && this.loginSend()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: $darkBlue;
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .img-title {
    height: 140px;
    background: url('./images/login-bg.png') no-repeat center top;
  }
  .login-form {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin-left: -200px;
  }
  /deep/ .comp-form-item-fields {
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #ffffff;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      line-height: 47px;
      width: 100%;
      .el-input__inner {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding-left: 40px;
        color: #ffffff;
        height: 47px;
      }
      .el-input__prefix {
        line-height: 50px;
        left: 12px;
        .el-input__icon {
          font-size: 18px;
        }
      }
    }
  }
  .remember-checkbox {
    margin-bottom: 20px;
    margin-left: 5px;
  }
  .submit-btn {
    width: 100%;
    margin-bottom: 30px;
  }

}
</style>
