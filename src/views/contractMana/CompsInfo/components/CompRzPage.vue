<template>
  <el-row class="comp-rz-page" :gutter="20">
    <el-col :span="8" v-for="(item, index) in data" :key="index">
      <el-card class="rz-item-card">
        <h4>{{`认证企业${index + 1}`}}</h4>
        <modules-info-table
          :data="item"
          :config="configs"
        >
        </modules-info-table>
        <module-pane title="企业印章" class="corporate-seal">
          <img :src="'data:image/jpeg;base64,' + item.stamp_code">
        </module-pane>
      </el-card>
    </el-col>
    <el-col :span="8" v-if="data.length < 3">
      <el-card class="rz-item-card banner-add-card"><el-button icon="lease-icon-tianjia1" @click="addRzItem"></el-button></el-card>
    </el-col>
  </el-row>
</template>
<script>
import ModulesInfoTable from '@/common/components/ModulesInfoTable'
import ModulePane from '@/common/components/ModulePane'
import { getModuleConfig } from '../dataHandler'
import store from '@/store'
export default {
  name: 'CompRzPage',
  components: {
   ModulesInfoTable,
   ModulePane
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      configs: getModuleConfig(store.getters.switchFilter)
    }
  },
  methods: {
    skipTypeField (index) {
      return bannerSkipTypeField(index)
    },
    skipUrlField (type, index) {
      return bannerSkipUrlField(type, index)
    },
    /* events */
    imageUploadHanlder (index, result) {
      this.value[index].img_src ? (this.value[index].img_src = result.url) : this.$set(this.value[index], 'img_src', result.url)
    },
    deleteBannerItem (index) {
      this.value.splice(index, 1)
    },
    addRzItem () {
      this.$emit('add-item')
    }
  }
}
</script>
<style lang="scss" scoped>
.comp-rz-page {
  .corporate-seal{
    img{
      width: 200px;
    }
  }
}
</style>
