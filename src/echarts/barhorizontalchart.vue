<template>
  <div id="barhorizontalChart" ref="barhorizontalChart" style="width:100%;height:100%"></div>
</template>
<!-- 水平柱状图 -->
<script>
export default {
  props: ['chartData'],
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const self = this
    window.addEventListener('resize', () => {
      myChart.resize()
    })

    var myChart = this.$echarts.init(this.$refs.barhorizontalChart)
    myChart.setOption(self.chartData.option, true)
    myChart.on("click", function(params) {
      
      self.$emit("showChartDetails", params, self.chartData,'barhorizontalChart')
    })
  }
}
</script>

<style lang="scss" scoped>

</style>