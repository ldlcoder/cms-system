import commonMixin from './commonMixin'
import DetailPagePane from '@/common/template/DetailPagePane'

export default {
  components: {
    DetailPagePane
  },
  mixins: [commonMixin],
  computed: {
    formProps () {
      return Object.assign({
        labelWidth: '120px',
        labelPosition: 'right'
      }, this.RMD && this.RMD.formProps ? this.RMD.formProps : {})
    },
    detailParams () {
      return this.id ? { id: this.id } : {}
    }
  },
  methods: {
    /** utils **/
    /** business **/
    // 编辑时先获取页面数据
    getDetailInfo () {
      const { getDetailInfo } = this.handledApis
      this.infoFetched = true
      getDetailInfo && this.$fetch(getDetailInfo, this.detailParams).lock('loading').done(data => {
        typeof this.detailInfoHandler && this.detailInfoHandler(data)
      }).faile(e => {
        this.getInfoFaile = true
      })
    }
    /** event **/
  }

}
