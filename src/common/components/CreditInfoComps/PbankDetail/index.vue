<template>
  <div class="lcomp-pbank-detail">
    <info-table :config="itConfig" :data="data"></info-table>
    <tab-images class="pbank-images" v-if="handleImages.length" :value="handleImages"></tab-images>
  </div>
</template>
<script>
import InfoTable from '@/components/InfoTable'
import TabImages from '@/common/components/TabImages'
const passSwitch = ['未征信', '通过', '未通过', '征信中...']
const itConfig = [
  {label: '征信结果', key: 'pass', props: {md: 12, lg: 8}, filter: (item) => (passSwitch[item])},
  {label: '备注', key: 'remark', props: {md: 12, lg: 16}}
]
const imageTitles = {'1': '身份证', '2': '授权书', '3': '征信报告'}
export default {
  name: 'PbankDetail',
  components: {
    InfoTable,
    TabImages
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      itConfig
    }
  },
  computed: {
    handleImages () {
      const {images} = this.data
      return images ? this.imageDataHandle(images) : []
    }
  },
  methods: {
    // utils
    imageDataHandle (data) {
      return Object.keys(data).map(item => {
        return {
          title: imageTitles[item],
          list: data[item].map(src => ({file_path: src}))
        }
      })
    }
    // business
  }
}
</script>
<style lang="scss" scoped>
.lcomp-pbank-detail {
  .pbank-images {
    margin-top: 16px;
  }
}
</style>
