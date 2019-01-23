import {pick} from 'lodash'
const commonDataHandler = (data) => (Array.isArray(data) && data[0] ? data[0] : (data || {}))
const defPro = {md: 12, lg: 8}
export const baseInfoConfig = () => ([
  {label: '姓名', key: 'name', props: defPro},
  {label: '扫描分数', key: 'scan_score', props: defPro, filter: value => (value && value + '分')},
  {label: '决策建议', key: 'suggest', props: defPro}
])

export function getModuleConfig (keys) {
  const configs = {
    base: {
      key: 'base',
      component: 'BaseInfo',
      title: '客户基本信息',
      dataHandler: commonDataHandler
    },
    pbankDetail: {
      key: 'pbank',
      component: 'PbankDetail',
      title: '人行征信信息',
      dataHandler: commonDataHandler
    },
    pbank: {
      key: 'pbank',
      component: 'TableComps',
      props: {module: 'pbank'},
      title: '人行征信查询'
    },
    fico: {
      key: 'fico',
      component: 'TableComps',
      props: {module: 'fico'},
      title: 'FICO数据查询',
      subTitle: '(总分850分，分数越高，信用越好)'
    },
    bank100: {
      key: 'bank100',
      component: 'TableComps',
      props: {module: 'bank100'},
      title: '百融相关数据查询'
    },
    verify: {
      key: 'phone_verify',
      component: 'TableComps',
      props: {module: 'verify'},
      title: '手机实名/在网时长'
    },
    tongdun: {
      key: 'tongdun',
      component: 'TableComps',
      props: {module: 'tongdun'},
      title: '同盾数据查询'
    },
    court: {
      key: 'bank100_court',
      component: 'CourtInfoTable',
      title: '法院信息详情',
      dataHandler: commonDataHandler
    },
    natural: {
      key: 'bank100_natural',
      component: 'TableComps',
      title: '自然人识别信息详情',
      props: {module: 'natural'},
      dataHandler: commonDataHandler
    },
    special: {
      key: 'bank100_special',
      component: 'TableComps',
      title: '特殊名单信息详情',
      props: {module: 'special'},
      dataHandler: commonDataHandler
    },
    decision: {
      key: 'tongdun',
      component: 'InfoTable',
      props: {
        config: baseInfoConfig()
      },
      title: '同盾决策信息',
      dataHandler: commonDataHandler
    },
    duotou: {
      key: 'tongdun',
      component: 'TableComps',
      props: { class: 'tongdun-module-tb', module: 'duotou' },
      title: '同盾多头借贷数据',
      dataHandler: commonDataHandler
    },
    net: {
      key: 'tongdun',
      component: 'TableComps',
      props: { class: 'tongdun-module-tb', module: 'net' },
      title: '同盾复杂网络4',
      dataHandler: commonDataHandler
    }
  }
  return Array.isArray(keys) && keys.length ? pick(configs, keys) : configs
}