import CardModulePane from '@/common/components/CardModulePane'
import FormItemFields from '@/components/FormItemFields'
import FormItemField from '@/components/FormItemFields/FormItemField'
import FormBtns from '@/components/FormBtns'
import { getFormFields, getImagesFields } from './data'
import { commonFormProps } from '@/common'
import ArrayFieldItems from './components/ArrayFieldItems'
import LoansTable from './components/LoansTable'
import LoanEditForm from './components/LoanEditForm'
import { getLoanPrintList } from '@/api/loanMana'
import { getModuleMedias } from '@/api/common'
import { getCarsInfo, addCar, editCar } from '@/api/carMana'
import { cloneDeep } from 'lodash'
import commonMixin from '@/common/mixins/commonMixin'

export default {
  components: {
    CardModulePane,
    FormItemFields,
    FormItemField,
    ArrayFieldItems,
    LoansTable,
    FormBtns,
    LoanEditForm
  },
  mixins: [commonMixin],
  data () {
    return this.initCompData({
      id: this.$route.query.id,
      formData: {
        properties: [{}, {}],
        choices: [],
        default_choice_id: 0,
        images: [
          {
            name: '车辆照片',
            list: [],
            id: '999'
          }
        ]
      },
      data: [],
      formShow: false,
      sending: false,
      successSkip: false,
      isHasGet: false
    }, {
      fieldItems: getFormFields.call(this),
      imagesFields: getImagesFields.call(this),
      formProps: commonFormProps(true),
      RMD: {
        listRouteName: 'CarList'
      }
    })
  },
  created () {
  },
  computed: {
    handleSelectionKeys: {
      get () {
        return this.formData.choices
      },
      set (value) {
        this.formData.choices = value.map(item => (item.id))
      }
    },
    checkTable () {
      return [{
        validator (rule, value, callback) {
          return value.length && value.some(item => item.is_default) ? callback() : callback(new Error(value.length ? '请选择默认贷款方案' : '请添加贷款方案'))
        }
      }]
    },
    handleApi () {
      return this.id ? editCar : addCar
    },
    baseParams () {
      return this.id ? { id: this.id } : {}
    }
  },
  methods: {
    getRouteParams () {
      // this.getLoanList()
      if (this.id) {
        this.getCarsInfo()
        this.getTabImages()
      }
    },
    // events
    getLoanList () {
      this.$fetch(getLoanPrintList).done(data => {
        this.data = data && Array.isArray(data.list) ? data.list : []
      })
    },
    getTabImages () {
      this.$fetch(getModuleMedias, { ...this.baseParams, module: 'carImages', media_type: 'images' }).done(data => {
        data && Array.isArray(data) && (this.formData.images = data.filter(item => (item.type === 'image')))
      })
    },
    getCarsInfo () {
      this.$fetch(getCarsInfo, this.baseParams).done(data => {
        data && (this.formData = Object.assign({}, this.formData, this.handleParams(data)))
        data && (this.isHasGet = true)
      })
    },
    brandChange (value) {
      const msrp = value[2].msrp ? Number(value[2].msrp) : 0
      this.$set(this.formData, 'msrp', msrp)
    },
    // click
    cancelSkip () {
      this.$router.push({ name: 'CarList' })
    },
    handleParams (params, isSend) {
      if (isSend) {
        let images = {}
        Array.isArray(params.images) && params.images.forEach(item => {
          item.list.length && (images[item.id] = item.list)
        })
        params.images = images
        Object.assign(params, { car_brand: params.car_brand[0], system: params.car_brand[1], model: params.car_brand[2].split('|-*-|')[0] })
      } else {
        params.car_brand && (params.car_brand = [params.car_brand, params.system, params.model])
        !params.images && !params.properties && (params.properties = [{}, {}])
        params.images && (params = Array.isArray(params.images[999]) ? params.images[999] : [])
      }
      return params
    },
    carFormSubmit () {
      const params = { ...this.baseParams, ...this.handleParams(cloneDeep(this.formData), true) }
      this.$fetch(this.handleApi, params).done(data => {
        this.$leaseMessage(data, data ? '提交成功' : '提交失败', () => {
          data && this.returnToList()
        })
      })
    },
    addLoanRecord (record) {
      this.formData.choices.push({ ...record, is_default: 0 })
    }

  }
}
