<template>
  <div id="lineChartDouble" ref="lineChartDouble" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let self = this;
    window.addEventListener("resize", () => {
      myChart.resize();
    });

    var myChart = this.$echarts.init(this.$refs.lineChartDouble);
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:this.chartData.legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
        },
        xAxis:this.chartData.xAxis,
        yAxis:this.chartData.yAxis,
        series: this.chartData.seriesData
    };
    

    if (self.chartData.title) {
         option.title = { text: self.chartData.title};
    }

    myChart.setOption(option, true);
    let $self = this;
    myChart.on("click", function(params) {
      self.$emit("showChartDetails", params, self.chartData,'linechartdouble');
    });
  }
};
</script>

<style lang="scss" scoped>
</style>