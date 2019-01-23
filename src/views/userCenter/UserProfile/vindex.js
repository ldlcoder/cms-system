import detailPageMixin from '@/common/mixins/detailPageMixin'
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import ModulePane from '@/common/components/ModulePane'
import { createInfoTableConfig, createListModuleConfig } from '@/common/commonData/userDetailInfo'
import { getUserProfileInfo, getUserBindCustomerList, getUserOrderCustomerList } from '@/api/userCenter'

export default {
  name: 'UserProfile',
  mixins: [detailPageMixin],
  components: {
    ModulesInfoTable,
    ModulePane
  },
  data () {
    return {
      loading: false,
      bindListLoading: false,
      orderListLoading: false,
      getInfoFaile: false,
      userInfo: {
        bindCusData: {},
        orderCusData: {}
      },
      infoTableConfig: createInfoTableConfig(),
      listTableConfig: createListModuleConfig(this.getBindCustomerList, this.getOrderCustomerList)
    }
  },
  computed: {
    handledApis () {
      return {
        getDetailInfo: getUserProfileInfo
      }
    }
  },
  created () {
  },
  methods: {
    // utils
    // business
    detailInfoHandler (data) {
      this.userInfo = Object.assign(data, this.userInfo)
    },
    // 初始化路由参数
    iniRouteState () {
      this.id = Number(this.$route.query.id)
      this.getDetailInfo()
      this.getBindCustomerList()
      this.getOrderCustomerList()
    },
    // 获取绑定客户信息
    getBindCustomerList () {
      this.$fetch(getUserBindCustomerList).lock('bindListLoading').done(data => {
        this.userInfo.bindCusData = data && Array.isArray(data.list) ? data : {}
      })
    },
    // 获取预约客户信息
    getOrderCustomerList () {
      this.$fetch(getUserOrderCustomerList).lock('orderListLoading').done(data => {
        this.userInfo.orderCusData = data && Array.isArray(data.list) ? data : {}
      })
    }
    // events
  }
}
