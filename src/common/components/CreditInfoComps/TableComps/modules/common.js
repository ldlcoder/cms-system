import { memberType } from '@/utils'
export function commonColumns () {
  return {
    index: {
      width: '80px',
      label: '序号',
      type: 'index'
    },
    type: {
      minWidth: '12%',
      label: '类型',
      prop: 'member_type',
      formatter: (row, column, cellValue) => (memberType(cellValue) || '客户')
    },
    name: {
      minWidth: '12%',
      label: '姓名',
      prop: 'name'
    },
    creditId: {
      minWidth: '30%',
      label: '身份证号',
      prop: 'id_card'
    },
    telphone: {
      minWidth: '22%',
      label: '手机号',
      prop: 'mobile'
    }
  }
}
export function dataHandler (data) {
  return Array.isArray(data) ? data : (data && Array.isArray(data.list) ? data.list : [])
}