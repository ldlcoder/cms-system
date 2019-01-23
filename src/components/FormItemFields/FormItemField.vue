<template>
  <el-form-item
    class="comp-form-item-field"
    :prop="handleFormItemProp(fieldItem)"
    v-bind="fieldItem.props"
  >
    <el-row v-if="Array.isArray(fieldItem.fields)" type="flex" :gutter="20">
      <el-col
        class="sub-item-panel"
        v-for="field of fieldItem.fields"
        :span="24 / fieldItem.fields.length"
        :key="field.prop"
      >
        <el-form-item v-bind="field.props" :prop="handleFormItemProp(field)" >
          <template v-if="field.fields.component">
            <field-item v-if="field.isNumber" class="field-item" v-model.number="handleValue[field.prop]" @input="handleValueChange" :field="field.fields"></field-item>
            <field-item v-else class="field-item" v-model="handleValue[field.prop]" @input="handleValueChange" :field="field.fields"></field-item>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <template v-else-if="fieldItem.fields && fieldItem.fields.component">
      <field-item v-if="fieldItem.isNumber" class="field-item" v-model.number="handleValue" :field="fieldItem.fields"></field-item>
      <field-item v-else class="field-item" v-model="handleValue" :field="fieldItem.fields"></field-item>
    </template>
    <template v-if="fieldItem.extraNode">
      <component :is="fieldItem.extraNode" v-bind="fieldItem.extraProps"></component>
    </template>
  </el-form-item>
</template>

<script>
import FieldItem from '../FieldItem'
export default {
  name: 'FormItemFields',
  components: {
    FieldItem
  },
  props: {
    fieldItem: {
      type: Object,
      default: () => ({})
    },
    value: null
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
  methods: {
    handleValueChange () {
      this.$emit('input', this.value)
    },
    handleFormItemProp (item) {
      const prop = item.prop || ''
      return Array.isArray(item.propCascade) ? item.propCascade.concat([prop]).join('.') : prop
    }
  }
}
</script>