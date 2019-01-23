import { createInputFormItem, createFiRulesProps, createDateFormItem } from '@/common'
import TabImages from '@/common/components/TabImages'
import { getCommonApis } from '../common'
import { carDeliverySend  } from '@/api/orderAudit'

const createFormItem = (formData) => ([
  createDateFormItem(createFiRulesProps('交车日期', '请选择交车日期'), 'date', 'deliver_time'),
  createInputFormItem({
    label: '备注',
    class: 'long-form-item'
  }, {
    type: 'textarea',
    row: 8,
    placeholder: '请输入交车相关备注'
  }, 'remark'),
  {
    props: {
      class: 'long-form-item tab-image-item',
      label: ' ',
      rules: [
        {
          validator (rule, value, callback) {
            return value && value.every(item => (item.id - 13 === 0 || item.list.length)) ? callback() : callback(new Error('人车合影和车辆照片必须上传'))
          }
        }
      ]
    },
    fields: {
      component: TabImages,
      props: {
        delShow: true
      }
    },
    prop: 'images'
  }
])

const moduleKeys = {
  'source': null,
  'customer': ['name', 'idcard', 'mobile', 'sex', 'age'],
  'goods': null,
  'loanList': null,
  'tradeInfo': null,
  'carReady': null
}

export default {
  RSD: {
    formData: {
      images: [
        { name: '人车合影', list: [], id: '11' },
        { name: '车辆照片', list: [], id: '12' },
        { name: '其他', list: [], id: '13' }
      ]
    }
  },
  moduleKeys,
  hasExtra: true,
  showElectronicContract: true,
  fieldItems: createFormItem,
  formTitle: '交车管理信息',
  formProps: {
    cancelSkip: 'CarDelivery',
    paramsFilter (params) {
      let images = {}
      Array.isArray(params.images) && params.images.forEach(item => {
        item.list.length && (images[item.id] = item.list)
      })
      params.deliver_time && (params.deliver_time /= 1000)
      params.images = images
      return params
    }
  },
  handledApis: Object.assign(getCommonApis(), {
    formInfoSend: carDeliverySend
  })
}
