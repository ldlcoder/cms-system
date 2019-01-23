<template>
  <el-dialog
    visible
    title="企业认证信息确认"
    class="rz-confirm"
    :show-close="false"
    width="30%"
  >
    <p>提示：提交认证信息后，将不可进行信息修改，请再次确认认证信息</p>
    <modules-info-table
      :data="data"
      :config="configs"
    >

    </modules-info-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('on-cancel')">取 消</el-button>
      <el-button type="primary" :loading="sending" @click="$emit('on-sure')">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import { percent } from '@/utils'
import { getModuleConfig } from '../dataHandler'
import store from '@/store'
const percentFilter = value => percent(value, '', true)


export default {
  name: 'RzConfirm',
  components: {
    ModulesInfoTable
  },
  data () {
    return {
      configs: getModuleConfig(store.getters.switchFilter)
    }
  },
  props: {
    sending: Boolean,
    data: Object
  },
  computed: {
  },
  methods: {
    /** utils **/
    /** business **/
    /** event **/
  }

}

</script>
<style lang="scss" scoped>
.rz-confirm {
  /deep/ .loan-form{
    padding: 30px;
  }
}
</style>
