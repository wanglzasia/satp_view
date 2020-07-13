<template>
  <div class="app-container">
    <el-card>
      <div>
        <div>
          <el-form
            :inline="true"
            :model="formQueryParams"
            label-position="right"
            label-width="90px"
            size="small"
            class="demo-form-inline"
          >
            <el-row style="padding-top: 20px;">
              <el-col :span="5">
                <el-form-item label="名称">
                  <el-input v-model="formQueryParams.projectName" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Key">
                  <el-input v-model="formQueryParams.procDefKey" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="当前处理人">
                  <el-input v-model="formQueryParams.currDealUserName" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="当前环节">
                  <el-input v-model="formQueryParams.taskName" />
                </el-form-item>
              </el-col>
              <el-col :span="4" style="text-align: center;">
                <el-form-item style="padding-top: 32px;">
                  <el-button type="primary" @click="getProcessTaskList">查询</el-button>
                  <!--<el-button type="primary" @click="start">开启</el-button>-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!--datagrid表格-->
        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="formQueryParams"
          :columns="columns"
          border
          @operClick="operClick"
        />

        <div>

          <!--流程跟踪弹窗-->
          <el-dialog title="流程跟踪" :visible.sync="taskTraceDialogVisible" width="75%" :before-close="taskTraceHandleBeforeClose">
            <div style="text-align: center;">
              <img ref="img" class="code-img-box" :src="codeImg" alt="">
            </div>

            <!--datagrid表格-->
            <satp-datagrid
              v-if="taskTraceDialogVisible"
              ref="datagridTest2"
              :url="taskTraceUrl"
              :qparams="taskTraceParams"
              :columns="columns2"
              class="satp-grid-mini"
              border
            />

            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="taskTraceHandleBeforeClose">关 闭</el-button>
            </span>
          </el-dialog>
          <!--用户弹窗-->
          <user-window
            v-if="userWindowVisible"
            :title="title"
            :parent-component-param="parentComponentParam"
            :multiple="multiple"
            :visible.sync="userWindowVisible"
            :modal-append-to-body="false"
            @getUserInfo="getUserInfo"
          />

          <!--审批记录-->
          <!--<flowTrace-view :proc-def-key="procDefKey" :busi-id="busiId" />-->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserInfo from '@/components/Userwindow/index.vue'
import datagrid from '@/components/datagrid/datagrid'

