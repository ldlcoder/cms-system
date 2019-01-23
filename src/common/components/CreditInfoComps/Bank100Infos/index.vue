<template>
  <div class="lcomp-bank100-infos" v-loading="loading">
    <div class="module-item-box" v-for="item in config" :key="item.key">
      <p class="module-item-title"><b>{{item.title}}</b></p>
      <component :is="item.component" v-bind="item.props" :data="item.dataHandler ? item.dataHandler(data[item.key]) : data[item.key]">
      </component>
    </div>
  </div>
</template>
<script>
import TableComps from '../TableComps'
import CourtInfoTable from '../CourtInfoTable'
import {getModuleConfig} from '../moduleConfig'

export default {
  name: 'Bank100Infos',
  components: {
    CourtInfoTable,
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
      config: Object.values(getModuleConfig(['court', 'natural', 'special']))
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
<style lang="scss" scoped>
.lcomp-bank100-infos {
  margin-top: -20px;
  .module-item-box {
    margin-top: 20px;
  }
  .module-item-title {
    padding-left: 12px;
    margin-bottom: 16px;
    border-left: 3px solid $themeBlue;
  }
}
</style>
