<template>
  <el-card>
    <h2 style="font-weight: 400;color: #1f2f3d;">任务执行概要</h2>
    <el-row>
      <el-card shadow="never">
        <span class="satp-div-titles">任务执行概要</span>
        <table class="satp-table-detail">
          <tbody>
            <tr>
              <th>集团任务数量</th>
              <td>
                {{ bean.groupMap.chkTaskNum }}
              </td>
              <td>
                {{ bean.lrrGroupMap.lrrChkTaskNum }}
              </td>
              <th>省公司任务数量</th>
              <td>
                {{ bean.proMap.chkTaskNum }}
              </td>
              <td>
                {{ bean.lrrProMap.lrrChkTaskNum }}
              </td>
            </tr>
            <tr>
              <th>已完成的任务数量</th>
              <td>
                {{ bean.groupMap.alreadyTaskNum }}
              </td>
              <td>
                {{ bean.lrrGroupMap.lrrAlreadyTaskNum }}
              </td>
              <th>已完成的任务数量</th>
              <td>
                {{ bean.proMap.alreadyTaskNum }}
              </td>
              <td>
                {{ bean.lrrProMap.lrrAlreadyTaskNum }}
              </td>
            </tr>
            <tr>
              <th>覆盖资产比率</th>
              <td>
                {{ bean.groupMap.assetRate }}
              </td>
              <td>
                {{ bean.lrrGroupMap.lrrAssetRate }}
              </td>
              <th>覆盖资产比率</th>
              <td>
                {{ bean.proMap.assetRate }}
              </td>
              <td>
                {{ bean.lrrProMap.lrrAssetRate }}
              </td>
            </tr>
            <tr>
              <th>整体合规律</th>
              <td>
                {{ bean.groupMap.itemRate }}
              </td>
              <td>
                {{ bean.lrrGroupMap.lrrItemRate }}
              </td>
              <th>整体合规律</th>
              <td>
                {{ bean.proMap.itemRate }}
              </td>
              <td>
                {{ bean.lrrProMap.lrrItemRate }}
              </td>
            </tr>
          </tbody></table>
      </el-card>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card shadow="never">
          <span class="satp-div-titles">集团业务系统</span>
          <comp-datagrid
            :url="compParam.url"
            :qparams="compParam.params"
            :columns="compParam.columns"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <span class="satp-div-titles">省公司业务系统</span>
          <pro-datagrid
            :url="proParam.url"
            :qparams="proParam.params"
            :columns="proParam.columns"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
          />
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import prodatagrid from '@/components/datagrid/datagrid'
import compdatagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'comp-datagrid': compdatagrid, 'pro-datagrid': prodatagrid },
  props: ['parentParam'],
  data() {
    return {
      proParam: {
        url: 'reportManage/queryTemReportListByPage',
        params: {
          year: '',
          type: '1'
        },
        columns: [
          { label: '业务系统', prop: 'bizName', width: 200, align: 'center' },
          { label: '合规率', prop: 'compRate', width: 200, align: 'center' }
        ]
      },
      compParam: {
        url: 'reportManage/queryTemReportListByPage',
        params: {
          year: '',
          type: '2'
        },
        columns: [
          { label: '业务系统', prop: 'bizName', width: 200, align: 'center' },
          { label: '合规率', prop: 'compRate', width: 200, align: 'center' }
        ]
      },
      params: {
        year: '',
        quarter: '',
        month: ''
      },
      tableHeight: 300,
      bean: {}
    }
  },
  created() {
    this.proParam.params.year = this.parentParam.year
    this.proParam.params.quarter = this.parentParam.quarter
    this.proParam.params.month = this.parentParam.month
    this.compParam.params.year = this.parentParam.year
    this.compParam.params.quarter = this.parentParam.quarter
    this.compParam.params.month = this.parentParam.month
    this.params.year = this.parentParam.year
    this.params.quarter = this.parentParam.quarter
    this.params.month = this.parentParam.month
    this.initTaskSummary()
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
    initTaskSummary() {
      var flag = ''
      if (this.params.month !== '') {
        flag = 'month'
      } else if (this.params.quarter !== '') {
        flag = 'quarter'
      } else {
        flag = 'year'
      }
      this.params.flag = flag

      this.$store.dispatch('reportManage/queryTaskSummary', this.params).then(response => {
        this.bean = response
        window.console.info(this.bean)
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
      })
    }
  }
}
</script>
<style scoped>
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;min-width:80px;padding:8px;}
</style>
