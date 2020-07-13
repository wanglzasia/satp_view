<template>
  <div>
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
                <el-form-item label="业务系统">
                  <el-select v-model="ruleForm.bussiness" placeholder="业务系统">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="任务来源">
                  <el-select v-model="ruleForm.taskSource" placeholder="任务来源">
                    <el-option v-for="item in taskSources" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="合规项">
                  <label slot="label">&emsp;合规项</label>
                  <el-select v-model="ruleForm.itemType" placeholder="合规项类别">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div class="satp-from-btngrp-std">
                  <el-dropdown size="small" split-button type="primary">
                    <i class="el-icon-search" />查询
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>更多条件</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <satp-treegrid
          ref="taskTreeGrid"
          :url="taskGrid.url"
          row-key="taskId"
          :qparams="taskGrid.params"
          :columns="taskGrid.columns"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @operClick="taskGridClick"
          @loadSubList="loadSubList"
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
import userInfo from '@/components/Userwindow/index.vue'
import treegrid from '@/components/datagrid/treegrid'

export default {
  name: 'InteTaskList',
  components: { 'user-window': userInfo, 'satp-treegrid': treegrid },

  data() {
    return {
      labelPosition: 'top',
      // 查询相关
      ruleForm: {
        taskName: '',
        bussiness: '',
        taskSource: '0',
        itemType: '',
        taskType: 'inte',
        parentTaskId: '0',
        id: '0'
      },
      taskSources: [
        { value: '0', label: '全部' },
        { value: '1', label: '省份' },
        { value: '2', label: '集团' }
      ],
      // 增加相关
      dataAddForm: {
        taskName: '',
        taskSource: '1',
        closeTime: '',
        taskOwner: '',
        taskOwnerId: '',
        taskDesc: '',
        taskType: 'inte'
      },
      staskSources: [{ value: '1', label: '省份' }],
      dataAddrules: {
        taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        taskOwner: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        taskOwnerId: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        closeTime: [{ required: true, message: '请选择要求完成时间', trigger: 'blur' }],
        taskDesc: [{ required: false, message: '任务描述', trigger: 'blur' }]
      },
      dialogVisible: false,
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      tableData: [],
      // tree grid

      taskGrid: {
        url: 'task/taskList',
        params: {
          parentTaskId: 0,
          taskType: 'inte',
          page: true
        },
        columns: [
          { label: '任务名称', prop: 'taskName', width: 236, align: 'left' },
          { label: '编号', prop: 'taskId', width: 60, align: 'center' },
          { label: '来源', prop: 'taskSrc', formatter: this.taskSrcFormatter, width: 60, align: 'center' },
          { label: '状态', prop: 'taskStatus', align: 'center', width: 80, formatter: this.statusFormatter },
          { label: '进度', prop: 'taskProgress', progress: true, align: 'center' },
          { label: '开始时间', prop: 'startTime', align: 'center', width: 180 },
          { label: '结束时间', prop: 'endTime', align: 'center', width: 180 },
          { label: '创建人', prop: 'createLoginName', align: 'center', width: 80 },
          { label: '责任人', prop: 'taskOwnerName', align: 'center', width: 80 },
          {
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
    // 新增任务
    addTask() {
      this.$router.push({ path: '/satp-task/inte/add' })
    },

    handleBeforeClose() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
    closeAddDlg() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
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
              this.reloadDatagrid()
            }
          }).catch(() => {
            this.reloadDatagrid()
          })
        } else {
          return false
        }
      })
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
    },
    taskGridClick(data) {
      const { row, prop } = data
      console.log(row.taskId)
      let path = ''
      switch (prop) {
        case 'edit':
          console.log('edit')
          break
        case 'delete':
          console.log('delete')
          break
        case 'split':
          path = '/satp-task/inte/split/' + row.taskId
          this.$router.push({ path: path })
          break
        case 'config':
          path = '/satp-task/inte/config/' + row.taskId
          this.$router.push({ path: path })
          break
        case 'detail':
          path = '/satp-task/inte/detail/' + row.taskId
          this.$router.push({ path: path })
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['taskTreeGrid'].reload()
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      // const parentTaskId = row.parentTaskId
      // if (parentTaskId === '0') {
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
      } else if (taskStatus === 20) { // 拆分中,按钮不在页面展示,在工作流中
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' }
        ]
      } else if (taskStatus === 21) { // 待执行,按钮不在页面展示,在工作流中
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' }
        ]
      }
      // }
      return actions
    },
    statusFormatter(row) {
      const status = row.taskStatus
      if (status === 0) {
        return '草稿'
      } else if (status === 1) {
        return '完成'
      } else if (status === 2) {
        return '执行中'
      } else if (status === 20) {
        return '拆分中'
      } else if (status === 21) {
        return '待执行'
      } else {
        return status
      }
    },
    taskSrcFormatter(row) {
      const taskSrc = row.taskSrc
      if (taskSrc === 1) {
        return '省份'
      } else if (taskSrc === 2) {
        return '集团'
      }
      return ''
    },
    testHi() {
      console.log('say hi')
    },
    // 加载子任务列表
    loadSubList(tree, treeNode, resolve) {
      const $self = this
      const params = {
        parentTaskId: tree.taskId,
        taskType: 'inte',
        page: false
      }
      this.$store.dispatch($self.taskGrid.url, params).then(resp => {
        resolve(resp.rows)
      })
    }
  }
}
</script>
