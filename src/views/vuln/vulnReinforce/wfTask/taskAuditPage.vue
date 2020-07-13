<template>
  <div>
    <div class="app-container">
      <el-card>
        <div>
          <div class="satp-grid-title">任务信息</div>
          <el-form ref="form" :model="addParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编号">
                  <el-input v-model="addParams.reinforceId" placeholder="一级编号" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务名称">
                  <el-input v-model="addParams.reinforceName" placeholder="任务名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulnName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="影响资产">
                  <el-input v-model="addParams.resType" placeholder="影响资产" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务状态">
                  <el-select v-model="addParams.taskStatus" :disabled="true">
                    <el-option label="未完成" value="1" />
                    <el-option label="完成" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务结果">
                  <el-select v-model="addParams.taskResult" placeholder="任务结果" :disabled="true">
                    <el-option label="成功" value="1" />
                    <el-option label="失败" value="2" />
                    <el-option label="未开始" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务类型">
                  <el-select v-model="addParams.taskType" placeholder="任务类型" :disabled="true">
                    <el-option label="加固任务" value="1" />
                    <el-option label="执行任务" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务来源">
                  <el-select v-model="addParams.createBy" placeholder="任务来源" :disabled="true">
                    <el-option label="本省" value="2" />
                    <el-option label="集团" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="上报省份">
                  <el-select v-model="addParams.province" placeholder="上报省份" :disabled="true">
                    <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人">
                  <el-input v-model="addParams.dealManName" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="24">
                <el-form-item label="方案">
                  <el-input v-model="addParams.planName" placeholder="方案" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="addParams.vulDetail" type="textarea" placeholder="备注" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="padding-top: 30px;">
          <div class="satp-grid-title">加固{{ typeStr }}</div>
          <el-form ref="resultForm" :model="resultParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="22">
                <el-form-item label="方案">
                  <el-input v-model="resultParams.planName" placeholder="方案" readonly="readonly" />
                  <input v-model="resultParams.projId" type="hidden">
                  <input v-model="resultParams.vulnporjId" type="hidden">
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="lookPlan">查看</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="加固结果">
                  <el-select v-model="resultParams.reinStatus" :disabled="true">
                    <el-option label="加固可行" value="1" />
                    <el-option label="加固不可行" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核人">
                  <el-input v-model="resultParams.auditName" placeholder="审核人" readonly="readonly" />
                  <input v-model="resultParams.audit" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!--查看方案弹窗-->
          <el-dialog title="查看方案" :visible.sync="projDialogVisible" width="50%">

            <el-form ref="form" :model="taskProjParams" label-width="120px" size="small">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="方案名称">
                    <el-input v-model="taskProjParams.projName" placeholder="方案名称" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="方案来源">
                    <el-select v-model="taskProjParams.projSrc" :disabled="true">
                      <el-option label="权威机构" value="1" />
                      <el-option label="漏洞验证" value="2" />
                      <el-option label="测试基地" value="3" />
                      <el-option label="专题漏洞" value="4" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="漏洞名称">
                    <el-input v-model="taskProjParams.vulnName" placeholder="漏洞名称" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="影响资产">
                    <el-input v-model="taskProjParams.resType" placeholder="影响资产" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="漏洞描述">
                    <el-input v-model="taskProjParams.vulnDetail" type="textarea" placeholder="漏洞描述" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="方案详情">
                    <el-input v-model="taskProjParams.projDetail" type="textarea" placeholder="方案详情" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="加固结果">
                    <el-select v-model="taskProjParams.reinStatus" :disabled="true">
                      <el-option label="可行" value="1" />
                      <el-option label="不可行" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="方案状态">
                    <el-select v-model="taskProjParams.pubStatus" :disabled="true">
                      <el-option label="未发布" value="2" />
                      <el-option label="已发布" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="下发省份">
                    <el-select v-model="taskProjParams.province" placeholder="下发省份" :disabled="true">
                      <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="方案来源">
                    <el-select v-model="taskProjParams.createBy" :disabled="true">
                      <el-option label="本省" value="2" />
                      <el-option label="集团" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="groupView">
                <el-col :span="12">
                  <el-form-item label="集团ID">
                    <el-input v-model="taskProjParams.projId" placeholder="集团ID" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下发时间">
                    <el-date-picker
                      v-model="taskProjParams.sendTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      :readonly="true"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="projDialogVisible = false">取 消</el-button>
              <el-button type="primary" size="small" @click="projDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>

        <div style="padding-top: 30px;">
          <div class="satp-grid-title">审核信息</div>
          <el-form ref="resultForm" :model="auditParams" label-position="right" label-width="120px" :rules="auditParamsRules" size="small">
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="审核结果" prop="isOK">
                  <el-select v-model="auditParams.isOK" @change="changeIsOK">
                    <el-option label="通过" value="Y" />
                    <el-option label="不通过" value="N" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item :label="typeStr + '提交人'" prop="reportName">
                  <el-input v-model="auditParams.reportName" :placeholder="typeStr + '提交人'" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="auditParams.report" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="备注" prop="auditNote">
                  <el-input v-model="auditParams.auditNote" type="textarea" placeholder="备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!--选择提交人弹窗-->
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

        <div style="text-align: center;padding-top: 30px;">
          <span>
            <el-button type="text" size="small" @click="cancle">取 消</el-button>
            <el-button type="primary" size="small" @click="save('resultForm')">确 定</el-button>
          </span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'user-window': userInfo },
  data() {
    return {
      queryTaskUrl: 'vulnReinforce/queryReinforceTask',
      queryProjUrl: 'vulnReinforce/queryReinforceProj',
      provinceUrl: 'dataDict/queryDataDictList',
      saveUrl: 'vulnReinforce/reinforceProjOrResultAudit',
      taskVariableUrl: 'workflow/getTaskVariable',
      taskId: '',
      busiId: '',
      typeStr: '',
      addParams: {
        reinforceId: '',
        reinforceName: '',
        vulnName: '',
        resType: '',
        taskStatus: '1',
        taskResult: '0',
        taskType: '1',
        createBy: '2',
        province: '',
        dealManName: '',
        dealMan: '',
        planName: '',
        projId: '',
        vulnporjId: '',
        vulDetail: ''
      },
      provinceList: [],
      // 选择提交人弹窗参数
      userWindowVisible: false,
      title: '选择提交人',
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      resultParams: {
        planName: '',
        projId: '',
        vulnporjId: '',
        reinStatus: '1',
        auditName: '',
        audit: ''
      },
      // 审核信息
      auditParams: {
        isOK: 'Y',
        reportName: '',
        report: '',
        auditNote: ''
      },
      auditParamsRules: {
        isOK: [
          { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        reportName: [
          { required: true, message: '请选择提交人', trigger: 'blur' }
        ],
        auditNote: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      // 查看方案弹窗参数
      projDialogVisible: false,
      taskProjParams: {

      },
      groupView: false
    }
  },
  mounted() {
    const taskId = this.$route.query.taskId
    const busiId = this.$route.query.busiId
    const type = this.$route.query.type
    this.taskId = taskId
    this.busiId = busiId
    if (type === 'plan') {
      this.typeStr = '方案'
    } else {
      this.typeStr = '结果'
    }

    this.queryReinforceTask()
    this.getWfTaskVarialbe()
  },
  methods: {
    // 取消按钮
    cancle() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
    // 确认按钮
    async save(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this.auditParams
          params.taskId = this.taskId
          params.busiId = this.busiId
          this.$store.dispatch(this.saveUrl, params).then(resp => {
            this.$router.push({ path: '/system/workflow/busiTaskList' })
          }).catch(
          )
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
    // 查询加固任务详情
    queryReinforceTask() {
      this.$store.dispatch(this.queryTaskUrl, { reintaskId: this.busiId }).then(resp => {
        this.getProvinceList()
        this.addParams = Object.assign({}, resp)
        this.addParams.taskStatus = this.addParams.taskStatus + ''
        this.addParams.taskResult = this.addParams.taskResult + ''
        this.addParams.taskType = this.addParams.taskType + ''
        this.addParams.createBy = this.addParams.createBy + ''

        this.resultParams.planName = resp.projName
        this.resultParams.projId = resp.projId
        this.resultParams.vulnporjId = resp.vulnporjId
      }).catch(
      )
    },
    // 查询流程变量
    getWfTaskVarialbe() {
      this.$store.dispatch(this.taskVariableUrl, { taskId: this.taskId }).then(resp => {
        this.resultParams.audit = resp.audit
        this.resultParams.auditName = resp.auditName
      }).catch(
      )
    },
    // 查询加固省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.auditParams.reportName = data.userName
      $self.auditParams.report = data.userId
    },
    // 获取方案列表
    getReinforceProjList() {
      this.$refs['projDatagridTest'].reload()
    },
    // 查看方案弹窗
    lookPlan() {
      this.projDialogVisible = true
      this.getProvinceList()
      this.$store.dispatch(this.queryProjUrl, { vulnprojId: this.resultParams.vulnporjId }).then(resp => {
        this.taskProjParams = Object.assign({}, resp)
        this.taskProjParams.projSrc = this.taskProjParams.projSrc + ''
        this.taskProjParams.reinStatus = this.taskProjParams.reinStatus + ''
        this.taskProjParams.pubStatus = this.taskProjParams.pubStatus + ''
        this.taskProjParams.createBy = this.taskProjParams.createBy + ''
        if (resp.createBy + '' === '1') {
          this.groupView = true
        } else {
          this.groupView = false
        }
      }).catch(
      )
    },
    // 下拉框改变事件
    changeIsOK() {
      const val = this.auditParams.isOK
      if (val === 'Y') {
        this.auditParamsRules.reportName = [
          { required: true, message: '请选择提交人', trigger: 'blur' }
        ]
      } else if (val === 'N') {
        this.auditParamsRules.reportName = []
      }
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%
}
</style>
