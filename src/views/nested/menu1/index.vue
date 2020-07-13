<template>
  <div style="padding:30px;">
    <el-button type="primary" @click="addRoutes2">跳转至demo页面</el-button>
    <router-view />
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    addRoutes1() {
      this.$router.push('/demo')
    },
    addRoutes2() {
      this.$router.push('/satp/tool')
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
