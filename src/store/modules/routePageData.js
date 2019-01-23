const { hasOwnProperty } = Object.prototype
const routePageData = {
  state: {
    'OrderPayList': {
      moneySum: 0
    }
  },
  mutations: {
    SET_PAGE_DATA: (state, { routeName, key, value }) => {
      const isSetKey = typeof key === 'string'
      !state[routeName] && (state[routeName] = isSetKey ? {} : key)
      const routeData = state[routeName]
      isSetKey && (hasOwnProperty.call(routeData, key) ? (routeData[key] = value) : (state[routeName] = { ...routeData, [key]: value }))
    }
  }
}
export default routePageData
