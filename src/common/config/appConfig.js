export default function () {
  return {
    loanTerm: [
      { 'value': 12, 'label': '12期' },
      { 'value': 24, 'label': '24期' },
      { 'value': 36, 'label': '36期' },
      { 'value': 48, 'label': '48期' }
    ],
    loanRates: [
      { 'value': 0.05, 'label': '5%' },
      { 'value': 0.10, 'label': '10%' },
      { 'value': 0.15, 'label': '15%' },
      { 'value': 0.20, 'label': '20%' },
      { 'value': 0.25, 'label': '25%' },
      { 'value': 0.30, 'label': '30%' }
    ],
    loanTax: [
      { 'value': 1, 'label': '不含购置税' },
      { 'value': 2, 'label': '含购置税' }
    ],
    loanInsurance: [
      { 'value': 0, 'label': '无保险' },
      { 'value': 1, 'label': '1年保险' },
      { 'value': 2, 'label': '2年保险' },
      { 'value': 3, 'label': '3年保险' }
    ],
    afterSalesService: [
      { 'value': 1, 'label': '免费保养' },
      { 'value': 2, 'label': '无保养' }
    ],
    carType: [
      { 'value': 1, 'label': '新车' },
      { 'value': 2, 'label': '二手车' }
    ],
    auditStatus: [
      { 'value': 1, 'label': '通过' },
      { 'value': 2, 'label': '拒件' }
    ],
    repareInsTypes: [
      { 'value': 1, 'label': '4S店购买' },
      { 'value': 2, 'label': '我司购买' }
    ],
    orderStatus: [
      { 'value': 10, 'label': '风控审核' },
      { 'value': 20, 'label': '已拒件' },
      { 'value': 30, 'label': '待付定金' },
      { 'value': 40, 'label': '备车确认' },
      { 'value': 50, 'label': '待付尾款' },
      { 'value': 60, 'label': '交车确认' },
      { 'value': 70, 'label': '已提车' }
    ],
    drivingLicenceBelong: [
      { 'value': 1, 'label': '本人' },
      { 'value': 2, 'label': '配偶' },
      { 'value': 3, 'label': '司机' }
    ],
    livingPeriod: [
      { 'value': 1, 'label': '3年以上' },
      { 'value': 2, 'label': '3年以下' }
    ],
    houseOwnership: [
      { 'value': 1, 'label': '自有' },
      { 'value': 2, 'label': '共有' },
      { 'value': 3, 'label': '租住' },
      { 'value': 4, 'label': '父母同住' }
    ],
    marriage: [
      { 'value': 1, 'label': '未婚' },
      { 'value': 2, 'label': '已婚' },
      { 'value': 3, 'label': '离异' },
      { 'value': 4, 'label': '丧偶' }
    ],
    eduation: [
      { 'value': 1, 'label': '高中' },
      { 'value': 2, 'label': '大专' },
      { 'value': 3, 'label': '本科' },
      { 'value': 4, 'label': '硕士' },
      { 'value': 5, 'label': '其他' }
    ],
    carUsage: [
      { 'value': 1, 'label': '自用' },
      { 'value': 2, 'label': '家用' },
      { 'value': 3, 'label': '其他' }
    ],
    incomeSource: [
      { 'value': 1, 'label': '工资' },
      { 'value': 2, 'label': '分红' },
      { 'value': 3, 'label': '自营' },
      { 'value': 4, 'label': '租金' },
      { 'value': 5, 'label': '其他' }
    ],
    loanDocumentation: [
      { 'value': 1, 'label': '无' },
      { 'value': 2, 'label': '房贷' },
      { 'value': 3, 'label': '车贷' },
      { 'value': 4, 'label': '商贷' },
      { 'value': 5, 'label': '信用卡' }
    ],
    relationship: [
      { 'value': 1, 'label': '同事' },
      { 'value': 2, 'label': '配偶' },
      { 'value': 3, 'label': '父母' },
      { 'value': 4, 'label': '朋友' }
    ],
    auditResult: [
      { 'value': 1, 'label': '通过' },
      { 'value': 2, 'label': '未通过' }
    ],
    customerManager: [
      { 'value': 1, 'label': '有客户经理' },
      { 'value': 2, 'label': '无客户经理' }
    ],
    appointmentSeeCar: [
      { 'value': 1, 'label': '有预约' },
      { 'value': 2, 'label': '无预约' }
    ],
    hasOrder: [
      { 'value': 1, 'label': '有订单' },
      { 'value': 2, 'label': '无订单' }
    ],
    dataPermission: [
      { 'value': 0, 'label': '无数据访问权限' },
      { 'value': 1, 'label': '本人业务数据' },
      { 'value': 2, 'label': '本团队业务数据' },
      { 'value': 3, 'label': '本分公司业务数据' },
      { 'value': 4, 'label': '全公司业务数据' }
    ],
    payType: [
      { 'value': 100, 'label': '定金' },
      { 'value': 120, 'label': '首付款' },
      { 'value': 121, 'label': '首期月供' },
      { 'value': 122, 'label': '服务费' }
    ],
    signType: [
      { label: '甲方', value: 'a' },
      { label: '丙方', value: 'c' },
      { label: '丁方', value: 'd' }
    ],
    IDType: [
      { label: '身份证', value: '1' }
    ]
  }
}
