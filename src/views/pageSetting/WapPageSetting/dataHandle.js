import { createInputFormItem, createSelectFormItem, createFiRulesProps } from '@/common'

const hotCarsNums = [{ value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }, { value: 10 }]
export function getHotCarsItem () {
  return createSelectFormItem(createFiRulesProps('展示数量', '请选择展示数量'), 'num', 0, hotCarsNums, false)
}

const showRadioData = [ { value: true, label: '是' }, { value: false, label: '否' } ]
export function getShowRadioField (label = '常见问题') {
  return {
    props: { label: '是否展示' + label, labelWidth: '140px' },
    fields: {
      component: 'ElRadioGroup',
      data: showRadioData
    },
    prop: 'show'
  }
}

export function getQuestionField (index, required) {
  const idxTxt = index + 1
  const propCascade = ['list', index]
  return [
    createInputFormItem(createFiRulesProps(`问题${idxTxt}：`, required && '请输入问题的描述'), {
      placeholder: `请输入问题${idxTxt}的描述`
    }, 'question', { propCascade }),
    createInputFormItem(createFiRulesProps('答案：', required && '请输入问题的答案'), {
      placeholder: `请输入问题${idxTxt}的答案`,
      type: 'textarea',
      rows: 2
    }, 'answer', { propCascade })
  ]
}

export function getProcessField (index, required) {
  const idxTxt = index + 1
  const propCascade = ['list', index]
  return [
    createInputFormItem(createFiRulesProps(`流程${idxTxt}：`, required && '请输入流程的描述'), {
      placeholder: `请输入流程${idxTxt}的描述`
    }, 'title', { propCascade }),
    createInputFormItem(createFiRulesProps('说明：', required && '请输入流程的简要说明'), {
      placeholder: `请输入流程${idxTxt}的简要说明`,
      type: 'textarea',
      rows: 2
    }, 'description', { propCascade })
  ]
}

const skipTypesData = [{ value: 'link', label: '链接地址' }, { value: 'tel', label: '呼出电话' }, { value: 'img', label: '无跳转' }]
export function bannerSkipTypeField (index) {
  return {
    props: { label: '跳转选择：' },
    fields: {
      component: 'ElRadioGroup',
      data: skipTypesData
    },
    prop: 'type',
    propCascade: ['banner', index]
  }
}
export function bannerSkipUrlField (type, index) {
  const props = type === 'link' ? createFiRulesProps('跳转链接地址', true, [{ type: 'url', message: '请输入有效跳转地址', trigger: 'blur' }]) : createFiRulesProps('呼出电话', true)
  const placeholder = `请输入${type === 'link' ? '跳转链接地址' : '需要呼出的电话号码'}`
  return createInputFormItem(props, placeholder, 'type_value', { propCascade: ['banner', index] })
}

export const bannerImageRules = [
  { required: true, message: '请上传banner图片' }
]
