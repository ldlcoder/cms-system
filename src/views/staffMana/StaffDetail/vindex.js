import detailPageMixin from '@/common/mixins/detailPageMixin'
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import { createInfoTableConfig, createListModuleConfig } from '@/common/commonData/userDetailInfo'
import { getBindCustomerList } from '@/api/staffMana'
import { getMemberInfo } from '@/api/common'

export default {
  name: 'StaffDetail',
  mixins: [detailPageMixin],
  components: {
    ModulesInfoTable
  },
  data () {
    return this.initCompData({
      id: 0,
      loading: false,
      listLoading: false,
      getInfoFaile: false,
      orderInfo: {
        bindCusData: {}
      }
    }, {
      infoTableConfig: createInfoTableConfig().concat(createListModuleConfig(this.getBindCustomerList))
    })
  },
  computed: {
    isDetail () {
      return this.$route.name === 'StaffDetail'
    },
    handledApis () {
      return {
        getDetailInfo: getMemberInfo
      }
    }
  },
  created () {
  },
  methods: {
    // utils
    // business
    detailInfoHandler (data) {
      this.orderInfo = Object.assign(data, this.orderInfo)
    },
    // 初始化路由参数
    iniRouteState () {
      this.id = Number(this.$route.query.id)
      this.getDetailInfo()
      this.getBindCustomerList()
    },
    // 获取绑定客户信息
    getBindCustomerList () {
      this.$fetch(getBindCustomerList, this.detailParams).lock('listLoading').done(data => {
        this.orderInfo.bindCusData = data && Array.isArray(data.list) ? data : {}
      })
    }
    // events
  }
}
