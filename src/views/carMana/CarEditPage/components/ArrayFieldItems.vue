<template>
  <div class="array-field-items">
    <div class="array-field-item" v-for="index in (value.length || 1)"  :key="index">
      <i class="icon lease-icon-guanbi-copy" v-if="index >= 2" @click="delFieldItem(index)"></i>
      <form-item-field
        :fieldItem="createColorField(index)"
        v-model="handleValue[index-1]"
      >
      </form-item-field>
    </div>
    <el-form-item label=" " class="add-color">
      <el-button type="primary" plain @click="addFieldItem" size="mini">+新增颜色</el-button>
    </el-form-item>
  </div>
</template>

<script>
import { createInputFormItem } from '@/common'
import FormItemField from '@/components/FormItemFields/FormItemField'
import { cloneDeep } from 'lodash'
import { createFiRulesProps } from '@/common'

const createColorField = (idx) => {
  const index = idx -1 
  return {
    props: {
      label: '颜色' + idx,
      class: 'color-inftb-item'
    },
    prop: index,
    propCascade: ['properties'],
    fields: [
      createInputFormItem({...createFiRulesProps('外观', true), labelWidth: '45', class: 'color-item' }, '请输入颜色', 'apperance_color',  { propCascade: ['properties', index]}),
      createInputFormItem({...createFiRulesProps('内饰', true), labelWidth: '45', class: 'color-item' }, '请输入颜色', 'interior_color', { propCascade: ['properties', index]})
    ]
  }
}
export default {
  components: {FormItemField},
  props: {
    value: {
      type: Array,
      default: () => ([{}])
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    // handleColorField () {
    //   const length = this.value.length
    //   !length && 
    // },
    handleValue: {
      get () {
        return this.value.length ? this.value : [{}]
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
   createColorField,
   delFieldItem (index) {
      const newValue = cloneDeep(this.value)
      newValue.splice(index-1,1)
      this.$emit('input', newValue)
   },
   addFieldItem () {
     const newValue = cloneDeep(this.value)
     newValue.push({})
     this.$emit('input', newValue)
   }
  }
}
</script>

<style lang="scss" scoped>
.array-field-items{
  .array-field-item{
    position: relative;
    .icon{
      position: absolute;
      left: 20px;
      top: 5px;
      color: #ccc;
      &:hover{
        color: #F56C6C;
      }
    }
  }
  .add-color{
    .el-button{
      width: 100%;
    }
  }
}
</style>