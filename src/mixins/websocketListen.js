import {getWsToken} from '@/api/account'
import {debounce} from 'lodash'
import {openNewUrl} from '@/utils'
export default {
  data () {
    return {
      rctLimit: {
      },
      faileTimes: 0
    }
  },
  created () {
    this.preConnectWs()
    this.listenPostMessage()
    this.connectWebsocket()
  },
  beforeDestroy () {
    this.$sps.endListen()
  },
  methods: {
    // utils
    // 处理错误码
    errorHandler (code, notifyMsg) {
      switch (code) {
        case 5001:
          this.disconnectWebsocket()
          break
        case 5002:
          // token错误重新请求一次，如果任然错误放弃请求
          this.limitReconnectTime('tokenWrong', 1, this.getWsToken)
          break
        case 5003:
          this.limitReconnectTime('tokenExpire', 1, this.getWsToken)
          break
      }
    },
    // 限制重连次数
    limitReconnectTime (key, times, fn) {
      const {rctLimit} = this
      !rctLimit.hasOwnProperty(key) && this.$set(rctLimit, key, 0)
      if (rctLimit[key] < times) {
        typeof fn === 'function' && fn()
        this.rctLimit[key]++
      }
    },
    // business
    // 重新打开websocket连接
    reconnectWebsocket () {
      setTimeout(() => {
        this.connectWebsocket()
      }, 1000 * Math.random())
    },
    // 获取websocket用的token
    getWsToken () {
      this.$fetch(getWsToken).done(data => {
        if (data) {
          this.$store.commit('SET_WS_TOKEN', data)
          this.handleWebsocketOpen()
        }
      })
    },
    // 处理websocket打开相关事务
    handleWebsocketOpen () {
      this.$ws.open()
      this.$store.commit('TOGGLE_WSINCP', true)
    },
    // 注册websocket相关处理事件
    preConnectWs () {
      this.$ws.addCodeErrorHandler(this.errorHandler)
      this.$ws.resetOptions({onDisconnect: this.reconnectLimit})
      this.listenWsMessage()
      this.listenPageLeave()
      this.listenInquireDownload()
    },
    // 公共监听websocket
    listenWsMessage () {
      this.listenPackageEvents()
    },
    // 公共监听postMessage
    listenPostMessage () {
      this.$sps.startListen()
    },
    // 连接websocket
    connectWebsocket () {
      this.$store.getters.wsToken ? this.handleWebsocketOpen() : this.getWsToken()
    },
    // 关闭websocket链接
    disconnectWebsocket () {
      this.$ws.close()
      this.$store.commit('TOGGLE_WSINCP', false)
    },
    reconnectLimit () {
      this.disconnectWebsocket()
      if (this.faileTimes < 10) {
        debounce(this.connectWebsocket, 1000)
        this.faileTimes++
      }
    },
    listenPageLeave () {
      window.addEventListener('unload', this.pageLeaveHandle)
    },
    pageLeaveHandle (event) {
      this.wsInCurPage && this.$sps.commit('openNewWebsocket', true)
    },
    // 局部功能模块
    // 监听打包事件
    listenPackageEvents () {
      this.$ws.on('package_video', this.broadPackageSpsEvent)
    },
    broadPackageSpsEvent (data) {
      this.$route.name !== 'CustomerVideos' && this.$sps.commit('packageFinish', data)
    },
    // 监听征信报告下载结果
    listenInquireDownload () {
      this.$ws.on('inquire_words', this.downInquireWords)
    },
    // 自动下载word文档
    downInquireWords (data) {
      Array.isArray(data) && data.forEach(item => { item && openNewUrl(item) })
    }
    // events
  }

}