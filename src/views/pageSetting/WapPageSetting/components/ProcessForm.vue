<template>
  <div class="question-form-container">
    <form-item-field :fieldItem="showRadioField" class="show-form-field" v-model="value.show" ></form-item-field>
    <el-button size="mini" class="item-add-btn" icon="lease-icon-icon-test" @click="addItem">新增流程</el-button>
    <word-list-field v-model="value.list" :getItemField="getItemField" :required="value.show" @on-delete="deleteItem"></word-list-field>
  </div>
</template>
<script>
import WordListField from './WordListField'
import FormItemField from '@/components/FormItemFields/FormItemField'
import { getProcessField, getShowRadioField } from '../dataHandle'
export default {
  name: 'WapPageSetting',
  components: {
    WordListField,
    FormItemField
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showRadioField: getShowRadioField('购车流程'),
      getItemField: getProcessField
    }
  },
  methods: {
    /* events */
    addItem () {
      this.value.list.push({})
    },
    deleteItem (index) {
      this.value.list.splice(index, 1)
    }
  }
}
</script>
