<template>
  <div class="report-tongdun-info" v-loading="loading">
    <template v-if="data && data.result === 'success'">
      <module-pane v-for="item in modulesConfig" :title="'同盾 -- '+item.title" :key="item.title">
        <component v-if="!item.key || data[item.key]" :is="item.component" :data="data" v-bind="item.props"></component>
        <module-info-box v-else></module-info-box>
      </module-pane>
    </template>
    <module-pane v-else title="同盾">
      <module-info-box :data="data" v-loading="loading"  @click="$emit('on-refetch', 'tongdun')"></module-info-box>
    </module-pane>
  </div>
</template>
<script>
import ModulePane from '@/common/components/ModulePane'
import ModuleInfoBox from '../ModuleInfoBox'
import InfoTable from '@/components/InfoTable'
import TableComps from '@/common/components/CreditInfoComps/TableComps'
import { baseInfoConfig } from '@/common/components/CreditInfoComps/moduleConfig'

const getModuleConfig = () => ([
  {
    component: 'InfoTable',
    title: '决策信息',
    props: { config: baseInfoConfig() }
  },
  {
    key: 'dt_list',
    component: 'TableComps',
    title: '同盾多头借贷数据',
    props: { module: 'duotou' },
  },
  {
    key: 'net_list',
    component: 'TableComps',
    title: '复杂网络4',
    props: { module: 'net' },
  }
])
export default {
  name: 'TongdunInfo',
  components: {
    ModuleInfoBox,
    ModulePane,
    TableComps,
    InfoTable
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    loading: Boolean
  },
  data () {
    return {
      modulesConfig: getModuleConfig()
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // utils
    // business
    // events
  }

}
</script>
