<template>
  <div id="pieChart" ref="pieChart" style="width:100%;height:100%"></div>
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

    var myChart = this.$echarts.init(this.$refs.pieChart);
    myChart.setOption(self.chartData.option, true);
    myChart.on('click', function(params) {
      self.$emit('showChartDetails', params, self.chartData, 'pieChart')
    });
  }
};
</script>

<style lang="scss" scoped>

</style>