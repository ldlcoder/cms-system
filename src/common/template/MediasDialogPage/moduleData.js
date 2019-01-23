export const labelMap = {
  '1': { label: '身份证', icon: 'lr-icon-gongshangyinhang1' },
  '2': { label: '驾驶证', icon: 'lr-icon-gongshangyinhang1' },
  '3': { label: '人行征信报告' },
  '4': { label: '征信授权书', icon: 'lr-icon-gongshangyinhang1' },
  '5': { label: '银行流水', icon: 'lr-icon-gongshangyinhang1' },
  '6': { label: '从业资格证', icon: 'lr-icon-gongshangyinhang1' },
  '11': { label: '人车合影', icon: 'lr-icon-gongshangyinhang1' },
  '12': { label: '车辆照片' },
  '13': { label: '其他' }
}
export function checkoutSubTree (prop) {
  return labelMap[prop] ? labelMap[prop] : {}
}
