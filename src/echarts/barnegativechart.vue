<template>
  <div id="barNegativeChart" ref="barNegativeChart" style="width:100%;height:100%"></div>
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

    var myChart = this.$echarts.init(this.$refs.barNegativeChart);
    
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                data : self.chartData.yData
            }
        ],
        series : self.chartData.seriesData
    };


    if (self.chartData.title) {
         option.title = { text: self.chartData.title};
    }
    if (self.chartData.legend) {
      option.legend = {
        data: self.chartData.legend.data
      };
    }

    myChart.setOption(option, true);
    myChart.on("click", function(params) {
      self.$emit("showChartDetails", params, self.chartData,'barnegativechart');
    });
  }
};
</script>

<style lang="scss" scoped>

</style>