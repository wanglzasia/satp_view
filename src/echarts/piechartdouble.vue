<template>
  <div id="pieChartDouble" ref="pieChartDouble" style="width:100%;height:100%" />
</template>

<script>
export default {
  props: ['chartData'],
  data() {
    return {}
  },
  mounted() {
    const self = this
    window.addEventListener('resize', () => {
      myChart.resize()
    })

    var myChart = this.$echarts.init(this.$refs.pieChartDouble)

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: self.chartData.innerSerieData
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          data: self.chartData.outerSerieData
        }
      ]
    }

    if (self.chartData.title) {
      option.title = { text: self.chartData.title }
    }
    // if (self.chartData.legend) {
    // option.legend = {
    //  orient: self.chartData.legend.orient || "vertical",
    //  x: 'left',
    //  data: self.chartData.legend.data
    // };
    // }

    myChart.setOption(option, true)
    myChart.on('click', function(params) {
      self.$emit('showChartDetails', params, self.chartData, 'piechartdouble')
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
