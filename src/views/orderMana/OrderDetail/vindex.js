import editPageMixin from '@/common/mixins/editPageMixin'
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import { getOrderInfo, getModuleMedias, editModuleMedias } from '@/api/common'
import { getWorkFlowDetail, editOrderDetailInfo } from '@/api/orderMana'
import { checkoutModuleInfo } from '@/common/commonData/infoTable'
import MediasDialogPage from '@/common/template/MediasDialogPage'
import ElectronicContractTmp from '../template/ElectronicContractTmp'
import MediaSets from '@/common/components/MediaSets'
import { getEditModuleConfig, getFilterFormData } from './dataHandle'
import { cloneDeep } from 'lodash'
import { authCfg, sideMenuData } from '@/common/commonData/mediasInfo'

export default {
  name: 'OrderDetail',
  mixins: [editPageMixin],
  components: {
    ModulesInfoTable,
    MediasDialogPage,
    ElectronicContractTmp,
    MediaSets
  },
  data () {
    return this.initCompData({
      id: 0,
      loading: false,
      sending: false,
      extraLoading: false,
      getInfoFaile: false,
      orderInfo: {},
      orderFormData: {
        contacts: []
      },
      mediaInfo: [{
        title: '客户',
        key: 1,
        list: []
      }],
      deliverCarMediaInfo: [
        {
          title: '交车',
          key: 2,
          list: []
        }
      ],
      copyCustMedias: '',
      copyDlCarMedias: '',
      authCfg: !(this.$route.name === 'OrderEdit') ? authCfg() : Object.assign({}, authCfg(), { uploadShow: true, delBtnShow: true }),
      dialogConfig: {
        show: false,
        title: '客户影像资料',
        status: 'customer'
      },
      refresh: false
    }, {
      RSD: {}
    })
  },
  computed: {
    isEdit () {
      return this.$route.name === 'OrderEdit'
    },
    detailParams () {
      return this.id ? { id: this.id } : {}
    },
    handledApis () {
      return {
        getDetailInfo: getOrderInfo
      }
    },
    handleMediasData: {
      get () {
        const { status } = this.dialogConfig
        return status === 'cars' ? this.deliverCarMediaInfo : this.mediaInfo
      },
      set (value) {
        const { status } = this.dialogConfig
        const obj = { cars: 'deliverCarMediaInfo', customer: 'mediaInfo' }
        this[obj[status]] = value
      }
    },
    sideMenuData () {
      return sideMenuData(this.handleMediasData)
    },
    infoTableConfig () {
      const config = checkoutModuleInfo(getEditModuleConfig(this.$store.getters.appConfig))
      let carDeliver = config.find(item => (item.key === 'car_deliver'))
      carDeliver && (carDeliver.extraTitle = {
        component: 'ElButton',
        props: {
          size: 'mini',
          type: 'primary',
          icon: 'lease-icon-yingxiangziliao',
          class: 'media-button'
        },
        text: '交车影像资料',
        events: {
          click: this.openCarsDialog
        }
      })
      return config
    },
    handleEleContractInfo () {
      return this.orderInfo.contracts && Array.isArray(this.orderInfo.contracts) ? this.orderInfo.contracts : []
    },
    handleOrderInfo () {
      return this.id ? { ...this.orderInfo, orderId: this.id } : {}
    }
  },
  watch: {
    orderInfo: 'getOrderFormData'
  },
  methods: {
    // utils
    initRMD () {
      return { listRouteName: 'OrderList', formDataHandle: this.detailInfoHandler }
    },
    // business
    detailInfoHandler (data) {
      this.orderInfo = { ...data, ...this.orderInfo }
    },
    getOrderFormData () {
      this.orderFormData = { ...this.orderFormData, ...getFilterFormData(this.orderInfo) }
    },
    // 初始化路由参数
    iniRouteState () {
      this.id = Number(this.$route.query.id)
      if (this.id) {
        this.getDetailInfo()
        this.getWorkFlowDetail()
        this.getCustomerMedia()
      }
    },
    getWorkFlowDetail () {
      this.$fetch(getWorkFlowDetail, this.detailParams).lock('extraLoading').done(data => {
        this.detailInfoHandler(data)
        this.orderInfo.car_deliver && this.getDeliverCarMedia()
      }).faile(e => {
        this.getInfoFaile = true
      })
    },
    getCustomerMedia () {
      this.id && this.$fetch(getModuleMedias, { ...this.detailParams, 'module': 'customer', 'media_type': 'images' }).done(data => {
        if (data && Array.isArray(data)) {
          this.mediaInfo[0].list = data
          this.copyCustMedias = JSON.stringify(data)
        }
      })
    },
    getDeliverCarMedia () {
      this.id && this.$fetch(getModuleMedias, { ...this.detailParams, 'module': 'deliveryCar', 'media_type': 'images' }).done(data => {
        if (data && Array.isArray(data)) {
          this.deliverCarMediaInfo[0].list = data
          this.copyDlCarMedias = JSON.stringify(data)
        }
      })
    },
    formDataSend (params) {
      JSON.stringify(this.mediaInfo[0].list) !== this.copyCustMedias && this.mediasSend(editModuleMedias, '客户影像资料', { module: 'customer', medias: this.mediaInfo[0].list })
      this.orderInfo.car_deliver && JSON.stringify(this.deliverCarMediaInfo[0].list) !== this.copyDlCarMedias && this.mediasSend(editModuleMedias, '交车影像资料', { module: 'deliveryCar', medias: this.deliverCarMediaInfo[0].list })
      this.$fetch(editOrderDetailInfo, Object.assign(params, this.detailParams)).lock('sending').done(data => {
        this.$leaseMessage(data, (data ? '订单信息提交成功' : '订单信息提交失败，请稍后再试'), this.returnToList)
      })
    },
    mediasSend (api, msg, params) {
      this.$fetch(api, Object.assign(params, this.detailParams)).done(data => {
        this.$leaseMessage(data, (data ? msg + '提交成功' : msg + '提交失败，请稍后再试'))
      })
    },
    handleOrderFormData (params) {
      params.car_deliver && params.car_deliver.deliver_time && (params.car_deliver.deliver_time = Math.floor(params.car_deliver.deliver_time / 1000))
      return params
    },
    // events
    openCarsDialog () {
      this.openDialog('cars')
    },
    openDialog (status) {
      this.dialogConfig = {
        show: true,
        title: status === 'customer' ? '客户影像资料' : '交车影像资料',
        status: status
      }
      this.refresh = true
    },
    formDataSubmit () {
      const params = this.handleOrderFormData(cloneDeep(this.orderFormData))
      this.formDataSend(params)
    }
  }
}
