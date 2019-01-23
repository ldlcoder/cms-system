import { mergeWith } from 'lodash'
import store2 from 'store2'
export * from './keyValueMap'
export * from './formatter'
export { default as md5 } from 'md5'

// 处理空字符串
export function emptyCell (value) {
  return (value || value === 0) ? value : '--'
}

export const Storage = store2.namespace('LEASE')

/* 秒数转换为时分秒 */
const unitMap = {
  zh: ['秒', '分钟', '小时', '天'],
  en: ['second', 'minute', 'hour', 'day']
}
export function secToWord (seconds, level = 0, lang = 'zh') {
  const units = unitMap[lang] || unitMap['en']
  const roundFn = (lvl, num) => (lvl === level ? Math.round(num) : Math.floor(num))
  let countArr = [seconds % 60]
  seconds >= 60 && countArr.push(roundFn(1, seconds % 3600 / 60))
  seconds >= 3600 && countArr.push(roundFn(2, seconds % 86400 / 3600))
  seconds >= 86400 && countArr.push(roundFn(3, seconds / 86400))
  let result = countArr.map((item, index) => {
    return level <= index ? ((item > 0 || countArr.length === 1) ? `${item}${units[index]}` : '') : ''
  }).reverse()
  return result.join('')
}

/* 使用安全方式克隆plain object */
export function cloneJsonObj (source) {
  try {
    return JSON.parse(JSON.stringify(source))
  } catch (e) {
  }
}

/* 对象键值重命名 */
export function objKeysRename (obj, map) {
  let result = Object.create(null)
  if (!obj || typeof obj !== 'object' || !map || typeof map !== 'object') return
  for (let i in obj) {
    map[i] && (result[map[i]] = obj[i])
  }
  return result
}

/**
 * Camelize a hyphen-delimited string.
 * 短横线转驼峰
 */
const camelizeRE = /-(\w)/g

export function camelize (string) {
  return string.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * Hyphenate a camelCase string.
 * 驼峰转短横线
 */
const hyphenateRE = /\B([A-Z])/g

export function hyphenate (string) {
  return string.replace(hyphenateRE, '-$1').toLowerCase()
}

/* 动态加载远程js脚本 */
export function loadjs (url, callback, error) {
  if (!url) return
  let script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  script.onload = typeof callback === 'function' ? callback : () => {}
  script.onerror = typeof error === 'function' ? error : () => {}
}

export function openNewUrl (url) {
  const wi = window.open(url)
  if (!wi.location) {
  }
  // 表单方式
  // const form = document.createElement("form")
  // document.body.appendChild(form)
  // form.action = url
  // form.submit()
}
/* 合并对象 */
export function mergeObj (...args) {
  return mergeWith(...args, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}

// 关于浮点数运算方法已移除，需要可安装bignumber.js库

/* 秒数转换为时间 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
