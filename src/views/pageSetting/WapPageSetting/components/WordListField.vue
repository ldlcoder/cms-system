<template>
  <div class="word-list-field" v-if="value && getItemField">
    <form-item-fields
      v-for="(item, index) in value"
      :fieldItems="getItemField(index, required)"
      v-model="value[index]"
      :key="index + required"
    >
      <el-button v-if="value.length > notLess" type="danger" size="small" class="item-delete-btn" icon="lease-icon-shanchu" @click="$emit('on-delete', index)"></el-button>
    </form-item-fields>
  </div>
</template>
<script>
import FormItemFields from '@/components/FormItemFields'
export default {
  name: 'WapPageSetting',
  components: {
    FormItemFields
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    required: Boolean,
    getItemField: Function,
    notLess: {
      type: Number,
      default: 1
    }
  }
}
</script>
