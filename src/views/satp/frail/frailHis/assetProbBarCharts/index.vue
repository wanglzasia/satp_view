<template>
  <div class="app-container">
    <div>
      <el-page-header content="资产问题柱状图" @back="goBack" />
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
      logicAddr: '',
      beginTime: '',
      endTime: '',
      initDataVer: {}
    }
  },
  created() {
    this.logicAddr = this.$route.query.logicAddr
    this.vulnClass = this.$route.query.vulnClass
    this.beginTime = this.$route.query.beginTime
    this.endTime = this.$route.query.endTime
    this.getLineCharts()
  },
  methods: {
    getLineCharts() {
      const $self = this
      const param = {}
      param.vulnTitle = $self.vulnTitle
      param.logicAddr = $self.logicAddr
      param.beginTime = $self.beginTime
      param.endTime = $self.endTime
      $self.$store.dispatch('frail/queryAssetProbBarCharts', param).then(response => {
        $self.initDataVer = {
          templeSrc: () => import('@/echarts/barverticalchart.vue')
        }
        $self.initDataVer.option = response.result.option
        $self.chartsData.push($self.initDataVer)
      }).catch(() => {
      })
    },
    showChartDetails(val, data, type) {
      this.$router.push({
        path: '/satp-prob/frail/detailList',
        query: {
          'vulnClass': this.vulnClass,
          'logicAddr': this.logicAddr,
          'beginTime': this.beginTime,
          'endTime': this.endTime
        }
      })
    },
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailHis'
      })
    }
  }
}
</script>
<style scoped>

</style>
