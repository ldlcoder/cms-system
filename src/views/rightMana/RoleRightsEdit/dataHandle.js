import { createInputFormItem, createFiRulesProps } from '@/common'

export function createRolesNameField (idEdit) {
  return createInputFormItem(createFiRulesProps('角色名称', !idEdit), {
    placeholder: '请输入角色名称',
    disabled: idEdit
  }, 'name')
}

export const rightsRule = [
  { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
]
