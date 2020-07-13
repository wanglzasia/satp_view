<template>
  <div id="detailChart" ref="detailChart" style="width:100%;height:100%">
    <el-table
      class="elTable"
      :data="tableData"
      stripe
      style="width: 100%" @row-click="openDetails"
    >
     
      <el-table-column v-for="(item,index) in columnConfig"
                      :key="index"
                      :prop="item.value"
                      :label="item.text" min-width="300">
                    
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["chartData"],
  data() {
    return {
      tableData: [], //列表数据
      columnConfig:[],//动态表头
    };
  },
  methods: {
    openDetails(row) {
        let self = this;
        var params = row;
        params.data = "ok";
        self.$emit("showChartDetails", params, self.chartData,'detailchart');
    }
  },
  mounted() {  
     this.columnConfig = this.chartData.head;
     this.tableData = this.chartData.rows;
  }
};
</script>

<style lang="scss" scoped>
</style>