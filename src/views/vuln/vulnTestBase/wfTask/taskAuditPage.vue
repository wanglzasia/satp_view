<template>
  <div>
    <div class="app-container">
      <el-card>
        <div class="satp-grid-title">任务信息</div>
        <!--任务详情-->
        <!--<el-form :model="taskParams" label-width="120px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item label="任务名称">
                <el-input v-model="taskParams.vulTesttaskName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入库时间">
                <el-date-picker
                  v-model="taskParams.storageTime"
                  type="datetime"
                  :readonly="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="漏洞名称">
                <el-input v-model="taskParams.vulName" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务响应级别">
                <el-select v-model="taskParams.vulTesttaskLevel" :disabled="true">
                  <el-option label="高" value="1" />
                  <el-option label="中" value="2" />
                  <el-option label="低" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="一级编码">
                <el-input v-model="taskParams.vulTesttaskId" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CVEID" prop="vulCveid">
                <el-input v-model="taskParams.vulCveid" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="爆发省份">
                <el-select v-model="taskParams.fromProvice" :disabled="true">
                  <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="爆发业务系统">
                <el-select v-model="taskParams.fromBusi" :disabled="true">
                  <el-option label="BOSS" value="0" />
                  <el-option label="CRM" value="1" />
                  <el-option label="BASS" value="2" />
                  <el-option label="BOMC" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="当前责任人">
                <el-input v-model="taskParams.responName" placeholder="当前责任人" readonly="readonly" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="测试状态">
                <el-select v-model="taskParams.vulTesttaskState" :disabled="true">
                  <el-option label="未测试" value="0" />
                  <el-option label="测试中" value="1" />
                  <el-option label="已测试" value="2" />
                  <el-option label="已发布" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案来源">
                <el-select v-model="taskParams.taskSrc" :disabled="true">
                  <el-option label="集团" value="1" />
                  <el-option label="省份" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="测试通知范围">
                <el-select v-model="taskParams.noticeType" :disabled="true">
                  <el-option label="请选择" value="" />
                  <el-option label="组织" value="2" />
                  <el-option label="人员" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发布时间">
                <el-date-picker
                  v-model="taskParams.publishTime"
                  type="datetime"
                  :readonly="true"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="orgView" :span="12">
              <el-form-item label="通知组织">
                <el-input v-model="taskParams.orgNames" type="textarea" :readonly="true" />
              </el-form-item>
            </el-col>
            <el-col v-if="personView" :span="12">
              <el-form-item label="通知人员" prop="noticeUserNames">
                <el-input v-model="taskParams.noticeUserNames" type="textarea" readonly="readonly" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="taskParams.note" type="textarea" :readonly="true" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>-->
        <table class="satp-table-detail">
          <tr>
            <th>任务名称</th>
            <td>{{ taskParams.vulTesttaskName }}</td>
            <th>入库时间</th>
            <td>{{ datetimeFormat(taskParams.storageTime) }}</td>
          </tr>
          <tr>
            <th>漏洞名称</th>
            <td>{{ taskParams.vulName }}</td>
            <th>任务响应级别</th>
            <td>{{ vulTesttaskLevelFormatter(taskParams.vulTesttaskLevel) }}</td>
          </tr>
          <tr>
            <th>一级编码</th>
            <td>{{ taskParams.vulTesttaskId }}</td>
            <th>CVEID</th>
            <td>{{ taskParams.vulCveid }}</td>
          </tr>
          <tr>
            <th>爆发省份</th>
            <td>{{ taskParams.provName }}</td>
            <th>爆发业务系统</th>
            <td>{{ fromBusiFormatter(taskParams.fromBusi) }}</td>
          </tr>
          <tr>
            <th>当前责任人</th>
            <td>{{ taskParams.responName }}</td>
            <th>测试状态</th>
            <td>{{ vulTesttaskStateFormatter(taskParams.vulTesttaskState) }}</td>
          </tr>
          <tr>
            <th>方案来源</th>
            <td>{{ taskSrcFormatter(taskParams.taskSrc) }}</td>
            <th>测试通知范围</th>
            <td>{{ taskParams.noticeTypeStr }}</td>
          </tr>
          <tr>
            <th>发布时间</th>
            <td>{{ datetimeFormat(taskParams.publishTime) }}</td>
            <th v-if="orgView">通知组织</th>
            <td v-if="orgView">{{ taskParams.orgNames }}</td>
            <th v-if="personView">通知人员</th>
            <td v-if="personView">{{ taskParams.noticeUserNames }}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="3">{{ taskParams.note }}</td>
          </tr>
        </table>

        <div style="padding-top: 30px;">
          <div class="satp-grid-title">关联方案</div>

          <!--<el-form ref="submitForm" :model="submitParams" label-position="right" label-width="120px" :rules="submitParamsRules" size="small">
            <el-row>
              <el-col :span="10" :offset="6">
                <el-form-item label="方案" prop="vulPlanname">
                  <el-input v-model="submitParams.vulPlanname" placeholder="方案" readonly="readonly" />
                  <input v-model="submitParams.planId" type="hidden">
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="choosePlan">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="测试开始时间" prop="testStarttime">
                  <el-date-picker
                    v-model="submitParams.testStarttime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="是否解决" prop="solutionFlag">
                  <el-select v-model="submitParams.solutionFlag">
                    <el-option label="解决" value="1" />
                    <el-option label="未解决" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="审核人" prop="auditAssgin">
                  <el-input v-model="submitParams.auditAssgin" placeholder="审核人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="submitParams.auditAssginId" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>-->
          <table class="satp-table-detail">
            <tr>
              <th>方案名称</th>
              <td colspan="3"><span style="color: #409eff;" :title="taskParams.vulPlanname" @click="planDetail"><a>{{ taskParams.vulPlanname }}</a></span></td>
            </tr>
            <tr>
              <th>测试开始时间</th>
              <td>{{ datetimeFormat(taskParams.testStarttime) }}</td>
              <th>是否解决</th>
              <td>{{ taskParams.solutionFlag === '1' ? '解决' : '未解决' }}</td>
            </tr>
          </table>
        </div>

        <div style="padding-top: 30px;">
          <div class="satp-grid-title">解决方案审核</div>

          <el-form ref="auditForm" :model="auditParams" label-position="right" label-width="120px" :rules="auditParamsRules" size="small">
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="审核结果" prop="isOK">
                  <el-select v-model="auditParams.isOK" @change="changeIsOK">
                    <el-option label="不通过" value="N" />
                    <el-option label="通过" value="Y" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="reportAssginView">
              <el-col :span="12" :offset="6">
                <el-form-item label="上报人" prop="reportAssgin">
                  <el-input v-model="auditParams.reportAssgin" placeholder="审核人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="auditParams.reportAssginId" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="审核建议" prop="auditAdvice">
                  <el-input v-model="auditParams.auditAdvice" type="textarea" placeholder="审核建议" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="text-align: center;padding-top: 30px;">
          <span>
            <el-button type="text" size="small" @click="cancle">取 消</el-button>
            <el-button type="primary" size="small" @click="save('auditForm')">确 定</el-button>
          </span>
        </div>

        <!--查看方案弹窗-->
        <el-dialog
          title="查看方案"
          :visible.sync="lookPlanDialogVisible"
          width="50%"
          :close-on-click-modal="false"
        >
          <el-form
            :model="planParams"
            label-position="left"
            label-width="90px"
            size="small"
            class="satp-form-inline"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称">
                  <el-input v-model="planParams.vulPlanname" :readonly="true" placeholder="方案名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="一级编码">
                  <el-input v-model="planParams.vulPlanid" :readonly="true" placeholder="一级编码" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="planParams.vulName" :readonly="true" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="CVEID">
                  <el-input v-model="planParams.vulId" :readonly="true" placeholder="CVEID" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案来源">
                  <el-select v-model="planParams.planSrc" :disabled="true" placeholder="方案来源">
                    <el-option label="集团" value="1" />
                    <el-option label="省份" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发布状态">
                  <el-select v-model="planParams.solutionFlag" :disabled="true" placeholder="发布状态">
                    <el-option label="发布" value="1" />
                    <el-option label="未发布" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="解决方案">
                  <el-input v-model="planParams.solutionDetails" :readonly="true" type="textarea" placeholder="解决方案" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注信息">
                  <el-input v-model="planParams.note" :readonly="true" type="textarea" placeholder="备注信息" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="lookPlanDialogVisible = false">取 消</el-button>
            <el-button type="primary" size="small" @click="lookPlanDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!--选择通知人员弹窗-->
        <user-window
          v-if="userWindowVisible"
          :title="title"
          :parent-component-param="prentComponentParam"
          :multiple="multiple"
          :visible.sync="userWindowVisible"
          :modal-append-to-body="false"
          @getUserInfo="getUserInfo"
        />
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
      busiId: '',
      taskId: '',
      detailUrl: 'vulnTest/queryTestTask',
      orgOrUserUrl: 'vulnTest/queryOrgsOrUsers',
      provinceUrl: 'dataDict/queryDataDictList',
      planUrl: 'vulnTest/queryTestPlan',
      saveUrl: 'vulnTest/solutionAudit',
      taskParams: {
        vulTesttaskName: '',
        storageTime: '',
        vulName: '',
        vulTesttaskLevel: '',
        vulTesttaskId: '',
        vulCveid: '',
        fromProvice: '',
        fromBusi: '',
        responName: '',
        vulTesttaskState: '',
        taskSrc: '',
        noticeType: '',
        publishTime: '',
        note: ''
      },
      // 通知组织输入框
      orgView: false,
      // 通知人员输入框
      personView: false,
      // 上报省份列表
      provinceList: [],
      // 新增责任人弹窗参数
      userWindowVisible: false,
      prentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择上报人', // 弹出框标题
      // 审核参数
      auditParams: {},
      auditParamsRules: {
        isOK: [
          { required: true, message: '请选择审核结果', trigger: 'blur' }
        ]
      },
      reportAssginView: false,
      // 查看方案弹窗参数
      lookPlanDialogVisible: false,
      planParams: {}
    }
  },
  mounted() {
    const taskId = this.$route.query.taskId
    const busiId = this.$route.query.busiId
    this.taskId = taskId
    this.busiId = busiId

    this.getTaskDetail()
    // this.getProvinceList()
  },
  methods: {
    cancle() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
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
    // 查询任务详情
    getTaskDetail() {
      this.$store.dispatch(this.detailUrl, { taskId: this.busiId }).then(resp => {
        this.taskParams = Object.assign({}, resp)
        if (this.taskParams.noticeType === '2') {
          this.orgView = true
          this.personView = false
          this.taskParams.noticeTypeStr = '组织'
        } else if (this.taskParams.noticeType === '3') {
          this.orgView = false
          this.personView = true
          this.taskParams.noticeTypeStr = '人员'
        } else {
          this.orgView = false
          this.personView = false
        }
        this.queryOrgOrUser()
      }).catch(
      )
    },
    // 查询通知组织或人员
    queryOrgOrUser() {
      this.$store.dispatch(this.orgOrUserUrl, { taskId: this.busiId, noticeType: this.taskParams.noticeType }).then(resp => {
        if (this.taskParams.noticeType === '2') { // 组织
          let orgNames = ''
          resp.rows.forEach(e => {
            orgNames += e.orgName + ','
          })
          this.taskParams.orgNames = orgNames.substring(0, orgNames.length - 1)
        } else if (this.taskParams.noticeType === '3') { // 人员
          let userNames = ''
          resp.rows.forEach(e => {
            userNames += e.userName + ','
          })
          this.taskParams.noticeUserNames = userNames.substring(0, userNames.length - 1)
        }
        // 强制刷新，避免修改的变量值不展示
        this.$forceUpdate()
      }).catch(
      )
    },
    // 查看方案详情
    planDetail() {
      this.lookPlanDialogVisible = true
      this.$store.dispatch(this.planUrl, { planId: this.taskParams.planId }).then(resp => {
        this.planParams = Object.assign({}, resp)
        this.planParams.planSrc = this.planParams.planSrc + ''
      }).catch(
      )
    },
    // 审核结果改变事件
    changeIsOK() {
      const isOK = this.auditParams.isOK
      if (isOK === 'Y') { // 通过
        this.reportAssginView = true
        this.auditParams.vulTaskState = '3'
        this.auditParamsRules.reportAssgin = [{ required: true, message: '请选择上报人', trigger: 'blur' }]
      } else {
        this.reportAssginView = false
        this.auditParams.vulTaskState = ''
        this.auditParamsRules.reportAssgin = []
      }
    },
    // 查询省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 时间转换
    datetimeFormat(el) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      let value = ''
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    // 方案来源
    taskSrcFormatter(val) {
      const taskSrc = val
      let ret = ''
      if (taskSrc === 1) {
        ret = '集团'
      } else if (taskSrc === 2) {
        ret = '省份'
      }
      return ret
    },
    // 爆发系统
    fromBusiFormatter(val) {
      const fromBusi = val
      let ret = ''
      if (fromBusi === '0') {
        ret = 'BOSS'
      } else if (fromBusi === '1') {
        ret = 'CRM'
      } else if (fromBusi === '2') {
        ret = 'BASS'
      } else if (fromBusi === '3') {
        ret = 'BOMC'
      }
      return ret
    },
    // 响应级别
    vulTesttaskLevelFormatter(val) {
      const vulTesttaskLevel = val
      let ret = ''
      if (vulTesttaskLevel === '1') {
        ret = '高'
      } else if (vulTesttaskLevel === '2') {
        ret = '中'
      } else if (vulTesttaskLevel === '3') {
        ret = '低'
      }
      return ret
    },
    // 测试状态
    vulTesttaskStateFormatter(val) {
      const vulTesttaskState = val
      let ret = ''
      if (vulTesttaskState === '0') {
        ret = '未测试'
      } else if (vulTesttaskState === '1') {
        ret = '测试中'
      } else if (vulTesttaskState === '2') {
        ret = '已测试'
      } else if (vulTesttaskState === '3') {
        ret = '已发布'
      }
      return ret
    },
    // 是否发布
    solutionFlagFormatter(row) {
      const solutionFlag = row.solutionFlag
      let ret = ''
      if (solutionFlag === '0') {
        ret = '否'
      } else if (solutionFlag === '1') {
        ret = '是'
      }
      return ret
    },
    // 方案来源
    planSrcFormatter(row) {
      const planSrc = row.planSrc
      let ret = ''
      if (planSrc === 1) {
        ret = '集团'
      } else if (planSrc === 2) {
        ret = '省份'
      }
      return ret
    },
    // 创建时间
    createTimeFormatter(row) {
      return this.datetimeFormat(row.createTime)
    },
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      this.$set($self.auditParams, 'reportAssgin', data.userName)
      this.$set($self.auditParams, 'reportAssginId', data.userId)
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
.el-select, .el-select--small {
  width: 100%;
}
</style>
