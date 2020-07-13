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

        <div style="padding-top: 30px;">
          <div class="satp-grid-title">{{ typeStr }}</div>
          <el-form ref="resultForm" :model="resultParams" label-position="right" label-width="120px" :rules="reusltParamsRules" size="small">
            <el-row>
              <el-col :span="10" :offset="6">
                <el-form-item label="方案" prop="planName">
                  <el-input v-model="resultParams.planName" placeholder="方案" readonly="readonly" />
                  <input v-model="resultParams.projId" type="hidden">
                  <input v-model="resultParams.vulnporjId" type="hidden">
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="choosePlan">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="加固结果" prop="reinStatus">
                  <el-select v-model="resultParams.reinStatus">
                    <el-option label="加固可行" value="1" />
                    <el-option label="加固不可行" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
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
                    <el-input v-model="queryProjParams.projName" placeholder="方案名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="方案状态">
                    <el-select v-model="queryProjParams.pubStatus" placeholder="方案状态">
                      <el-option label="全部" value="" />
                      <el-option label="未发布" value="1" />
                      <el-option label="已发布" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="方案来源">
                    <el-select v-model="queryProjParams.createBy" placeholder="方案来源">
                      <el-option label="全部" value="" />
                      <el-option label="集团" value="1" />
                      <el-option label="省份" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <div class="satp-from-btngrp-std">
                    <el-button size="small" type="primary" @click="getReinforceProjList">
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
      queryTaskUrl: 'vulnReinforce/queryReinforceTask',
      provinceUrl: 'dataDict/queryDataDictList',
      projUrl: 'vulnReinforce/reinforceProjList',
      saveUrl: 'vulnReinforce/reinforceProjOrResult',
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
      // 选择审核人弹窗参数
      userWindowVisible: false,
      title: '选择审核人',
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
      reusltParamsRules: {
        planName: [
          { required: true, message: '请选择方案', trigger: 'blur' }
        ],
        reinStatus: [
          { required: true, message: '请选择加固结果', trigger: 'blur' }
        ],
        auditName: [
          { required: true, message: '请选择审核人', trigger: 'blur' }
        ]
      },
      // 选择方案弹窗参数
      projDialogVisible: false,
      queryProjParams: {
        projName: '',
        pubStatus: '',
        createBy: ''
      },
      projColumns: [
        { label: '方案名称', prop: 'projName', align: 'left' },
        { label: '一级编号', prop: 'projId', width: 80, align: 'center' },
        { label: '二级编号', prop: 'vulnprojId', width: 80, align: 'center' },
        { label: '方案来源', prop: 'projSrc', width: 80, align: 'center', formatter: this.projSrcFormatter },
        { label: '漏洞名称', prop: 'vulnName', width: 100, align: 'left' },
        { label: '下发省份', prop: 'provName', width: 100, align: 'center' },
        { label: '加固结果', prop: 'reinStatus', width: 100, align: 'center', formatter: this.reinStatusFormatter },
        { label: '方案状态', prop: 'pubStatus', width: 100, align: 'center', formatter: this.projPubStatusFormatter },
        { label: '方案来源', prop: 'createBy', width: 100, align: 'center', formatter: this.createByFormatter }
      ],
      // 是否展示审批结果
      auditResultView: false,
      // 流程变量参数
      varialbeParams: {}
    }
  },
  mounted() {
    const taskId = this.$route.query.taskId
    const busiId = this.$route.query.busiId
    const type = this.$route.query.type
    this.taskId = taskId
    this.busiId = busiId
    if (type === 'plan') {
      this.typeStr = '选择方案'
    } else {
      this.typeStr = '反馈结果'
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
      $self.resultParams.auditName = data.userName
      $self.resultParams.audit = data.userId
    },
    // 获取方案列表
    getReinforceProjList() {
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
      this.resultParams.projId = selectRows[0].projId
      this.resultParams.planName = selectRows[0].projName
      this.resultParams.vulnporjId = selectRows[0].vulnprojId
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
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%
}
</style>
