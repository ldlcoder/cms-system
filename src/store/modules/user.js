import { Storage } from '@/utils'
import smartfetch from 'smartfetch'

const token = Storage('TOKEN') || ''
const userInfo = Storage('USERINFO') || {}

export default {
  state: {
    isLogin: Boolean(token),
    token,
    userInfo,
    companyName: userInfo.company_name ? userInfo.company_name : ''
  },
  mutations: {
    LOGIN_IN: (state, { token, userInfo }) => {
      state.token = token
      state.userInfo = userInfo
      state.companyName = userInfo.company_name
      smartfetch.modifyBaseConfigs(baseConfig => {
        baseConfig.forEach(item => {
          !item.headers && (item.headers = {})
          item.headers.token = token
        })
      })
      state.isLogin = Boolean(token)
      Storage('TOKEN', token)
      Storage('USERINFO', userInfo)
    },
    LOGIN_OUT: state => {
      state.isLogin = false
      state.token = ''
      state.userInfo = {}
      Storage(false)
    }
  },
  actions: {
  }
}
