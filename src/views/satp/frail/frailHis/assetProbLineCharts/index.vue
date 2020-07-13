<template>
  <div class="app-container">
    <div>
      <el-page-header content="资产问题历史轨迹图" @back="goBack" />
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
      beginTime: '',
      endTime: '',
      logicAddr: '',
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
      param.vulnClass = $self.vulnClass
      param.beginTime = $self.beginTime
      param.endTime = $self.endTime
      $self.$store.dispatch('frail/queryAssetProbLineCharts', param).then(response => {
        $self.initDataVer = {
          templeSrc: () => import('@/echarts/linechart.vue')
        }
        $self.initDataVer.option = response.result.option
        $self.chartsData.push($self.initDataVer)
      }).catch(() => {
      })
    },
    showChartDetails(val, data, type) {
      // const dateTime = val.name
      let rectStat = val.seriesName

      if (rectStat === '平均整改中') {
        rectStat = '3'
      } else if (rectStat === '平均已整改') {
        rectStat = '1'
      } else if (rectStat === '平均漏洞数') {
        rectStat = ''
      }
      this.$router.push({
        path: '/satp-prob/frail/detailList',
        query: {
          'vulnClass': this.vulnClass,
          'logicAddr': this.logicAddr,
          'beginTime': val.name,
          'endTime': val.name,
          'rectStat': rectStat
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
