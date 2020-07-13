<template>
  <div>
    <div class="app-container">
      <el-card>

        <!--任务信息-->
        <div>
          <div class="satp-grid-title">任务信息</div>
          <el-form ref="form" :model="addParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码">
                  <el-input v-model="addParams.taskId" placeholder="一级编码" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级编码">
                  <el-input v-model="addParams.valtaskId" placeholder="二级编码" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务名称">
                  <el-input v-model="addParams.taskName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="影响资产">
                  <el-input v-model="addParams.resType" placeholder="影响资产" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人">
                  <el-input v-model="addParams.dealMan" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务分类">
                  <el-select v-model="addParams.taskType" placeholder="任务分类" :disabled="true">
                    <el-option label="验证任务" value="1" />
                    <el-option label="执行任务" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务状态">
                  <el-select v-model="addParams.taskStatus" :disabled="true">
                    <el-option label="未完成" value="0" />
                    <el-option label="完成" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div v-if="auditResultView" style="padding-top: 30px;">
          <div class="satp-grid-title">审核结果</div>
          <el-form ref="resultForm" :model="varialbeParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审批人">
                  <el-input v-model="varialbeParams.auditName" placeholder="审批人" readonly="readonly" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审批结果">
                  <el-select v-model="varialbeParams.isOK" :disabled="true">
                    <el-option label="通过" value="Y" />
                    <el-option label="不通过" value="N" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="审批意见">
                  <el-input v-model="varialbeParams.auditNote" type="textarea" placeholder="审批意见" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!--方案信息-->
        <div style="padding-top: 30px;">
          <div class="satp-grid-title">{{ typeStr }}</div>
          <el-form ref="projForm" :model="addParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="22">
                <el-form-item label="方案">
                  <el-input v-model="addParams.projName" readonly="readonly" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="lookPlan(addParams.valprojId)">查看</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否存在此漏洞">
                  <el-select v-model="addParams.isExist" :disabled="true">
                    <el-option label="存在" value="1" />
                    <el-option label="不存在" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可行">
                  <el-select v-model="addParams.isFsb" :disabled="true">
                    <el-option label="可行" value="1" />
                    <el-option label="不可行" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="验证方式">
                  <el-select v-model="addParams.validMethod" :disabled="true">
                    <el-option label="渗透测试" value="1" />
                    <el-option label="上传脚本" value="2" />
                    <el-option label="针对漏洞描述攻击测试" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验证省份">
                  <el-select v-model="addParams.validProvice" :disabled="true">
                    <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核人">
                  <el-input v-model="addParams.auditName" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!--查看弹窗-->
          <el-dialog title="查看方案" :visible.sync="projDialogVisible" width="50%">
            <el-form :model="projParams" label-width="120px" size="small">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="一级编码">
                    <el-input v-model="projParams.projId" placeholder="一级编码" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="二级编码">
                    <el-input v-model="projParams.valprojId" placeholder="二级编码" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="方案名称">
                    <el-input v-model="projParams.valprojName" placeholder="方案名称" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="方案来源">
                    <el-select v-model="projParams.projSrc" placeholder="方案来源" :disabled="true">
                      <el-option label="集团下发" value="1" />
                      <el-option label="省公司创建" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="漏洞CVEID">
                    <el-input v-model="projParams.cveId" placeholder="漏洞CVEID" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="漏洞名称">
                    <el-input v-model="projParams.vulnName" placeholder="漏洞名称" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="受影响资产">
                    <el-input v-model="projParams.resType" placeholder="受影响资产" :readonly="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="下发时间">
                    <el-date-picker
                      v-model="projParams.sendTime"
                      type="datetime"
                      :readonly="true"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="方案状态">
                    <el-select v-model="projParams.isActive" placeholder="方案状态" :disabled="true">
                      <el-option label="失效" value="0" />
                      <el-option label="有效" value="1" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="漏洞描述">
                    <el-input v-model="projParams.vulnDetail" type="textarea" placeholder="漏洞描述" :readonly="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="验证方案详情">
                    <el-input v-model="projParams.projDetail" type="textarea" placeholder="验证方案详情" :readonly="true" />
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

        <!--审核信息-->
        <div style="padding-top: 30px;">
          <div class="satp-grid-title">审核信息</div>
          <el-form ref="auditForm" :model="auditParams" label-position="right" label-width="120px" :rules="auditParamsRules" size="small">
            <el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="是否通过" prop="isOk">
                  <el-select v-model="auditParams.isOk">
                    <el-option label="通过" value="Y" />
                    <el-option label="不通过" value="N" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上报人" prop="rptUsrName">
                  <el-input v-model="auditParams.rptUsrName" placeholder="上报人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="auditParams.rptUsrId" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-form-item label="审核意见" prop="auditNote">
                  <el-input v-model="auditParams.auditNote" type="textarea" placeholder="审核意见" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>

        <!--选择上报人弹窗-->
        <user-window
          v-if="userWindowVisible"
          :title="title"
          :parent-component-param="parentComponentParam"
          :multiple="multiple"
          :visible.sync="userWindowVisible"
          :modal-append-to-body="false"
          @getUserInfo="getUserInfo"
        />

        <div style="text-align: center;padding-top: 30px;">
          <span>
            <el-button type="text" size="small" @click="cancle">取 消</el-button>
            <el-button type="primary" size="small" @click="save('auditForm')">确 定</el-button>
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
      queryTaskUrl: 'vulnValid/queryValidTaskById',
      provinceUrl: 'dataDict/queryDataDictList',
      infoUrl: 'vulnValid/queryValidPlanById',
      saveUrl: 'vulnValid/auditPlan',
      taskVariableUrl: 'workflow/getTaskVariable',
      taskId: '',
      busiId: '',
      typeStr: '',
      addParams: {},
      provinceList: [],
      // 选择审核人弹窗参数
      userWindowVisible: false,
      title: '选择上报人',
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      // 提交参数
      auditParams: {},
      auditParamsRules: {
        isOk: [
          { required: true, message: '请选择是否通过', trigger: 'blur' }
        ],
        rptUsrName: [
          { required: true, message: '请选择方案上报人', trigger: 'blur' }
        ],
        auditNote: [
          { required: true, message: '审核意见不能为空', trigger: 'blur' }
        ]
      },
      // 查看方案弹窗参数
      projDialogVisible: false,
      projParams: {},
      // 是否展示审批结果
      auditResultView: false,
      // 流程变量参数
      varialbeParams: {}
    }
  },
  mounted() {
    const taskId = this.$route.query.taskId
    const busiId = this.$route.query.id
    const type = this.$route.query.type
    this.taskId = taskId
    this.busiId = busiId
    if (type === 'plan') {
      this.typeStr = '验证方案'
    } else {
      this.typeStr = '验证结果'
    }

    this.queryValidTask()
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
    // 查询验证任务详情
    queryValidTask() {
      this.$store.dispatch(this.queryTaskUrl, { valtaskId: this.busiId }).then(resp => {
        this.getProvinceList()
        this.$set(this.addParams, 'taskId', resp.data.TASK_ID)
        this.$set(this.addParams, 'valtaskId', resp.data.VALTASK_ID)
        this.$set(this.addParams, 'taskName', resp.data.TASK_NAME)
        this.$set(this.addParams, 'vulName', resp.data.VUL_NAME)
        this.$set(this.addParams, 'resType', resp.data.RES_TYPE)
        this.$set(this.addParams, 'dealMan', resp.data.DEAL_MAN)
        this.$set(this.addParams, 'taskType', resp.data.TASK_TYPE + '')
        this.$set(this.addParams, 'taskStatus', resp.data.TASK_STATUS + '')

        this.$set(this.addParams, 'valprojId', resp.data.VALPROJ_ID)
        this.$set(this.addParams, 'projName', resp.data.PROJ_NAME)
        this.$set(this.addParams, 'isExist', resp.data.IS_EXIST + '')
        this.$set(this.addParams, 'isFsb', resp.data.IS_FSB + '')
        this.$set(this.addParams, 'validMethod', resp.data.VALID_METHOD)
        this.$set(this.addParams, 'validProvice', resp.data.VALID_PROVICE + '')
      }).catch(
      )
    },
    // 查询验证省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 选择上报人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.$set(this.auditParams, 'rptUsrId', data.userId)
      $self.$set(this.auditParams, 'rptUsrName', data.userName)
    },
    // 查看方案弹窗
    lookPlan(id) {
      this.projDialogVisible = true

      this.getValidPlanById(id)
    },
    // 根据id查询验证方案详情
    getValidPlanById(id) {
      this.$store.dispatch(this.infoUrl, { valprojId: id }).then(resp => {
        this.$set(this.projParams, 'projId', resp.data.PROJ_ID)
        this.$set(this.projParams, 'valprojId', resp.data.VALPROJ_ID)
        this.$set(this.projParams, 'valprojName', resp.data.VALPROJ_NAME)
        this.$set(this.projParams, 'projSrc', resp.data.PROJ_SRC + '')
        this.$set(this.projParams, 'cveId', resp.data.CVE_ID)
        this.$set(this.projParams, 'vulnName', resp.data.VULN_NAME)
        this.$set(this.projParams, 'resType', resp.data.RES_TYPE)
        this.$set(this.projParams, 'sendTime', this.datetimeFormat(resp.data.SEND_TIME))
        this.$set(this.projParams, 'isActive', resp.data.IS_ACTIVE + '')
        this.$set(this.projParams, 'vulnDetail', resp.data.VULN_DETAIL)
        this.$set(this.projParams, 'projDetail', resp.data.PROJ_DETAIL)
      }).catch(
      )
    },
    // 查询流程变量
    getWfTaskVarialbe() {
      this.$store.dispatch(this.taskVariableUrl, { taskId: this.taskId }).then(resp => {
        this.$set(this.addParams, 'auditName', resp.auditName)
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
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select {
  width: 100%;
}
</style>
