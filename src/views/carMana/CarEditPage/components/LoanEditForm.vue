<template>
  <el-dialog title="添加定制贷款方案" visible @close="$emit('on-cancel')">
    <el-form class="ltpl-simple-form" ref="form" :model="formData" v-bind="formProps">
      <form-item-fields
        :fieldItems="fieldItems"
        v-model="formData"
      >
        <el-form-item class="form-btns-pane line-form-item" label=" ">
          <form-btns
            :is-edit="true"
            :parent-refs="$refs"
            ref-key="form"
            submit-confirm
            :words="{ sureBtn: '确认添加' }"
            :cancel="cancelHandler"
            :submit="submitHandler"
          >
          </form-btns>
        </el-form-item>
      </form-item-fields>
    </el-form>
  </el-dialog>
</template>
<script>
import FormItemFields from '@/components/FormItemFields'
import FormBtns from '@/components/FormBtns'
import { commonFormProps } from '@/common'
import { getLoanFormFields } from '../data'

export default {
  components: {
    FormItemFields,
    FormBtns
  },
  data () {
    return {
      fieldItems: getLoanFormFields.call(this),
      formData: {},
      formProps: Object.assign(commonFormProps(true, { labelWidth: '100px' })),
      sending: false
    }
  },
  computed: {
    params () {
      return { ...this.formData, ...(this.baseParams || {}) }
    }
  },
  created () {
  },
  methods: {
    /* event */
    submitHandler () {
      this.$emit('on-send', this.formData)
      this.cancelHandler()
    },
    cancelHandler () {
      this.$emit('on-cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.ltpl-simple-form {
  .line-form-item {
    /deep/ .el-form-item__content {
      width: initial;
    }
  }
  /deep/ .long-form-item {
    .el-form-item__content {
      width: 600px;
    }
  }
  /deep/ .tab-image-item {
    .el-form-item__content {
      width: 80%;
    }
  }
  .form-btns-pane {
    width: 100%;
  }

}
</style>
