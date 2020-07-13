<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-card>
        <div style="text-align:center;font-size:22px;">{{ taskInfo.taskName }}等保自评报告</div>
        <!--<div style="text-align:right;font-size:13px;">创建时间:2020-10-01 10:12:12&nbsp;&nbsp;&nbsp;&nbsp;完成时间:2020-10-01 10:12:12</div>-->
        <div class="satp-title">总体情况</div>

        <table class="satp-table-detail">
          <tr>
            <th>任务名称</th>
            <td colspan="5">{{ taskInfo.taskName }}</td>
          </tr>
          <tr>
            <th>任务编号</th>
            <td>{{ taskId }}</td>
            <th>任务类型</th>
            <td>等保自评</td>
            <th>任务来源</th>
            <td>{{ taskInfo.taskSrc }}</td>
          </tr>
          <tr>
            <th>责任人</th>
            <td>{{ taskInfo.taskOwnerName }}</td>
            <th>创建人</th>
            <td>{{ taskInfo.createLoginName }}</td>
            <th>创建时间</th>
            <td>{{ dateTimeFormat(taskInfo.createTime) }}</td>
          </tr>
          <tr>
            <th>任务状态</th>
            <td>{{ taskInfo.taskStatus }}</td>
            <th>任务进度</th>
            <td>{{ taskInfo.taskProgress }}%</td>
            <th>要求完成时间</th>
            <td>{{ dateTimeFormat(taskInfo.closeTime) }}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="5">{{ taskInfo.taskDesc }}</td>
          </tr>
        </table>

        <div style="margin-bottom: 10px;" />
        <div class="satp-title">测评项目</div>
        <satp-datagrid
          ref="rptItemGrid"
          class="satp-grid-mini"
          :url="rptItem.url"
          idx
          :qparams="rptItem.params"
          :columns="rptItem.columns"
          :height="gridHeight"
          border
        />

        <div class="satp-title">测评结果</div>
        <satp-datagrid
          ref="rptRstGrid"
          class="satp-grid-mini"
          :url="rptRst.url"
          idx
          :qparams="rptRst.params"
          :columns="rptRst.columns"
          :height="gridHeight"
          border
        />

        <div class="satp-title">合规结果</div>
        <satp-datagrid
          ref="rptChkRstGrid"
          class="satp-grid-mini"
          :url="rptChkRst.url"
          idx
          :qparams="rptChkRst.params"
          :columns="rptChkRst.columns"
          :height="gridHeight"
          border
        />

        <div class="satp-title">详细信息</div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleDtlClick">
            <el-tab-pane label="合规" name="first">

              <satp-datagrid
                ref="rptDtlGridYes"
                class="satp-grid-mini"
                :url="rptDtlRstYes.url"
                idx
                :qparams="rptDtlRstYes.params"
                :columns="rptDtlRstYes.columns"
                :height="gridHeight"
                border
              />
            </el-tab-pane>

            <el-tab-pane label="不合规" name="second">
              <satp-datagrid
                ref="rptDtlGridNo"
                class="satp-grid-mini"
                :url="rptDtlRstNo.url"
                idx
                :qparams="rptDtlRstNo.params"
                :columns="rptDtlRstNo.columns"
                :height="gridHeight"
                border
              />
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagridx'

