<template>
  <div class="lcomp-credit-base-info">
    <info-table :config="config" :data="data"></info-table>
  </div>
</template>
<script>
import InfoTable from '@/components/InfoTable'
const defPro = {md: 12, lg: 8}
const config = [
  {label: '客户姓名', key: 'name', props: defPro},
  {label: '手机号', key: 'mobile', props: defPro},
  {label: '身份证号', key: 'id_card', props: defPro}
]
export default {
  name: 'CreditBaseInfo',
  components: {
    InfoTable
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      config
    }
  }
}
</script>
<style lang="scss" scoped>
.lcomp-credit-table-comps {
}
</style>
