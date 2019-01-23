<template>
  <div>
    <el-button v-for="(item, index) of handleAction" class="action-btn" v-bind="handleProps(item)" :type="handleBtnType(item)" size="mini" @click="btnsClick(item, scope)" :loading="scope.row[item.loadingKey ? item.loadingKey : 'BTNSending']" :key="index">
      {{scope.row[item.loadingKey ? item.loadingKey : 'BTNSending'] && item.loadingText ? item.loadingText : handleBtnText(item)}}
    </el-button>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  name: 'ElActionBtns',
  props: {
    scope: Object,
    column: Object
  },
  computed: {
    handleAction () {
      return this.column.action.filter(item => (!this.handleBtnHide(item)))
    }
  },
  methods: {
    // event handle
    btnsClick (item, scope) {
      if (typeof item.click !== 'function') return
      if (item.type === 'confirm') {
        const confirmMsg = typeof item.confirmMsg === 'function' ? item.confirmMsg(scope.row, scope, item) : item.confirmMsg
        MessageBox.confirm(confirmMsg || '确定执行此操作?', '系统提示', {
          type: 'warning'
        }).then(() => {
          item.click(scope.row, scope, item)
        }).catch((e) => {})
      } else {
        item.click(scope.row, scope, item)
      }
    },
    handleBtnHide (item) {
      const { hide } = item
      return typeof hide === 'function' ? hide(this.scope.row, this.scope, item) : hide
    },
    handleProps (item) {
      const { props } = item
      return typeof props === 'function' ? props(this.scope.row, this.scope, item) : props
    },
    handleBtnType (item) {
      const { btype } = item
      return btype ? (typeof btype === 'function' ? btype(this.scope.row, this.scope, item) : btype) : 'primary'
    },
    handleBtnText (item) {
      const { text } = item
      return typeof text === 'function' ? text(this.scope.row, this.scope, item) : text
    }
  }
}
</script>
