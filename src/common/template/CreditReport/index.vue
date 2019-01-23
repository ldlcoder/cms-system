<template>
  <el-dialog  class="lcomp-report-dialog" visible width="60%" top="0" v-on="$listeners">
    <el-row class="report-pane" v-loading="loading">
      <el-col class="module-menu" :span="4">
        <ul class="menu-ul">
          <li
            v-for="(item, index) in menuItems"
            :class="{active: index === actModuleIdx }"
            @click="scrollToModule(index)"
            :key="item.moudle"
          >
            {{item.title}}
          </li>
        </ul>
      </el-col>
      <el-col class="report-detail" ref="reportPane" v-loading="loading" @scroll.native="reportScrolling" :span="20">
        <module-info-box v-if="getInfoFaile"></module-info-box>
        <template v-else>
          <component
            v-for="item in modulesConfig"
            :is="item.component"
            class="report-module-pane"
            ref="modules"
            :loading="modulesLoading[item.module]"
            :data="reportInfo[item.module]"
            :origin="reportInfo"
            @on-refetch="refetchModuleInfo"
            :key="item.module"
          >
          </component>
        </template>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import CreditBaseInfo from './components/CreditBaseInfo'
import Bank100Info from './components/Bank100Info'
import TongdunInfo from './components/TongdunInfo'
import ModuleInfoBox from './components/ModuleInfoBox'
import { getUserCreditReport, queryCreditReportModules } from '@/api/common'
import { debounce } from 'lodash'
const moduleTitles = { 'base': '基本信息', 'bank100': '百融', 'tongdun': '同盾' }
const moduleList = {
  base: 'CreditBaseInfo',
  bank100: 'Bank100Info',
  tongdun: 'TongdunInfo'
}
export default {
  name: 'CreditReport',
  components: {
    CreditBaseInfo,
    Bank100Info,
    TongdunInfo,
    ModuleInfoBox
  },
  props: {
    id: [Number, String],
    exclude: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      loading: false,
      getInfoFaile: false,
      reportInfo: {},
      actModuleIdx: 0,
      moduleHeights: [],
      modulesLoading: {
        bank100: false,
        tongdun: false
      },
      reportScrolling: debounce(this.checkReportPosition, 100)
    }
  },
  computed: {
    accessModules () {
      const { exclude, reportInfo } = this
      return Object.keys(reportInfo).filter(item => (!exclude.includes(item) && moduleList[item]))
    },
    menuItems () {
      return this.accessModules.map(item => ({ module: item, title: moduleTitles[item] }))
    },
    modulesConfig () {
      return this.accessModules.map(item => ({ module: item, component: moduleList[item] }))
    }
  },
  created () {
    this.getReportInfo()
  },
  watch: {
    id: 'getReportInfo'
  },
  methods: {
    /** utils **/
    /** business **/
    // 获取各模块高度
    getModuleHeigh () {
      this.$nextTick(() => {
        const { modules } = this.$refs
        let moduleHeights = []
        let moduleTop = 0
        modules.forEach(item => {
          moduleHeights.push(moduleTop)
          moduleTop += item.$el.offsetHeight
        })
        this.moduleHeights = moduleHeights
      })
    },
    // 查询指定用户的征信报告信息
    getReportInfo () {
      this.id && this.$fetch(getUserCreditReport, { id: this.id }).lock('loading').done(data => {
        if (data) {
          this.reportInfo = data
          this.getModuleHeigh()
        } else {
          this.getInfoFaile = true
        }
      }).faile(() => {
        this.getInfoFaile = true
      })
    },
    checkReportPosition () {
      const { $refs: { reportPane: { $el } }, moduleHeights } = this
      const scrollTop = $el.scrollTop
      const index = moduleHeights.findIndex(item => (scrollTop < item))
      this.actModuleIdx = (index > 0 ? index : moduleHeights.length) - 1
    },
    /** events **/
    scrollToModule (moduleIdx) {
      let scrollTop = 0
      const { reportPane, modules } = this.$refs
      for (let i = 0; i < moduleIdx; i++) {
        scrollTop += modules[i].$el.offsetHeight
      }
      reportPane.$el.scrollTop = scrollTop
    },
    refetchModuleInfo (module) {
      this.$fetch(queryCreditReportModules, { id: this.id, types: [module] }).lock('modulesLoading.' + module).done(data => {
        data[module] && (this.reportInfo[module] = data[module]) && this.getModuleHeigh()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-report-dialog {
  /deep/ .el-dialog {
    margin: 0 auto;
    min-width: 800px;
    height: 100%;
    overflow: hidden;
    .el-dialog__headerbtn {
      z-index: 10;
      i {
        color: #909399;
      }
    }
    .el-dialog__header, .el-dialog__body {
      padding: 0;
    }
    .el-dialog__body, .report-pane, .report-pane > .el-col {
      height: 100%;
    }
    .module-menu {
      background-color: $mainBg; 
    }
    .menu-ul {
      margin: 30px 0 0;
      padding: 0;
      list-style: none;
      li {
        text-align: center;
        line-height: 45px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
        background-color: $themeBlue;
      }
    }
    .report-detail {
      overflow-x: hidden;
      overflow-y: auto;
    }
    .lcomp-module-pane {
      padding-bottom: 20px;
    }
    .report-module-pane {
      padding: 25px 25px 0;
      .item-title {
        padding-left: 12px;
        margin: 0 0 16px 0;
        border-left: 3px solid $themeBlue;
      }
    }
  }
}
</style>
