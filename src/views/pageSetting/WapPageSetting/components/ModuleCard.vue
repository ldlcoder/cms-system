<template>
  <el-card class="lcomp-module-card">
    <div class="clearfix" slot="header">
      <span>{{title}}</span>
      <form-btns
        v-if="formBtnProps"
        v-bind="handleFormBtnProp"
        :sending="sending"
      >
      </form-btns>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
import FormBtns from '@/components/FormBtns'
export default {
  name: 'ModuleCard',
  components: {
    FormBtns
  },
  props: {
    title: String,
    formBtnProps: Object,
    sending: Boolean
  },
  data () {
    return {
      curTab: ''
    }
  },
  computed: {
    handleFormBtnProp () {
      return Object.assign({ submitConfirm: true, submitOnly: true, words: { sureBtn: '保存', confirmWord: '确认提交修改？' }, btnProps: { size: 'mini' } }, this.formBtnProps)
    }
  },
  methods: {
    /** utils **/
    /** business **/
    /** event **/
  }

}

</script>
<style lang="scss" scoped>
.lcomp-module-card {
  /deep/ .el-card__header {
    padding: 12px 20px;
    font-size: 14px;
    line-height: 28px;
    font-weight: bold;
  }
  /deep/ .lcomp-form-btns {
    float: right;
    padding: 0;
    .el-button {
      margin: 0;
      min-width: 80px;
    }
  }
}
</style>
