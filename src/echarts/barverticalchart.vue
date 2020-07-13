<template>
  <div id="barverticalChart" ref="barverticalChart" style="width:100%;height:100%"></div>
</template>
<!-- 垂直柱状图 -->
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

    var myChart = this.$echarts.init(this.$refs.barverticalChart);

    var option = {
      tooltip: {
            trigger: "axis",  
      },
      xAxis: {
          data: self.chartData.xAxisData,
          splitLine:{
              show:false,
          },
      },
      yAxis: {
            splitLine:{
              show:false,
          },
      },
      series: self.chartData.seriesData
    };


    if (self.chartData.title) {
         option.title = { text: self.chartData.title};
    }
    if (self.chartData.legend) {
      option.legend = {
        orient: self.chartData.legend.orient || "vertical",
        top: self.chartData.legend.top || 10,
        right: self.chartData.legend.right || 10,
        data: self.chartData.legend.data
      };
    }
    myChart.setOption(self.chartData.option, true);
    myChart.on("click", function(params) {
      self.$emit("showChartDetails", params, self.chartData,'barverticalChart');
    });
  }
};
</script>

<style lang="scss" scoped>

</style>