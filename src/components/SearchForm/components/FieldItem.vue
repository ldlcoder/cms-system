<template>
  <component :is="field.type" v-bind="field.props" v-model="formData[model]" style="width: 100%" :key="model">
    <template v-if="Array.isArray(field.data) && field.data.length && childFieldType">
      <component v-for="(item, index) of field.data" :is="childFieldType" v-bind="item" :key="index">
      </component>
    </template>
  </component>
</template>

<script>
const colDefault = {
  align: 'center'
}
const fieldChild = {
  ElSelect: 'ElOption',
  ElCheckboxGroup: 'ElCheckbox',
  ElRadioGroup: 'ElRadio'
}

export default {
  name: 'FieldItem',
  props: {
    formData: Object,
    model: String,
    field: Object
  },
  computed: {
    childFieldType () {
      return fieldChild[this.field.type] ? fieldChild[this.field.type] : null
    }
  }
}
</script>
