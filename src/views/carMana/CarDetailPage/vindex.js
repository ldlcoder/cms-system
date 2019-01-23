import CardModulePane from '@/common/components/CardModulePane'
import { routeWatcher } from '@/mixins'
import { getCarsInfo, getSelectedLoanList } from '@/api/carMana'
import { createCarInfo, createColor, handleColumns } from './data'
import InfoTable from '@/components/InfoTable'
import TabImages from '@/common/components/TabImages'
import DetailPagePane from '@/common/template/DetailPagePane'
import { getModuleMedias } from '@/api/common'
import CommonTable from '@/components/CommonTable'
import { getLoanListConfigs } from '@/common'

export default {
  name: 'carDetailPage',
  mixins: [routeWatcher],
  components: {
    InfoTable,
    CardModulePane,
    TabImages,
    CommonTable,
    DetailPagePane
  },
  data () {
    return this.initCompData({
      id: this.$route.query.id,
      carInfo: {},
      carConfig: createCarInfo(),
      tabImages: {
        images: []
      },
      loanList: [],
      loading: false
    }, {
      configs: getLoanListConfigs()
    })
  },
  created () {
    this.getCarsInfo()
    this.getTabImages()
    // this.getLoanList()
  },
  computed: {
    columns () {
      return handleColumns.call(this, this.configs.columns) || []
    },
    infoTableConfig () {
      const { carConfig, carInfo: { properties } } = this
      return carConfig.concat(Array.isArray(properties) ? properties.map((item, index) => createColor(index)) : [])
    }
  },
  methods: {
    getCarsInfo () {
      this.$fetch(getCarsInfo, { id: this.id }).done(data => {
        data && (this.carInfo = data)
      })
    },
    getTabImages () {
      this.$fetch(getModuleMedias, { id: this.id, module: 'carImages', media_type: 'images' }).done(data => {
        data && Array.isArray(data) && (this.tabImages.images = data.filter(item => (item.type === 'image')))
      })
    },
    getLoanList () {
      this.$fetch(getSelectedLoanList, { id: this.id }).done(data => {
        this.loanList = data
      })
    }
  }
}
