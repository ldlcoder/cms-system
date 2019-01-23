import SubPageFrame from './components/SubPageFrame'
import ModuleCard from './components/ModuleCard'
import QuestionForm from './components/QuestionForm'
import ProcessForm from './components/ProcessForm'
import BannerField from './components/BannerField'
import FormItemField from '@/components/FormItemFields/FormItemField'
import { commonFormProps } from '@/common'
import { getHotCarsItem } from './dataHandle'
import { getHomepageSetting, sendHomepageSetting, getDetailpageSetting, sendDetailpageSetting } from '@/api/pageSetting'
const formRefKeyMap = { homeBanner: 'banner', homeHotCars: 'hot_cars', homeQuestions: 'questions', detailQuestions: 'questions', detailProcess: 'process' }
export default {
  name: 'WapPageSetting',
  components: {
    SubPageFrame,
    ModuleCard,
    QuestionForm,
    ProcessForm,
    BannerField,
    FormItemField
  },
  data () {
    return {
      curTab: '',
      homeFormData: {
        banner: [{ type: 'img' }],
        hot_cars: { num: 2 },
        questions: {
          show: true,
          list: [{}]
        }
      },
      detailFormData: {
        questions: {
          show: true,
          list: [{}]
        },
        process: {
          show: true,
          list: [{}]
        }
      },
      sendings: {
        homeBanner: false,
        homeHotCars: false,
        homeQuestions: false,
        detailQuestions: false,
        detailProcess: false
      },
      hotCarsField: getHotCarsItem()
    }
  },
  computed: {
    formProps () {
      return commonFormProps()
    }
  },
  created () {
    this.curTab = this.getCurTab()
    this.getRightSettingInfo()
  },
  methods: {
    /** utils **/
    /** business **/
    getCurTab () {
      return this.RouteRights.length ? this.RouteRights[0] : ''
    },
    getRightSettingInfo () {
      this.RouteRights.includes('homepage') && this.getPageSetting(getHomepageSetting, { type: 1 }, data => {
        // 对数据进行检测后再赋值
        Array.isArray(data.banner) && (this.homeFormData.banner = data.banner)
        data.hot_cars && data.hot_cars.num && (this.homeFormData.hot_cars = data.hot_cars)
        data.questions && Array.isArray(data.questions.list) && (this.homeFormData.questions = data.questions)
      })
      this.RouteRights.includes('detailpage') && this.getPageSetting(getDetailpageSetting, { type: 2 }, data => {
        // 对数据进行检测后再赋值
        data.questions && Array.isArray(data.questions.list) && (this.detailFormData.questions = data.questions)
        data.process && Array.isArray(data.process.list) && (this.detailFormData.process = data.process)
      })
    },
    getPageSetting (api, params, callback) {
      this.$fetch(api, params).done(data => {
        data ? callback(data) : this.$leaseMessage(false, '获取页面配置数据失败')
      })
    },
    settingSend (api, params, formRef) {
      this.$fetch(api, params).lock(`sendings.${formRef}`).done(data => {
        this.$leaseMessage(data, data ? '配置提交成功' : '配置提交失败')
      })
    },
    /** event **/
    moduleInfoSubmit (value) {
    },
    homeSettingSubmit (formRef) {
      const { homeFormData } = this
      const key = formRefKeyMap[formRef]
      key && homeFormData[key] && this.settingSend(sendHomepageSetting, { [key]: homeFormData[key] }, formRef)
    },
    detailSettingSubmit (formRef) {
      const { detailFormData } = this
      const key = formRefKeyMap[formRef]
      key && detailFormData[key] && this.settingSend(sendDetailpageSetting, { [key]: detailFormData[key] }, formRef)
    }
  }

}
