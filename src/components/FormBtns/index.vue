<template>
  <div class="lcomp-form-btns">
    <el-button type="primary" @click="submitHandle" v-bind="btnProps" :loading="sending">{{sending ? handleWords.sending : handleWords.sureBtn}}</el-button>
    <template v-if="!submitOnly">
      <el-button v-if="isEdit" v-bind="btnProps" @click="callMethod('cancel')">{{handleWords.cancelBtn}}</el-button>
      <el-button v-else v-bind="btnProps" @click="resetForm">{{handleWords.resetBtn}}</el-button>
    </template>
  </div>
</template>
<script>
export default {
  name: 'FormBtns',
  props: {
    sending: Boolean,
    parentRefs: Object,
    refKey: String,
    submit: Function,
    submitOnly: Boolean,
    cancel: Function,
    isEdit: Boolean,
    submitConfirm: Boolean,
    btnProps: {
      type: Object,
      default: () => ({})
    },
    words: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
  },
  computed: {
    handleWords () {
      return Object.assign({ sureBtn: '提交', cancelBtn: '取消', resetBtn: '重置', sending: '提交中...', confirmWord: '确认提交?' }, this.words)
    }
  },
  methods: {
    /** utils **/
    form () {
      const { parentRefs, refKey } = this
      return parentRefs && refKey ? parentRefs[refKey] : null
    },
    callMethod (fnName) {
      const fn = this[fnName]
      typeof fn === 'function' && fn(this.refKey)
    },
    /** business **/
    /** events **/
    submitHandle () {
      const { submitConfirm, handleWords } = this
      if (submitConfirm) {
        const form = this.form()
        form && form.validate && form.validate((res) => {
          res && this.$confirm(handleWords.confirmWord, '系统提示', {
            type: 'warning',
            callback: (action) => {
              action === 'confirm' && this.callMethod('submit')
            }
          })
        })
      } else {
        this.callMethod('submit')
      }
    },
    resetForm () {
      const form = this.form()
      form && form.resetFields && form.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-form-btns {
  padding: 10px 0;
  .el-button {
    min-width: 120px;
    margin-right: 30px;
  }
}
</style>
