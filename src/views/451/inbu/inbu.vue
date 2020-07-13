<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="searchForm"
          label-position="left"
          label-width="120px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="工单名称" prop="inbuName">
                <el-input v-model="searchForm.inbuName" placeholder="工单名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工单类型" prop="inbuType">
                <el-input v-model="searchForm.inbuType" placeholder="工单类型" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工单发起时间段" prop="searchTime">
                <el-date-picker
                  v-model="searchForm.searchTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="searchForm"
          :columns="columns"
          checkbox
          idx
          border
          @rowClick="rowClick"
        />

      </el-card>
    </div>

    <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="30%" :model="formObj" @close="cancle">
      <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="110px" @submit.native.prevent>
        <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
        <el-row>
          <el-col :span="20">
            <el-form-item label="工单名称" prop="inbuName">
              <el-input v-model="formObj.inbuName" placeholder="发文名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="工单类型" prop="inbuType">
              <el-select :value="inbuTypeValueTitle" :clearable="clearable" @clear="inbuTypeClearHandle">
                <el-option :value="inbuTypeValueTitle" :label="inbuTypeValueTitle">
                  <el-tree
                    id="inbuType-tree"
                    ref="selectinbuTypeTree"
                    :accordion="accordion"
                    :data="inbuTypes"
                    :props="inbuTypeProps"
                    :node-key="inbuTypeProps.id"
                    @node-click="inbuTypeHandleNodeClick"
                  />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="发文名称" prop="inbuOfname">
              <el-input v-model="formObj.inbuOfname" placeholder="发文名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="发文时间" prop="inbuOftime">
              <el-date-picker
                v-model="formObj.inbuOftime"
                placeholder="生效日期"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="发文来源" prop="inbuSour">
              <el-input v-model="formObj.inbuSour" placeholder="发文来源" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="发文文号" prop="inbuOfno">
              <el-input v-model="formObj.inbuOfno" placeholder="发文文号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="注意事项" prop="inbuRemark">
              <el-input v-model="formObj.inbuRemark" placeholder="注意事项" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="选择成员">
              <el-input v-model="formObj.dataRootUserName" placeholder="请选择成员 " size="small">
                <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="审核领导">
              <el-input v-model="formObj.inbuLeadername" placeholder="请选择审核领导 " size="small">
                <el-button slot="append" icon="el-icon-search" @click="getDataRootLeader()" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="完成时限">
              <el-input v-model="formObj.inbuDuedate" placeholder="1-30间整数 " size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="上传附件" prop="upload">
              <el-upload
                class="upload-demo"
                action="/proxy/rbac/base/fileUpload"
                :data="datas"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取消</el-button>
        <el-button type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
      </div>
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
    <user-window
      v-if="userWindowVisibleLeader"
      :title="title"
      :parent-component-param="parentComponentParamLeader"
      :multiple="multiple"
      :visible.sync="userWindowVisibleLeader"
      :modal-append-to-body="false"
      @getUserInfo="getLeaderInfo"
    />
  </div>
</template>

