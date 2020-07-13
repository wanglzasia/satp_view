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

        <!--审核信息-->
        <div v-if="auditResultView" style="padding-top: 30px;">
          <div class="satp-grid-title">审核意见</div>
          <el-form ref="resultForm" :model="varialbeParams" label-position="right" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="审核人">
                  <el-input v-model="varialbeParams.auditName" placeholder="审核人" readonly="readonly" />
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

        <!--选择方案-->
        <div style="padding-top: 30px;">
          <div class="satp-grid-title">{{ typeStr }}</div>
          <el-form ref="resultForm" :model="resultParams" label-position="right" label-width="120px" :rules="reusltParamsRules" size="small">
            <el-row>
              <el-col :span="14" :offset="4">
                <el-form-item label="方案" prop="planName">
                  <el-input v-model="resultParams.planName" placeholder="方案" readonly="readonly" />
                  <input v-model="resultParams.projId" type="hidden">
                  <input v-model="resultParams.vulPorjId" type="hidden">
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="choosePlan">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="是否存在此漏洞" prop="isExist">
                  <el-select v-model="resultParams.isExist" placeholder="是否存在此漏洞">
                    <el-option label="存在" value="1" />
                    <el-option label="不存在" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否可行" prop="isFsb">
                  <el-select v-model="resultParams.isFsb" placeholder="是否可行">
                    <el-option label="可行" value="1" />
                    <el-option label="不可行" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="4">
                <el-form-item label="验证方式" prop="validMethod">
                  <el-select v-model="resultParams.validMethod" placeholder="验证方式">
                    <el-option label="渗透测试" value="1" />
                    <el-option label="上传脚本" value="2" />
                    <el-option label="针对漏洞描述攻击测试" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="验证省份" prop="validProvice">
                  <el-select v-model="resultParams.validProvice">
                    <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" :offset="4">
                <el-form-item label="审核人" prop="auditName">
                  <el-input v-model="resultParams.auditName" placeholder="审核人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="resultParams.audit" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!--选择方案弹窗-->
          <el-dialog title="选择方案" :visible.sync="projDialogVisible" width="70%">
            <el-form
              :model="queryProjParams"
              label-position="left"
              label-width="90px"
              size="small"
              class="satp-form-inline"
            >
              <!--模糊查询输入框-->
              <el-row>
                <el-col :span="6">
                  <el-form-item label="方案名称">
                    <el-input v-model="queryProjParams.valprojName" placeholder="方案名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="CVEID">
                    <el-input v-model="queryProjParams.cveId" placeholder="CVEID" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="方案来源">
                    <el-select v-model="queryProjParams.projSrc" placeholder="方案来源">
                      <el-option label="全部" value="" />
                      <el-option label="集团下发" value="1" />
                      <el-option label="省公司创建" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <div class="satp-from-btngrp-std">
                    <el-button size="small" type="primary" @click="getValidPlanList">
                      <i class="el-icon-search" />查询
                    </el-button>
                  </div>
                </el-col>

              </el-row>
            </el-form>

            <!--方案datagrid表格-->
            <satp-datagrid
              ref="projDatagridTest"
              :url="projUrl"
              :qparams="queryProjParams"
              :columns="projColumns"
              checkbox
              border
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="projDialogVisible = false">取 消</el-button>
              <el-button type="primary" size="small" @click="getSelData">确 定</el-button>
            </span>
          </el-dialog>

          <!--选择审核人弹窗-->
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
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  data() {
    return {
      queryTaskUrl: 'vulnValid/queryValidTaskById',
      provinceUrl: 'dataDict/queryDataDictList',
      projUrl: 'vulnValid/vulnValidPlanListData',
      saveUrl: 'vulnValid/createPlan',
      taskVariableUrl: 'workflow/getTaskVariable',
      taskId: '',
      busiId: '',
      typeStr: '',
      addParams: {},
      provinceList: [],
      // 选择审核人弹窗参数
      userWindowVisible: false,
      title: '选择审核人',
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      resultParams: {},
      reusltParamsRules: {
        planName: [
          { required: true, message: '请选择方案', trigger: 'blur' }
        ],
        isExist: [
          { required: true, message: '请选择是否存在此漏洞', trigger: 'blur' }
        ],
        isFsb: [
          { required: true, message: '请选择是否可行', trigger: 'blur' }
        ],
        validMethod: [
          { required: true, message: '请选择验证方式', trigger: 'blur' }
        ],
        validProvice: [
          { required: true, message: '请选择验证省份', trigger: 'blur' }
        ],
        auditName: [
          { required: true, message: '请选择审核人', trigger: 'blur' }
        ]
      },
      // 选择方案弹窗参数
      projDialogVisible: false,
      queryProjParams: {},
      projColumns: [
        { label: '二级编码', prop: 'VALPROJ_ID', width: 100, align: 'center' },
        { label: '一级编码', prop: 'PROJ_ID', width: 100, align: 'center' },
        { label: '方案名称', prop: 'VALPROJ_NAME', width: 160, align: 'left' },
        { label: '漏洞名称', prop: 'VULN_NAME', width: 160, align: 'left' },
        { label: 'CVEID', prop: 'CVE_ID', width: 100, align: 'center' },
        { label: '受影响资产', prop: 'RES_TYPE', width: 100, align: 'center' },
        { label: '下发时间', prop: 'SEND_TIME', width: 120, align: 'center', formatter: this.sendTimeFormatter },
        { label: '创建时间', prop: 'CREATE_TIME', width: 120, align: 'center', formatter: this.createTimeFormatter },
        { label: '方案来源', prop: 'PROJ_SRC', width: 100, align: 'center', formatter: this.projSrcFormatter },
        { label: '状态', prop: 'IS_ACTIVE', width: 100, align: 'center', formatter: this.isActiveFormatter }
      ],
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
          const params = this.resultParams
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
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      // $self.resultParams.auditName = data.userName
      // $self.resultParams.audit = data.userId
      $self.$set(this.resultParams, 'audit', data.userId)
      $self.$set(this.resultParams, 'auditName', data.userName)
    },
    // 获取方案列表
    getValidPlanList() {
      this.$refs['projDatagridTest'].reload()
    },
    // 选择方案弹窗
    choosePlan() {
      this.projDialogVisible = true
    },
    // 选择方案
    getSelData() {
      const selectRows = this.$refs.projDatagridTest.getSelectRows()
      if (selectRows.length > 1) {
        this.$message({
          message: '只能选择一个方案！',
          type: 'warning'
        })
        return
      }
      this.$set(this.resultParams, 'projId', selectRows[0].PROJ_ID)
      this.$set(this.resultParams, 'planName', selectRows[0].VALPROJ_NAME)
      this.$set(this.resultParams, 'valprojId', selectRows[0].VALPROJ_ID)
      this.projDialogVisible = false
    },
    // 查询流程变量
    getWfTaskVarialbe() {
      this.$store.dispatch(this.taskVariableUrl, { taskId: this.taskId }).then(resp => {
        const isOK = resp.isOK
        if (isOK === 'N') {
          this.auditResultView = true
          this.varialbeParams.auditName = resp.auditName
          this.varialbeParams.isOK = resp.isOK
          this.varialbeParams.auditNote = resp.auditNote
        }
      }).catch(
      )
    },
    // 下发时间
    sendTimeFormatter(row) {
      return this.datetimeFormat(row.SEND_TIME)
    },
    // 创建时间
    createTimeFormatter(row) {
      return this.datetimeFormat(row.CREATE_TIME)
    },
    // 方案来源
    projSrcFormatter(row) {
      const projSrc = row.PROJ_SRC
      let ret = ''
      if (projSrc === 1) {
        ret = '集团下发'
      } else if (projSrc === 2) {
        ret = '省公司创建'
      }
      return ret
    },
    // 状态
    isActiveFormatter(row) {
      const isActive = row.IS_ACTIVE
      let ret = ''
      if (isActive === 0) {
        ret = '失效'
      } else if (isActive === 1) {
        ret = '有效'
      }
      return ret
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
.el-select {
  width: 100%
}
</style>
