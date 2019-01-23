<template>
  <detail-page-pane class="car-city-set-page">
    <h4 class="page-title">
      上牌地管理
      <el-button type="text" @click="editTransfer" v-if="!isEdit">修改</el-button>
    </h4>
    <transfer
      ref="transfer"
      :data="handleProvCityData()"
      :targetData="formatToTree"
      :titles="titles"
      :treeOptions="{isShowCheckbox: isEdit}"
      v-model="checkedVals"
    ></transfer>
    <div class="buttons" v-if="isEdit">
      <el-button @click="cancelSet">取消</el-button>
      <el-button type="primary" @click="saveCity">保存</el-button>
    </div>
  </detail-page-pane>
</template>
<script>
import DetailPagePane from '@/common/template/DetailPagePane'
import Transfer from './components/Transfer'
import { getLicensePlates, setLicensePlates } from '@/api/carMana'
import { cloneDeep } from 'lodash'
import store from '@/store'
export default {
  name: 'CarCitySetPage',
  components: {
    DetailPagePane,
    Transfer
  },
  data () {
    return {
      checkedVals: [],
      copyCheckedVals: [],
      titles: ['可选上牌地', '已选上牌地'],
      isEdit: false
    }
  },
  created () {
    this.getLicensePlates()
    !this.provData.length && this.$store.commit('SET_ADMIN_LAYOUT_SWITCH', { key: 'provCity', value: true })
  },
  computed: {
    provData () {
      return this.$store.getters.provCity.province
    },
    cityData () {
      return this.$store.getters.provCity.city
    },
    formatToTree () {
      const { checkedVals, cityData } = this
      const obj = {}
      checkedVals.forEach((item, index, arr) => {
        !obj[item.substr(0, 2)] && (obj[item.substr(0, 2)] = [])
        obj[item.substr(0, 2)].push(item)
      })
      return Object.values(obj).length ? Object.values(obj).map(pItem => {
        const provVal = pItem[0].substr(0, 2) + '0000'
        let treeObj = {
          label: this.getProv(provVal),
          value: provVal
        }
        cityData[provVal] && (treeObj.children = pItem.map(cItem => ({ label: this.getCity(cItem.substr(0, 2), cItem.substr(2, 2)), value: cItem })))
        return treeObj
      }) : []
    }
  },
  methods: {
    // utils
    handleProvCityData () {
      const { cityData } = this
      return this.provData.map(item => {
        cityData[item.value] && (item.children = cityData[item.value])
        return item
      })
    },
    getProv (fullProvCode) {
      const { provData } = this
      const provItem = provData.find(item => (item.value === fullProvCode))
      return provItem ? provItem.label : ''
    },
    getCity (provCode, cityCode) {
      const { cityData } = this
      const fullProvCode = provCode + '0000'
      const cityItem = cityData[fullProvCode] ? cityData[fullProvCode].find(item => (item.value === provCode + cityCode + '00')) : null
      return cityItem ? cityItem.label : ''
    },
    // click
    editTransfer () {
      this.isEdit = true
    },
    cancelSet () {
      this.isEdit = false
      this.checkedVals = cloneDeep(this.copyCheckedVals)
    },
    saveCity () {
      this.checkedVals.length && this.$confirm('确认修改上牌地？', '系统提示', {
        type: 'warning',
        callback: (action, instance) => {
          action === 'confirm' && this.$fetch(setLicensePlates, { cityCode: this.checkedVals }).done(data => {
            if (data) {
              this.isEdit = false
              this.$router.push({ name: 'CarList' })
            }
          })
        }
      })
    },
    // events
    getLicensePlates () {
      this.$fetch(getLicensePlates).done(data => {
        if (Array.isArray(data)) {
          this.checkedVals = data
          this.copyCheckedVals = cloneDeep(data)
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.car-city-set-page{
  .page-title {
    margin-top: 0;
  }
  /deep/ .transfer-panel {
    border: 1px solid $borderColor;
  }
  .buttons {
    margin-top: 30px;
    .el-button {
      min-width: 120px;
      margin-right: 20px;
    }
  }
}
</style>
