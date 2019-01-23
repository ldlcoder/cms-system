<template>
  <div class="lcomp-navbar">
    <div class="header-title">{{companyName}}</div>
    <div class="right-menu">
      <!-- <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip> -->

      <!-- <system-message></system-message> -->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="user-info-wrapper clearfix">
          <div class="user-avatar"></div>
          <!--<img class="user-avatar" :src="userInfo.avatar+'?imageView2/1/w/80/h/80'">-->
          <span class="user-name">{{userInfo.name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu style="width: 120px;" slot="dropdown">
          <router-link :to="{name: 'AdminIndex'}">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link :to="{name: 'UserProfile'}">
            <el-dropdown-item>
              个人资料
            </el-dropdown-item>
          </router-link>
          <router-link :to="{name: 'ModifyPwd'}">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Screenfull from '@/components/Screenfull'
// import SystemMessage from '../SystemMessage'

export default {
  name: 'Navbar',
  components: {
  },
  computed: {
    ...mapGetters([
      'companyName',
      'userInfo'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('LOGIN_OUT')
    }
  }
}
</script>

<style lang="scss" scoped>
.lcomp-navbar {
  height: 100%;
  .user-avatar{
    width: 40px;
    height: 40px;
  }
  .header-title {
    float: left;
    width: 280px;
    line-height: 40px;
    color: #ffffff;
    height: 100%;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;
    color: #fff;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      color: #fff;
      height: 20px;
    }
    .international{
      vertical-align: top;
      .international-icon{
        font-size: 20px;
        cursor: pointer;
        vertical-align: -5px;
      }
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      color: #fff;
      height: 100%;
      margin-right: 30px;
      .user-menu {
        width: 120px;
      }
      .user-info-wrapper {
        height: 100%;
        cursor: pointer;
        position: relative;
        .user-avatar {
          float: left;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: url('./images/user.png') no-repeat center 100%;
        }
        .user-name {
          float: left;
          padding-left: 12px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 50%;
          margin-top: -6px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
