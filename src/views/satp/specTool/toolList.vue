<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="elForm" :model="params" size="small" label-width="100px">
            <el-col :span="6">
              <el-form-item label="工具名称">
                <el-input v-model="params.toolName" placeholder="工具名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工具类型">
                <el-select v-model="params.toolType" placeholder="工具类型" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in toolTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用条件">
                <el-input v-model="params.toolScope" placeholder="使用条件" clearable :style="{width: '100%'}" /></el-form-item>
            </el-col>

            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click.native.prevent="reloadDatagrid()">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="moreParams=!moreParams">高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog({},'add')">新增</el-button>
              </div>
            </el-col>
            <el-col v-if="moreParams" :span="12">
              <el-form-item label="发布时间">
                <el-date-picker
                  v-model="params.createTimeArr"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="dateChange()"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div>
          <satp-datagrid
            ref="datagridTest"
            :url="specToolUrl"
            :qparams="params"
            :columns="columns"
            :toolbar="toolbar"
            idx
            border
            @operClick="operClick"
            @toolbarClick="toolbarClick"
          />
        </div>
        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="800px" :model="formObj" :close-on-click-modal="false" @close="closeDialog">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="100px" @submit.native.prevent>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工具名称" prop="toolName">
                    <el-input v-model="formObj.toolName" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工具类型" prop="toolType">
                    <el-select v-model="formObj.toolType" placeholder="工具类型" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in toolTypeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工具有效期" prop="effectDate">
                    <el-date-picker
                      v-model="formObj.effectDate"
                      :readonly="formAttr.formType=='detail'"
                      type="datetime"
                      :style="{width: '100%'}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发布人" prop="publicUser">
                    <div v-if="formAttr.formType=='detail'">
                      <el-input v-model="formObj.publicUserName" readonly />
                    </div>
                    <div v-else>
                      <el-input v-model="formObj.publicUserName" readonly @click.prevent.native="getDataRootUser()" />
                      <el-input v-model="formObj.publicUser" hidden style="display:none;" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="使用模式" prop="publicUser">
                    <el-select v-model="formObj.toolMode" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in toolModeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任务执行类" prop="execClass">
                    <el-input v-model="formObj.execClass" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="执行命令" prop="command">
                    <el-input v-model="formObj.command" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工具简介" prop="toolInfo">
                    <el-input
                      v-model="formObj.toolInfo"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="使用范围" prop="toolScop">
                    <el-input
                      v-model="formObj.toolScop"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工具备注" prop="toolNote">
                    <el-input
                      v-model="formObj.toolNote"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <div v-if="formAttr.formType!='detail'">
                  <el-col :span="24">
                    <el-form-item label="上传附件" prop="upload">
                      <el-upload
                        class="upload-demo"
                        action="/proxy/rbac/base/fileUpload"
                        :data="datas"
                        :headers="headers"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="handleSuccess"
                        :limit="5"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                      >
                        <el-button type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </div>
                <div v-else>
                  <el-row v-for="file in fileList" :key="file.idx">
                    <el-link type="primary" @click.native.prevent="downloadFile(file)">{{ file.realName }}</el-link>
                  </el-row>
                </div>
              </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeDialog()">取 消</el-button>
              <el-button type="primary" size="small" @click="saveForm()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-dialog title="专项工具发布通知" :visible.sync="noticeDag" width="600px" :model="notice" @close="closeNoticeDag">
            <el-form ref="noticeForm" :rules="noticeRule" :model="notice" label-width="100px" @submit.native.prevent>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="通知标题" prop="title">
                    <el-input v-model="notice.title" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="通知人" prop="noticeUser">
                    <el-input v-model="notice.noticeUserName" readonly @click.prevent.native="userWindowVisible2=true" />
                    <el-input v-model="notice.noticeUser" hidden style="display:none;" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="通知内容" prop="content">
                    <el-input v-model="notice.content" type="textarea" :rows="3" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeNoticeDag()">取 消</el-button>
              <el-button type="primary" size="small" @click="doNotice()">确 定</el-button>
            </span>
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
        <user-window
          v-if="userWindowVisible2"
          :title="title"
          :parent-component-param="parentComponentParam"
          :multiple="true"
          :visible.sync="userWindowVisible2"
          :modal-append-to-body="false"
          @getUserInfo="getNoticeUser"
        />
      </el-card>
    </div>
  </div>

