import DetailPagePane from '@/common/template/DetailPagePane'
import commonMixin from './commonMixin'
import FormItemFields from '@/components/FormItemFields'
import FormBtns from '@/components/FormBtns'
import { cloneDeep } from 'lodash'

export default {
  components: {
    DetailPagePane,
    FormItemFields,
    FormBtns
  },
  mixins: [commonMixin],
  computed: {
    formProps () {
      return Object.assign({
        labelWidth: '120px',
        labelPosition: 'right'
      }, this.RMD.formProps || {})
    },
    fieldItems () {
      return this.RMD.fieldItems || []
    }
  },
  methods: {
    /** utils **/
    /** business **/
    // 编辑时先获取页面数据
    getDetailInfo () {
      const { handledApis: { getDetailInfo }, RMD: { getDetailParamsHandle, formDataHandle } } = this
      const params = typeof getDetailParamsHandle === 'function' ? getDetailParamsHandle(this.id) : { id: this.id }
      getDetailInfo && this.$fetch(getDetailInfo, params).lock('loading').done(data => {
        this.formData = typeof formDataHandle === 'function' ? formDataHandle(data) : data
      })
    },
    // 提交表单页面数据
    sendDetailInfo () {
      const { handledApis: { sendDetailInfo, addDetailInfo }, RMD: { editParamId, formDataHandle, onSendSuccess } } = this
      let params = Object.assign(this.id ? { [editParamId || 'id']: this.id } : {}, cloneDeep(this.formData))
      const handleParams = typeof formDataHandle === 'function' ? formDataHandle(params, true) : null
      handleParams && (params = handleParams)
      const api = (!this.id && addDetailInfo) ? addDetailInfo : sendDetailInfo
      api && this.$fetch(api, params).lock('sending').done(data => {
        typeof onSendSuccess === 'function' && onSendSuccess.call(this, data)
      })
    }
    /** event **/
  }

}
