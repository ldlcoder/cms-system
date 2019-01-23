import { Storage, configToMap, loadjs } from '@/utils'
import getAppConfig from '@/common/config/appConfig'
const appConfig = Storage.session('APPCONFIG') || getAppConfig() || {}

// APP_VERSION在运行时会被替换成当前git版本分支号
/* global APP_VERSION:'' */
const appVersion = APP_VERSION

export default {
  state: {
    appVersion: appVersion,
    apiConfig: window.config || { url: '', urlc: '', upload: '', url_after: '' },
    sidebar: {
      opened: typeof Storage('SIDEBARSTATUS') === 'boolean' ? Storage('SIDEBARSTATUS') : true,
      menuItems: [],
      firstRoute: ''
    },
    rememberRoute: '',
    remember: false,
    appConfig,
    cfgKeyValueMap: configToMap(appConfig),
    uploadConfig: Storage('UPLOADCONFIG') || {},
    roles: Storage('COMPANYROLES') || [],
    provCity: Storage('PROVCITY') || { province: [], city: {} },
    adminLayoutSwitch: {
      roles: false,
      provCity: false
    }
  },
  mutations: {
    SET_APP_CONFIG: (state, config) => {
      state.appConfig = Object.assign({}, state.appConfig, config || {})
      state.cfgKeyValueMap = configToMap(appConfig)
      Storage('APPCONFIG', state.appConfig)
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      Storage('SIDEBARSTATUS', state.sidebar.opened)
    },
    SET_SIDEBAR_MENU: (state, data) => {
      state.sidebar.menuItems = Array.isArray(data) ? data : []
    },
    SET_FIRST_ROUTE: (state, routeName) => {
      state.sidebar.firstRoute = routeName
    },
    SET_REMEMBER: (state, remember) => {
      state.remember = remember
    },
    SET_REMEMBER_ROUTE: (state, routeName) => {
      state.rememberRoute = routeName
    },
    SET_UPLOAD_CONFIG: (state, configs) => {
      if (typeof configs === 'object') {
        state.uploadConfig = configs
        Storage('UPLOADCONFIG', configs)
      }
    },
    SET_ROLES: (state, configs) => {
      if (Array.isArray(configs)) {
        state.roles = configs
        Storage('COMPANYROLES', configs)
      }
    },
    SET_PROV_CITY: (state, configs) => {
      if (configs && ((configs.province && Array.isArray(configs.province)) || (configs.city && Object.keys(configs.city).length))) {
        state.provCity = Object.assign({}, state.provCity, configs)
        Storage('PROVCITY', state.provCity)
      }
    },
    SET_ADMIN_LAYOUT_SWITCH: (state, { key, value } = { }) => {
      key && (state.adminLayoutSwitch[key] = value)
    }
  },
  actions: {
    getDyncAppConfig ({ commit }, url) {
      return new Promise((resolve, reject) => {
        loadjs(url + 'main/getconfigdata', () => {
          const { LEASE_APP_CONFIG } = window
          commit('SET_APP_CONFIG', Object.assign({ '__dynamic': Boolean(LEASE_APP_CONFIG) }, LEASE_APP_CONFIG || {}))
          resolve()
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
