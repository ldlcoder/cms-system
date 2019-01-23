import CardModulePane from '@/common/components/CardModulePane'
import FormItemFields from '@/components/FormItemFields'
import FormBtns from '@/components/FormBtns'
import { getFormFields } from './data'
import { commonFormProps } from '@/common'
import { routeWatcher } from '@/mixins'
import { addUser, editUser } from '@/api/rightMana'
import { getMemberInfo, getSearchParams } from '@/api/common'
import { md5 } from '@/utils' // 用于md5
import { cloneDeep } from 'lodash'
export default {
  components: {
    CardModulePane,
    FormItemFields,
    FormBtns
  },
  mixins: [routeWatcher],
  data () {
    return this.initCompData({
      id: Number(this.$route.query.id),
      sending: false,
      formData: {
        city_code: ''
      },
      formConfig: {}
    }, {
      formProps: commonFormProps()
    })
  },
  created () {
    this.id && this.getUserInfo()
    this.getFormItemsConfig()
    !this.provCity.province.length && this.$store.commit('SET_ADMIN_LAYOUT_SWITCH', { key: 'provCity', value: true })
  },
  computed: {
    cascaderInit () {
      return this.isEdit && this.formConfig.sub_company && this.formData.mobile
    },
    isEdit () {
      return Boolean(this.id)
    },
    provCity () {
      return this.$store.getters.provCity
    },
    fieldItems () {
      const { appConfig: { dataPermission } } = this.$store.getters
      const { sub_company, team } = this.formConfig
      const formConfig = {
        subCompany: sub_company,
        team,
        provCity: this.provCity,
        dataPermission
      }
      return getFormFields(this.formData, this.isEdit, formConfig)
    }
  },
  watch: {
    cascaderInit (newVal) {
      newVal && this.$refs.fields.initCascaderFields()
    }
  },
  methods: {
    // utils
    getFormItemsConfig () {
      this.$fetch(getSearchParams).done(data => {
        data && (this.formConfig = data)
      })
    },
    getUserInfo () {
      this.$fetch(getMemberInfo, { id: this.id, type: 2 }).lock('sending').done(data => {
        data && (this.formData = this.formDataSwitch(data))
      })
    },
    formDataSwitch (data, isSend) {
      data = cloneDeep(data)
      if (isSend) {
        data.province_code = data.city_code.substr(0, 2) + '0000'
        data.entry_time /= 1000
      } else {
        data.entry_time *= 1000
        data.company_sub_id === 0 && delete data.company_sub_id
        data.team_id === 0 && delete data.team_id
      }
      return data
    },
    // click
    loanEditCancel () {
      this.$router.push({ name: 'AccountList' })
    },
    loanFormSubmit () {
      let reqApi = this.isEdit ? editUser : addUser
      let data = this.formDataSwitch(this.formData, true)
      const params = this.isEdit ? data : Object.assign({}, data, { password: md5(data.password), password_confirm: md5(data.password_confirm) })
      this.$fetch(reqApi, params).lock('sending').done(data => {
        this.$leaseMessage(data, data ? '提交成功' : '提交失败')
        data && this.loanEditCancel()
      })
    }
  }
}