<script>
import UserInfo from '@/components/Userwindow/index.vue'
import datagrid from '@/components/datagrid/datagrid'
import { parseTime } from '@/utils/index.js'
import { getToken } from '@/utils/auth'
export default {
  name: 'InteTaskList',
  components: { 'satp-datagrid': datagrid, 'user-window': UserInfo },
  props: {
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => { return [] }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      test1Height: 300,
      url: 'inbu/loadInbuList',

      searchForm: {
        inbuName: '',
        inbuType: '',
        searchTime: ''
      },
      formAttr: {
        // 弹出框属性
        title: '新增',
        type: '',
        formLabelWidth: '130px'
      },
      formRule: {// 验证必填项
        fileName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        docNo: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]

      },
      formObj: {
      },
      columns: [
        { label: '工单名称', prop: 'inbuName', width: 120, align: 'left' },
        { label: '工单类型', prop: 'inbuType' },
        { label: '工单发起时间', prop: 'inbuOftime', align: 'center', formatter: this.dateFormatter },
        { label: '工单发起人', prop: 'createUserName', align: 'center' },

        { label: '审核领导', prop: 'inbuLeadername', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 300,
          actions: [
            { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
            { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete' },
            { title: '设置', prop: 'delete', type: 'text', icon: 'el-icon-setting' },
            { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
          ]
        }
      ],
      dialogFormVisible: false,
      props: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      inbuTypeProps: {
        id: 'id',
        label: 'typeName',
        children: 'children'
      },
      orgs: [],
      inbuTypes: [],
      valueId: '', // 初始值
      valueTitle: '',
      inbuTypeValueId: '', // 初始值
      inbuTypeValueTitle: '',
      fileList: [],
      savebutton: false,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      datas: {
        fileType: 'inbu',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      },
      idx: '',
      fileIdx: '',
      fileUrl: '',
      name: '',
      userWindowVisible: false,
      userWindowVisibleLeader: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      parentComponentParamLeader: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userNames: '',
      userIds: ''
    }
  },
  created() {

  },
  mounted() {
    this.listInbuTypes()
  },
  methods: {
    rowClick(data) {
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
    saveForm() {
      // 遍历附件信息，分为加载已有的附件以及新上传的附件
      this.fileList.forEach(fileList => {
        // 新上传的附件
        if (fileList.response) {
          const files = fileList.response.files
          files.forEach(file => {
            if (this.fileIdx === '') {
              this.fileIdx = file.idx
            } else {
              this.fileIdx = this.fileIdx + ',' + file.idx
            }
          })
        } else {
          if (this.fileIdx === '') {
            this.fileIdx = fileList.idx
          } else {
            this.fileIdx = this.fileIdx + ',' + fileList.idx
          }
        }
      })
      // if (this.fileIdx === '') {
      //   this.$message.warning(`请上传附件`)
      //   return
      // }
      const $self = this
      this.savebutton = true
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          $self.formObj.fileIdx = this.fileIdx
          $self.formObj.inbuType = this.inbuTypeValueId
          $self.formObj.inbuMembersid = this.userIds
          $self.formObj.inbuMembersname = this.userNames
          this.$store.dispatch('inbu/addInbu', $self.formObj).then(response => {
            $self.savebutton = false
            $self.formObj = {}
            this.fileIdx = ''
            this.$refs['datagridTest'].reload()
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
    listInbuTypes() {
      var _this = this
      this.$store.dispatch('inbu/listInbuTypes').then(resp => {
        _this.inbuTypes = resp.data
      })
    },
    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },
    dateFormatter(row) {
      const time = parseTime(row.inbuOftime, '')
      return time
    },
    // 切换选项
    inbuTypeHandleNodeClick(node) {
      this.inbuTypeValueTitle = node[this.inbuTypeProps.label]
      this.inbuTypeValueId = node[this.inbuTypeProps.id]
      this.$emit('getValue', this.inbuTypeValueId)
    },
    // 清除选中
    inbuTypeClearHandle() {
      this.inbuTypeValueTitle = ''
      this.inbuTypeValueId = null
      this.inbuTypeClearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    inbuTypeClearSelected() {
      const allNode = document.querySelectorAll('#inbuType-tree .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    handleRemove(file, fileList) {
      // 只有新上传的附件才会有response
      if (file.response) {
        const files = file.response.files
        // 由于本业务只允许上传一个附件，所以这么写。如果支持多附件，需要循环删除
        files.forEach(file => {
          this.idx = file.idx
        })
      } else {
        this.idx = file.idx
      }
      const fileUpLoad = { idx: this.idx }
      this.$store.dispatch('base/delFileUpLoad', fileUpLoad).then(response => {
        if (response && response.RET_CODE === '0') {
          this.$alert('删除成功')
        }
      })
      this.fileList.forEach((file, i) => {
        if (file.idx === this.idx) {
          this.fileList.splice(i, 1)
        }
      })
    },
    handlePreview(file) {
      if (file.response) {
        file.response.files.forEach(file => {
          this.fileUrl = file.fileUrl
        })
      } else {
        this.fileUrl = file.url
      }
      const params = { realName: file.name, fileUrl: this.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      this.fileList.push(file)
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const extension3 = testmsg === 'doc'
      const extension4 = testmsg === 'txt'
      const extension5 = testmsg === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
        this.$message({
          message: '上传文件只能是 xls、xlsx、doc、txt、docx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      return extension || extension2 || extension3 || extension4 || extension5 && isLt2M
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = true// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      this.userNames = ''
      this.userIds = ''
      data.forEach(data => {
        if (this.userNames === '' || this.userNames === null) {
          this.userNames = data.userName
        } else {
          this.userNames = this.userNames + ',' + data.userName
        }
        if (this.userIds === '' || this.userIds === null) {
          this.userIds = data.userId
        } else {
          this.userIds = this.userIds + ',' + data.userId
        }
      })
      $self.formObj.dataRootUserName = this.userNames
      $self.formObj.dataRootUserId = this.userIds
      // $self.formApplyObj.safetyMgr = data.staff_id;
      // $self.formApplyObj.safetyMgrName = data.user_name;
      // this.userInfoData=data;
    },
    getDataRootLeader() { // 调弹窗时可修改参数
      this.userWindowVisibleLeader = true
      this.parentComponentParamLeader.flag1 = 'test'
      this.parentComponentParamLeader.title = '选择设置视图用户'
      this.multiple = false// true 为复选
    },
    getLeaderInfo(data, parentComponentParamLeader) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this

      $self.formObj.inbuLeadername = data.userName
      $self.formObj.inbuLeaderid = data.userId
      // $self.formApplyObj.safetyMgr = data.staff_id;
      // $self.formApplyObj.safetyMgrName = data.user_name;
      // this.userInfoData=data;
    }
  }
}
</script>
