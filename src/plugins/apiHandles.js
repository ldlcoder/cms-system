import { Notification } from 'element-ui'
import store from '@/store'

const notifyQueue = []
export function notifyMsg (msg) {
  if (notifyQueue.includes(msg)) return
  notifyQueue.push(msg)
  Notification.error({
    title: '系统提示',
    message: msg,
    customClass: 'smartfetch-system-message',
    onClose: () => {
      const msgIndex = notifyQueue.indexOf(msg)
      msgIndex >= 0 && notifyQueue.splice(msgIndex, 1)
    }
  })
}
const statusWarn = {
  '404': '请求地址不存在',
  '500': '服务器维护中，请稍后再试'
}

export function codeErrorHandler (response, curtomHandler) {
  const { error_no, error_msg } = response
  let msg = error_msg || '请求失败'
  switch (error_no) {
    case 401:
    case 402:
    case 409:
    case 50001:
      store.commit('LOGIN_OUT')
      notifyMsg(msg)
      break
    case 503:
      location.href = '#/503'
      break
    default:
      curtomHandler ? curtomHandler(error_no, notifyMsg) : notifyMsg(msg)
      break
  }
}

const { apiConfig: { url, urlc }, token } = store.getters

export default {
  baseConfig: [
    {
      key: 'default',
      headers: { token },
      baseURL: url
    }, {
      key: 'urlc',
      headers: { token },
      baseURL: urlc
    }, {
      key: 'local',
      headers: { token },
      baseURL: ''
    }
  ],
  errorHandle: notifyMsg,
  resCheck: (res) => (res.success || res.error_no === 200),
  statusWarn,
  dataKey: 'result',
  forceAxios: true,
  codeError: codeErrorHandler
}
