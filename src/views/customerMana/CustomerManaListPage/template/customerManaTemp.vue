<template>
  <div class="customer-mana-confirm">
    <el-dialog
      title="换绑客户经理"
      width="720px"
      :visible.sync="RSD.changeConfirm.show"
      @close="closeDailog"
    >
      <module-pane
        title="客户信息"
      >
        <info-table :config="infoTbCfg" :data="RSD.changeConfirm.data"></info-table>
      </module-pane>
      <module-pane
        title="客户经理信息"
      >
        <simple-form
          v-if="RSD.changeConfirm.show"
          :formData="formData"
          :fieldItems="formFields"
          inline
          :props="{labelWidth: '80px'}"
          :api="changeManager"
          :paramsFilter="paramsFilter"
          :cancelSkip="cancelClick"
          @on-success="handleChange"
        >
        </simple-form>
      </module-pane>
    </el-dialog>
  </div>
</template>
<script>
import FormItemFields from '@/components/FormItemFields'
import { createInputFormItem, createSelectFormItem, createFiRulesProps } from '@/common'
import ModulePane from '@/common/components/ModulePane'
import InfoTable from '@/components/InfoTable'
import { checkoutInfoTb, createInfoTb } from '@/common/commonData/infoTable'
import SimpleForm from '@/common/template/SimpleForm'
import { getManagerList, changeManager } from '@/api/customerMana'

const disabledProps = { disabled: true, placeholder: '' }

const formFieldsConfig = (field) => ([
  field,
  createInputFormItem({
    label: '手机号'
  }, disabledProps, 'mobile'),
  createInputFormItem({
    label: '分公司'
  }, disabledProps, 'company_name'),
  createInputFormItem({
    label: '所属团队'
  }, disabledProps, 'company_team_name')
])

const infoTbConfig = () => checkoutInfoTb({
  nickname: createInfoTb('微信昵称', 'nickname', { md: 12, lg: 12 }),
  mobile: createInfoTb('手机号', 'mobile', { md: 12, lg: 12 })
})

export default {
  name: 'customerManaTemp',
  components: {
    FormItemFields,
    InfoTable,
    ModulePane,
    SimpleForm
  },
  props: {
    RMD: Object,
    RSD: Object
  },
  data () {
    return {
      infoTbCfg: infoTbConfig(),
      searchData: [],
      formData: {
      },
      fetchValue: '',
      loading: false
    }
  },
  computed: {
    managerField () {
      return createSelectFormItem(createFiRulesProps('客户经理', '请搜索并选择客户经理'), 'index', 0, [], false, {}, { placeholder: '请搜索并选择客户经理', filterable: true, remote: true, remoteMethod: this.searchManager, loading: this.loading }, { change: this.selectManager })
    },
    formFields () {
      return formFieldsConfig(this.managerField)
    }
  },
  watch: {
    'RSD.changeConfirm.show' (newVal) {
      newVal && this.initCompData()
    }
  },
  methods: {
    changeManager,
    /** utils **/
    initCompData () {
      Object.assign(this.$data, { searchData: [], formData: {} })
      this.managerField.fields.data = []
    },
    cancelClick () {
      this.RSD.changeConfirm.show = false
    },
    paramsFilter (params) {
      return { id: this.RSD.changeConfirm.data.id, amId: params.id }
    },
    /** bussiness **/
    /** events **/
    searchManager (value) {
      this.fetchValue = value
      this.loading = true
      value && this.$fetch(getManagerList, { name: value, length: 20 }).done(data => {
        if (value !== this.fetchValue) return
        this.loading = false
        if (Array.isArray(data)) {
          this.searchData = data
          this.managerField.fields.data = data.map((item, index) => ({ label: item.name, value: index }))
        }
      })
    },
    selectManager (value) {
      this.formData = Object.assign(this.formData, this.searchData[value])
    },
    closeDailog () {
      this.$emit('update:visible', false)
    },
    handleChange (res) {
      if (res) {
        this.RSD.changeConfirm.data.inviter = this.formData.name
        this.RSD.changeConfirm.data.address = this.formData.district
        this.cancelClick()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.customer-mana-confirm {
  /deep/ .lcomp-module-pane {
    .lcomp-info-table {
      margin-bottom: 30px;
    }
    .item-title {
      margin-top: 0px;
    }
  }
  /deep/ .comp-form-item-field .el-form-item__content{
    width: 250px;
  }
}
</style>