</template>
<script>
import { getToken } from '@/utils/auth'
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SpecToolList',
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  props: [],
  data() {
    return {
      moreParams: false, // 是否展示更多查询条件
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      pSizes: [5, 10, 15, 20],
      fileList: [],
      formAttr: {},
      formObj: {},
      detailObj: {},
      notice: {},
      formRule: {
        toolName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolType: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        effectDate: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        publicUser: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolMode: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        execClass: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        command: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolInfo: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolScop: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolNote: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      noticeRule: {
        title: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        // noticeUser: [
        //   { required: true, message: '请填写必填项', trigger: 'blur' }
        // ],
        content: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      userWindowVisible: false,
      userWindowVisible2: false,
      noticeDag: false,
      specToolUrl: 'specTool/specToolList',
      params: {},
      toolTypeOptions: [
        {
          'label': '漏洞验证类',
          'value': '1'
        }, {
          'label': '测评类',
          'value': '2'
        }, {
          'label': '性能测试类',
          'value': '3'
        }, {
          'label': '安全测评类',
          'value': '4'
        }
      ],
      toolModeOptions: [{
        'label': '在线使用',
        'value': 1
      }, {
        'label': '离线使用',
        'value': 2
      }],
      columns: [
        { label: '工具名称', prop: 'toolName', actions: [{ prop: 'detail', type: 'success', link: 'toolName' }] },
        { label: '工具类型', prop: 'toolTypeName' },
        { label: '使用模式', prop: 'toolMode', formatter: this.toolModeFormatter },
        { label: '发布时间', prop: 'createTime', formatter: this.dateTimeFormatter },
        { label: '发布人', prop: 'publicUserName' },
        { label: '工具简介', prop: 'toolInfo' },
        { label: '适用范围', prop: 'toolScop' },
        { label: '注意事项', prop: 'toolNote' },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      toolbar: [
        { label: '任务列表', prop: 'taskList', type: 'primary', icon: 'el-icon-s-order' }
      ],
      datas: {
        fileType: 'specTool',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      },
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      idx: '',
      fileIdx: '',
      url: '',
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {},
  created() {

  },
  mounted() {},
  methods: {
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      this.$set(this.formObj, 'publicUserName', data.userName)
      this.$set(this.formObj, 'publicUser', data.userId)
      this.$refs['ruleForm'].clearValidate('publicUser')
    },
    getNoticeUser(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      let noticeUserName = ''
      let noticeUser = ''
      data.forEach(iter => {
        noticeUserName += iter.userName + ','
        noticeUser += iter.userId + ','
      })
      noticeUserName = noticeUserName.substring(0, noticeUserName.length - 1)
      noticeUser = noticeUser.substring(0, noticeUser.length - 1)
      $self.notice.noticeUserName = noticeUserName
      $self.notice.noticeUser = noticeUser
      this.$refs['noticeForm'].clearValidate('noticeUser')
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'task':
          this.addTask(row)
          break
        case 'notice':
          this.openNotcieDag(row)
          break
        case 'update':
          this.openDialog(row, 'edit')
          break
        case 'detail':
          this.openDialog(row, 'detail')
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'taskList':
          this.taskList()
          break
        default:
          break
      }
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.fileList = []
      this.formObj = {}
    },
    dateChange() {
      if (this.params.createTimeArr == null) {
        this.params.createTime = null
      } else {
        this.params.beginTime = this.params.createTimeArr[0]
        this.params.endTime = this.params.createTimeArr[1]
        this.params.createTime = this.params.createTimeArr[0]
      }
    },
    toolModeFormatter(row) {
      if (row.toolMode === 1) {
        return '在线使用'
      } else {
        return '离线使用'
      }
    },
    dateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    operFormatter(row) {
      let actions = []
      const toolMode = row.toolMode

      if (toolMode === 1) {
        actions = [
          { title: '通知', prop: 'notice', type: 'text', icon: 'el-icon-message-solid' },
          { title: '修改', prop: 'update', type: 'text', icon: 'el-icon-edit' },
          { title: '扫描任务', prop: 'task', type: 'text', icon: 'el-icon-s-unfold' }
        ]
      } else {
        actions = [
          { title: '通知', prop: 'notice', type: 'text', icon: 'el-icon-message-solid' },
          { title: '修改', prop: 'update', type: 'text', icon: 'el-icon-edit' }
        ]
      }
      return actions
    },
    openDialog(row, type) {
      this.formAttr.formType = type
      if (type === 'add') {
        this.formAttr.title = `新增`
        this.$store.dispatch('specTool/getToolId').then(response => {
          this.datas.busiId = response.toolId + ''
          this.formObj.toolId = response.toolId
        }).catch(() => {})
        console.log(this.user)

        this.formObj.publicUserName = this.user.userName
        this.formObj.publicUser = this.user.userId
      } else if (type === 'edit') {
        this.formObj = Object.assign({}, row)
        this.datas.busiId = this.formObj.toolId
        this.formAttr.title = `修改`

        // 获取已上传文件列表
        this.$store.dispatch('specTool/findSpecTool', { toolId: row.toolId }).then(response => {
          this.fileList = response.fileList
        }).catch(() => {})
      }

      if (type === 'detail') {
        this.formObj = Object.assign({}, row)
        this.datas.busiId = this.formObj.toolId
        this.formAttr.title = `详情`
        console.log(row)
        // 获取已上传文件列表
        this.$store.dispatch('specTool/findSpecTool', { toolId: row.toolId }).then(response => {
          this.fileList = response.fileList
        }).catch(() => {})
      }
      this.dialogFormVisible = true
    },
    saveForm() {
      if (this.formAttr.formType === 'detail') {
        this.closeDialog()
        return
      }
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if (this.formAttr.formType === 'edit') {
            url = 'specTool/updateSpecTool'
          } else if (this.formAttr.formType === 'add') {
            url = 'specTool/addSpecTool'
          }
          const params = this.formObj
          this.$store.dispatch(url, params).then(response => {
            this.$message({
              showClose: true,
              message: `操作成功！`,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.reloadDatagrid()
          }).catch(() => {})
        }
      })
    },
    handleRemove(file, fileList) {
      // 只有新上传的附件才会有response
      if (file.response) {
        const files = file.response.files
        files.forEach(file => {
          this.idx = file.idx
          const fileUpLoad = { idx: this.idx }
          this.$store.dispatch('base/delFileUpLoad', fileUpLoad).then(response => {
            if (response && response.RET_CODE === '0') {
              this.$alert('删除成功')
            }
          })
        })
      } else {
        this.idx = file.idx
        const fileUpLoad = { idx: this.idx }
        this.$store.dispatch('base/delFileUpLoad', fileUpLoad).then(response => {
          if (response && response.RET_CODE === '0') {
            this.$alert('删除成功')
          }
        })
      }

      this.fileList = fileList
    },
    handlePreview(file) {
      if (file.response) {
        file.response.files.forEach(file => {
          this.url = file.fileUrl
        })
      } else {
        this.url = file.url
      }
      const params = { realName: file.realName, fileUrl: this.url }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      this.fileList.push(file)
    },
    downloadFile(file) {
      const params = { realName: file.realName, fileUrl: file.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    openNotcieDag(row) {
      this.notice.title = `关于发布${row.toolName}的通知`
      this.notice.toolId = row.toolId
      this.noticeDag = true
    },
    closeNoticeDag() {
      this.noticeDag = false
      this.notice = {}
    },
    doNotice() {
      this.$refs['noticeForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('specTool/doNotice', this.notice).then(response => {
            this.$alert('操作成功')
            this.noticeDag = false
          })
        }
      })
    },
    taskList() {
      this.$router.push({ path: '/satp-tool/specTool/taskList' })
    },
    addTask(row) {
      this.$router.push({ path: '/satp-tool/specTool/addTask', query: { 'toolId': row.toolId, 'toolName': row.toolName }})
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
