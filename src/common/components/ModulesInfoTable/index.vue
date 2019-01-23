<template>
  <div class="lcomp-modules-info-table">
    <module-pane
      v-for="(item, index) in filterConfig"
      :key="index"
      :title="item.title"
      :extraTitle="item.extraTitle"
    >
      <component :is="item.component" v-loading="loading" :is-edit="isEdit" v-bind="item.props(item.key ? data[item.key] : data, data)" :value="getItemValue(item)" ></component>
    </module-pane>
  </div>
</template>
<script>
import ModulePane from '../ModulePane'
import InfoTable from '@/components/InfoTable'
import TabsInfoTable from '../TabsInfoTable'
import { cloneDeep } from 'lodash'
export default {
  name: 'ModulesInfoTable',
  props: {
    isEdit: Boolean,
    data: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    formData: Object,
    extraCfg: Array,
    loading: Boolean,
    originHandle: Function,
    config: Array
  },
  components: {
    ModulePane,
    InfoTable,
    TabsInfoTable
  },
  computed: {
    handleValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    configData () {
      return cloneDeep(this.config)
    },
    handledConfigData () {
      const { extraCfg, originHandle } = this
      originHandle && originHandle(this.configData)
      Array.isArray(extraCfg) && this.configData.push(...extraCfg)
      return this.configData
    },
    filterConfig () {
      return this.handledConfigData.filter(item => (item && !(typeof item.isHide === 'function' ? item.isHide(this.data) : item.isHide)))
    }
  },
  methods: {
    // utils
    getItemValue (item) {
      const { key, hasFields, defValue } = item
      key && hasFields && !this.value[key] && (this.handleValue = Object.assign(this.handleValue, { [key]: typeof defValue === 'function' ? defValue() : {} }))
      return key ? this.handleValue[key] : this.handleValue
    },
    // business
    // events
    handleValueChange (value) {
    }
  }
}

</script>
