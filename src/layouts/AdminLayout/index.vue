<template>
  <el-container class="app-wrapper app-admin-layout">
    <el-aside :width="sidebarStyles" class="app-side-menu">
      <sidebar></sidebar>
    </el-aside>
    <el-container class="main-container">
      <el-header class="app-nav-header" height="70px">
        <navbar></navbar>
      </el-header>
      <el-main class="app-main-pane">
        <app-main>
        </app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
// import { websocketListen } from '@/mixins'
import store from '@/store'
import { mapGetters } from 'vuex'
import { getCompanyRole, getProvCitys } from '@/api/common'

const setRemember = (to, from, next) => {
  if (store.getters.appConfig.__dynamic) {
    next()
  } else {
    store.dispatch('getDyncAppConfig', store.getters.apiConfig.url).then(() => {
      next()
    }).catch(e => {
      next()
    })
  }
}

export default {
  name: 'AdminLayout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  // mixins: [websocketListen],
  beforeRouteEnter: setRemember,
  beforeRouteUpdate: setRemember,
  created () {
    this.getCompanyRole()
    // !this.roles.length && this.getCompanyRole()
    // !Object.keys(this.provCity).length && this.getProvCity()
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'sidebar',
      'roles',
      'provCity',
      'adminLayoutSwitch'
    ]),
    sidebarStyles () {
      return (this.sidebar && this.sidebar.opened ? 210 : 60) + 'px'
    }
  },
  watch: {
    'adminLayoutSwitch.roles' (newVal) {
      newVal && this.getCompanyRole()
    },
    'adminLayoutSwitch.provCity' (newVal) {
      newVal && this.getProvCity()
    } 
    // roles: function (val, old) {
    //   !this.roles.length && this.getCompanyRole()
    // },
    // provCity () {
    //   !Object.keys(this.provCity).length && this.getProvCity()
    // }
  },
  methods: {
    modifiySwitch (key, value) {
      this.$store.commit('SET_ADMIN_LAYOUT_SWITCH', { key, value })
    },
    getCompanyRole () {
      this.$fetch(getCompanyRole).silence().done(data => {
        const list = data && Array.isArray(data.role_list) ? data.role_list : []
        this.$store.commit('SET_ROLES', list)
        this.modifiySwitch('roles', false)
      }).faile(e => {
        this.modifiySwitch('roles', false)
      })
    },
    getProvCity () {
      this.$fetch(getProvCitys).silence().done(data => {
        Object.keys(data).length && store.commit('SET_PROV_CITY', data)
        this.modifiySwitch('provCity', false)
      }).faile(e => {
        this.modifiySwitch('provCity', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-admin-layout {
  position: relative;
  width: 100%;
  min-width: 800px;
  height: 100%;
  .app-nav-header {
    padding: 15px 28px;
    background-color: $menuBg;
  }
  // 主体区域
  // 侧边栏
  .app-side-menu {
    transition: width 0.4s;
    overflow: hidden;
  }
  .app-main-pane {
    padding: 0;
  }
  .main-container {
    overflow: hidden;
    background-color: $mainBg;
  }
}
</style>
