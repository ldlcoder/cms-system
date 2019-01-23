import routeData from './routesData'
import editPageMixin from '@/pages/common/mixins/editPageMixin'
import { cloneDeep } from 'lodash'
import { getCompanyFieldsData } from '@/api/companyMana'

export default {
  name: 'CompanyManaEditPage',
  mixins: [editPageMixin],
  data () {
    return this.initCompData({
      id: 0,
      loading: false,
      sending: false,
      formData: {}
    }, {
      RMD: {}
    })
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$forceUpdate()
    })
  },
  watch: {
  },
  methods: {
    /** utils **/
    initRMD () {
      const {name} = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    },
    /** business **/
    iniRouteState () {
      this.id = this.$route.query.id || 0
      this.id && this.getDetailInfo()
      this.RMD.hasDynamData && this.getFormDynaData()
    },
    getFormDynaData () {
      const { handleFormDynamicData } = this.RMD
      typeof handleFormDynamicData === 'function' && this.$fetch(getCompanyFieldsData).done(data => {
        handleFormDynamicData.call(this, data)
      })
    },
    /** event **/
    formSubmit () {
      this.sendDetailInfo()
    }
  }

}
