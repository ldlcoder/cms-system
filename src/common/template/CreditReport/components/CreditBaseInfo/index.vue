<template>
  <module-pane title="客户基本信息" class="report-base-info">
    <base-info v-if="data.name" :data="data"></base-info>
    <module-info-box v-else ></module-info-box>
  </module-pane>
</template>
<script>
import ModulePane from '@/common/components/ModulePane'
import ModuleInfoBox from '../ModuleInfoBox'
import BaseInfo from '@/common/components/CreditInfoComps/BaseInfo'
export default {
  name: 'ReportBaseInfo',
  components: {
    ModulePane,
    BaseInfo,
    ModuleInfoBox
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
