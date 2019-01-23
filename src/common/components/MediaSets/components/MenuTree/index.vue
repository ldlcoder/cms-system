<template>
  <div class="lcomp-menu-tree">
    <div v-if="data && data.length">
      <sub-menu
        v-for="(item, index) in data"
        :key="item.key"
        :data="item"
        :index="index"
        :checkBox="checkBox && item.checkBox"
        :isCheckAll="isCheckAll"
        v-model="checkedValues[item.key]"
        :activeId="activeId"
        @item-change="itemChange"
      >
      </sub-menu>
    </div>
  </div>
</template>
<script>
import SubMenu from './components/SubMenu'
export default {
  name: 'MediasMenu',
  components: {SubMenu},
  props: {
    data: Array, // list
    checkBox: Boolean,
    isCheckAll: Boolean
  },
  data () {
    return {
      activeId: this.getActiveId(),
      curType: '',
      defNode: null,
      checkedValues: {}
    }
  },
  computed: {
   
  },
  created() {
   
  },
  mounted() {
    
  },
  watch: {
    checkedValues: {
      handler (newVal, oldVal) {
        this.$store.commit('SET_SUBMENU', newVal)
      },
      deep: true
    }
  },
  methods: {
    // utils
    getActiveId () {
      const {data} = this
      let item
      Array.isArray(data) && data.length && (Array.isArray(data[0].children) ? (item = data[0].children[0]) : {id: ''}, 0)
      item.id && this.$emit('current-idChange',item, data[0].type, data[0].key, 0, 0)
      return item.id
    },
    // bussiness
    handleCheckedValues () {
      if (!this.isCheckAll) return {}
      const result = {}
      this.data.forEach(val => {
        const {type, children} = val
        type && (result[type] = Array.isArray(children) ? children.map(item => (item.id)) : [])
      })
      return result
    },
    /** events **/
    itemChange (id, item, type, key, index, subIndex) {
      this.activeId = id
      type && this.$emit('current-idChange', item, type, key, index, subIndex)
      //current-change
    }
    // click
  }
}
</script>
<style lang="scss" scoped >
  .lcomp-menu-tree{
    span{
      font-size: 14px;
    }
  }
</style>

