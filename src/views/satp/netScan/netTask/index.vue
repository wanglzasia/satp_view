<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-row>
          <el-form
            ref="elForm"
            :model="queryArgs"
            label-position="left"
            label-width="70px"
            size="small"
            class="satp-form-inline"
          >
            <el-col :span="6">
              <el-form-item label="任务名称" prop="taskName">
                <el-input v-model="queryArgs.taskName" placeholder="任务名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建人" prop="createUser" label-width="100px">
                <el-input v-model="queryArgs.createUser" placeholder="创建人" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status" label-width="100px">
                <el-select v-model="queryArgs.status" placeholder="请选择" clearable="">
                  <el-option
                    v-for="item in stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchData()">查询</el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="showDialog({},'add')">新增</el-button>

              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>

      <div>
        <satp-datagrid
          ref="netTaskDag"
          :url="netTaskUrl"
          :qparams="queryArgs"
          :columns="columns"
          idx
          border
          @operClick="operClick"
        />
      </div>
      <div>
        <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="30%" :model="formObj" center @close="cancle">
          <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="110px" @submit.native.prevent>
            <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务名称" prop="taskName">
                  <el-input v-model="formObj.taskName" placeholder="任务名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="责任人" prop="bizUser">
                  <el-input v-model="formObj.bizUserName" placeholder="责任人" readonly @click.prevent.native="getDataRootUser" />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="formObj.bizUser" type="hidden" style="display:none;" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="note">
                  <el-input
                    v-model="formObj.note"
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancle()">取消</el-button>
            <el-button type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <user-window
        v-if="userWindowVisible"
        :title="title"
        :parent-component-param="parentComponentParam"
        :multiple="multiple"
        :visible.sync="userWindowVisible"
        :modal-append-to-body="false"
        @getUserInfo="getUserInfo"
      />
    </el-card>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
import { startTask, stopTask, downloadReport, addNetTask, deleteNetTask } from '../../../../api/satp/netScan/netTask'
export default {
  components: { 'user-window': userInfo, 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      netTaskUrl: 'netTask/netTaskList',
      stateOptions: [
        {
          value: '0',
          label: '未扫描'
        }, {
          value: '2',
          label: '扫描中'
        }, {
          value: '1',
          label: '已扫描'
        }, {
          value: '3',
          label: '待配置'
        }
      ],

      formRule: {// 验证必填项
        taskName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        bizUser: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      formAttr: {},
      formObj: {},
      queryArgs: {},
      savebutton: false,
      dialogFormVisible: false,
      tableData: [],
      loading: true,
      columns: [
        { label: '任务名称', prop: 'taskName', actions: [{ prop: 'detail', type: 'text', link: 'taskName' }] },
        { label: '创建人', prop: 'createUserName' },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '结束时间', prop: 'closeTime', formatter: this.closeTimeFormatter },
        { label: '任务进度', prop: 'taskProgress', progress: true },
        { label: '状态', prop: 'status', formatter: this.statusFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.optFormatter }
      ],
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userWindowVisible: false
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        if (el) {
          return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return ''
        }
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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'startTask':
          this.startTask(row)
          break
        case 'stopTask':
          this.stopTask(row)
          break
        case 'taskDetail':
          this.taskDetail(row)
          break
        case 'taskReport':
          this.taskReport(row)
          break
        default:
          break
      }
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.formObj.bizUserName = data.userName
      $self.formObj.bizUser = data.userId
      this.$refs['ruleForm'].clearValidate('bizUser')
    },
    // 查询当前条件
    searchData() {
      this.$refs['netTaskDag'].reload()
    },
    // 显示弹出框判断是添加还是编辑该节点
    showDialog(row, type) {
      const $self = this
      this.savebutton = false
      event.stopPropagation()
      if (type === 'add') {
        this.formAttr.title = `新增`
        this.formObj = { ipMode: '1' }
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
      } else if (type === 'view') {
        this.formAttr.canWrite = true
        this.formAttr.title = `详情`
      }
      const netConfig = { cfgId: row.cfgId }
      if (type === 'edit' || type === 'view') {
        this.$store.dispatch('netTask/findNetTask', netConfig).then(response => {
          this.formObj = {}

          // 深克隆
          this.formObj = Object.assign({}, response.netConfig)
        })
      }
      this.formAttr.formType = type
      $self.dialogFormVisible = true
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
      this.formAttr.canWrite = false
      // 清空校验规则
      this.$refs.ruleForm.resetFields()
    },
    startTask(row) {
      const params = { 'taskId': row.taskId, 'toolTaskId': row.toolTaskId }
      startTask(params).then(response => {
        this.$message({
          message: '启动成功！',
          type: 'success'
        })
        this.searchData()
      })
    },
    stopTask(row) {
      const params = { 'taskId': row.taskId, 'toolTaskId': row.toolTaskId }
      stopTask(params).then(response => {
        this.$message({
          message: '停止成功！',
          type: 'success'
        })
        this.searchData()
      })
    },
    taskDetail(row) {
      this.$router.push({ path: '/satp-task/netScan/netTaskDetail', query: { 'taskId': row.taskId }})
    },
    taskReport(row) {
      this.$router.push({ path: '/satp-task/netScan/netTaskReport', query: { 'taskId': row.taskId }})
    },
    downloadReport(row) {
      downloadReport('/satp/netTask/downloadReport').then(response => {})
    },
    saveForm() {
      const $self = this
      this.savebutton = true
      $self.formObj.status = 3
      $self.formObj.scanMode = 1
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          addNetTask($self.formObj).then(response => {
            $self.savebutton = false
            $self.searchData()
            $self.dialogFormVisible = false
            $self.$message({
              message: '操作成功！',
              type: 'success'
            })
          })
        } else {
          $self.savebutton = false
          return false
        }
      })
    },

    deleteNetTask(row) {
      const $self = this
      const netTask = { authId: row.authId }
      this.$confirm(`您确认要删除吗?`)
        .then(() => {
          deleteNetTask(netTask).then(response => {
            $self.searchData()
            $self.$message({
              message: `删除操作成功！`,
              type: 'success'
            })
          })
        }).catch(() => {})
    },
    exportTemplate(ext) {
      this.$store.dispatch('netTask/exportTemplate', { ext: ext }).then(response => {
      })
    },
    exportNetTask() {
      this.$store.dispatch('netTask/exportNetTask', this.queryArgs).then(response => {
      })
    },
    statusFormatter(row) {
      if (row.status === 1) {
        return '已扫描'
      } else if (row.status === 0) {
        return '未扫描'
      } else if (row.status === 2) {
        return '扫描中'
      } else if (row.status === 3) {
        return '待配置'
      }
    },
    createTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    closeTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.closeTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    optFormatter(row) {
      let actions = []
      const taskStatus = row.status
      if (taskStatus === 0) {
        actions = [
          { title: '停止', prop: 'stopTask', type: 'text', icon: 'el-icon-video-pause', popconfirm: '确认暂停任务?' },
          { title: '详情', prop: 'taskDetail', type: 'text', icon: 'el-icon-s-unfold' }
        ]
      } else if (taskStatus === 1) {
        actions = [
          { title: '启动', prop: 'startTask', type: 'text', icon: 'el-icon-caret-right', popconfirm: '确认启动任务?' },
          { title: '详情', prop: 'taskDetail', type: 'text', icon: 'el-icon-s-unfold' },
          { title: '报告', prop: 'taskReport', type: 'text', icon: 'el-icon-s-data' }
        ]
      }
      return actions
    }
  }
}
</script>
<style>
</style>
}
