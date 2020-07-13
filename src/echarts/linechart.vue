<template>
  <div id="lineChart" ref="lineChart" style="width:100%;height:100%"></div>
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

    // var myChart = this.$echarts.init(this.$refs.lineChart);
    // var option = {
    //   xAxis:this.chartData.xAxis,
    //   yAxis:this.chartData.yAxis,
    //   series: [
    //     {
    //       type: "line",
    //       data: self.chartData.data
    //     }
    //   ]
    // };
    // if (self.chartData.title) {
    //      option.title = { text: self.chartData.title};
    // }
    // if (self.chartData.legend) {
    //   option.legend = {
    //     orient: self.chartData.legend.orient || "vertical",
    //     top: self.chartData.legend.top || 10,
    //     right: self.chartData.legend.right || 10,
    //     data: self.chartData.legend.data
    //   };
    // }
    var myChart = this.$echarts.init(this.$refs.lineChart);
    myChart.setOption(self.chartData.option, true);
    let $self = this;
    myChart.on("click", function(params) {
      self.$emit("showChartDetails", params, self.chartData,'linechart');
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
