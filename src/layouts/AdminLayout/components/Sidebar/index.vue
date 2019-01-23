<template>
  <div class="lcomp-sidebar">
    <div class="head-logo-pane"><div class="head-logo"></div></div>
    <div class="menu-explode-btn">
      <i class="lease-icon-daohangtiaozheng btn-icon" :class="{'is-active': sidebar.opened}" @click="toggleSideBar"></i>
    </div>
    <el-scrollbar
      class="side-menu-pane"
      :native="false"
      ref="elscrollbar"
    >
      <el-menu
        class="side-main-menu"
        mode="vertical"
        :default-active="defaultMenuActive"
        :collapse="isCollapse"
        :unique-opened="true"
      >
        <menu-item
          v-for="(item, index) in menuItems"
          :item="item"
          :key="index"
        >
        </menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from './components/MenuItem'
export default {
  name: 'AppSideBar',
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    menuItems () {
      return this.sidebar.menuItems || []
    },
    defaultMenuActive () {
      const { name, meta: { activeTarget } } = this.$route
      return activeTarget || name
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
.lcomp-sidebar {
  @include relative;
  height: 100%;
  padding-top: 120px;
  background-color: $menuBg;
  color: $sidebarWord;
  .head-logo-pane {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    text-align: center;
    background-color: $darkBlue;
    .head-logo {
      display: inline-block;
      width: 60%;
      max-width: 60px;
      height: 100%;
      background: url('./images/logo.png') no-repeat center center/ 100% auto;
    }
  }
  .menu-explode-btn {
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #3e4b5e;
    line-height: 50px;
    text-align: center;
    .btn-icon {
      cursor: pointer;
      font-size: 22px;
      transform: rotate(90deg);
      transition: .38s;
      transform-origin: 50% 50%;
      &.is-active {
        transform: rotate(0deg);
      }
    }
  }
  .side-menu-pane {
    height: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
    /deep/ .side-main-menu {
      &:not(.el-menu--collapse) {
        width: 210px;
      }
      border-right: 0;
      background-color: $menuBg;
      &.el-menu--collapse {
        .el-submenu__title {
          span, .el-submenu__icon-arrow {
            display: none;
          }
        }
      }
      .menu-icon {
        margin-right: 14px;
        font-size: 18px;
        color: $sidebarWord;
      }
      .el-submenu__title, .el-menu-item {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        color: $sidebarWord;
        &:hover, &:focus {
          background-color: #445A76;
        }
        &.is-active {
          background-color: $menuHover;
        }
      }
      .side-sub-menu {
        .el-menu-item {
          height: 40px;
          line-height: 40px;
          padding-left: 60px;
        }
        &.is-opened, &>.el-menu  {
          background-color: $subMenuBg;
        }
      }
    }
  }
  
}
</style>