export default {
  name: 'GradeReport',
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      loading: false,
      gridHeight: 290,
      activeName: 'first',
      taskId: this.$route.params.taskId,
      taskInfo: '',

      rptItem: {
        url: 'task/taskGradeRptItems',
        params: {
          taskId: this.taskId
        },
        columns: [
          { type: 'index', label: '序号', width: 40, align: 'left' },
          { type: 'text', label: '安全类', prop: 'ctrl_type', width: 236, align: 'left' },
          { type: 'text', label: '安全类控制点', prop: 'ctrl_class', align: 'left' },
          { type: 'text', label: '测评项数', prop: 'ctn', align: 'left', width: 80 }
        ]
      },

      rptRst: {
        url: 'task/taskGradeRptResults',
        params: {
          taskId: this.taskId
        },
        columns: [
          { type: 'index', width: 40, align: 'left' },
          { type: 'text', label: '通用/扩展', prop: 'obj_type', width: 236, align: 'left' },
          { type: 'text', label: '安全类', prop: 'ctrl_type', align: 'left' },
          { type: 'text', label: '安全类控制点', prop: 'ctrl_class', align: 'left' },
          { type: 'text', label: '未检查', prop: 'ctn1', align: 'center', width: 80 },
          { type: 'text', label: '不适用', prop: 'ctn2', align: 'center', width: 80 },
          { type: 'text', label: '不符合', prop: 'ctn3', align: 'center', width: 80 },
          { type: 'text', label: '部分符合', prop: 'ctn4', align: 'center', width: 80 },
          { type: 'text', label: '符合', prop: 'ctn5', align: 'center', width: 80 }
        ]
      },

      rptChkRst: {
        url: 'task/taskGradeChkResults',
        params: {
          taskId: this.taskId
        },
        columns: [
          { type: 'index', width: 40, align: 'left' },
          { type: 'text', label: '通用/扩展', prop: 'obj_type', width: 236, align: 'left' },
          { type: 'text', label: '安全类', prop: 'ctrl_type', align: 'left' },
          { type: 'text', label: '安全类控制点', prop: 'ctrl_class', align: 'left' },
          { type: 'text', label: '结果', prop: 'ctrl_type', align: 'center', formatter: this.chkRstFormatter, width: 100 }
        ]
      },

      rptDtlRstYes: {
        url: 'task/taskGradeDtlAssigns',
        params: {
          taskId: this.taskId,
          rptType: 'Y'
        },
        columns: [
          { type: 'index', width: 40, align: 'left' },
          { type: 'text', label: '检测对象', prop: 'LOGIC_ADDR', align: 'left' },
          { type: 'text', label: '检测项编码', prop: 'ITEM_NO', align: 'left' },
          { type: 'text', label: '通用/扩展', prop: 'obj_type', align: 'left' },
          { type: 'text', label: '安全类', prop: 'ctrl_type', align: 'left' },
          { type: 'text', label: '安全类控制点', prop: 'ctrl_class', align: 'left' },
          { type: 'text', label: '检测项内容', prop: 'ITEM_CONTENT', align: 'left' },
          { type: 'text', label: '自评结果', prop: 'RPT_STATUS', align: 'center', formatter: this.rptStatusFormatter, width: 80 },
          { type: 'text', label: '结果', prop: 'RPT_STATUS', align: 'center', formatter: this.chkResultFormatter, width: 80 }

        ]
      },

      rptDtlRstNo: {
        url: 'task/taskGradeDtlAssigns',
        params: {
          taskId: this.taskId,
          rptType: 'N'

        },
        columns: [
          { type: 'index', width: 40, align: 'left' },
          { type: 'text', label: '检测对象', prop: 'LOGIC_ADDR', align: 'left' },
          { type: 'text', label: '检测项编码', prop: 'ITEM_NO', align: 'left' },
          { type: 'text', label: '通用/扩展', prop: 'obj_type', align: 'left' },
          { type: 'text', label: '安全类', prop: 'ctrl_type', align: 'left' },
          { type: 'text', label: '安全类控制点', prop: 'ctrl_class', align: 'left' },
          { type: 'text', label: '检测项内容', prop: 'ITEM_CONTENT', align: 'left' },
          { type: 'text', label: '自评结果', prop: 'RPT_STATUS', align: 'center', formatter: this.rptStatusFormatter, width: 80 },
          { type: 'text', label: '结果', prop: 'RPT_STATUS', align: 'center', formatter: this.chkResultFormatter, width: 80 }
        ]
      }
    }
  },
  mounted() {
    this.rptItem.params.taskId = this.taskId
    this.rptRst.params.taskId = this.taskId
    this.rptChkRst.params.taskId = this.taskId
    this.rptDtlRstYes.params.taskId = this.taskId
    this.rptDtlRstNo.params.taskId = this.taskId
    this.loadTaskInfo()
  },
  methods: {
    loadTaskInfo() {
      this.loading = true
      this.$store.dispatch('task/loadTask', { 'taskId': this.taskId }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.taskInfo = resp.task[0]
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleDtlClick(tab, event) {
      // console.log(tab, event)
    },
    chkRstFormatter(row) {
      const noCtn = row.noCtn
      if (noCtn === '0') {
        return '合规'
      } else {
        return '不合规'
      }
    },

    rptStatusFormatter(row) {
      const rptStatus = row.RPT_STATUS
      if (rptStatus === -1) {
        return '未检查'
      } else if (rptStatus === -2) {
        return '不适用'
      } else if (rptStatus === 0) {
        return '不符合'
      } else if (rptStatus === 2) {
        return '部分符合'
      } else if (rptStatus === 1) {
        return '符合'
      }
    },
    chkResultFormatter(row) {
      const rptStatus = row.RPT_STATUS
      if (rptStatus === 1) {
        return '合规'
      } else {
        return '不合规'
      }
    }
  }
}
</script>
