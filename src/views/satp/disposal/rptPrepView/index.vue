<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header :content="parentParam.taskName" @back="goBack" />
        <router-view />
      </div>
      <div style="margin-top: 5px;">
        <el-row :gutter="20">
          <el-col :xs="elColSpan" :sm="elColSpan" :md="elColSpan" :lg="elColSpan" :xl="elColSpan">
            <el-card shadow="never">
              <div style="padding: 0px 15px 15px 15px;">
                <el-row>
                  <el-col :span="12">
                    <h3><span class="data_titles">报备信息</span></h3>
                  </el-col>
                </el-row>
              </div>
              <table class="gridtable" style="width:100%;padding-left:20px;padding-right:20px;padding-bottom:20px;">
                <tr>
                  <th width="80px">资产IP</th>
                  <td style="text-align:left;">{{ rptPrepInfo.logicAddr }}</td>
                  <th width="80px">资产类型</th>
                  <td style="text-align:left;">{{ rptPrepInfo.assetTypeLabel }}</td>
                  <th width="80px">资产名称</th>
                  <td style="text-align:left;">{{ rptPrepInfo.assetName }}</td>
                </tr>
                <tr>
                  <th width="80px">业务系统</th>
                  <td style="text-align:left;">{{ rptPrepInfo.bizName }}</td>
                  <th width="80px">报备类型</th>
                  <td style="text-align:left;">{{ rptPrepInfo.prepTypeLabel }}</td>
                  <th width="80px">报备时间</th>
                  <td style="text-align:left;">{{ dateFormat(rptPrepInfo.prepTime) }}</td>
                </tr>
                <tr>
                  <th width="80px">报备有效期</th>
                  <td style="text-align:left;">{{ dateFormat(rptPrepInfo.expDate,'YYYY-MM-DD') }}</td>
                  <th width="80px">申请人</th>
                  <td style="text-align:left;">{{ rptPrepInfo.applyUsrName }}</td>
                  <th width="80px">安全管理员</th>
                  <td style="text-align:left;">{{ rptPrepInfo.safetyMgrName }}</td>
                </tr>
                <tr>
                  <th width="80px">报备原因</th>
                  <td style="text-align:left;" colspan="5">{{ rptPrepInfo.prepReason }}</td>
                </tr>
                <tr>
                  <th width="80px">附件</th>
                  <td style="text-align:left;" colspan="5">
                    <el-row v-for="file in fileList" :key="file.idx">
                      <el-link type="primary" @click.native.prevent="downloadFile(file)">{{ file.realName }}</el-link>
                    </el-row>
                  </td>
                </tr>
              </table>
              <div style="padding-left:20px;padding-right:20px;">
                <el-divider />
              </div>
              <div style="padding: 0px 15px 15px 15px;">
                <el-row>
                  <el-col :span="12">
                    <h3><span class="data_titles">详细信息</span></h3>
                  </el-col>
                </el-row>
              </div>
              <div class="pages" style="padding:20px;">
                <el-table
                  v-loading="loading"
                  class="elTable"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(185, 185, 185, 0.1)"
                  :data="tableData"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column type="index" width="50" label="序号" />
                  <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
                    <template slot-scope="scope">
                      <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="margin-top:10px">
                  <el-pagination
                    :current-page="handlePagination.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="handlePagination.pageSize"
                    layout="total, sizes, prev, pager, next,jumper"
                    :total="handlePagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
              <!--审批记录-->
              <flowTrace-view :proc-def-key="procDefKey" :busi-id="busiId" />
            </el-card>
          </el-col>
          <el-col v-if="parentParam.formKey == 'audit' " :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
            <div class="is-fixed radius">
              <el-row>
                <el-col :span="12">
                  <h3><span class="data_titles">审批</span></h3>
                </el-col>
              </el-row>
              <el-form ref="auditFormObj" :rules="auditRules" :model="auditFormObj" label-width="85px" @submit.native.prevent>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="处理结果" prop="rectifyComments">
                      <el-radio-group v-model="auditFormObj.rectifyComments">
                        <el-radio label="Y">通过</el-radio>
                        <el-radio label="N">未通过</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="处理意见:">
                      <el-input v-model="auditFormObj.note" autocomplete="off" type="text" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="savebutton" @click="auditData('auditFormObj')">确 定</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import FlowTrace from '@/components/FlowTrace/index.vue'
