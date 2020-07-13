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
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>
        <satp-treegrid
          ref="taskTreeGrid"
          :url="taskGrid.url"
          row-key="taskId"
          :qparams="taskGrid.params"
          :columns="taskGrid.columns"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @loadSubList="loadSubList"
          @operClick="taskGridClick"
        />
      </el-card>
    </div>

    <el-dialog title="新建任务" :visible.sync="dialogVisible" width="30%" :before-close="handleBeforeClose" class="satp-dlg">
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
          id: 0,
          parentTaskId: 0,
          taskType: 'inte',
          page: 'true'
        },
        columns: [
          { label: '任务名称', prop: 'taskName', width: 300, align: 'left' },
          { label: '任务编号', prop: 'taskId' },
          { label: '进度', prop: 'taskProgress', progress: true, align: 'center' },
          { label: '动态按钮', prop: 'taskStatus', align: 'center', actions: [], formatter: this.operFormatter, width: 200 },
          { label: '父节点', prop: 'hasChild', align: 'center', template: true, formatter: this.testFormatter },
          {
            label: '操作',
            align: 'center',
            width: 300,
            actions: [
              { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit', popconfirm: '确认修改这条记录?' },
              { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
              { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete' },
              { title: '设置', prop: 'delete', type: 'text', icon: 'el-icon-setting' },
              { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
            ]
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
            } else {
              this.$message({
                showClose: true,
                message: resp.RET_INFO,
                type: 'error'
              })
            }
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
      console.log('taskGridClick')
      const { row, prop } = data
      console.log(row)
      switch (prop) {
        case 'edit':
          console.log('edit')
          break
        case 'delete':
          console.log('delete')
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },

    testFormatter(row) {
      const hasChild = row.hasChild
      let ret = ''
      if (hasChild === 'Y') {
        ret = '<i class="el-icon-loading"></i>'
      } else {
        ret = '<i class="el-icon-goods"></i>'
      }
      return ret
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      if (taskStatus === 0) {
        actions = [
          { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
          { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
        ]
      } else {
        actions = [
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
          { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
        ]
      }
      return actions
    },
    testHi() {
      console.log('say hi')
    },

    loadSubList(tree, treeNode, resolve) {
      console.log(tree.taskId)
      resolve(
        [{
          'taskSrc': 1,
          'parentTaskId': '0',
          'taskOwner': '普通员工',
          'hasChildren': 0,
          'isReport': 1,
          'createLogin': '2',
          'isActive': 'Y',
          'parentId': '0',
          'rpt_status': 0,
          'taskDesc': '任务10',
          'taskType': 'inte',
          'createTime': '2020-04-06T11:35:35.000+0000',
          'createLoginName': '普通员工',
          'hasChild': 'N',
          'closeTime': '2020-04-23T16:00:00.000+0000',
          'taskName': '任务名称10',
          'taskProgress': 0,
          'taskId': '1219',
          'taskStatus': 0
        },
        {
          'taskSrc': 1,
          'parentTaskId': '0',
          'taskOwner': '普通员工',
          'hasChildren': 0,
          'isReport': 1,
          'createLogin': '2',
          'isActive': 'Y',
          'parentId': '0',
          'rpt_status': 0,
          'taskDesc': '任务9',
          'taskType': 'inte',
          'createTime': '2020-04-06T11:35:19.000+0000',
          'createLoginName': '普通员工',
          'hasChild': 'N',
          'closeTime': '2020-04-13T16:00:00.000+0000',
          'taskName': '任务名称9',
          'taskProgress': 0,
          'taskId': '1218',
          'taskStatus': 0
        }]
      )
    }
  }
}
</script>
