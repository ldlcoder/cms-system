/** ** 字典转换 ** **/
export function configToMap (appConfig, keys) {
  let result = {}
  keys = Array.isArray(keys) ? keys : ['hasOrder', 'appointmentSeeCar', 'customerManager', 'signType', 'IDType', 'orderStatus', 'loanInsurance', 'drivingLicenceBelong', 'livingPeriod', 'houseOwnership', 'marriage', 'eduation', 'carUsage', 'incomeSource', 'loanDocumentation', 'relationship', 'carType', 'loanTax', 'afterSalesService', 'repareInsTypes', 'auditResult', 'dataPermission']
  const getKeyValueMap = items => {
    let map = {}
    items.forEach(item => {
      map[item.value] = item.label
    })
    return map
  }
  appConfig && keys.forEach(item => {
    Array.isArray(appConfig[item]) && (result[item] = getKeyValueMap(appConfig[item]))
  })
  return result
}

/* 解决eslintwarn, 无意义函数 */
export function memberType () {
  return ''
}
