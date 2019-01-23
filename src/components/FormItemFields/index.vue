<template>
  <div class="comp-form-item-fields">
    <template v-for="(item, index) of handleFieldItems" >
      <component
        v-if="item.component"
        :is="item.component"
        v-bind="item.props"
        :value="getValue(item.props.prop)"
        @input="setValue(item.props.prop, $event)"
        :key="index"
      >
      </component>
      <form-item-field
        v-else
        :fieldItem="item"
        :value="getValue(item.prop)"
        @input="setValue(item.prop, $event)"
        :key="index"
      >
      </form-item-field>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import FormItemField from './FormItemField'
import { cloneDeep } from 'lodash'

const { hasOwnProperty } = Object.prototype
export default {
  name: 'FormItemFields',
  components: {
    FormItemField
  },
  props: {
    fieldItems: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      handleFieldItems: this.getFilterItems()
    }
  },
  computed: {
    handleValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    this.watchModel()
    this.resetFieldData()
  },
  watch: {
    fieldItems: {
      handler () {
        this.handleFieldItems = this.getFilterItems()
        this.watchModel()
        this.resetFieldData()
      },
      deep: true
    }
  },
  methods: {
    getValue (prop) {
      return prop ? this.handleValue[prop] : this.handleValue
    },
    setValue (prop, $event) {
      prop ? (hasOwnProperty.call(this.handleValue, prop) ? (this.handleValue[prop] = $event) : this.$set(this.handleValue, prop, $event)) : (this.handleValue = $event)
    },
    getFilterItems () {
      return cloneDeep(this.fieldItems.filter(item => (typeof item.disabled === 'function' ? !item.disabled() : !item.disabled)))
    },
    // model值动态watch
    watchModel () {
      this.handleFieldItems.forEach(item => {
        item.cascaderModel && this.listenCascader(item)
      })
    },
    initCascaderFields () {
      this.handleFieldItems.forEach(item => {
        item.watchers && item.watchers.forEach(watcher => watcher(this.handleValue[item.prop], true))
      })
    },
    changeHandler (item, value) {
      const { watchers } = item
      Array.isArray(watchers) && watchers.forEach(watcher => watcher(value))
    },
    resetFieldData () {
      this.handleFieldItems.forEach(item => {
        item.cascaderModel && this.value.hasOwnProperty(item.cascaderModel) && this.cascaderHandler(item, this.value[item.cascaderModel], true)
      })
    },
    cascaderHandler (item, value, init) {
      let { fields: { data }, cascader, prop, cascaderHandler } = item
      const modelData = cascader && cascader[value] ? cascader[value] : []
      if (Array.isArray(data) && Array.isArray(modelData)) {
        if (typeof cascaderHandler === 'function') {
          cascaderHandler(this.value, prop, modelData, item)
        } else {
          data.splice(0, data.length, ...modelData)
        }
        if (!init && prop && this.value[prop]) {
          this.value[prop] = undefined
          this.changeHandler(item, this.value[prop])
        }
      }
    },
    // 级联数据项监听器
    listenCascader (item) {
      const { cascaderModel } = item
      const cascaderField = this.handleFieldItems.find(item => (item.prop === cascaderModel))
      if (cascaderField) {
        cascaderField.fields.events = Object.assign(cascaderField.events || {}, { change: this.changeHandler.bind(this, cascaderField) })
        !cascaderField.watchers && (cascaderField.watchers = [])
        cascaderField.watchers.push(this.cascaderHandler.bind(this, item))
      }
    }
  }
}
</script>
