<template>
  <component v-if="handleField" :is="handleField.component" v-bind="handleField.props" v-on="handleField.events" v-model="filedValue">
    <template v-if="Array.isArray(handleField.data) && handleField.data.length && childFieldType">
      <template v-if="handleField.component === 'ElRadioGroup' || handleField.component === 'ElCheckboxGroup'">
        <component v-for="(item, index) of handleField.data" :is="childFieldType" v-bind="item" :label="item.key || item.value" :key="index">
          {{item.label}}
        </component>
      </template>
      <template v-else>
        <component v-for="(item, index) of handleField.data" :is="childFieldType" v-bind="item" :key="index">
        </component>
      </template>
    </template>
    <component v-else-if="slotComp && slotComp.component" :is="slotComp.component" v-bind="slotComp.props" :slot="slotComp.slotKey || 'append'">{{slotComp.text}}</component>
  </component>
</template>

<script>
import { cloneDeep } from 'lodash'
const fieldChild = {
  ElSelect: 'ElOption',
  ElCheckboxGroup: 'ElCheckbox',
  ElRadioGroup: 'ElRadio'
}

export default {
  name: 'FieldItem',
  props: {
    value: null,
    field: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    filedValue: {
      get () {
        return (this.field.modelDef && typeof this.value === 'undefined') ? cloneDeep(this.field.modelDef) : cloneDeep(this.value)
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    handleField () {
      return this.field
    },
    slotComp () {
      return this.handleField.slotComp
    },
    childFieldType () {
      return this.handleField.childComponent || fieldChild[this.handleField.component]
    }
  }
}
</script>
