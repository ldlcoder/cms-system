import {checkoutTableColumns, createInputFormItem} from '../../common/moduleCommon'
import {parseTime} from '@/utils'
import {cloneDeep} from 'lodash'

// 搜索条件项返回数据字段转换---数据
export const tbColumnsFn = () => ({
  responsible: {
    label: '负责人',
    prop: 'responsible'
  },
  time: {
    label: '创建时间',
    prop: 'add_time',
    formatter: (row, column, cellValue, index) => {
      return parseTime(cellValue, '{y}-{m}-{d} {h}:{i}')
    }
  },
  addUser: {
    label: '创建人',
    prop: 'add_user'
  },
  action: {
    label: '操作',
    action: []
  },
  compName: {
    label: '所属公司',
    prop: 'companyname'
  },
  bank: {
    label: '合作银行',
    prop: 'bank',
    formatter: (row, column, cellValue, index) => {
      return cellValue
    }
  },
  operationName: {
    label: '所属业务地区',
    prop: 'operationname'
  }
})
export {
  createInputFormItem as createFormItem
}
export const formItemsFn = () => ({
  responsible: createInputFormItem('负责人', '请输入负责人姓名', 'responsible')
})
// 获取公用表头
export function getTableColumns (keys) {
  return checkoutTableColumns(keys, tbColumnsFn())
}
// 获取公用搜索条件
export function getFormItems (keys) {
  return checkoutTableColumns(keys, formItemsFn())
}
// 公共通用配置
export const handleBtns = () => ([
  {
    text: '编辑',
    btnKey: 'edit',
    click: 'skipToEdit'
  },
  {
    text: row => (row.status === 1 ? '禁用' : '启用'),
    type: 'confirm',
    btnKey: 'disabled',
    confirmMsg: row => {
      const isAccess = row.status === 1
      const keyWord = isAccess ? '禁用' : '启用'
      return `${keyWord}后，该层级及其下属层级的所有账号将${isAccess ? '不可使用' : '恢复使用'}，确定${keyWord}吗?`
    },
    loadingKey: 'statusSetting',
    btype: row => (row.status === 1 ? 'info' : 'success'),
    click: 'disabledRecord'
  }
])

const createOperation = (addBtnText) => ({
  show: true,
  btns: [
    {
      props: {
        icon: 'lr-icon-tianjia'
      },
      text: addBtnText,
      events: {
        click: 'skipToEdit'
      }
    }
  ]
})

export function getCommonOptions ({statusKey, addBtnText}) {
  const commonOptions = {
    actionBtns: handleBtns(),
    pageListFilter,
    statusParamsHandle: getStatusSetParam(statusKey)
  }
  addBtnText && (commonOptions.operation = createOperation(addBtnText))
  return cloneDeep(commonOptions)
}

// 处理列表接口数据
export function pageListFilter (data) {
  return {total: data.total, list: data.data}
}
// 获取修改状态所需参数
export function getStatusSetParam (idKey) {
  return row => ({[idKey]: row.id, status: (row.status % 2 + 1)})
}