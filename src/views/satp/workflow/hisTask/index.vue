<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="queryParams"
          label-position="left"
          label-width="90px"
          size="small"
          class="satp-form-inline"
        >
          <!--模糊查询输入框-->
          <el-row>
            <el-col :span="6">
              <el-form-item label="任务名称">
                <el-input v-model="queryParams.taskName" placeholder="方案名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务类型">
                <el-select v-model="queryParams.taskType" placeholder="任务类型">
                  <el-option label="全部" value="" />
                  <el-option v-for="proc in procDefList" :key="proc.KEY_" :label="proc.NAME_" :value="proc.KEY_" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="queryParams.startToEndTime"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std" style="float: left;">
                <el-button size="small" type="primary" @click="getHisTaskList">
                  <i class="el-icon-search" />查询
                </el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <!--datagrid表格-->
        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="queryParams"
          :columns="columns"
          :toolbar="toolbar"
          border
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />

        <!--流程跟踪组件-->
        <hisTrace-view
          v-if="taskTraceDialogVisible"
          :visible.sync="taskTraceDialogVisible"
          :proc-def-id="processDefinitionId"
          :proc-inst-id="processInstanceId"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import hisTrace from '@/components/FlowTrace/hisTrace.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'hisTrace-view': hisTrace },
  data() {
    return {
      url: 'workflow/hisTaskListData',
      procDefUrl: 'workflow/procDefListData',
      queryParams: {},
      columns: [
        { label: '任务类型', prop: 'NAME_', width: 150, align: 'left' },
        { label: '任务名称', prop: 'PROJECT_NAME_', width: 150, align: 'left' },
        { label: '任务发起人', prop: 'REAL_NAME', width: 100, align: 'center' },
        { label: '任务发起时间', prop: 'START_TIME_', width: 160, align: 'left', formatter: this.startTimeFormatter },
        { label: '任务完成时间', prop: 'END_TIME_', width: 160, align: 'left', formatter: this.endTimeFormatter },
        { label: '当前环节', prop: 'TASK_NAME', width: 100, align: 'center' },
        { label: '处理人', prop: 'DEAL_USER', width: 100, align: 'center' },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '查看详情', prop: 'look', type: 'text', icon: 'el-icon-tickets' },
            { title: '流程跟踪', prop: 'trace', type: 'text', icon: 'el-icon-position' }
          ]
        }
      ],
      toolbar: [
        { label: '待办列表', prop: 'busi', type: 'primary', icon: 'el-icon-s-grid' }
      ],
      taskTraceDialogVisible: false,
      processDefinitionId: '',
      processInstanceId: '',
      procDefList: []
    }
  },
  mounted() {
    // 加载数据
    this.getProcDefList()
  },
  methods: {
    getHisTaskList() {
      // console.log(this.queryParams.startToEndTime)
      if (this.queryParams.startToEndTime !== null && this.queryParams.startToEndTime !== undefined) {
        this.queryParams.startTime = this.queryParams.startToEndTime[0]
        this.queryParams.endTime = this.queryParams.startToEndTime[1]
      } else {
        this.queryParams.startTime = ''
        this.queryParams.endTime = ''
      }
      this.$refs['datagridTest'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'look':
          alert('TODO')
          break
        case 'trace':
          this.getTaskTrace(row)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows.taskId)
      switch (prop) {
        case 'busi':
          this.toBusiTaskList()
          break
        default:
          break
      }
    },
    // 跳转至待办列表
    toBusiTaskList() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
    // 流程跟踪
    getTaskTrace(row) {
      this.taskTraceDialogVisible = true
      this.processDefinitionId = row.PROC_DEF_ID_
      this.processInstanceId = row.PROC_INST_ID_
    },
    // 获取所有流程定义key和name
    getProcDefList() {
      this.$store.dispatch(this.procDefUrl, {}).then(resp => {
        this.procDefList = resp.rows
      }).catch(
      )
    },
    startTimeFormatter(row) {
      return this.datetimeFormat(row.START_TIME_)
    },
    endTimeFormatter(row) {
      return this.datetimeFormat(row.END_TIME_)
    },
    // 时间转换
    datetimeFormat(el) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      let value = ''
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    }
  }
}
</script>
