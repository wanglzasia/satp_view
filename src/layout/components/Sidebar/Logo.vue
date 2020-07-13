<template>
  <div>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}">
      <transition name="sidebarLogoFade">
        <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
          <img v-if="smallLogo" :src="smallLogo" class="sidebar-logo">
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="/">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <!-- <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /> -->
          <!-- <el-badge :value="12" class="item">
            待办
          </el-badge> -->
        </router-link>
      </transition>
    </div>

    <!-- <div v-if="!collapse" class="sidebar-avatar" style="height:70px;" :class="{'collapse':collapse}">
      <transition name="sidebarLogoFade">
        <el-row class="demo-avatar demo-basic" style="padding:10px;height:70px;">
          <el-col :span="9">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /></div>
            </div>
          </el-col>
          <el-col :span="15">
            <font class="user-title" style="height:70px;">{{ user.userName }}</font>
          </el-col>
        </el-row>
      </transition>
    </div> -->

    <!-- <div v-if="!collapse" class="sidebar-work" :class="{'collapse':collapse}">
      <transition name="sidebarLogoFade">

        <el-row style="padding:10px;">
          <el-col :span="12">
            <el-badge :value="user.todoNum" class="item">
              <h1 class="sidebar-title">
                <router-link to="/system/workflow/busiTaskList">待办</router-link>
              </h1>
            </el-badge>
          </el-col>
          <el-col :span="12">
            <el-badge :value="user.noticeNum" class="item">
              <h1 class="sidebar-title">
                <router-link to="/system/baseCommon/sysInform">通知</router-link>
              </h1>
            </el-badge>
          </el-col>
        </el-row>
      </transition>
    </div> -->

    <!-- <div class="sidebar-work">

          <el-badge :value="12" class="item">
            <span class="sidebar-title">
              待办
            </span>
          </el-badge>
        </div> -->

  </div>
</template>

<script>

import logo from '@/assets/images/logo.png'
import smallLogo from '@/assets/images/small-logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  computed: {
    ...mapGetters([
      'name',
      'user',
      'roles'
    ])
  },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo,
      smallLogo
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  background-color: rgb(48, 65, 86);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      //width: 65%;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.sidebar-work {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  & .sidebar-title {
      display: inline-block;
      margin: -15px 0 0 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
}
.sidebar-avatar {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  & .sidebar-title {
      display: inline-block;
      margin: -15px 0 0 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.user-title {
  padding: 5px;
  margin: 0 0 0 0;
  color: #fff;
  font-weight: 500;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
</style>
