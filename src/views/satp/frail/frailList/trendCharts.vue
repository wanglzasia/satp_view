<template>
  <div class="app-container">
    <div>
      <el-page-header content="轨迹图" @back="goBack" />
      <router-view />
    </div>
    <el-card shadow="hover">
      <div style="position:relative;height:350px;overflow: hidden;">
        <component
          :is="initDataVer.templeSrc"
          :chart-data="initDataVer"
          @showChartDetails="showChartDetails"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartsData: [],
      vulnTitle: '',
      vulnClass: '',
      vulnClassName: '',
      initDataVer: {}
    }
  },
  created() {
    this.vulnTitle = this.$route.query.vulnTitle
    this.vulnClass = this.$route.query.vulnClass
    this.vulnClassName = this.$route.query.vulnClassName
    this.getLineCharts()
  },
  methods: {
    getLineCharts() {
      const param = {}
      param.vulnTitle = this.vulnTitle
      param.vulnClass = this.vulnClass
      this.$store.dispatch('frail/queryTrendChartsList', param).then(response => {
        this.initDataVer = {
          templeSrc: () => import('@/echarts/linechart.vue')
        }
        this.initDataVer.option = response.result.option
        this.chartsData.push(this.initDataVer)
      }).catch(() => {
      })
    },
    showChartDetails(val, data, type) {
      const beginTime = val.name
      this.$router.push({
        path: '/satp-prob/frail/frailAsset',
        query: {
          'vulnTitle': this.vulnTitle,
          'vulnClass': this.vulnClass,
          'vulnClassName': this.vulnClassName,
          'beginTime': beginTime
        }
      })
    },
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailList'
      })
    }
  }
}
</script>
<style scoped>

</style>
