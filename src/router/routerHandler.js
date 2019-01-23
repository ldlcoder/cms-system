import { adminComponents, adminDynaRoutes, adminStaticRoutes, menuItemIcons } from './adminRoutes'

// 路由
const accessRouteNames = Object.keys(adminComponents)
/* 处理菜单权限数据，生成菜单数据和路由权限点数据 */
function handleMenusInfo (menuInfo) {
  let result = { menu: [], routeActions: {} }
  // 获取菜单项关联的最后一个菜单项
  const getLastIndexItem = item => {
    let curItem = item
    while (curItem.index && curItem.children && curItem.children.length) {
      let indexItem = curItem.children.find(ci => (ci.id === curItem.index))
      indexItem && (curItem = indexItem)
    }
    return curItem
  }
  // 检查菜单项是否是最后一层
  const checkItemLastLvl = item => (!item.children || !item.children.length || !item.children[0].is_menu)

  const getMenuItem = (menuArr, item) => {
    const { title, name: iconName } = item
    // 检查当前菜单是否关联到下级菜单
    const workItem = getLastIndexItem(item)
    const { name, children } = workItem
    // 检查当前层级是否是菜单最后一级
    const isLastLvl = checkItemLastLvl(workItem)
    // 当菜单为最后一级时检查路由name是否有对应有效路由, 无则跳过
    if (isLastLvl && !accessRouteNames.includes(name)) return
    let menuItem = { title, name }
    menuItemIcons[iconName] && (menuItem.icon = menuItemIcons[iconName])
    if (children && children.length) {
      menuItem.children = []
      children.forEach(ci => getMenuItem(menuItem.children, ci))
    }
    // 尝试获取路由的action
    result.routeActions[name] = isLastLvl && children && children.length ? children.map(item => (item.name)) : true
    menuArr.push(menuItem)
  }
  menuInfo.forEach(item => getMenuItem(result.menu, item))
  return result
}
/* 处理路由数据 */
function handleRoutes (rightsRoute) {
  // 先递归处理权限数据
  // 再处理路由部分
  const dynaRoutes = adminDynaRoutes()
  const staticRoutes = adminStaticRoutes()
  const checkRelevance = (value) => {
    if (typeof value === 'string') {
      return rightsRoute[value]
    } else if (Array.isArray(value) && value.length === 2 && (typeof value[0] === 'string')) {
      let result = rightsRoute[value[0]]
      typeof value[1] === 'function' && result && !value[1](Array.isArray(result) ? result : []) && (result = false)
      return result
    } else {
      return false
    }
  }

  const newRoutes = dynaRoutes.filter(item => {
    const { name, powerRelevance, meta } = item
    // 检测路由是否有权限
    let actions = rightsRoute[name]
    if (!actions && !(actions = checkRelevance(powerRelevance))) {
      return false
    }
    delete item.powerRelevance
    if (Array.isArray(actions)) {
      !meta && (item.meta = {})
      Object.assign(item.meta, { actions })
    }
    return true
  })
  return newRoutes.concat(staticRoutes)
}

/** 根据接口返回的权限菜单数据生成菜单和路由数据 **/
export function handleMenuInfo (menuInfo) {
  let result = { menu: [], routes: [] }
  if (Array.isArray(menuInfo)) {
    try {
      const { menu, routeActions } = handleMenusInfo(menuInfo)
      result.routes = handleRoutes(routeActions)
      result.menu = menu
    } catch (e) { console.log(e) }
  }
  return result
}
/** 给路由数据添加组件 **/
export function routesAddComponents (routes) {
  const addComponent = (item) => {
    const { name, children, component } = item
    !component && name && adminComponents[name] && (item.component = adminComponents[name])
    Array.isArray(children) && children.length && children.forEach(addComponent)
  }
  routes.forEach(addComponent)
}
