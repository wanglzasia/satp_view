<template>
  <div id="radarchart" ref="radarchart" style="width:100%;height:100%" />
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

    var myChart = this.$echarts.init(this.$refs.radarchart)

    var option = {
      radar: {
        indicator: self.chartData.indicatorData,
        name: {
          formatter: function(v) {
            return v
          }
        },
        triggerEvent: true
      },
      series: self.chartData.seriesData
    }

    if (self.chartData.title) {
      option.title = { text: self.chartData.title }
    }
    if (self.chartData.legend) {
      option.legend = {
        orient: self.chartData.legend.orient || 'vertical',
        top: self.chartData.legend.top || 10,
        right: self.chartData.legend.right || 10,
        data: self.chartData.legend.data
      }
    }

    myChart.setOption(option, true)
    myChart.on('click', function(params) {
      // 获取点击具体某一点的名称 option.radar.indicator[params.event.topTarget.__dimIdx].name
      params.seriesName = option.radar.indicator[params.event.topTarget.__dimIdx].name
      self.$emit('showChartDetails', params, self.chartData, 'radarchart')
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
