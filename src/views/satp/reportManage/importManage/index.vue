<template>
  <div>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="系统漏扫" name="1">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="web漏扫" name="2">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="系统弱口令" name="3">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="基线" name="4">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="应用渗透测试" name="5">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="内容安全" name="6">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="代码审计" name="7">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="互联网暴露面资产" name="8">
          <el-card>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
              @toolbarClick="toolbarClick"
            />
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="报告导入" :visible.sync="dialogImportVisible" width="700px">
      <!-- <el-form> -->
      <el-row>

        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- <el-form-item label="问题分类"> -->
          <el-select v-model="tempType" placeholder="导入类型" size="small">
            <el-option
              v-for="item in vulnTypeOptions"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
          <!-- </el-form-item> -->
        </el-col>
        <el-col :span="8">
          <el-link style="padding:8px 0px 0px 20px;" type="primary" @click.native.prevent="downloadExcelTemp">EXCEL导入模板下载</el-link>
        </el-col>
        <el-col :span="10">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=" "
            :on-change="changeFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            multiple
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" :loading="savebutton" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">
              1.仅支持后缀名为.xls的文件,红色字段为必填字段！<br>
              2.字段个数和位置不能随意增添改动,请参考模板文件。
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
      </div>
      <!-- </el-form> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      url: 'reportManage/queryImportManageListByPage',
      tableHeight: 450,
      params: {
        type: ''
      },
      columns: [
      ],
      savebutton: false,
      loading: true,
      toolbar: [
        { label: '导入', prop: 'import', type: 'primary', icon: 'el-icon-upload2' }
      ],
      componentData: {},
      activeName: '1',
      vulnTypeOptions: [],
      dialogImportVisible: false,
      tempType: '',
      fileList: []
    }
  },
  created() {
    this.initTable('1')
    this.getOptions('tempType', 'thirdReport', 'vulnTypeOptions')
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
  },
  methods: {
    initTable(type) {
      if (type === '1') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '漏洞名称', prop: 'vulnName', 'width': 200, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'width': 200, align: 'center' },
          { label: '漏洞风险级别', prop: 'riskLevelLabel', 'width': 200, align: 'center' },
          { label: '漏洞加固建议', prop: 'solution', 'width': 200, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'width': 200, align: 'center' }
        ]
      } else if (type === '2') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '漏洞名称', prop: 'vulnName', 'width': 200, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'width': 200, align: 'center' },
          { label: '漏洞风险级别', prop: 'riskLevelLabel', 'width': 200, align: 'center' },
          { label: '漏洞加固建议', prop: 'solution', 'width': 200, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'width': 200, align: 'center' }
        ]
      } else if (type === '3') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '弱口令账号', prop: 'weakAccount', 'width': 200, align: 'center' },
          { label: '弱口令密码', prop: 'weakPwd', 'width': 200, align: 'center' }
        ]
      } else if (type === '4') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '检查项名称', prop: 'itemName', 'width': 200, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'width': 200, align: 'center' },
          { label: '加固建议', prop: 'solution', 'width': 200, align: 'center' }
        ]
      } else if (type === '5') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'width': 200, align: 'center' },
          { label: '漏洞类型', prop: 'vulnType', 'width': 200, align: 'center' },
          { label: '漏洞风险级别', prop: 'riskLevelLabel', 'width': 200, align: 'center' },
          { label: '漏洞加固建议', prop: 'solution', 'width': 200, align: 'center' }
        ]
      } else if (type === '6') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '敏感词', prop: 'illegalWord', 'width': 200, align: 'center' },
          { label: '出现次数', prop: 'illegalTimes', 'width': 200, align: 'center' },
          { label: '漏洞风险级别', prop: 'riskLevelLabel', 'width': 200, align: 'center' },
          { label: '漏洞加固建议', prop: 'solution', 'width': 200, align: 'center' }
        ]
      } else if (type === '7') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '代码安全问题类型', prop: 'codeSafeType', 'width': 200, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'width': 200, align: 'center' }
        ]
      } else if (type === '8') {
        this.columns = [
          { label: '测试时间', prop: 'testTime', 'width': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '测试公司', prop: 'testComId', 'width': 200, align: 'center' },
          { label: '测试对象', prop: 'testObj', 'width': 200, align: 'center' },
          { label: '备注', prop: 'remark', 'width': 200, align: 'center' },
          { label: '测试地址', prop: 'testAddr', 'width': 200, align: 'center' },
          { label: '业务系统', prop: 'assetId', 'width': 200, align: 'center' },
          { label: '在线状态', prop: 'onlineState', 'width': 200, align: 'center' },
          { label: '协议', prop: 'protocol', 'width': 200, align: 'center' },
          { label: '服务', prop: 'service', 'width': 200, align: 'center' },
          { label: '是否授权', prop: 'isRoot', 'width': 200, align: 'center' },
          { label: '出现次数', prop: 'appearNum', 'width': 200, align: 'center' }
        ]
      }
      this.params.type = type
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    showUploadDialog() {
      this.dialogImportVisible = true
    },
    dateformatter(row) {
      if (!row.testTime) {
        return ''
      }
      return this.moment(row.testTime).format('YYYY年MM月DD日')
    },
    handleClick(tab, event) {
      this.initTable(tab.name)
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'import':
          this.showUploadDialog()
          break
        default:
          break
      }
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'vulnTypeOptions') {
          $self.vulnTypeOptions = response.result
        }
      }).catch(() => {
      })
    },
    downloadExcelTemp() { // 下载模板
      var params = {}
      window.console.info('tempType', this.tempType)
      switch (this.tempType) {
        case '1':
          params.realName = '系统漏扫导入模板.xls'
          break
        case '2':
          params.realName = 'WEB漏扫导入模板.xls'
          break
        case '3':
          params.realName = '系统弱口令导入模板'
          break
        case '4':
          params.realName = '基线导入模板.xls'
          break
        case '5':
          params.realName = '应用渗透测试导入模板.xls'
          break
        case '6':
          params.realName = '内容安全导入模板.xls'
          break
        case '7':
          params.realName = '代码审计导入模板.xls'
          break
        case '8':
          params.realName = '互联网暴露面资产导入模板.xls'
          break
        default:
          break
      }
      params.tempType = this.tempType
      this.$store.dispatch('reportManage/downloadTemp', params).then(response => {

      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    changeFile(file) {
      this.fileList.push(file)
    },
    submitUpload() {
      this.savebutton = true
      const $self = this
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      param.append('tempType', this.tempType)
      // console.log(param.get('file'))
      // return false;
      this.$store.dispatch('reportManage/importTemps', param).then(response => {
        $self.getTableData()
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.fileList = []
        this.savebutton = false
      })
    },
    // 取消操作
    cancel(formName) {
      this.loading = false
      this.savebutton = false
      this.dialogImportVisible = false
    }
  }
}
</script>
<style scoped>
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;width:80px;padding:8px;}
</style>
