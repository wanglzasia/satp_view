<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="待办列表" name="first">
            <div>
              <!--datagrid表格-->
              <satp-datagrid
                ref="datagridTest"
                :url="url"
                :columns="columns"
                border
                @operClick="operClick"
              />

            </div>
          </el-tab-pane>

          <el-tab-pane label="历史任务" name="second">
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
              ref="hisDatagridTest"
              :url="hisUrl"
              :qparams="queryParams"
              :columns="hisColumns"
              border
              @operClick="hisOperClick"
            />

          </el-tab-pane>

          <!--流程跟踪组件-->
          <hisTrace-view
            v-if="hisTaskTraceDialogVisible"
            :visible.sync="hisTaskTraceDialogVisible"
            :proc-def-id="processDefinitionId"
            :proc-inst-id="processInstanceId"
          />
        </el-tabs>
      </el-card>
    </div>
    <router-view />
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import hisTrace from '@/components/FlowTrace/hisTrace.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'hisTrace-view': hisTrace },
  data() {
    return {
      activeName: 'first',
      // 待办参数
      url: 'workflow/busiTaskListData',
      taskTraceUrl: 'workflow/taskTraceListData',
      taskTracePicUrl: 'workflow/taskTracePicture',
      getURLUrl: 'workflow/getURL',
      columns: [
        { label: '工单名称', prop: 'PROJECT_NAME', align: 'left' },
        { label: '流程类型', prop: 'PROC_NAME', width: 150, align: 'left' },
        { label: '发起人', prop: 'APPLY_NAME', width: 150, align: 'center' },
        { label: '发起时间', prop: 'CREATE_TIME', width: 160, align: 'center', formatter: this.createTimeFormatter },
        { label: '当前环节', prop: 'TASK_NAME', width: 150, align: 'center' },
        { label: '到达时间', prop: 'START_TIME', width: 160, align: 'center', formatter: this.startTimeFormatter },
        {
          label: '操作',
          width: 160,
          align: 'center',
          actions: [
            { title: '任务详情', prop: 'detail', type: 'text', icon: 'el-icon-document' },
            { title: '流程跟踪', prop: 'trace', type: 'text', icon: 'el-icon-position' }
          ]
        }
      ],
      // 历史任务参数
      hisUrl: 'workflow/hisTaskListData',
      procDefUrl: 'workflow/procDefListData',
      queryParams: {},
      hisColumns: [
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
      hisTaskTraceDialogVisible: false,
      processDefinitionId: '',
      processInstanceId: '',
      procDefList: []
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    // 个人待办任务列表
    getPersonTaskList() {
      this.$refs['datagridTest2'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.getTaskDetail(row)
          break
        case 'trace':
          this.getTaskTrace(row)
          break
        default:
          break
      }
    },
    getTaskDetail(row) {
      const param = {}
      let url = ''
      param.procDef = row.PROC_DEF_KEY
      param.formKey = row.FORM_KEY
      param.taskId = row.TASK_ID
      const queryParam = {
        'formKey': row.FORM_KEY,
        'busiId': row.BUSI_ID,
        'taskName': row.TASK_NAME,
        'taskId': row.TASK_ID,
        'procInstId': row.PROC_INST_ID,
        'procDefKey': row.PROC_DEF_KEY
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$store.dispatch(this.getURLUrl, param).then(resp => {
        loading.close()
        for (var key in resp.result) {
          if (key === 'URL') {
            url = resp.result[key]
          } else {
            queryParam[key] = resp.result[key]
          }
        }
        console.log(url)
        console.log(queryParam)
        this.$router.push({
          path: url,
          query: queryParam
        })
      }).catch(
        loading.close()
      )
    },
    // 待办流程跟踪
    getTaskTrace(row) {
      this.hisTaskTraceDialogVisible = true
      this.processDefinitionId = row.PROC_DEF_ID
      this.processInstanceId = row.PROC_INST_ID
    },
    createTimeFormatter(row) {
      return this.datetimeFormat2(row.CREATE_TIME)
    },
    startTimeFormatter(row) {
      return this.datetimeFormat2(row.START_TIME)
    },
    starttimeFormatter(row) {
      return this.datetimeFormat2(row.starttime)
    },
    endtimeFormatter(row) {
      return this.datetimeFormat2(row.endtime)
    },
    // 时间转换
    datetimeFormat2(el) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      let value = ''
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    // 历史任务列表
    getHisTaskList() {
      // console.log(this.queryParams.startToEndTime)
      if (this.queryParams.startToEndTime !== null && this.queryParams.startToEndTime !== undefined) {
        this.queryParams.startTime = this.queryParams.startToEndTime[0]
        this.queryParams.endTime = this.queryParams.startToEndTime[1]
      } else {
        this.queryParams.startTime = ''
        this.queryParams.endTime = ''
      }
      this.$refs['hisDatagridTest'].reload()
    },
    hisOperClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'look':
          alert('TODO')
          break
        case 'trace':
          this.getHisTaskTrace(row)
          break
        default:
          break
      }
    },
    // 获取所有流程定义key和name
    getProcDefList() {
      this.$store.dispatch(this.procDefUrl, {}).then(resp => {
        this.procDefList = resp.rows
      }).catch(
      )
    },
    // 历史任务流程跟踪
    getHisTaskTrace(row) {
      this.hisTaskTraceDialogVisible = true
      this.processDefinitionId = row.PROC_DEF_ID_
      this.processInstanceId = row.PROC_INST_ID_
    }
  }
}
</script>

<style scoped>

</style>
