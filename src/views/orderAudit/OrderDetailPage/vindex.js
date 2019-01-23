import detailPageMixin from '@/common/mixins/detailPageMixin'
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import { checkoutModuleInfo } from '@/common/commonData/infoTable'
import ModulePane from '@/common/components/ModulePane'
import SimpleForm from '@/common/template/SimpleForm'
import routeData from './routesData'
import { getModuleMedias } from '@/api/common'
import ElectronicContractTmp from '../../orderMana/template/ElectronicContractTmp'
import MediaSets from '@/common/components/MediaSets'
import { authCfg, sideMenuData } from '@/common/commonData/mediasInfo'

export default {
  name: 'OrderAuditDetailPage',
  mixins: [detailPageMixin],
  components: {
    ModulesInfoTable,
    ModulePane,
    SimpleForm,
    MediaSets,
    ElectronicContractTmp
  },
  data () {
    return this.initCompData({
      id: 0,
      loading: false,
      getInfoFaile: false,
      extraLoading: false,
      orderInfo: {},
      formData: {},
      mediasData: [{
        title: '客户',
        key: 1,
        list: []
      }],
      authCfg: authCfg(),
      isSHowDialog: false
    }, {
      RSD: {}
    })
  },
  computed: {
    fieldItems () {
      const { fieldItems } = this.RMD
      const { appConfig } = this.$store.getters
      return typeof fieldItems === 'function' ? fieldItems(this.RSD.formData, appConfig) : fieldItems
    },
    infoTableConfig () {
      const { moduleKeys } = this.RMD
      return checkoutModuleInfo(moduleKeys)
    },
    handleOrderInfo () {
      return this.id ? { ...this.orderInfo, orderId: this.id } : {}
    },
    formProps () {
      return this.RMD.formProps || {}
    },
    formModuleTitle () {
      return this.RMD.formTitle
    },
    handleMediasData: {
      get () {
        return this.mediasData
      },
      set (value) {
        this.mediasData = value
      }
    },
    sideMenuData () {
      return sideMenuData(this.mediasData)
    },
    handleEleContractInfo () {
      return this.handleOrderInfo.contracts && Array.isArray(this.handleOrderInfo.contracts) ? this.handleOrderInfo.contracts : []
    }
  },
  created () {
  },
  watch: {

  },
  methods: {
    /** utils **/
    initRMD () {
      const { name } = this.$route
      return this.handleRouteMoudleData(routeData[name]) || {}
    },
    // 初始化路由参数
    iniRouteState () {
      this.id = Number(this.$route.query.id)
      this.id && this.getDetailInfo()
      this.id && this.RMD.hasExtra && this.getWorkFlowDetail()
      this.id && this.RMD.showMedias && this.getCustomerMedia()
    },
    /** business **/
    detailInfoHandler (data) {
      this.orderInfo = { ...data, ...this.orderInfo }
    },
    // 获取页面额外数据
    getWorkFlowDetail () {
      const { getExtraDetailInfo } = this.handledApis
      getExtraDetailInfo && this.$fetch(getExtraDetailInfo, this.detailParams).lock('extraLoading').done(this.detailInfoHandler).faile(e => {
        this.getInfoFaile = true
      })
    },
    // 获取客户影像资料数据
    getCustomerMedia () {
      this.id && this.$fetch(getModuleMedias, { ...this.detailParams, 'module': 'customer', 'media_type': 'images' }).done(data => {
        this.mediasData[0].list = data
      })
    }
    /** events **/
  }
}
