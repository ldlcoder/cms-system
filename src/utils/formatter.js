import numeral from 'numeral'

export function commaNum (value, format = '0,0') {
  return typeof format === 'string' ? numeral(value).format(format) : value
}

export function percent (value, format = '0.0', hasSymbol) {
  return hasSymbol ? numeral(value).format(`${format}%`) : numeral(value).format(format)
}

/* 金额转换为数字加中文 */
export function wordMoney (num, format = '0.000') {
  const number = Number(num)
  let result = number
  let unitIndex = 0
  let unitArr = []
  while (result >= 10000) {
    unitIndex++
    result = result / 10000
    if (unitIndex === 2) {
      unitIndex = 0
      unitArr.unshift('亿')
    }
  }
  unitIndex === 1 && unitArr.unshift('万')
  unitArr.length && (result = commaNum(result, format))
  return result + unitArr.join('') + '元'
}

export function filterVal (value, defVal = '') {
  return (value === null || value === undefined) ? defVal : value
}

export function byteToWord (value) {
  return Math.round(value / 1024) + 'KB'
}