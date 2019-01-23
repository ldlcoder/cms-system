<template>
  <div class="lcomp-tongdun-infos" v-loading="loading">
    <div class="module-item-box">
      <p class="module-item-title"><b>基本信息</b></p>
      <info-table :config="baseInfoConfig" :data="data"></info-table>
    </div>
    <div class="module-item-box" v-for="item in tableModule" :key="item.title">
      <p class="module-item-title"><b>{{item.title}}</b></p>
      <table-comps v-if="data && Array.isArray(data[item.dataKey]) && data[item.dataKey].length" class="tongdun-detail-tb" :module="item.module" :data="data"></table-comps>
      <p class="no-data-tip" v-else>查询成功，无相关执行信息</p>
    </div>
  </div>
</template>
<script>
import TableComps from '../TableComps'
import InfoTable from '@/components/InfoTable'
import { baseInfoConfig } from '../moduleConfig'

export default {
  name: 'TongdunInfos',
  components: {
    InfoTable,
    TableComps
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
      baseInfoConfig: baseInfoConfig(),
      tableModule: [
        { title: '同盾多头借贷数据', module: 'duotou', dataKey: 'dt_list' },
        { title: '复杂网络4', module: 'net', dataKey: 'net_list' }
      ]
    }
  },
  computed: {
  },
  methods: {
    // utils
    // business
    // events
  }

}
</script>
<style lang="scss" scoped>
.lcomp-tongdun-infos {
  margin-top: -20px;
  min-height: 120px;
  .module-item-box {
    margin-top: 20px;
  }
  .module-item-title {
    padding-left: 12px;
    margin-bottom: 16px;
    border-left: 3px solid $themeBlue;
  }
  .no-data-tip {
    border: 1px solid $borderColor;
    line-height: 48px;
    text-align: center;
  }
  /deep/ .tongdun-detail-tb {
    .detail-items {
      text-align: left;
    }
  }
}
</style>
