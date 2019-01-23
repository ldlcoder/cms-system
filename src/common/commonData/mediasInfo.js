export function authCfg () {
  return {
    downloadShow: false,
    uploadShow: false,
    delBtnShow: false
  }
}
export function createTypeMap () {
  return {
    image: {
      label: '照片',
      type: 'image',
      checkBox: true,
      root: true,
      key: 'images',
      unit: '张',
      children: []
    },
    video: {
      label: '视频',
      type: 'video',
      checkBox: false,
      root: true,
      key: 'videos',
      unit: '段',
      children: []
    }
  }
}

export function sideMenuData (mediasData) {
  const fileMap = createTypeMap()
  return mediasData.map((tabItem, index) => {
    const { title, key, list } = tabItem
    let listsObj = {}
    list.forEach((typeItem, index) => {
      !listsObj[typeItem.type] && (listsObj[typeItem.type] = fileMap[typeItem.type])
      listsObj[typeItem.type].children.push({
        id: typeItem.id,
        label: typeItem.name,
        index: index,
        num: Array.isArray(typeItem.list) ? typeItem.list.length : 0
      })
    })
    return { title, key, lists: Object.values(listsObj) }
  })
}
