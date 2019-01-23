<template>
  <div class="comps-info" v-loading="loading" element-loading-text="数据加载中">
    <card-module-pane
      :title="list.length ? '企业信息' :' 企业信息  （提示：还未进行企业信息认证,请先认证）'"
    >
      <el-row v-if="!list.length || isAdding" class="info">
        <el-col :span="8">
          <el-form class="formData" ref="formData" :model="formData" v-bind="formProps">
            <module-pane
              v-for="(item, index) in configs"
              :key="index"
              :title="item.title"
            >
              <form-item-fields
                :key="index"
                :fieldItems="item.fieldItems"
                v-model="formData"
              >
              </form-item-fields>
            </module-pane>
            <el-form-item>
              <form-btns
                is-edit
                :submit-only="!list.length"
                :parent-refs="$refs"
                ref-key="formData"
                :cancel="formCancel"
                :submit="formSubmit"
                :sending="sending"
              >
              </form-btns>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <comp-rz-page
        v-else
        :data="list"
        @add-item="addRzItem"
      >
      </comp-rz-page>
    </card-module-pane>
    <rz-confirm
      v-if="certiConfirm"
      :data="formData"
      :sending="sending"
      @on-sure="certiSend"
      @on-cancel="certiConfirm = false"
    >
    </rz-confirm>
  </div>
</template>

<script>
  import CardModulePane from '@/common/components/CardModulePane'
  import FormItemFields from '@/components/FormItemFields'
  import { getFormFields, getLegalFormFields } from './dataHandler'
  import FormBtns from '@/components/FormBtns'
  import { commonFormProps } from '@/common'
  import RzConfirm from './components/RzConfirm'
  import CompRzPage from './components/CompRzPage'
  import ModulePane from '@/common/components/ModulePane'
  import { getCompanyCerti, getCompanyCertiedList } from '@/api/contractMana'
  export default {
    name: 'CompsInfo',
    components: {
      FormItemFields,
      CardModulePane,
      FormBtns,
      RzConfirm,
      ModulePane,
      CompRzPage
    },
    data() {
      return {
        formProps: commonFormProps(),
        configs: [
          { title: '企业信息', fieldItems: getFormFields.call(this) },
          { title: '企业法定代表人信息', fieldItems: getLegalFormFields.call(this) }
        ],
        formData: {
          legal_cert_type: '1'
        },
        list: [],
        submitOnly: true,
        loading: false,
        sending: false,
        certiConfirm: false,
        isAdding: false
      }
    },
    created() {
      this.getCompanyRzList()
    },
    methods: {
      // events
      getCompanyRzList () {
        this.$fetch(getCompanyCertiedList).lock('loading').done(data => {
          Array.isArray(data) && (this.list = data)
        })
      },
      // click
      addRzItem () {
        this.isAdding = true
      },
      formCancel () {
        this.isAdding = false
        this.formData = {
          legal_cert_type: '1'
        }
        this.getCompanyRzList()
      },
      formSubmit () {
       this.$refs.formData && this.$refs.formData.validate(res => { res && (this.certiConfirm = true) })
      },
      certiSend () {
        this.$fetch(getCompanyCerti, this.formData).lock('sending').done(data => {
          this.certiConfirm = false
          this.$leaseMessage(data, data ? `企业信息认证成功` : `企业信息认证失败`)
          data && this.formCancel()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.comps-info{
  .info{
    padding-left: 20px;
  }
}
</style>