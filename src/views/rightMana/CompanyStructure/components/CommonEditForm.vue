<template>
  <el-dialog
    class="lcomp-common-edit-form"
    :title="dialogTitle"
    width="620px"
    visible
    v-on="$listeners"
  >
    <el-row>
      <el-col :span="22">
        <simple-form
          :fieldItems="fieldItems"
          :formData="data"
          :api="typeConfig.api"
          :cancelSkip="cancelHanlder"
          @on-success="formSubmitSuccess"
        >
        </simple-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import SimpleForm from '@/common/template/SimpleForm'
import { checkoutFormItems, createInputFormItem } from '@/common'
import { cloneJsonObj } from '@/utils'
import { editSubCompany, editSubCompTeam } from '@/api/rightMana'

const subCompFormItems = () => (checkoutFormItems({
  company: null,
  compSubCompany: null,
  responsible: null
}))

const teamFormItems = () => (checkoutFormItems({
  company: null,
  '_subCompany': createInputFormItem('所属分公司', { disabled: true }, 'subCompanyName'),
  compTeam: null,
  responsible: null
}))

export default {
  name: 'CommonEditForm',
  components: {
    SimpleForm
  },
  props: {
    type: String,
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sending: false,
      typeConfigs: {
        subCompany: {
          title: '分公司',
          fieldItems: subCompFormItems(),
          api: editSubCompany
        },
        team: {
          title: '团队',
          fieldItems: teamFormItems(),
          api: editSubCompTeam
        }
      }
    }
  },
  computed: {
    isEdit () {
      return Boolean(this.data && this.data.id)
    },
    typeConfig () {
      return this.typeConfigs[this.type] || {}
    },
    dialogTitle () {
      const { isEdit, typeConfig: { title } } = this
      return isEdit ? `编辑${title}` : `新增${title}`
    },
    fieldItems () {
      return Array.isArray(this.typeConfig.fieldItems) ? this.typeConfig.fieldItems : []
    }
  },
  methods: {
    /** utils **/
    /** bussiness **/
    formDateHandle (formData) {
    },
    /** events **/
    cancelHanlder () {
      this.$emit('close')
    },
    formSubmitSuccess (res) {
      if (res) {
        this.$emit('submit-success', this.isEdit, cloneJsonObj(this.data))
        this.cancelHanlder()
      }
    }
  }
}
</script>
