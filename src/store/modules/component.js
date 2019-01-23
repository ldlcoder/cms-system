const component = {
  state: {
    subMenu: {},
    bool: 0
  },
  mutations: {
    SET_SUBMENU: (state, values) => {
      state.subMenu = Object.assign({}, values)
    },
    SET_BOOL: (state, flag) => {
      state.bool = flag
    }
  }
}
export default component
