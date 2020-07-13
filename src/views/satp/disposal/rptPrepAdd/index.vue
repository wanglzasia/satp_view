<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header content="报备申请" @back="goBack" />
        <router-view />
      </div>
      <div class="radius">
        <div style="padding: 0px 15px 15px 15px;">
          <el-row>
            <el-col :span="12">
              <h3><span class="data_titles">报备信息</span></h3>
            </el-col>
          </el-row>
        </div>
        <div style="padding-left:20px;padding-right:20px;padding-bottom:20px;">
          <el-form ref="formObj" :rules="formRules" label-width="95px" :model="formObj" @submit.native.prevent>
            <el-row>
              <el-col :span="8">
                <el-form-item label="资产IP" prop="logicAddr">
                  <el-input v-model="formObj.logicAddr" placeholder="请选择资产 " :readonly="true" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="getLogicAddr()" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产类型:">
                  <el-input v-model="formObj.assetTypeLabel" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产名称:">
                  <el-input v-model="formObj.assetName" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item prop="bizName" label="业务系统:">
                  <el-input v-model="formObj.bizName" autocomplete="off" type="text" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报备类型:">
                  <el-input v-model="formObj.prepTypeLabel" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="有效期:" prop="expDate">
                  <el-date-picker
                    v-model="formObj.expDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="安全管理员" prop="safetyMgrName">
                  <el-input v-model="formObj.safetyMgrName" placeholder="请选择安全管理员" :readonly="true" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="getSafetyUsr()" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="报备原因:" prop="prepReason">
                  <el-input v-model="formObj.prepReason" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="附件" prop="file">
                <el-upload
                  class="upload-demo"
                  action="/proxy/rbac/base/fileUpload"
                  :headers="headers"
                  :data="fileParam"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess"
                  :limit="5"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">上传文件只能是 xls、xlsx、doc、txt、docx格式!;最多上传5个文件</div>
                </el-upload>
              </el-form-item>
            </el-row>

          </el-form>
        </div>
      </div>
      <div class="radius">
        <div style="padding: 0px 15px 15px 15px;">
          <el-row>
            <el-col :span="12">
              <h3><span class="data_titles">{{ vulnTitle }}</span></h3>
            </el-col>
          </el-row>
        </div>
        <div style="padding-left:20px;padding-right:20px;padding-bottom:20px;">
          <div class="clearfix" style="width: 100%;background-color: #EEEEEE;">
            <el-row style="padding-left:20px;">
              <el-col :span="24" align="left">
                <el-button type="text" icon="el-icon-plus" @click="choseVuln">选择</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :loading="loading"
            max-height="200"
          >
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
              <template slot-scope="scope">
                <!-- <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.field],scope.row.format) }}</span> -->
                <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--审批记录-->
      <!-- <flowTrace-view :proc-def-key="procDefKey" :busi-id="busiId" /> -->
      <component :is="tempData.component" :proc-def-key="procDefKey" :busi-id="busiId" />

      <div style="margin-top:10px">
        <el-row>
          <el-button v-if="viewType != 'redo' " :loading="savebutton" type="primary" @click="submitForm('formObj','0')">保存草稿</el-button>
          <el-button :loading="savebutton" type="primary" @click="submitForm('formObj','1')">提交申请</el-button>
          <el-button v-if="viewType != 'redo' " @click="resetForm('formObj')">重置</el-button>
        </el-row>
      </div>
    </el-card>
    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />

    <asset-window
      v-if="assetWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="assetMultiple"
      :visible.sync="assetWindowVisible"
      :modal-append-to-body="false"
      @getAssetInfo="getAssetInfo"
    />

    <sysvuln-window
      v-if="sysVulnWindowVisible"
      :parent-component-param="parentComponentParam"
      :multiple="sysVulnMultiple"
      :visible.sync="sysVulnWindowVisible"
      :modal-append-to-body="false"
      @getSysVulnInfo="getSysVulnInfo"
    />

    <webvuln-window
      v-if="webVulnWindowVisible"
      :parent-component-param="parentComponentParam"
      :multiple="webVulnMultiple"
      :visible.sync="webVulnWindowVisible"
      :modal-append-to-body="false"
      @getWebVulnInfo="getWebVulnInfo"
    />

    <baseline-window
      v-if="baseLineWindowVisible"
      :parent-component-param="parentComponentParam"
      :multiple="baseLineMultiple"
      :visible.sync="baseLineWindowVisible"
      :modal-append-to-body="false"
      @getBaseLineInfo="getBaseLineInfo"
    />
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import UserInfo from '@/components/Userwindow/index.vue'
import AssetInfo from '@/components/Assetwindow/index.vue'
import SysVuln from '../rptPrep/SysVulnWindow.vue'
import WebVuln from '../rptPrep/WebVulnWindow.vue'
import BaseLine from '../rptPrep/BaseLineWindow.vue'
import FlowTrace from '@/components/FlowTrace/index.vue'
export default {
  components: {
    'user-window': UserInfo,
    'asset-window': AssetInfo,
    'sysvuln-window': SysVuln,
    'webvuln-window': WebVuln,
    'baseline-window': BaseLine,
    'flowTrace-view': FlowTrace
  },
  data() {
    return {
      title: '',
      vulnTitle: '',
      prepType: '',
      view: '',
      taskId: '', // 重新打回时 工作流任务id
      tableThead: [],
      tableData: [],
      savebutton: false,
      loading: false,
      formRules: {
        bizName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        logicAddr: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        expDate: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        safetyMgrName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        prepReason: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
        // file:[
        //     { required: true, message: "请上传文件"}
        // ],
      },
      formObj: {
        prepId: '',
        assetId: '',
        logicAddr: '',
        safetyMgrName: '',
        safetyMgr: '',
        expDate: '',
        prepFileIdx: []
      },
      userWindowVisible: false,
      assetWindowVisible: false,
      sysVulnWindowVisible: false,
      webVulnWindowVisible: false,
      baseLineWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      assetMultiple: false, // 默认false 单选;
      sysVulnMultiple: false, // 默认false 单选;
      webVulnMultiple: false, // 默认false 单选;
      baseLineMultiple: false, // 默认false 单选;
      fileList: [],
      fileParam: {
        fileType: 'prepFile',
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
      name: '',
      tempData: {},
      procDefKey: '',
      busiId: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-D HH:mm:ss')
      }
    }
  },
  watch: {
    'formObj.logicAddr': {
      deep: true,
      handler: function(newVal, oldVal) {
        if (newVal && oldVal && newVal !== oldVal) {
          this.tableData = []
          this.$message({
            type: 'warning',
            message: '更换资产，数据被清空!'
          })
        }
      }
    }
  },
  created() {
    const prepType = this.$route.query.prepType
    this.prepType = prepType
    this.viewType = this.$route.query.viewType
    if (this.viewType === 'draft' || this.viewType === 'redo') {
      this.formObj.prepId = this.$route.query.prepId
      this.getRptPrepInfo()
      this.getRptPrepDetailList()
    }
    if (this.viewType === 'redo') { // 当是打回重做节点时
      this.taskId = this.$route.query.taskId
      this.procDefKey = this.$route.query.procDefKey
      this.busiId = this.$route.query.busiId
      var myComponent = () => import('@/components/FlowTrace/index.vue')
      this.tempData = {
        component: myComponent
      }
    }
    if (prepType === '20') { // 系统漏洞
      this.vulnTitle = '系统漏洞'
      this.formObj.prepTypeLabel = '系统漏洞类'
      this.tableThead = [
        { 'id': '1', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
        { 'id': '2', 'field': 'vulId', 'fieldType': 'text', 'text': '安全厂家漏洞编号', 'align': 'left' },
        { 'id': '3', 'field': 'cnnveId', 'fieldType': 'text', 'text': '国家漏洞库编号', 'align': 'left' },
        { 'id': '4', 'field': 'vulnName', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '5', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' }
      ]
    } else if (prepType === '21') { // bwe漏洞
      this.vulnTitle = 'web漏洞'
      this.formObj.prepTypeLabel = 'web漏洞类'
      this.tableThead = [
        { 'id': '1', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
        { 'id': '2', 'field': 'vulId', 'fieldType': 'text', 'text': '安全厂家漏洞编号', 'align': 'left' },
        { 'id': '3', 'field': 'cnnveId', 'fieldType': 'text', 'text': '国家漏洞库编号', 'align': 'left' },
        { 'id': '4', 'field': 'vulnName', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '5', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' }
      ]
    } else if (prepType === '22') {
      this.vulnTitle = '基线'
      this.formObj.prepTypeLabel = '基线类'
      this.tableThead = [
        { 'id': '1', 'field': 'vulnName', 'fieldType': 'text', 'text': '基线名称', 'align': 'left' }
      ]
    }
  },
  methods: {
    goBack() {
      if (this.viewType === 'add' || this.viewType === 'draft') {
        this.$router.push({ path: '/satp/disposal/rptPrep' })
      } else if (this.viewType === 'redo') { // 重做节点返回到工作流页面
        this.$router.push({ path: '/system/workflow/busiTaskList' })
      }
    },
    getRptPrepInfo() {
      const $self = this
      const param = {}
      param.prepId = $self.formObj.prepId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryRptPrepList', param).then(response => {
        $self.formObj = response.result[0]
        $self.fileParam.busiId = $self.formObj.prepId
        $self.fileList = response.fileList
        $self.fileList.forEach(file => {
          file.name = file.realName
          file.url = file.fileUrl
        })
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    getRptPrepDetailList() {
      const $self = this
      $self.loading = true
      const param = {}
      param.prepId = $self.formObj.prepId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryRptPrepDetailList', param).then(response => {
        const result = response.result
        for (const idx in result) {
          result[idx].vulId = result[idx].mfrsId
          result[idx].cnnveId = result[idx].cnnvdId
        }
        window.console.info(result)
        $self.tableData = result
        $self.loading = false
        loading.close()
      }).catch(() => {
        $self.loading = false
        loading.close()
      })
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.safetyMgrName = data.userName
      $self.formObj.safetyMgr = data.userId
      // $self.dataRootUserInfo=data;
    },
    getAssetInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.assetId = data.assetId
      $self.formObj.logicAddr = data.logicAddr
      $self.formObj.assetTypeLabel = data.assetTypeLabel
      $self.formObj.assetType = data.assetType
      $self.formObj.assetName = data.assetName
      // $self.dataRootAssetInfo=data;
    },
    getSysVulnInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.tableData.push(data)
      // $self.dataRootAssetInfo=data;
    },
    getWebVulnInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.tableData.push(data)
      // $self.dataRootAssetInfo=data;
    },
    getBaseLineInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.tableData.push(data)
      // $self.dataRootAssetInfo=data;
    },
    getLogicAddr() {
      this.assetWindowVisible = true
      this.assetMultiple = false
    },
    getSafetyUsr() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.title = '请选择安全管理员'
      this.multiple = false// true 为复选
    },
    choseVuln() {
      if (!this.formObj.logicAddr) {
        this.$message({
          type: 'warning',
          message: '请选择资产!'
        })
        return
      }
      const prepType = this.$route.query.prepType
      if (prepType === '20') {
        this.sysVulnWindowVisible = true
        this.sysVulnMultiple = false
        this.parentComponentParam.logicAddr = this.formObj.logicAddr
      } else if (prepType === '21') {
        this.webVulnWindowVisible = true
        this.webVulnMultiple = false
        this.parentComponentParam.logicAddr = this.formObj.logicAddr
      } else if (prepType === '22') {
        this.baseLineWindowVisible = true
        this.baseLineMultiple = false
        this.parentComponentParam.logicAddr = this.formObj.logicAddr
      }
    },
    handleDelete(idx, row) {
      this.tableData.splice(idx, 1)
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
      this.fileList = fileList
      // fileList.forEach((file, i) => {
      //     if (file.idx === this.idx) {
      //     this.fileList.splice(i, 1)
      //     }
      // })
    },
    handlePreview(file) {
      if (file.response) {
        file.response.files.forEach(file => {
          this.url = file.fileUrl
        })
      } else {
        this.url = file.url
      }
      const params = { realName: file.name, fileUrl: this.url }
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
    submitForm(formName, type) {
      // this.formObj.expTime = new Date(this.formObj.expDate).format("yyyy-MM-dd");

      // window.console.info(this.formObj)
      // return
      const $self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          $self.savebutton = true
          let param = {}
          if ($self.viewType === 'add') { // 当新增的时候 需要在后台更新业务id
            $self.fileList.forEach(file => {
              $self.formObj.prepFileIdx.push(file.response.files[0].idx)
            })
          }
          param = $self.formObj
          param.taskId = $self.taskId
          param.arr = JSON.stringify($self.tableData)
          param.viewType = $self.viewType
          param.opType = type
          param.prepType = $self.prepType
          $self.$store.dispatch('disposal/doRptPrepApply', param).then(response => {
            $self.savebutton = false
            if (response.RET_CODE === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            $self.goBack()
          }).catch(() => {
            $self.savebutton = false
            $self.goBack()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.radius {
    min-height: 120px;
    width: 100%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 5px;
}

.data_titles{
  line-height: 32px;
  float: left;
}
.data_titles:before{
  content:"";
  width: 4px;
  height: 25px;
  background-color: #409eff;
  float: left;
  margin: 5px 5px 0px -5px;
}
</style>