export default {
  components: { 'user-window': UserInfo, 'satp-datagrid': datagrid },
  data() {
    return {
      url: 'workflow/allBusiTaskListData',
      taskTraceUrl: 'workflow/taskTraceListData',
      taskTracePicUrl: 'workflow/taskTracePicture',
      transferTaskUrl: 'workflow/transferTask',
      termProcUrl: 'workflow/termProcess',
      getURLUrl: 'workflow/getURL',
      formQueryParams: {
        projectName: '',
        procDefKey: '',
        currDealUserName: '',
        taskName: ''
      },
      columns: [
        { label: '任务id', prop: 'TASK_ID', width: 100, align: 'center' },
        { label: '工单名称', prop: 'PROJECT_NAME', align: 'left' },
        { label: '流程类型', prop: 'PROC_NAME', width: 150, align: 'left' },
        { label: '发起人', prop: 'APPLY_NAME', width: 100, align: 'center' },
        { label: '当前处理人', prop: 'CURR_DEAL_USER_NAME', width: 100, align: 'center' },
        { label: '发起时间', prop: 'CREATE_TIME', width: 140, align: 'center', formatter: this.createTimeFormatter },
        { label: '当前环节', prop: 'TASK_NAME', width: 120, align: 'center' },
        { label: '到达时间', prop: 'START_TIME', width: 140, align: 'center', formatter: this.startTimeFormatter },
        {
          label: '操作',
          width: 160,
          align: 'center',
          actions: [
            { title: '任务详情', prop: 'detail', type: 'text', icon: 'el-icon-document' },
            { title: '流程跟踪', prop: 'trace', type: 'text', icon: 'el-icon-position' },
            { title: '任务转派', prop: 'transfer', type: 'text', icon: 'el-icon-refresh', popconfirm: '确认转派此任务?' },
            { title: '流程终止', prop: 'stop', type: 'text', icon: 'el-icon-switch-button', popconfirm: '确认终止此任务?' }
          ]
        }
      ],
      // 流程跟踪相关数据
      taskTraceDialogVisible: false,
      taskTraceParams: {
      },
      columns2: [
        { label: '任务编号', prop: 'taskid', width: 150, align: 'center' },
        { label: '当前环节', prop: 'actname', align: 'center' },
        { label: '处理人', prop: 'realName', width: 150, align: 'center' },
        { label: '开始时间', prop: 'starttime', width: 170, align: 'center', formatter: this.starttimeFormatter },
        { label: '结束时间', prop: 'endtime', width: 170, align: 'center', formatter: this.endtimeFormatter },
        { label: '耗时（天）', prop: 'duration', width: 150, align: 'center', formatter: this.durationFormatter }
      ],
      codeImg: '',
      // 用户弹窗
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      formObj: {
        dataRootUserId: '',
        dataRootUserName: ''
      }
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        const value = this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
        // eslint-disable-next-line no-irregular-whitespace
        return value
      }
    },
    datetimeFormat() {
      return function(el, format) {
        let fmt = 'YYYY-MM-DD HH:mm:ss'
        let value = ''
        if (format) {
          fmt = format
        }
        if (el) {
          value = this.moment(el).format(fmt)
        }
        return value
      }
    },
    durationFormat() {
      return function(val) {
        const value = Math.round(val / 1000 / 60 * 100 / 60 / 24) / 100
        return value
      }
    }
  },
  created() {
  },
  methods: {
    // 所有待办任务列表
    getProcessTaskList() {
      this.$refs['datagridTest'].reload()
      /* const params = this.formQueryParams
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      workflow.allBusiTaskListData(params).then(res => {
        this.tableData = res.rows
        this.total = res.total
      }).catch(err => {
        console.log(err)
      })*/
    },
    // 流程跟踪列表
    getTaskTraceList() {
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
        case 'transfer':
          this.taskTransfer(row)
          break
        case 'stop':
          this.taskStop(row)
          break
        default:
          break
      }
    },
    // 任务详情
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
    // 流程跟踪
    getTaskTrace(row) {
      this.taskTraceDialogVisible = true
      this.taskTraceParams.processDefinitionId = row.PROC_DEF_ID
      this.taskTraceParams.processInstanceId = row.PROC_INST_ID

      this.taskTracePicture(row)
    },
    // 流程跟踪弹窗关闭执行事件
    taskTraceHandleBeforeClose() {
      this.taskTraceDialogVisible = false
    },
    // 流程跟踪图片
    taskTracePicture(row) {
      const params = { 'processDefinitionId': row.PROC_DEF_ID, 'processInstanceId': row.PROC_INST_ID }

      this.$store.dispatch(this.taskTracePicUrl, params).then(resp => {
        const bufferUrl = btoa(new Uint8Array(resp).reduce((body, byte) => body + String.fromCharCode(byte), ''))
        this.codeImg = 'data:image/png;base64,' + bufferUrl
      }).catch(
      )
    },
    // 任务转派
    taskTransfer(row) {
      // 调用用户弹窗
      this.getDataRootUser(row.TASK_ID)
    },
    // 转派保存
    saveTaskTransfer(taskId) {
      if (this.formObj.dataRootUserId === '' || this.formObj.dataRootUserId.length === 0) {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
        return false
      }

      this.$store.dispatch(this.transferTaskUrl, { 'taskId': taskId, 'userId': this.formObj.dataRootUserId }).then(resp => {
        this.getProcessTaskList()
      }).catch(
      )
    },
    // 流程终止
    taskStop(row) {
      this.$confirm('确认终止 ' + row.TASK_NAME + ' 流程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(this.termProcUrl, { 'taskId': row.TASK_ID }).then(resp => {
          this.getProcessTaskList()
        }).catch(
        )
      }).catch(() => {
      })
    },
    // 调弹窗时可修改参数
    getDataRootUser(taskId) {
      this.userWindowVisible = true
      this.parentComponentParam.taskId = taskId
      // this.multiple = true // true 为复选
    },
    // 单选时data 传回用户对象;复选传回用户数组
    getUserInfo(data, parentComponentParam) {
      this.formObj.dataRootUserName = data.userName
      this.formObj.dataRootUserId = data.userId
      this.saveTaskTransfer(parentComponentParam.taskId)
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
    durationFormatter(row) {
      return Math.round(row.duration / 1000 / 60 * 100 / 60 / 24) / 100
    },
    // 时间转换
    datetimeFormat2(el) {
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

<style scoped>

</style>
