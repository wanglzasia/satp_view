<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-card>
        <el-form
          :model="ruleForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <div>
            <el-row>
              <el-col :span="5">
                <el-form-item label="任务名称">
                  <el-input v-model="ruleForm.taskName" placeholder="任务名称" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="资产地址">
                  <el-input v-model="ruleForm.logicAddr" placeholder="资产地址" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="任务状态">
                  <label slot="label">任务状态</label>
                  <el-select v-model="ruleForm.taskStatus" placeholder="任务状态">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="创建人">
                  <label slot="label">&emsp;创建人</label>
                  <el-input v-model="ruleForm.creator" placeholder="创建人" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div class="satp-from-btngrp-std">
                  <el-dropdown size="small" split-button type="primary" @command="handleCommand">
                    <i class="el-icon-search" />查询
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="chgShow">更多条件</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button>
                </div>
              </el-col>
            </el-row>

            <div v-show="moreCondShow">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="业务系统">
                    <el-input v-model="ruleForm.bussName" placeholder="业务系统" />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="开始时间">
                    <el-date-picker
                      v-model="ruleForm.startTime"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="14" />
              </el-row>
            </div>

          </div>
        </el-form>
        <satp-datagrid
          ref="taskListGrid"
          :url="taskGrid.url"
          :qparams="taskGrid.params"
          :columns="taskGrid.columns"
          border
          @operClick="operClick"
        />
      </el-card>
    </div>

    <el-dialog title="新建任务" :visible.sync="dialogVisible" width="30%" :before-close="handleBeforeClose" class="satp-dlg" :close-on-click-modal="false">
      <el-form ref="dataAddForm" :model="dataAddForm" :rules="dataAddrules" :label-position="labelPosition" label-width="100px" size="small" class="satp-form-label-top">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="dataAddForm.taskName" placeholder="任务名称" />
        </el-form-item>
        <el-form-item label="任务来源">
          <el-select v-model="dataAddForm.taskSource" placeholder="任务来源">
            <el-option v-for="item in staskSources" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="要求完成时间" prop="closeTime">
          <el-date-picker
            v-model="dataAddForm.closeTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="任务责任人" prop="taskOwner">
          <el-input v-model="dataAddForm.taskOwner" placeholder="任务责任人" @click.prevent.native="getDataRootUser" />
        </el-form-item>

        <el-form-item label="任务责任人ID" prop="taskOwnerId" style="display:none">
          <el-input v-model="dataAddForm.taskOwnerId" />
        </el-form-item>

        <el-form-item label="备注" prop="taskDesc">
          <el-input v-model="dataAddForm.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="任务备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="closeAddDlg">取 消</el-button>
        <el-button type="primary" size="small" @click="saveTask('dataAddForm')">确 定</el-button>
      </span>
    </el-dialog>

    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagridx'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  name: 'SingleTaskList',
  components: { 'user-window': userInfo, 'satp-datagrid': datagrid },
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'top',

      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      tableData: [],

      loading: false,
      moreCondShow: false,

      ruleForm: {
        taskName: '',
        logicAddr: '',
        creator: '',
        taskStatus: '',
        bussName: '',
        startTime: '',
        taskType: this.$route.params.taskType,
        parentTaskId: '0'
      },
      staskSources: [{ value: '1', label: '省份' }],
      // 增加相关
      dataAddForm: {
        taskName: '',
        taskSource: '1',
        closeTime: '',
        taskOwner: '',
        taskOwnerId: '',
        taskDesc: '',
        taskType: this.$route.params.taskType
      },

      dataAddrules: {
        taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        taskOwner: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        taskOwnerId: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        closeTime: [{ required: true, message: '请选择要求完成时间', trigger: 'blur' }],
        taskDesc: [{ required: false, message: '任务描述', trigger: 'blur' }]
      },

      taskGrid: {
        url: 'task/taskList',
        params: {
          parentTaskId: 0,
          taskType: this.$route.params.taskType,
          page: true
        },
        columns: [
          { type: 'text', label: '任务名称', prop: 'taskName', width: 236, align: 'left' },
          { type: 'text', label: '编号', prop: 'taskId', width: 60, align: 'center' },
          { type: 'text', label: '来源', prop: 'taskSrc', formatter: this.taskSrcFormatter, width: 60, align: 'center' },
          { type: 'text', label: '状态', prop: 'taskStatus', align: 'center', width: 80, formatter: this.taskStatusFormat },
          { type: 'progress', label: '进度', prop: 'taskProgress', progress: true, align: 'center' },
          { type: 'text', label: '开始时间', prop: 'startTime', align: 'center', width: 180, formatter: this.startTimeFormatter },
          { type: 'text', label: '结束时间', prop: 'endTime', align: 'center', width: 180, formatter: this.endTimeFormatter },
          { type: 'text', label: '创建人', prop: 'createLoginName', align: 'center', width: 80 },
          { type: 'text', label: '责任人', prop: 'taskOwnerName', align: 'center', width: 80 },
          { type: 'action',
            label: '操作',
            align: 'center',
            width: 120,
            actions: [],
            formatter: this.operFormatter
          }
        ]
      }
    }
  },
  methods: {
    operClick(data) {
      const { row, prop } = data
      let path = ''
      switch (prop) {
        case 'edit':
          console.log('edit')
          break
        case 'delete':
          console.log('delete')
          break
        case 'config':
          path = '/satp-task/' + this.ruleForm.taskType + '/config/' + row.taskId
          this.$router.push({ path: path })
          break
        case 'detail':
          path = '/satp-task/' + this.ruleForm.taskType + '/detail/' + row.taskId
          this.$router.push({ path: path })
          break
        case 'start':
          this.startTask(row.taskId)
          break
        default:
          break
      }
    },
    taskStatusFormat(row) {
      return this.SATP_TaskStatusFormat(row.taskStatus)
    },
    taskSrcFormatter(row) {
      return this.SATP_TaskSrcFormat(row.taskSrc)
    },
    startTimeFormatter(row) {
      return this.SATP_DateTimeFormat(row.startTime)
    },
    endTimeFormatter(row) {
      return this.SATP_DateTimeFormat(row.endTime)
    },
    startTask(taskId) {
      const params = { 'taskId': taskId }
      this.loading = true
      this.$store.dispatch('task/singleStartTask', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.$refs.taskListGrid.reload()
      })
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      if (taskStatus === 0) { // 草稿状态 修改 删除 配置
        actions = [
          { title: '配置', prop: 'config', type: 'text', icon: 'el-icon-setting' },
          { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
          { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确定删除此任务' }
        ]
      } else if (taskStatus === 2) { // 执行中,
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '追踪', prop: 'trace', type: 'text', icon: 'el-icon-location-outline' },
          { title: '停止', prop: 'stop', type: 'text', icon: 'el-icon-switch-button', popconfirm: '确定停止此任务' }
        ]
      } else if (taskStatus === 1) { // 已完成,
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '报告', prop: 'report', type: 'text', icon: 'el-icon-data-analysis' }
        ]
      } else if (taskStatus === 21) { // 待执行
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '启动', prop: 'start', type: 'text', icon: 'el-icon-caret-right', popconfirm: '确定启动此任务' }
        ]
      }
      return actions
    },
    handleCommand(command) {
      this.moreCondShow = !this.moreCondShow
    },
    saveTask(formName) {
      // 读取数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const $self = this
          const params = JSON.parse(JSON.stringify($self.dataAddForm))
          this.$store.dispatch('task/addTask', params).then(resp => {
            if (resp && resp.RET_CODE === '0') {
              this.$message({
                showClose: true,
                message: resp.RET_INFO,
                type: 'success'
              })
              this.dialogVisible = false
              this.$refs[formName].resetFields()
              this.$refs.taskListGrid.reload()
            }
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    handleBeforeClose() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
    closeAddDlg() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
    // 用户对话框
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      this.$refs['dataAddForm'].clearValidate('taskOwner')
      this.$refs['dataAddForm'].clearValidate('taskOwnerId')
      const $self = this
      $self.dataAddForm.taskOwner = data.userName
      $self.dataAddForm.taskOwnerId = data.userId
    }
  }
}
</script>
