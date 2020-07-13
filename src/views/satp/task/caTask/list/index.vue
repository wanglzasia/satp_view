<template>
  <div>

    <div>
      <el-form
        :inline="true"
        :model="formQueryParams"
        label-position="right"
        label-width="80px"
        size="small"
        class="demo-form-inline"
      >
        <el-row style="padding-left:20px;padding-top: 20px;">
          <el-col :span="7">
            <el-form-item label="任务名称">
              <el-input v-model="formQueryParams.taskName" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="业务系统">
              <el-input v-model="formQueryParams.bizName" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="应用名称">
              <el-input v-model="formQueryParams.appName" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="getCaTaskList">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-left:20px;">
          <el-col :span="7">
            <el-form-item label="创建人">
              <el-input v-model="formQueryParams.createUser" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="启动时间">
              <el-date-picker
                v-model="formQueryParams.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="任务状态">
              <el-select v-model="formQueryParams.taskStatus" placeholder="请选择">
                <el-option
                  v-for="item in taskStatusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <!--<el-button type="primary" @click="exportList">导出</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="clearfix" style="width: 100%;background-color: #EEEEEE;">
      <el-row style="padding-left:20px;">
        <el-col :span="24" align="left">
          <el-button type="text" icon="el-icon-circle-plus" @click="dialogFormVisible = true">新增</el-button>
          <router-view />
        </el-col>
      </el-row>
      <!--新增任务弹窗-->
      <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
        <el-form ref="ruleAddTaskForm" :inline="true" :model="addTaskForm" label-width="120px" :rules="addTaskFormRules" label-position="right">
          <el-form-item label="任务名称" prop="taskName">
            <el-input v-model="addTaskForm.taskName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="责任人" prop="taskUsr">
            <el-input v-model="addTaskForm.taskUsrName" autocomplete="off" :readonly="true" @click.native="getDataRootUser" />
          </el-form-item>
          <el-form-item label="要求开始时间" prop="openTime">
            <el-date-picker
              v-model="addTaskForm.openTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="要求结束时间" prop="closeTime">
            <el-date-picker
              v-model="addTaskForm.closeTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="备注" prop="taskNote">
            <el-input v-model="addTaskForm.taskNote" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCaTask('ruleAddTaskForm')">确 定</el-button>
        </div>
        <!--新增任务选择责任人弹窗-->
        <user-window
          v-if="userWindowVisible"
          :title="title"
          :parent-component-param="parentComponentParam"
          :multiple="multiple"
          :visible.sync="userWindowVisible"
          :modal-append-to-body="false"
          @getUserInfo="getUserInfo"
        />
      </el-dialog>
    </div>
    <el-table
      v-loading="loading"
      class="elTable"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(185, 185, 185, 0.1)"
      :data="tableData"
      style="width: 100%"
      row-key="TASK_ID"
      lazy
      :load="loadSubData"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--表头-->
      <el-table-column v-for="thead in tableColumns" :key="thead.rowId" :prop="thead.prop" :label="thead.label" min-width="160">
        <template slot-scope="scope">
          <span v-if="thead.fieldType=='click'" style="color: #409eff;" @click="taskDetail(scope.row)">
            <el-button type="text">{{ scope.row[thead.prop] }}</el-button>
          </span>
          <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.prop],scope.row.format) }}</span>
          <span v-if="thead.fieldType=='text'">{{ scope.row[thead.prop] }}</span>
          <span v-if="thead.fieldType=='progress'">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row[thead.prop]" />
          </span>
          <span v-if="thead.fieldType=='status'">{{ statusFormat(scope.row[thead.prop],scope.row.format) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.taskStatus=='0' || scope.row.taskStatus=='3'" type="text" plain @click.native.prevent="start(scope.row)">
            <i class="el-icon-video-play" title="启动" />
          </el-button>
          <el-button v-if="scope.row.taskStatus=='2'" type="text" plain @click.native.prevent="pause(scope.row)">
            <i class="el-icon-video-pause" title="暂停" />
          </el-button>
          <el-button v-if="scope.row.taskStatus=='2'" type="text" plain @click.native.prevent="stop(scope.row)">
            <i class="el-icon-switch-button" title="停止" />
          </el-button>
          <el-button v-if="scope.row.taskStatus=='1' || scope.row.taskStatus=='2' || scope.row.taskStatus=='3' || scope.row.taskStatus=='4'" type="text" plain @click.native.prevent="taskResultTrace(scope.row)">
            <i class="el-icon-position" title="跟踪" />
          </el-button>
          <el-button v-if="scope.row.taskStatus=='1'" type="text" plain @click.native.prevent="exp(scope.row)">
            <i class="el-icon-download" title="导出" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import task from '@/api/satp/task/task'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'user-window': userInfo },
  data() {
    return {
      loading: true,
      // 定义表单查询参数
      formQueryParams: {
        taskName: '',
        bizName: '',
        appName: '',
        taskStatus: '',
        startTime: '',
        createUser: ''
      },
      taskStatusList: [
        { id: '', name: '请选择' },
        { id: '0', name: '草稿' },
        { id: '1', name: '完成' },
        { id: '2', name: '采集中' },
        { id: '3', name: '采集完成' },
        { id: '4', name: '分析中' },
        { id: '5', name: '分析完成' },
        { id: '6', name: '获取报告' }
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      tableColumns: [
        // { 'rowId': '2', 'prop': 'TASK_ID', 'fieldType': 'text', 'label': '编号', 'align': 'left' },
        { 'rowId': '3', 'prop': 'TASK_NAME', 'fieldType': 'click', 'label': '任务名称', 'align': 'left' },
        { 'rowId': '4', 'prop': 'COLLECT_NAME', 'fieldType': 'text', 'label': '采集单位', 'align': 'left' },
        { 'rowId': '5', 'prop': 'ANALYZE_NAME', 'fieldType': 'text', 'label': '分析单位', 'align': 'left' },
        { 'rowId': '6', 'prop': 'BIZ_NAME', 'fieldType': 'text', 'label': '业务系统', 'align': 'left' },
        { 'rowId': '7', 'prop': 'APP_NAME', 'fieldType': 'text', 'label': '应用名称', 'align': 'left' },
        { 'rowId': '8', 'prop': 'TASK_STATUS', 'fieldType': 'status', 'label': '任务状态', 'align': 'left' },
        { 'rowId': '9', 'prop': 'TASK_PROGRESS', 'fieldType': 'progress', 'label': '任务进度', 'align': 'left' },
        { 'rowId': '10', 'prop': 'CLOSE_TIME', 'fieldType': 'datetime', 'label': '要求完成时间', 'align': 'left' },
        { 'rowId': '11', 'prop': 'START_TIME', 'fieldType': 'datetime', 'label': '启动时间', 'align': 'left' },
        { 'rowId': '12', 'prop': 'END_TIME', 'fieldType': 'datetime', 'label': '结束时间', 'align': 'left' },
        { 'rowId': '13', 'prop': 'CREATE_USR', 'fieldType': 'text', 'label': '创建人', 'align': 'left' },
        { 'rowId': '14', 'prop': 'REAL_NAME', 'fieldType': 'text', 'label': '责任人', 'align': 'left' }
      ],
      // 新增弹窗
      dialogFormVisible: false,
      addTaskForm: {
        parentTaskId: '0',
        taskName: '',
        taskUsr: '2',
        taskUsrName: '',
        openTime: '',
        closeTime: '',
        taskNote: ''
      },
      addTaskFormRules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        taskUsr: [
          { required: true, message: '请输入责任人', trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: '请输入要求开始时间', trigger: 'blur' }
        ],
        closeTime: [
          { required: true, message: '请输入要求结束时间', trigger: 'blur' }
        ],
        taskNote: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      // 选择责任人弹窗数据
      userWindowVisible: false,
      title: '选择责任人', // 弹出框标题
      parentComponentParam: {}// 向子组件传递自定义参数对象
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
    statusFormat() {
      return function(value) {
        if (value === 0) { return '草稿' }
        if (value === 1) { return '完成' }
        if (value === 2) { return '采集中' }
        if (value === 3) { return '采集完成' }
        if (value === 4) { return '分析中' }
        if (value === 5) { return '分析完成' }
        if (value === 6) { return '获取报告' }
        if (value === 7) { return '停止' }
        if (value === -1) { return '失败' }
      }
    }
  },
  created() {
    this.getCaTaskList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getCaTaskList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getCaTaskList()
    },
    // 获取任务列表
    getCaTaskList() {
      this.loading = true
      let params = this.formQueryParams
      params = this.deleteEmptyProperty(params)
      params.id = '0'
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      task.caTaskList(params).then(res => {
        this.loading = false
        // console.log(res)
        res.rows.forEach((element) => {
          if (element.HAS_CHILD === 'Y') {
            element.hasChildren = true
          }
        })
        this.total = res.total
        this.tableData = res.rows
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 获取子任务
    loadSubData(tree, treeNode, resolve) {
      task.caTaskList({ 'id': tree.TASK_ID }).then(res => {
        resolve(res.rows)
      }).catch(err => {
        console.log(err)
      })
    },
    // 打开选择用户弹窗
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.multiple = false// true 为复选
    },
    // 确认弹窗选择用户
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.addTaskForm.taskUsrName = data.userName
      $self.addTaskForm.taskUsr = data.userId
      // window.console.info($self.formObj.dataRootUserName)
      // window.console.info(data)
    },
    // 新增保存
    async saveCaTask(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addTaskForm)
          // 调用保存方法
          task.saveCaTask(this.addTaskForm).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }).catch(err => {
            console.log(err)
          })
          this.dialogFormVisible = false
          // 加载任务列表
          this.getCaTaskList()
        } else {
          this.$message({
            title: '警告',
            message: '请按要求填写',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 删除查询条件中为空的数据
    deleteEmptyProperty(obj) {
      var object = obj
      for (var i in object) {
        var value = object[i]
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            if (value.length === 0) {
              delete object[i]
              continue
            }
          }
          this.deleteEmptyProperty(value)
        } else {
          if (value === '' || value === null || value === undefined) {
            delete object[i]
          }
        }
      }
      return object
    },
    // 新增跳转
    addRoutes() {
      this.$router.push({ path: '/satp/task/addTask', query: { 'taskType': this.queryParam.taskType }})
    },
    // 查看详情
    taskDetail(row) {
      // console.log(row.taskId)
      this.$router.push({ path: '/satp/task/taskDetail', query: { 'taskId': row.taskId, 'taskType': this.queryParam.taskType, 'viewKey': 'detail' }})
    },
    // 跟踪
    taskResultTrace(row) {
      this.$router.push({ path: '/satp/task/taskDetail', query: { 'taskId': row.taskId, 'taskType': this.queryParam.taskType, 'viewKey': 'trace' }})
    },
    // 导出
    exp(row) {
    }
  }
}
</script>
