<template>
  <div class="app-container">
    <el-card>
      <div class="pages">
        <el-form
          label-width="100px"
          size="small"
          label-position="left"
          class="satp-form-inline"
          @submit.native.prevent
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="扫描工具厂商">
                <el-select v-model="queryArgs.companyCode" placeholder="扫描工具厂商" size="small" clearable>
                  <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button type="primary" icon="el-icon-search" size="small" @click="reloadDatagrid()">查询</el-button>
                <el-button type="success" size="small" icon="el-icon-plus" @click="showDialog({},'add')">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>

        <div>
          <template>
            <el-tabs v-model="activeTabName" @tab-click="tabClick">
              <el-tab-pane label="系统漏扫工具" name="VULN" />
              <el-tab-pane label="Web漏扫工具" name="WEB" />
              <el-tab-pane label="基线检查工具" name="BASE" />
              <el-tab-pane label="弱口令检查工具" name="WEAK" />
              <el-tab-pane label="内容安全工具" name="CONTENT" />
              <el-tab-pane label="代码审计工具" name="CODE" />
              <el-tab-pane label="互联网暴露资产工具" name="INTERNET" />
              <div>
                <satp-datagrid
                  ref="toolDag"
                  :url="toolUrl"
                  :qparams="queryArgs"
                  :columns="columns"
                  border
                  @operClick="operClick"
                />
              </div>
            </el-tabs>
          </template>
        </div>

        <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="1000px" :model="formObj" :close-on-click-modal="false" @close="closeDialog">
          <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="140px" @submit.native.prevent>
            <el-row class="rowHand">
              备注：<font style="color:red;">*</font>为必选项
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="扫描工具厂商" prop="companyCode">
                  <el-select v-model="formObj.companyCode" placeholder="扫描工具厂商" size="small">
                    <el-option
                      v-for="item in companyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品型号" prop="productModel">
                  <el-input v-model="formObj.productModel" placeholder="产品型号" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="软件版本" prop="productVersion">
                  <el-input v-model="formObj.productVersion" placeholder="软件版本" size="small" />
                </el-form-item>
              </el-col>
              <el-col v-if="activeTabName=='VULN'" :span="12">
                <el-form-item label="漏洞库版本" prop="libVersion">
                  <el-input v-model="formObj.libVersion" placeholder="漏洞库版本" size="small" />
                </el-form-item>
              </el-col>
              <el-col v-if="activeTabName=='WEB'" :span="12">
                <el-form-item label="WEB漏洞库版本" prop="libVersion">
                  <el-input v-model="formObj.libVersion" placeholder="WEB漏洞库版本" size="small" />
                </el-form-item>
              </el-col>
              <el-col v-if="activeTabName=='BASE'" :span="12">
                <el-form-item label="安全基线库版本" prop="libVersion">
                  <el-input v-model="formObj.libVersion" placeholder="安全基线库版本" size="small" />
                </el-form-item>
              </el-col>
              <el-col v-if="activeTabName=='WEAK'" :span="12">
                <el-form-item label="弱口令库版本" prop="libVersion">
                  <el-input v-model="formObj.libVersion" placeholder="弱口令库版本" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态" prop="toolStatus">
                  <el-select v-model="formObj.toolStatus" placeholder="状态" size="small">
                    <el-option
                      v-for="item in [{id:1 ,name:'在线'},{id:2,name:'离线'}]"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务执行类" prop="className">
                  <el-input v-model="formObj.className" placeholder="任务执行类" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工具地址" prop="toolAddr">
                  <el-input v-model="formObj.toolAddr" placeholder="工具地址 " size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="formObj.userName" placeholder="用户名 " size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="passWord">
                  <el-input v-model="formObj.passWord" placeholder="密码 " size="small" />
                </el-form-item>
              </el-col>

              <el-col v-if="formAttr.formType=='edit'" :span="12">
                <el-form-item label="执行中任务数" prop="taskRun">
                  <el-input v-model="formObj.taskRun" size="small" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col v-if="formAttr.formType=='edit'" :span="12">
                <el-form-item label="等待扫描任务数" prop="taskWait">
                  <el-input v-model="formObj.taskWait" size="small" :disabled="true" />
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancle()">取消</el-button>
            <el-button type="primary" :loading="savebutton" size="small" @click="saveForm()">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </el-card>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      toolUrl: 'tool/toolList',
      activeTabName: 'VULN',
      queryArgs: {
        chkType: 'VULN'
      },
      changeStatusParams: {},
      companyList: [
        { id: 'AH', name: '安恒' },
        { id: 'ASIAINFO', name: '亚信' },
        { id: 'BOCO', name: '亿阳' },
        { id: 'HP', name: '惠普' },
        { id: 'IDSS', name: '观安' },
        { id: 'NSFOCUS', name: '绿盟' },
        { id: 'TOPSEC', name: '天融信' },
        { id: 'ULTRAPOWER', name: '泰岳' },
        { id: 'VENUS', name: '启明' }
      ],
      tableThead: [],
      tableData: [], // tables数据
      loading: true,
      columns: [],
      sysColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '漏洞库版本号', prop: 'libVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      webColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: 'WEB漏洞库版本号', prop: 'libVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      baseColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '安全基线库版本号', prop: 'libVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      weakColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '弱口令库版本号', prop: 'libVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      codeColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      internetColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        //  { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        //  { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      contentColumns: [
        { label: '扫描工具厂商', prop: 'companyName' },
        { label: '产品型号', prop: 'productModel' },
        { label: '软件版本号', prop: 'productVersion' },
        { label: '敏感词库版本号', prop: 'libVersion' },
        { label: '状态', prop: 'toolStatus', formatter: this.toolStatusFormatter },
        // { label: '执行中任务数量', prop: 'taskRun', formatter: this.taskRunFormatter },
        // { label: '等待扫描任务数量', prop: 'taskWait', formatter: this.taskWaitFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      //
      savebutton: false,
      dialogFormVisible: false,
      formAttr: {
        // 弹出框属性
        title: '',
        type: '',
        formLabelWidth: '130px'
      },
      formObj: {
      },
      formRule: {// 验证必填项
        companyCode: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        productModel: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        productVersion: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        libVersion: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolStatus: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolAddr: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]

      }
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
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
  created() {
    this.columns = this.sysColumns
  },
  mounted() {
  },
  methods: {
    toolStatusFormatter(row) {
      if (row.toolStatus === 1) {
        return '在线'
      } else if (row.toolStatus === 2) {
        return '离线'
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
    taskRunFormatter(row) {
      if (row.taskRun == null) {
        return 0
      } else {
        return row.taskRun
      }
    },
    taskWaitFormatter(row) {
      if (row.taskWait == null) {
        return 0
      } else {
        return row.taskWait
      }
    },
    operFormatter(row) {
      let actions = []
      const toolStatus = row.toolStatus
      if (toolStatus === 2) {
        actions = [
          { title: '启用', prop: 'effect', type: 'success', icon: 'el-icon-circle-check', popconfirm: '确认启用该工具吗?' },
          { title: '修改', prop: 'update', type: 'primary', icon: 'el-icon-edit' }
        ]
      } else if (toolStatus === 1) {
        actions = [
          { title: '禁用', prop: 'invalid', type: 'danger', icon: 'el-icon-remove-outline', popconfirm: '确认禁用该工具吗?' },
          { title: '修改', prop: 'update', type: 'primary', icon: 'el-icon-edit' }
        ]
      }
      return actions
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'invalid':
          this.updateStatus(row, '禁用')
          break
        case 'effect':
          this.updateStatus(row, 'updateStatus')
          break
        case 'update':
          this.showDialog(row, 'edit')
          break
        default:
          break
      }
    },
    // 禁用启用列表数据
    updateStatus(row, status) {
      const $self = this
      const text = status === 'ENABLE' ? '启用' : '禁用'
      const toolStatus = status === 'ENABLE' ? 1 : 2
      $self.changeStatusParams.toolStatus = toolStatus
      $self.changeStatusParams.toolId = row.toolId

      this.$store.dispatch('tool/changeStatus', $self.changeStatusParams).then(response => {
        $self.reloadDatagrid()
        $self.$message({
          message: `${text}操作成功！`,
          type: 'success'
        })
      })
    },
    // 显示弹出框判断是添加还是编辑该节点
    showDialog(row, type) {
      const $self = this
      this.savebutton = false
      event.stopPropagation()
      const text = '工具'
      if (type === 'add') {
        this.formAttr.title = `${text}新增`
      } else if (type === 'edit') {
        this.formAttr.title = `${text}修改`
      } else {
        this.formAttr.title = `${text}详情`
      }
      const tool = { toolId: row.toolId }
      if (type === 'edit') {
        this.$store.dispatch('tool/findTool', tool).then(response => {
          this.formObj = {}
          // 深克隆
          this.formObj = Object.assign({}, response.tool)
          if (this.formObj.taskRun == null) {
            this.formObj.taskRun = 0
          }
          if (this.formObj.taskWait == null) {
            this.formObj.taskWait = 0
          }
        })
      }

      this.formAttr.formType = type
      $self.dialogFormVisible = true
    },
    saveForm() {
      const $self = this
      this.savebutton = true
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if ($self.formAttr.formType === 'edit') {
            url = 'tool/updateTool' // httpUrl.test_tool_management.update//
          } else {
            url = 'tool/addTool' // httpUrl.test_tool_management.add//
          }
          $self.formObj.chkType = $self.activeTabName

          // 获取扫描工具厂商中文名
          this.selectCompanyName()
          // 保存product信息
          this.saveProductInfo()

          this.$store.dispatch(url, $self.formObj).then(response => {
            $self.savebutton = false
            $self.formObj = {}
            $self.reloadDatagrid()
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

    tabClick() {
      this.queryArgs.chkType = this.activeTabName
      this.reloadDatagrid()
      if (this.activeTabName === 'VULN') {
        this.columns = this.sysColumns
      } else if (this.activeTabName === 'WEB') {
        this.columns = this.webColumns
      } else if (this.activeTabName === 'BASE') {
        this.columns = this.baseColumns
      } else if (this.activeTabName === 'WEAK') {
        this.columns = this.weakColumns
      } else if (this.activeTabName === 'CONTENT') {
        this.columns = this.contentColumns
      } else if (this.activeTabName === 'CODE') {
        this.columns = this.codeColumns
      } else if (this.activeTabName === 'INTERNET') {
        this.columns = this.internetColumns
      }
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
    },
    selectCompanyName() {
      let obj = {}
      obj = this.companyList.find((item) => { // 这里的companyList就是上面遍历的数据源
        return item.id === this.formObj.companyCode
        // 筛选出匹配数据，是对应数据的整个对象
      })
      this.formObj.companyName = obj.name
    },
    saveProductInfo() {
      if (this.activeTabName === 'VULN') {
        this.formObj.productCode = 'SYSVULN-SCANNER'
        this.formObj.productName = '系统漏洞扫描工具'
        this.toolName = '系统漏洞扫描工具'
      } else if (this.activeTabName === 'WEB') {
        this.formObj.productCode = 'WEB-SCANNER'
        this.formObj.productName = 'WEB漏扫工具'
        this.toolName = 'WEB漏扫工具'
      } else if (this.activeTabName === 'BASE') {
        this.formObj.productCode = 'BASELINE-SCANNER'
        this.formObj.productName = '基线检查工具'
        this.toolName = '基线检查工具'
      } else if (this.activeTabName === 'WEAK') {
        this.formObj.productCode = 'WEAKPWD-SCANNER'
        this.formObj.productName = '弱口令检查工具'
        this.toolName = '弱口令检查工具'
      } else if (this.activeTabName === 'CONTENT') {
        this.formObj.productCode = 'CONTENT-SCANNER'
        this.formObj.productName = '内容安全工具'
        this.toolName = '内容安全工具'
      } else if (this.activeTabName === 'CODE') {
        this.formObj.productCode = 'CODE-SCANNER'
        this.formObj.productName = '代码审计工具'
        this.toolName = '代码审计工具'
      } else if (this.activeTabName === 'INTERNET') {
        this.formObj.productCode = 'INTERNET-SCANNER'
        this.formObj.productName = '互联网暴露资产工具'
        this.toolName = '互联网暴露资产工具'
      }
    },
    closeDialog() {
      this.formObj = {}
    },
    reloadDatagrid() {
      this.$refs['toolDag'].reload()
    }
  }
}
</script>

<style  lang="scss" scoped>
  .pages {
    height: 100%;
    position: relative;
  }

  .el-select{
    width: 100% !important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
