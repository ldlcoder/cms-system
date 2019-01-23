<template>
  <div class="lcomp-info-table">
    <el-row>
      <el-col v-for="(item, index) in handleConfig" v-bind="item.props" :key="index" class="info-table-tr">
        <span class="label" v-if="item.label">
          <i :class="item.icon" v-if="item.icon"></i>{{item.label}}
        </span>
        <form-item-field
          v-if="isEdit && item.canEdit && item.field"
          class="field-item"
          :fieldItem="item.field"
          v-model="handleValue[item.key]"
        >
        </form-item-field>
        <span v-else class="key">
          {{(item.value || (item.filter ? item.filter(handleData[item.key], handleData) : handleData[item.key])) | emptyCell}}
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FormItemField from '../FormItemFields/FormItemField'
import { cloneDeep } from 'lodash'
import { emptyCell } from '@/utils'
export default {
  name: 'InfoTable',
  components: {
    FormItemField
  },
  props: {
    isEdit: Boolean,
    data: Object,
    formDataHandler: Function,
    value: Object,
    config: Array,
    extraData: Object
  },
  data () {
    return {
      formData: this.getFormData()
    }
  },
  computed: {
    handleValue () {
      return this.value || this.formData
    },
    handleData () {
      return this.data || this.extraData || {}
    },
    handleConfig () {
      return Array.isArray(this.config) ? this.config.filter(item => item && !(typeof item.isHide === 'function' ? item.isHide(this.data, item, this.extraData) : item.isHide)) : []
    }
  },
  filters: {
    emptyCell
  },
  watch: {
    isEdit (newVal) {
      newVal && (this.formData = this.getFormData())
    },
    handleValue: {
      handler () {
        this.$emit('change', this.formData)
        this.$emit('input', this.formData)
      },
      deep: true
    }
  },
  methods: {
    /** utils **/
    getFormData () {
      const formData = this.value || cloneDeep(this.data)
      return this.formDataHandler ? this.formDataHandler(formData) : formData
    }
    /** business **/
    /** events **/
  }
}
</script>
<style lang="scss" scoped>
.lcomp-info-table{
  padding-left: 1px;
  .key{
    color: #4A4A4A;
    padding-left: 10px !important;
    flex: 1;
  }
  .field-item {
    width: 100%;
    height: 42px;
    margin: 0;
    /deep/ .el-form-item__content {
      width: 100%;
      height: 100%;
      .el-input__inner {
        height: 42px;
      }
      .el-form-item__error {
        z-index: 1;
      }
    }
  }
  .label,.key{
    display: inline-block;
    font-size: 14px;
    padding: 12px 0;
    height: 42px;
    overflow: hidden;
  }
  .label{
    width: 105px;
    color: #4A4A4A;
    font-weight: 700;
    background: #f6faff;
    border-right: 1px solid #ebeef5;
    padding-left: 20px;
    flex-shrink: 0;
    position: relative;
    i {
      position: absolute;
      display: block;
      left: 5px;
      top: 50%;
      width: 10px;
      height: 10px;
      margin-top: -5px;
    }
  }
  /deep/ .el-col{
    padding: 0px;
    border: 1px solid #ebeef5;
    display: flex;
  }
  .gxfield:before{
    color: #f56c6c;
    font-size: 18px;
    position: absolute;
    top: 8px;
    left: 5px;
    margin-right: 3px;
  }
}
</style>