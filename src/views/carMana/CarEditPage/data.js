import { createInputFormItem, createSelectFormItem, createFiRulesProps } from '@/common'
import { checkoutCommonRules, rulesCreater } from '@/utils/validate'
import store from '@/store'
import TabImages from '@/common/components/TabImages'
import CarsCascader from '@/common/template/CarsCascader'

const createRadiobuttonsItem = (label, prop, modelDef, data, others = {}) => {
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: 'ElRadioGroup',
      childComponent: 'ElRadioButton',
      data: data
    },
    modelDef,
    prop,
    ...others
  }
}
const createTabImagesItem = (label, prop, modelDef, data, others = {}) => {
  return {
    props: typeof label === 'object' ? label : {
      label
    },
    fields: {
      component: TabImages,
      props: {
        delShow: true
      }
    },
    modelDef,
    prop,
    ...others
  }
}
const isPutAway = [{ label: '是', value: 1 }, { label: '否', value: 2 }]
export function getColorFields () {
  const fieldItems = [
    createInputFormItem(createFiRulesProps('外观', true), { placeholder: '请输入颜色' }, 'apperance_color'),
    createInputFormItem(createFiRulesProps('内饰', true), { placeholder: '请输入颜色' }, 'interior_color')
  ]
  return [fieldItems, fieldItems]
}
export function getFormFields () {
  const radixPointReg = /^(0|[1-9][0-9]*)(\.\d{1,2})?$/
  const commonNumber = checkoutCommonRules(['number', 'notLessZero'])
  const moneyRules = commonNumber.concat([{ pattern: radixPointReg, message: '最多可输入至小数点后两位', trigger: 'blur' }])
  const { carType } = store.getters.appConfig
  return [
    {
      props: createFiRulesProps('车辆品牌', '请选择车辆品牌'),
      fields: {
        component: CarsCascader,
        props: {
          onChange: this.brandChange
        }
      },
      prop: 'car_brand',
      modelDef: []
    },
    createInputFormItem(createFiRulesProps('厂商指导价', true, moneyRules), { placeholder: '请输入厂商指导价' }, 'msrp', { isNumber: true }, '元'),
    createSelectFormItem(createFiRulesProps('车辆类型', '请选择车辆类型 '), 'is_new', '', carType, false),
    createInputFormItem(createFiRulesProps('已售', true, commonNumber), { placeholder: '请输入已售数量' }, 'fake_sold_out_num', { isNumber: true }),
    createInputFormItem(createFiRulesProps('定金', true, moneyRules), { placeholder: '请输入客户预付定金' }, 'deposit', { isNumber: true }, '元'),
    createInputFormItem(createFiRulesProps('服务费', true, moneyRules), { placeholder: '请输入该车服务费' }, 'fee', { isNumber: true }),
    createRadiobuttonsItem(createFiRulesProps('是否上架', '请选择是否上架'), 'is_show', '', isPutAway)
  ]
}

export function getImagesFields () {
  const imgRule = [
    {
      validator (rule, value, callback) {
        return value.every(item => (item.list.length)) ? callback() : callback(new Error('车辆照片必须上传'))
      }
    }
  ]
  return createTabImagesItem({ labelWidth: '150', ...createFiRulesProps('请上传车辆照片', true, imgRule), class: 'tab-images' }, 'images', '', null, false)
}

export function getLoanFormFields () {
  const { loanTax, loanInsurance, afterSalesService } = store.getters.appConfig
  const rateRules = checkoutCommonRules(['number', 'notLessZero'])
  return [
    createInputFormItem(createFiRulesProps('贷款方案', true), '贷款方案名称', 'name'),
    createInputFormItem(createFiRulesProps('贷款期数', true, checkoutCommonRules(['integer', 'notLessZero'])), '贷款期数', 'term', { isNumber: true }),
    createInputFormItem(createFiRulesProps('首付金额', true, rateRules), '首付金额', 'downpayment_money', { isNumber: true }, '元'),
    createInputFormItem(createFiRulesProps('月供金额', true, rateRules), '月供金额', 'month_pay', { isNumber: true }, '元'),
    createInputFormItem(createFiRulesProps('尾款金额', true, rateRules), '尾款金额', 'last_pay', { isNumber: true }, '元'),
    createSelectFormItem(createFiRulesProps('购置税', '请选择购置税'), 'tax', '', loanTax, false),
    createSelectFormItem(createFiRulesProps('保险', '请选择保险'), 'insurance_interval', 0, loanInsurance, false),
    createSelectFormItem(createFiRulesProps('保养', '请选择保养'), 'after_sales_service', 0, afterSalesService, false)
  ]
}