export default {
  components: { 'flowTrace-view': FlowTrace },
  data() {
    return {
      parentParam: {
        formKey: '',
        busiId: '',
        taskName: '',
        taskId: '',
        procInstId: ''
      },
      prepType: '',
      rptPrepInfo: {},
      fileList: [],
      tableThead: [],
      tableData: [],
      handlePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      savebutton: false,
      auditFormObj: {
        rectifyComments: '',
        note: ''
      },
      auditRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      elColSpan: 17,
      procDefKey: '',
      busiId: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el, format) {
        if (!el) {
          return ''
        }
        if (format) {
          return this.moment(el).format(format)
        }
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.procDefKey = 'rpt_prep'
    this.busiId = this.$route.query.busiId
    this.parentParam.formKey = this.$route.query.formKey
    this.parentParam.busiId = this.$route.query.busiId
    this.parentParam.taskName = this.$route.query.taskName
    this.parentParam.taskId = this.$route.query.taskId
    this.parentParam.procInstId = this.$route.query.procInstId
    if (this.parentParam.formKey === 'read') {
      this.elColSpan = 24
      this.read()
    }
    if (this.parentParam.formKey === 'view') {
      this.elColSpan = 24
    }
    this.getRptPrepInfo()
  },
  methods: {
    goBack() {
      if (this.parentParam.formKey === 'view') {
        this.$router.push({ path: '/satp/disposal/rptPrep' })
      } else {
        this.$router.push({ path: '/system/workflow/busiTaskList' })
      }
    },
    downloadFile(file) {
      const params = { realName: file.name, fileUrl: file.url }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    getRptPrepInfo() {
      const $self = this
      const param = {}
      param.prepId = this.parentParam.busiId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryRptPrepList', param).then(response => {
        $self.rptPrepInfo = response.result[0]
        $self.fileList = response.fileList
        $self.fileList.forEach(file => {
          file.name = file.realName
          file.url = file.fileUrl
        })
        $self.prepType = $self.rptPrepInfo.prepType
        $self.getRptPrepDetailList()
        loading.close()
      }).catch(() => {
        loading.close()
      })
    },
    getRptPrepDetailList() {
      const $self = this
      const prepType = $self.prepType
      $self.loading = true
      if (prepType === '20') { // 系统漏洞
        this.tableThead = [
          { 'id': '1', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
          { 'id': '2', 'field': 'mfrsId', 'fieldType': 'text', 'text': '安全厂家漏洞编号', 'align': 'left' },
          { 'id': '3', 'field': 'cnnvdId', 'fieldType': 'text', 'text': '国家漏洞库编号', 'align': 'left' },
          { 'id': '4', 'field': 'vulnName', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
          { 'id': '5', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' }
        ]
      } else if (prepType === '21') { // bwe漏洞
        this.tableThead = [
          { 'id': '1', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
          { 'id': '2', 'field': 'mfrsId', 'fieldType': 'text', 'text': '安全厂家漏洞编号', 'align': 'left' },
          { 'id': '3', 'field': 'cnnvdId', 'fieldType': 'text', 'text': '国家漏洞库编号', 'align': 'left' },
          { 'id': '4', 'field': 'vulnName', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
          { 'id': '5', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' }
        ]
      } else if (prepType === '1') {
        this.vulnTitle = '合规项'
      }
      const param = {}
      param.prepId = this.parentParam.busiId
      param.pageNum = $self.handlePagination.pageNum
      param.pageSize = $self.handlePagination.pageSize
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryRptPrepDetailListByPage', param).then(response => {
        $self.tableData = response.rows
        $self.loading = false
        $self.handlePagination.total = response.total
        loading.close()
      }).catch(() => {
        $self.loading = false
        loading.close()
      })
    },
    handleCurrentChange(val) {
      this.handlePagination.pageNum = val
      this.getRptPrepDetailList()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.handlePagination.pageSize = val
      this.getRptPrepDetailList()
    },
    auditData(formName) {
      const $self = this
      $self.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {}
          param.taskId = $self.parentParam.taskId
          param.busiId = $self.parentParam.busiId
          param.formKey = $self.parentParam.formKey
          param.note = $self.auditFormObj.note
          param.isOk = $self.auditFormObj.rectifyComments
          param.applyUsr = $self.rptPrepInfo.applyUsr
          param.prepType = $self.prepType
          $self.savebutton = true
          $self.$store.dispatch('disposal/doAudit', param).then(response => {
            $self.savebutton = false
            if (response.RET_CODE === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.$router.push({ path: '/system/workflow/busiTaskList' })
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
              this.$router.push({ path: '/system/workflow/busiTaskList' })
            }
          }).catch(() => {
            $self.savebutton = false
            this.$router.push({ path: '/system/workflow/busiTaskList' })
          })
        }
      })
    },
    read() {
      const $self = this
      const param = {}
      param.taskId = $self.parentParam.taskId
      param.busiId = $self.parentParam.busiId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/read', param).then(response => {
        loading.close()
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>
<style scoped>
.is-fixed {
    position: fixed;
    bottom: 0;
    padding: 1px;
    top: 100px;
    width: 23%;
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
.radius {
    height: 300px;
    width: 23%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 0px;
    padding:15px;
}
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;min-width:80px;padding:8px;}
</style>
