<template>
  <div class="comp-system-message">
    <el-popover
      v-model="popShow"
      popper-class="pop-message-pane"
    >
      <el-badge slot="reference" :value="total" :max="99" class="message-badge" :hidden="!total">
        <i class="lr-icon-xiaoxi bell-icon"></i>
      </el-badge>
      <pop-message-list
        :dataList="dataList"
        :loading="loading"
        :sending="sending"
        :total="total"
        :reachBottom="reachBottom"
        :skipToPage="skipToPage"
        :skipToDetail="skipToDetail"
      >
      </pop-message-list>
    </el-popover>
    <el-dialog
      custom-class="sys-notice-pop"
      :visible.sync="noticeShow"
      :append-to-body="true"
      title="系统公告"
      :modal="false"
    >
      <a href="javascript:void(0)" @click="readMessage(noticeInfo.id)">{{noticeInfo.title}}</a>
    </el-dialog>
  </div>
</template>

<script>
import PopMessageList from './components/PopMessageList'
import { messageAllRead, getUserMessage } from '@/api/message'
import { cloneJsonObj } from '@/utils'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'SystemMessage',
  components: {
    PopMessageList
  },
  props: {},
  data () {
    return {
      popShow: false,
      total: 0,
      uniqueKeys: [], // 用于去重的id数组
      dataList: [], // 总列表数据
      list: [], // 当前页列表数据
      loading: false,
      sending: false,
      params: {
        unread: 1,
        page: 1,
        size: 5
      },
      noticeShow: false,
      noticeInfo: {}
    }
  },
  created () {
    this.listenWsMessage()
    this.listenPostMessage()
    this.getDataList()
  },
  computed: {
    ...mapGetters([
      'wsInCurPage'
    ])
  },
  watch: {
    '$store.getters.msgReadAllSend' (newVal, oldVal) {
      newVal && this.allReadSend()
    },
    '$store.getters.readedMsgId': 'removeReadMsg',
    '$store.getters.msgNeedRefresh' (newVal, oldVal) {
      newVal && this.refreshDataList()
    }
  },
  methods: {
    //// utils
    //// bussiness

    // 页面框架部分
    // 监听websocket通知信息
    listenWsMessage () {
      this.$ws.on('message', this.wsReceiveData)
    },
    // 接收websocket数据
    wsReceiveData (data) {
      this.wsInCurPage && this.$sps.commit('newMessage', data)
      this.handlePopMessage(data)
    },
    // 监听postMessage
    listenPostMessage () {
      this.$sps.on('openNewWebsocket', this.reconnectWebsocket)
      this.$sps.on('newMessage', this.handlePopMessage)
    },
    // 处理推送数据
    handlePopMessage (data) {
      this.addNewMsgs([cloneJsonObj(data)], true)
      this.total ++
      this.fixListMove()
      this.wsInCurPage && this.checkMessagePop(data.type) && this.popMessage(data)
    },
    // 业务逻辑部分
    checkMessagePop (type) {
      const {msgSettings} = this.$store.getters
      return !msgSettings || (type == 1 && !msgSettings.inform) || (type == 2 && !msgSettings.notice)
    },
    removeReadMsg (id) {
      this.dataList.length <= 5 && this.getDataList()
      const itemIndex = this.dataList.findIndex(item => (item.id === id))
      if (itemIndex >= 0) {
        this.dataList.splice(itemIndex, 1)
        this.total --
      }
    },
    // 获取未读消息列表
    getDataList (refresh) {
      const {params} = this
      this.$fetch(getUserMessage, params).lock('loading').done(data => {
        if (data) {
          Object.assign(this.$data, data)
          refresh && this.clearMsgList()
          this.addNewMsgs(data.list);
          (data.list.length === params.size) && (params.page ++)
        }
      })
    },
    uniqueMsgList (listArr) {
      const {uniqueKeys} = this
      return listArr.filter(item => {
        const unique = !uniqueKeys.includes(item.id)
        unique && uniqueKeys.push(item.id)
        return unique
      })
    },
    clearMsgList () {
      this.dataList = []
      this.uniqueKeys = []
    },
    // 添加新消息
    addNewMsgs (list, unshift) {
      const uniqueMsgList = this.uniqueMsgList(list)
      uniqueMsgList.length && (unshift ? this.dataList.unshift(...uniqueMsgList) : this.dataList.push(...uniqueMsgList))
    },
    refreshDataList () {
      this.$store.commit('TOGGLE_NEEDREFRESH', false)
      this.params.page = 1
      this.getDataList(true)
    },
    // 注册websocket相关处理事件,1
    preConnectWs () {
      this.$ws.addCodeErrorHandler(this.errorHandler)
      this.$ws.resetOptions({onDisconnect: this.reconnectLimit})
      this.listenWsMessage()
      this.listenPageLeave()
    },
    // 连接websocket,1
    connectWebsocket () {
      this.$store.getters.wsToken ? this.handleWebsocketOpen() : this.getWsToken()
    },
    disconnectWebsocket () {
      this.$ws.close()
      this.$store.commit('TOGGLE_WSINCP', false)
    },
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
    reconnectLimit () {
      this.disconnectWebsocket()
      if (this.faileTimes < 10) {
        debounce(this.connectWebsocket, 1000)
        this.faileTimes ++
      }
    },
    listenPageLeave () {
      window.addEventListener('unload', this.pageLeaveHandle)
    },
    // 监听postMessage,1
    listenPostMessage () {
      this.$sps.on('openNewWebsocket', this.reconnectWebsocket)
      this.$sps.on('newMessage', this.handlePopMessage)
      this.$sps.startListen()
    },
    // 监听websocket通知信息
    listenWsMessage () {
      this.$ws.off('message', this.wsReceiveData)
      this.$ws.on('message', this.wsReceiveData)
    },
    wsReceiveData (data) {
      this.wsInCurPage && this.$sps.commit('newMessage', data)
      this.handlePopMessage(data)
    },
    // 处理推送数据
    handlePopMessage (data) {
      this.addNewMsgs([cloneJsonObj(data)], true)
      this.total ++
      this.fixListMove()
      this.wsInCurPage && this.checkMessagePop(data.type) && this.popMessage(data)
    },

    // 修正列表数据
    fixListMove () {
      this.list.length === this.params.size && this.getDataList()
    },
    allReadSend () {
      this.$fetch(messageAllRead).lock('sending').done(data => {
        this.$store.commit('TOGGLE_READALLSEND', false)
        if (data) {
          this.$store.commit('TOGGLE_NEEDREFRESH', true)
        } else {
          this.$message.error('请求操作失败')
        }
      })
    },
    // 弹出弹框消息
    popMessage (data) {
      if (data.type == 1){
        let a
        a = this.$notify.info({
          title: data.title,
          onClick: () => {
            a.close()
            this.readMessage(data.id)
          },
          customClass: 'sys-inform-pop',
          position: 'bottom-right',
          duration: 10000
        })
      } else if (data.type == 2) {
        Object.assign(this.$data, {noticeShow: true, noticeInfo: data})
      }
    },
    //// events
    reachBottom () {
      this.getDataList()
    },
    skipToDetail (id) {
      this.skipToPage({name: 'MessageDetail', query: {id, unread: 1}})
    },
    skipToPage (route) {
      const trueRoute = typeof route === 'string' ? {name: route} : route
      trueRoute && this.$router.push(trueRoute)
      this.popShow = false
    },
    readMessage (id) {
      Object.assign(this.$data, {noticeShow: false, noticeInfo: {}})
      this.skipToDetail(id)
    }
  }
}
</script>
<style lang="scss">
.pop-message-pane {
  padding: 0;
}
.el-dialog.sys-notice-pop {
  position: absolute;
  left: initial;
  right: 20px;
  bottom: 20px;
  width: 320px;
  border-radius: 6px;
  overflow: hidden;
  .el-dialog__header {
    padding: 8px 18px;
    background-color: #8898b0;
    .el-dialog__title {
      font-size: 14px;
      color: #fff;
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
    .el-icon-close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 14px 20px;
  }
}
.sys-inform-pop {
  line-height: 24px;
  .el-notification__title {
    font-weight: normal;
  }
}
</style>
<style lang="scss" scoped >
.comp-system-message {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin: 0 12px;
  .message-badge {
    line-height: 1;
    margin-top: -28px;
    .bell-icon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
