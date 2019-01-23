<template>
  <div class="lcomp-pop-message-list">
    <div class="top-bar">
      <span class="pane-title">通知</span>
      <el-button class="read-all-btn" type="text" icon="el-icon-view" @click="readAllUnread">全部标记为已读</el-button>
    </div>
    <waterfall-pane
      class="msg-list-pane"
      :listData="handleDataList"
      :total="total"
      :loading="loading"
      v-loading="sending"
      :reachBottom="reachBottom"
    >
      <ul slot-scope="{data: msgList}" class="msg-data-list clearfix">
        <li v-for="item in msgList">
          <span class="msg-title" @click="skipToDetail(item.id)">{{item.title}}</span><span class="msg-time">{{item.time | parseTime('{m}月{d}日 {h}:{i}:{s}')}}</span>
        </li>
      </ul>
    </waterfall-pane>
    <div class="bottom-bar">
      <el-button class="msg-set" type="text" icon="el-icon-setting" @click="skipToPage('MessageSettings')">通知设置</el-button>
      <el-button class="view-msg-list" type="text" @click="skipToPage('MessageList')">查看全部通知</el-button>
    </div>
  </div>
</template>
<script>
import WaterfallPane from '@/components/WaterfallPane'
export default {
  name: 'PopMessageList',
  components: {
    WaterfallPane
  },
  props: {
    data: [Array, Object],
    dataList: Array,
    total: Number,
    loading: Boolean,
    sending: Boolean,
    reachBottom: Function,
    skipToPage: Function,
    skipToDetail: Function
  },
  computed: {
    handleDataList () {
      const {dataList} = this
      if (dataList) return dataList
      const {total, data, uniqueKey} = this
      if (total === 0) {
        this.listArr = []
      } else if (data) {
        const isPush = Array.isArray(data)
        const newArr = isPush ? data : (Array.isArray(data.data) ? data.data : [])
        const uniqueArr = uniqueKey ? this.uniqueData(newArr) : newArr
        if (uniqueArr.length) {
          isPush ? this.listArr.push(...uniqueArr) : this.listArr.unshift(...uniqueArr)
          !isPush && this.scrollWrap && (this.scrollWrap.scrollTop = 0)
        }
      }
      return this.listArr
    }
  },
  methods: {
    // utils
    // bussiness
    // events
    readAllUnread () {
      this.$store.commit('TOGGLE_READALLSEND', true)
    }
  }
}
</script>
<style lang="scss" scoped >
.lcomp-pop-message-list {
  width: 430px;
  padding: 0;
  line-height: 40px;
  color: #999;
  .top-bar {
    margin: 0 16px;
    border-bottom: 2px solid #f8f7f8;
  }
  .read-all-btn, .view-msg-list {
    float: right;
  }
  .msg-list-pane {
    height: 200px;
    padding: 0 16px;
    li {
      float: left;
      width: 100%;
      border-bottom: 2px solid #f8f7f8;
      &:last-child{
        border-bottom: none;
      }
    }
    /deep/ .msg-data-list {
      width: 100%;
      font-size: 14px;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .msg-title {
        float: left;
        width: 60%;
        color: #444;
        cursor: pointer;
      }
      .msg-time {
        float: right;
        width: 35%;
        text-align: right;
      }
    }
  }
  .bottom-bar {
    border-top: 2px solid #efedef;
    padding: 0 16px;
  }
}
  
</style>
