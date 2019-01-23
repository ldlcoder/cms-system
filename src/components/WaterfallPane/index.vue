<template>
  <div
    class="comp-waterfall-pane"
  >
    <el-scrollbar 
      class="pane-scroll"
      :native="false"
      ref="elscrollbar"
    >
      <slot :data="scopeData"></slot>
      <p class="bottom-tip" v-if="hasScroll && notEmpty">
        <template v-if="loading">
          <i class="el-icon-loading"></i> {{handleTips.loading}}
        </template>
        <template v-else>
          {{isNoData ? handleTips.nodata : handleTips.getmore}}
        </template>
      </p>
      <p class="bottom-tip" v-if="!notEmpty">
        {{handleTips.dataEmpty}}
      </p>
    </el-scrollbar>
  </div>
</template>

<script>
import {debounce} from 'lodash'
const defaultTips = {
  loading: '数据加载中',
  nodata: '已经到底了',
  getmore: '滚动加载更多',
  dataEmpty: '暂无数据'
}

export default {
  name: 'WaterfallPane',
  components: {
  },
  props: {
    loading: Boolean,
    uniqueKey: String,
    data: [Array, Object],
    listData: Array,
    total: Number,
    tips: Object,
    debounceWait: {
      type: Number,
      default: 500
    },
    reachBottom: Function
  },
  data () {
    return {
      uniqueKeys: [],
      listArr: [],
      hasScroll: false,
      scrollWrap: null
    }
  },
  created () {
  },
  mounted () {
    const wrap = this.$refs.elscrollbar.$refs.wrap
    if (wrap) {
      wrap.onscroll = this.handleScroll
      this.scrollWrap = wrap
      this.checkCanScroll()
    }
  },
  updated () {
    this.scrollWrap && this.checkCanScroll()
  },
  computed: {
    handleTips () {
      return Object.assign({}, defaultTips, this.tips)
    },
    isNoData () {
      const {data, total, scopeData} = this
      return !((data && data.length) || (total && total > scopeData.length))
    },
    notEmpty () {
      return this.total !== 0
    },
    scopeData () {
      const {listData} = this
      if (listData) return listData
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
    },
    handleScroll () {
      const {debounceWait} = this
      return debounce(this.checkReachBottom, debounceWait)
    }
  },
  methods: {
    // utils
    checkCanScroll () {
      const {clientHeight, scrollHeight} = this.scrollWrap
      this.hasScroll = scrollHeight > clientHeight
    },
    uniqueData (data) {
      const {uniqueKey, uniqueKeys} = this
      return data.filter(item => {
        const unique = !uniqueKeys.includes(item[uniqueKey])
        unique && uniqueKeys.push(item[uniqueKey])
        return unique
      })
    },
    checkReachBottom () {
      if (!this.reachBottom) return
      const {clientHeight, scrollHeight, scrollTop} = this.scrollWrap
      if (scrollHeight - clientHeight - scrollTop < 5) {
        this.reachBottom()
      }
    },
    // bussiness
    // events
  }
}
</script>
<style lang="scss" scoped >
.comp-waterfall-pane {
  min-height: 100px;
  height: 100%;
  overflow: hidden;
  .bottom-tip {
    width: 100%;
    height: 32px;
    text-align: center;
    border-top: 1px solid #f8f7f8;
    line-height: 36px;
    font-size: 13px;
    color: #aeaeae;
  }
  .pane-scroll {
    height: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
      
    }
    /deep/ .is-vertical {
      opacity: 1;
    }
  }
  
}
</style>
