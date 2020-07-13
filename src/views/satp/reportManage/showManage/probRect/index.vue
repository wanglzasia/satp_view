<template>
  <el-card>
    <h2 style="font-weight: 400;color: #1f2f3d;">问题整改统计</h2>
    <el-row>
      <el-card shadow="never">
        <el-row>
          <span class="satp-div-titles">问题整改统计</span>
        </el-row>
        <satp-datagrid
          ref="datagridTest1"
          :url="url"
          :qparams="params"
          :columns="columns"
          :toolbar="toolbar"
          idx
          :height="tableHeight"
          border
          class="satp-grid-mini"
          @toolbarClick="toolbarClick"
        />
      </el-card>
    </el-row>
  </el-card>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'ProbRect',
  components: {
    'satp-datagrid': datagrid
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['parentParam'],
  data() {
    return {
      url: 'reportManage/queryProbRectListByPage',
      tableHeight: 300,
      params: {
        year: '',
        quarter: '',
        month: ''
      },

      columns: [
        { label: '业务系统', prop: 'bizName', 'width': 200, 'show-overflow-tooltip': true, align: 'center' },
        { label: '问题总数', prop: 'probSum', 'width': 120, align: 'center' },
        { label: '新增问题数', prop: 'newSum', 'width': 120, align: 'center' },
        { label: '整改中问题数', prop: 'runSum', 'width': 120, align: 'center' },
        { label: '整改超时问题数', prop: 'overTimeSum', 'width': 120, align: 'center' },
        { label: '已整改问题数', prop: 'alreadySum', 'width': 120, align: 'center' },
        { label: '剩余问题总数', prop: 'modSum', 'width': 120, align: 'center' }
      ],
      toolbar: [
        { label: '导出excel', prop: 'probRectExcel', type: 'primary', icon: 'el-icon-download' },
        { label: '导出pdf', prop: 'probRectExport', type: 'primary', icon: 'el-icon-download' }
      ]
    }
  },
  created() {
    this.params.year = this.parentParam.year
    this.params.quarter = this.parentParam.quarter
    this.params.month = this.parentParam.month
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
  },
  methods: {
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'probRectExcel':
          this.exportExcel('probRectExcel')
          break
        case 'probRectExport':
          this.exportPdf('probRectExport')
          break
        default:
          break
      }
    },
    exportExcel(flag) {
      let fileName = ''
      const year = this.params.year
      const quarter = this.params.quarter
      const month = this.params.month
      // 按月度
      if (month) {
        fileName = year + '年' + month + '月度'
      }
      // 按季度
      if (quarter && !month) {
        fileName = year + '年' + quarter + '季度'
      }
      // 按年度
      if (!quarter && !month) {
        fileName = year + '年度'
      }
      this.params.flag = flag
      this.params.realName = fileName + '问题整改统计.xls'
      this.$store.dispatch('reportManage/exportReportManageExcel', this.params).then(response => {

      })
    },
    exportPdf(flag) {
      let fileName = ''
      const year = this.params.year
      const quarter = this.params.quarter
      const month = this.params.month
      // 按月度
      if (month) {
        fileName = year + '年' + month + '月度'
      }
      // 按季度
      if (quarter && !month) {
        fileName = year + '年' + quarter + '季度'
      }
      // 按年度
      if (!quarter && !month) {
        fileName = year + '年度'
      }
      this.params.flag = flag
      this.params.realName = fileName + '问题整改统计.pdf'
      this.$store.dispatch('reportManage/exportReportManagePdf', this.params).then(response => {
      })
    }
  }
}
</script>
<style scoped>
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;width:80px;padding:8px;}
</style>
