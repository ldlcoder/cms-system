import { checkoutInfoTb, createInfoTb } from '@/common/commonData/infoTable'
import RadioColumn from '../CarEditPage/components/RadioColumn'
const defPro = { md: 12, lg: 6 }
const yuanMoneyFilter = value => (value ? value + '元' : value)
export function createCarInfo (configKeys) {
  configKeys = configKeys || {
    branch: createInfoTb('车辆品牌', 'car_brand', defPro),
    system: createInfoTb('车系', 'system', defPro),
    model: createInfoTb('车型', 'model', defPro),
    carType: null,
    msrp: null,
    soldOut: createInfoTb('已售车辆', 'fake_sold_out_num', defPro, { filter: value => (value ? value + '台' : value) }),
    deposit: createInfoTb('定金', 'deposit', defPro, { filter: yuanMoneyFilter }),
    fee: createInfoTb('服务费', 'fee', defPro, { filter: yuanMoneyFilter })
  }
  return checkoutInfoTb(configKeys)
}
export function createColor (index) {
  return createInfoTb('颜色' + (index + 1), 'properties', defPro, {
    filter: (value) => (value[index] ? `外观${value[index].apperance_color},内饰${value[index].interior_color}` : '')
  })
}
export function handleColumns (columns) {
  const indexColumn = {
    label: '序号',
    type: 'index',
    width: '80px'
  }
  const radioColumn = {
    label: '默认方案',
    choiceId: this.carInfo.default_choice_id,
    prop: 'is_default',
    isEdit: false,
    // radioChange: this.radioChange,
    slotScope: RadioColumn
  }
  return [radioColumn, indexColumn, ...columns]
}
