<template>
  <span class="electronic-contract-tmp">
    <el-button type="primary" size="mini" @click="show = true">电子合同</el-button>
    <el-dialog
      title="电子合同"
      width="35%"
      :visible.sync="show"
      @close="closeDailog"
    >
      <ul v-if="data.length">
        <li v-for="(item, index) in data" :key="index">
          <a :href="item.url" target="_blank">{{`《${item.title}》`}}</a>
        </li>
      </ul>
      <p v-else>暂无合同</p>
    </el-dialog>
  </span>
</template>
<script>
import { getElectronicContracts } from '@/api/common'

export default {
  name: 'ElectronicContractTmp',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => ({})
    }
  },
  data () {
   return {
      show: false
    }
  },
  computed: {
  },
  methods: {
    /** utils **/
    /** events **/
    closeDailog () {
     this.show = false
    }
  }
}
</script>
<style lang="scss">
.electronic-contract-tmp {
  li{
    list-style-type: none;
    margin-top: 8px;
    text-decoration: underline;
  }
  .el-button{
    margin-left: 30px;
  }
  .el-button--mini{
    padding: 9px 20px;
  }
  .lease-icon-yingxiangziliao{
    visibility: hidden;
  }
}
</style>