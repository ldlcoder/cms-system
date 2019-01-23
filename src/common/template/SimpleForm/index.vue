<template>
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
          :cancel="cancelHandler"
          :submit="submitHandler"
          :sending="sending"
        >
        </form-btns>
      </el-form-item>
    </form-item-fields>
  </el-form>
</template>
<script>

import FormItemFields from '@/components/FormItemFields'
import FormBtns from '@/components/FormBtns'
import { commonFormProps } from '@/common'
import { cloneDeep } from 'lodash'

export default {
  components: {
    FormItemFields,
    FormBtns
  },
  props: {
    api: Function,
    inline: Boolean,
    sucessSkip: {
      type: Boolean,
      default: true
    },
    props: Object,
    paramsFilter: Function,
    cancelSkip: [String, Function],
    baseParams: Object,
    formData: Object,
    fieldItems: Array
  },
  data () {
    return {
      formProps: Object.assign(commonFormProps(this.inline, { labelWidth: '100px' }), this.props),
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
      const { api, params, paramsFilter } = this
      const args = paramsFilter ? paramsFilter(cloneDeep(params)) : params
      api && this.$fetch(api, args).lock('sending').done(data => {
        this.$leaseMessage(data, data ? '提交成功' : '提交失败', this.successSkip)
        this.$emit('on-success', data)
      })
    },
    successSkip () {
      this.sucessSkip && this.cancelHandler()
    },
    cancelHandler () {
      const { cancelSkip } = this
      cancelSkip && (typeof cancelSkip === 'function' ? cancelSkip() : this.$router.push({ name: cancelSkip }))
    }
  }
}
</script>
<style lang="scss" scoped>
.ltpl-simple-form {
  .form-btns-pane {
    width: 100%;
  }
}
</style>
