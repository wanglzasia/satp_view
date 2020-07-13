<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="header-right">
      <div class="header-user-con">
        <div class="user-shortmenu">
          <el-popover
            placement="left"
            min-width="300"
            trigger="hover"
          >
            <el-row>
              <el-button size="mini">首页</el-button>
            </el-row>
            <!-- <el-link slot="reference" class="user-a user-font">快捷菜单</el-link> -->
            <span slot="reference" class="el-dropdown-link user-font">快捷菜单</span>
            <!-- <el-link type="primary"><img src="@/assets/images/快捷导航.png"></el-link> -->
          </el-popover>
        </div>
        <el-badge :value="user.todoNum" class="item">
          <el-button icon="el-icon-tickets" size="small" @click="busiTaskList">待办</el-button>
          <!-- <h1 class="sidebar-title">
            <router-link to="/system/workflow/busiTaskList">待办</router-link>
          </h1> -->
        </el-badge>
        <el-badge :value="user.noticeNum" class="item">
          <el-button icon="el-icon-bell" size="small" @click="sysInform">通知</el-button>
          <!-- <h1 class="sidebar-title">
            <router-link to="/system/baseCommon/sysInform">通知</router-link>
          </h1> -->
        </el-badge>
        <!-- <el-row>
          <el-col :span="12">
            <el-badge :value="user.todoNum" class="item">
              <el-button icon="el-icon-tickets" size="small">我的待办</el-button>
            </el-badge>
          </el-col>
          <el-col :span="12">
            <el-badge :value="user.noticeNum" class="item">
              <el-button icon="el-icon-bell" size="small">通知提醒</el-button>
            </el-badge>
          </el-col>
        </el-row> -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/images/touxiang.png">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            {{ user.userName }}
            <i class="el-icon-caret-bottom" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <a href="http://www.cnnvd.org.cn/" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- <div class="right-menu">
      <div class="header-user-con">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />

            <i class="el-icon-caret-bottom" />
          </div>

          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'user'
    ])
  },
  methods: {
    busiTaskList() {
      this.$router.push('/system/workflow/busiTaskList')
    },
    sysInform() {
      this.$router.push('/system/baseCommon/sysInform')
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .item-menu {
    float: right;
    height: 100%;
    line-height: 50px;
  }
}

.item {
  margin-top: 7px;
  margin-right: 30px;
}

.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 5px;
}
.user-avator img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.user-shortmenu {
  padding-right: 15px;
  padding-top: 7px;
}
.user-shortmenu img {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 10%;
}
.user-font {
  font-size: 16px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
.user-a{
  text-decoration: none;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
}
.el-dropdown-link {
    color: rgb(0, 0, 0);
    cursor: pointer;
}
.sidebar-title {
  display: inline-block;
  margin: -15px 0 0 0;
  color: rgb(0, 0, 0);
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
</style>
