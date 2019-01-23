<template>
  <div class="report-bank100-info">
    <template v-if="data && data.result === 'success'">
      <module-pane v-for="item in modulesConfig" :title="'百融 -- '+item.title" :key="item.title">
        <component v-if="data[item.key]" :is="item.component" :data="data[item.key]" v-bind="item.props"></component>
        <module-info-box v-else></module-info-box>
      </module-pane>
    </template>
    <module-pane v-else title="百融">
      <module-info-box :data="data" v-loading="loading" @click="$emit('on-refetch', 'bank100')"></module-info-box>
    </module-pane>
  </div>
</template>
<script>
import ModulePane from '@/common/components/ModulePane'
import ModuleInfoBox from '../ModuleInfoBox'
import TableComps from '@/common/components/CreditInfoComps/TableComps'
import CourtInfoTable from '@/common/components/CreditInfoComps/CourtInfoTable'
const getModuleConfig = () => ([
  {
    key: 'court',
    component: 'CourtInfoTable',
    title: '法院信息详情'
  },
  {
    key: 'natural',
    component: 'TableComps',
    title: '自然人识别信息详情',
    props: {module: 'natural'},
  },
  {
    key: 'special',
    component: 'TableComps',
    title: '特殊名单信息详情',
    props: {module: 'special'},
  }
])
export default {
  name: 'Bank100Info',
  components: {
    ModuleInfoBox,
    ModulePane,
    TableComps,
    CourtInfoTable
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
