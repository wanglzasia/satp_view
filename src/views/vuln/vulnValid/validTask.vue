<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="queryParams"
          label-position="left"
          label-width="90px"
          size="small"
          class="satp-form-inline"
        >
          <!--模糊查询输入框-->
          <el-row>
            <el-col :span="6">
              <el-form-item label="任务名称">
                <el-input v-model="queryParams.TASK_NAME" placeholder="任务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务分类">
                <el-select v-model="queryParams.TASK_TYPE" placeholder="任务分类">
                  <el-option label="全部" value="" />
                  <el-option label="验证任务" value="1" />
                  <el-option label="执行任务" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务状态">
                <el-select v-model="queryParams.TASK_STATUS" placeholder="任务状态">
                  <el-option label="全部" value="" />
                  <el-option label="待完成" value="0" />
                  <el-option label="完成" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getValidTaskList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddValidTaskDialog">新建</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <!--datagrid表格-->
        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="queryParams"
          :columns="columns"
          border
          @operClick="operClick"
        />

        <!--新增弹窗-->
        <el-dialog
          title="新增任务"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="taskId">
                  <el-input v-model="addParams.taskId" placeholder="一级编码" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务名称" prop="taskName">
                  <el-input v-model="addParams.taskName" placeholder="任务名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞名称" prop="vulName">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="影响资产" prop="resType">
                  <el-input v-model="addParams.resType" placeholder="影响资产" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人" prop="dealManName">
                  <el-input v-model="addParams.dealManName" placeholder="责任人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="addParams.dealMan" type="hidden">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务分类" prop="taskType">
                  <el-select v-model="addParams.taskType" placeholder="任务分类">
                    <el-option label="验证任务" value="1" />
                    <el-option label="执行任务" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务状态" prop="taskStatus">
                  <el-select v-model="addParams.taskStatus" placeholder="任务状态">
                    <el-option label="待完成" value="0" />
                    <el-option label="完成" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="集团方案ID">
                  <el-input v-model="addParams.projId" placeholder="集团方案ID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验证方案ID">
                  <el-input v-model="addParams.valprojId" placeholder="验证方案ID" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务详情" prop="vulnDetail">
                  <el-input v-model="addParams.vulnDetail" type="textarea" placeholder="任务详情" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="saveTask('addForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--修改弹窗-->
        <el-dialog
          title="修改任务"
          :visible.sync="editDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="editForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="taskId">
                  <el-input v-model="addParams.taskId" placeholder="一级编码" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级编码" prop="valtaskId">
                  <el-input v-model="addParams.valtaskId" :readonly="true" placeholder="任务名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务名称" prop="taskName">
                  <el-input v-model="addParams.taskName" placeholder="任务名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞名称" prop="vulName">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="影响资产" prop="resType">
                  <el-input v-model="addParams.resType" placeholder="影响资产" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人" prop="dealManName">
                  <el-input v-model="addParams.dealManName" placeholder="责任人" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务分类" prop="taskType">
                  <el-select v-model="addParams.taskType" placeholder="任务分类" :disabled="true">
                    <el-option label="验证任务" value="1" />
                    <el-option label="执行任务" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务状态" prop="taskStatus">
                  <el-select v-model="addParams.taskStatus" placeholder="任务状态" :disabled="true">
                    <el-option label="待完成" value="0" />
                    <el-option label="完成" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="验证方案">
                  <el-input v-model="addParams.projName" :readonly="true" placeholder="验证方案ID" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="lookPlan(addParams.valprojId)">查看</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否存在此漏洞" prop="isExist">
                  <el-select v-model="addParams.isExist" placeholder="是否存在此漏洞">
                    <el-option label="存在" value="1" />
                    <el-option label="不存在" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可行" prop="isFsb">
                  <el-select v-model="addParams.isFsb" placeholder="是否可行">
                    <el-option label="可行" value="1" />
                    <el-option label="不可行" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="验证方式" prop="validMethod">
                  <el-select v-model="addParams.validMethod" placeholder="验证方式">
                    <el-option label="渗透测试" value="1" />
                    <el-option label="上传脚本" value="2" />
                    <el-option label="针对漏洞描述攻击测试" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="验证省份" prop="validProvice">
                  <el-select v-model="addParams.validProvice">
                    <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="updateTask('editForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--详情弹窗-->
        <el-dialog
          title="任务详情"
          :visible.sync="infoDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="editForm" :model="addParams" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码">
                  <el-input v-model="addParams.taskId" placeholder="一级编码" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级编码">
                  <el-input v-model="addParams.valtaskId" :readonly="true" placeholder="任务名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="任务名称">
                  <el-input v-model="addParams.taskName" placeholder="任务名称" :readonly="true" />
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
                  <el-input v-model="addParams.dealManName" placeholder="责任人" readonly="readonly" />
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
                  <el-select v-model="addParams.taskStatus" placeholder="任务状态" :disabled="true">
                    <el-option label="待完成" value="0" />
                    <el-option label="完成" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="验证方案">
                  <el-input v-model="addParams.projName" :readonly="true" placeholder="验证方案" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="lookPlan(addParams.valprojId)">查看</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否存在此漏洞">
                  <el-select v-model="addParams.isExist" placeholder="是否存在此漏洞" :disabled="true">
                    <el-option label="存在" value="1" />
                    <el-option label="不存在" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可行">
                  <el-select v-model="addParams.isFsb" placeholder="是否可行" :disabled="true">
                    <el-option label="可行" value="1" />
                    <el-option label="不可行" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="验证方式">
                  <el-select v-model="addParams.validMethod" placeholder="验证方式" :disabled="true">
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
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="handleBeforeClose">确 定</el-button>
          </span>
        </el-dialog>

        <!--查看方案弹窗-->
        <el-dialog title="查看方案" :visible.sync="projDialogVisible" width="50%" append-to-body>
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

        <!--选择责任人弹窗-->
        <user-window
          v-if="userWindowVisible"
          :title="title"
          :parent-component-param="parentComponentParam"
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
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  data() {
    return {
      url: 'vulnValid/vulnValidTaskListData',
      saveUrl: 'vulnValid/saveValidTask',
      editUrl: 'vulnValid/updateValidTask',
      provinceUrl: 'dataDict/queryDataDictList',
      infoUrl: 'vulnValid/queryValidTaskById',
      projUrl: 'vulnValid/queryValidPlanById',
      queryParams: {},
      columns: [
        { label: '一级编码', prop: 'TASK_ID', width: 100, align: 'center' },
        { label: '二级编码', prop: 'VALTASK_ID', width: 100, align: 'center' },
        { label: '任务名称', prop: 'TASK_NAME', width: 160, align: 'left' },
        { label: '漏洞名称', prop: 'VUL_NAME', width: 160, align: 'left' },
        { label: '任务分类', prop: 'TASK_TYPE', width: 100, align: 'center', formatter: this.taskTypeFormatter },
        { label: '方案', prop: 'VALPROJ_ID', width: 100, align: 'center', actions: [{ prop: 'planDetail', type: 'text', link: 'VALPROJ_ID' }] },
        { label: '方案状态', prop: 'PLAN_PUB_STAT', width: 100, align: 'center', formatter: this.planPubStatFormatter },
        { label: '创建时间', prop: 'CREATE_TIME', width: 120, align: 'center', formatter: this.createTimeFormatter },
        { label: '任务状态', prop: 'TASK_STATUS', width: 100, align: 'center', formatter: this.taskStatusFormatter },
        { label: '结果状态', prop: 'RS_PUB_STAT', width: 100, align: 'center', formatter: this.rsPubStatFormatter },
        { label: '负责人', prop: 'REAL_NAME', width: 100, align: 'center' },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-tickets' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' }
          ]
        }],
      // 弹窗定义参数
      addDialogVisible: false,
      editDialogVisible: false,
      infoDialogVisible: false,
      addParams: {},
      addParamsRules: {
        taskId: [
          { required: true, message: '请输入一级编码', trigger: 'blur' }
        ],
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        vulName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请输入影响资产', trigger: 'blur' }
        ],
        taskStatus: [
          { required: true, message: '请选择任务状态', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '请选择任务分类', trigger: 'blur' }
        ],
        dealMan: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        dealManName: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        vulnDetail: [
          { required: true, message: '请输入任务详情', trigger: 'blur' }
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
        ]
      },
      // 新增责任人弹窗参数
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择责任人', // 弹出框标题
      // 省份参数
      provinceList: [],
      // 查看验证方案弹窗
      projDialogVisible: false,
      projParams: {}
    }
  },
  methods: {
    // 获取验证任务列表
    getValidTaskList() {
      this.$refs['datagridTest'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'planDetail':
          this.openPlanDetailDialog(row)
          break
        case 'detail':
          this.openValidTaskInfoDialog(row)
          break
        case 'edit':
          this.openEditValidTaskDialog(row)
          break
        default:
          break
      }
    },
    // 打开新增弹窗
    openAddValidTaskDialog() {
      this.addDialogVisible = true
    },
    // 打开修改弹窗
    openEditValidTaskDialog(row) {
      this.editDialogVisible = true

      this.addParams.taskId = row.TASK_ID
      this.addParams.valtaskId = row.VALTASK_ID
      this.addParams.taskName = row.TASK_NAME
      this.addParams.vulName = row.VUL_NAME
      this.addParams.resType = row.RES_TYPE
      this.addParams.dealManName = row.REAL_NAME
      this.addParams.taskType = row.TASK_TYPE + ''
      this.addParams.taskStatus = row.TASK_STATUS + ''

      this.getValidTaskById(row.VALTASK_ID)
      this.getProvinceList()
    },
    // 打开详情弹窗
    openValidTaskInfoDialog(row) {
      this.infoDialogVisible = true

      this.addParams.taskId = row.TASK_ID
      this.addParams.valtaskId = row.VALTASK_ID
      this.addParams.taskName = row.TASK_NAME
      this.addParams.vulName = row.VUL_NAME
      this.addParams.resType = row.RES_TYPE
      this.addParams.dealManName = row.REAL_NAME
      this.addParams.taskType = row.TASK_TYPE + ''
      this.addParams.taskStatus = row.TASK_STATUS + ''

      this.getValidTaskById(row.VALTASK_ID)
      this.getProvinceList()
    },
    // 打开方案弹窗
    openPlanDetailDialog(row) {
      this.lookPlan(row.VALPROJ_ID)
    },
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.addParams.dealManName = data.userName
      $self.addParams.dealMan = data.userId
    },
    // 新增
    async saveTask(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
            this.addDialogVisible = false
            this.getValidTaskList()
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
    // 修改
    async updateTask(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
            this.editDialogVisible = false
            this.getValidTaskList()
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
    // 关闭弹窗执行事件
    handleBeforeClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.infoDialogVisible = false
      this.addParams = {}
    },
    // 根据id查询验证任务详情
    getValidTaskById(id) {
      this.$store.dispatch(this.infoUrl, { valtaskId: id }).then(resp => {
        console.log(resp.data.PROJ_NAME)
        this.$set(this.addParams, 'projName', resp.data.PROJ_NAME)
        this.$set(this.addParams, 'valprojId', resp.data.VALPROJ_ID)
        if (resp.data.IS_EXIST != null && resp.data.IS_EXIST.length() !== 0) {
          this.$set(this.addParams, 'isExist', resp.data.IS_EXIST + '')
        }

        if (resp.data.IS_FSB != null && resp.data.IS_FSB.length() !== 0) {
          this.$set(this.addParams, 'isFsb', resp.data.IS_FSB + '')
        }

        if (resp.data.VALID_METHOD != null && resp.data.VALID_METHOD.length() !== 0) {
          this.$set(this.addParams, 'validMethod', resp.data.VALID_METHOD)
        }

        if (resp.data.VALID_PROVICE != null && resp.data.VALID_PROVICE.length() !== 0) {
          this.$set(this.addParams, 'validProvice', resp.data.VALID_PROVICE + '')
        }
      }).catch(
      )
    },
    // 打开方案弹窗
    lookPlan(id) {
      this.projDialogVisible = true

      this.getValidPlanById(id)
    },
    // 根据id查询验证方案详情
    getValidPlanById(id) {
      this.$store.dispatch(this.projUrl, { valprojId: id }).then(resp => {
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
    // 查询省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 任务分类
    taskTypeFormatter(row) {
      const taskType = row.TASK_TYPE
      let ret = ''
      if (taskType === 1) {
        ret = '验证任务'
      } else if (taskType === 2) {
        ret = '执行任务'
      }
      return ret
    },
    // 方案状态
    planPubStatFormatter(row) {
      const planPubStat = row.PLAN_PUB_STAT
      let ret = ''
      if (row.TASK_TYPE === 2) {
        ret = '-'
        return ret
      } else if (planPubStat === 0) {
        ret = '未发布'
      } else if (planPubStat === 1) {
        ret = '已发布'
      } else if (planPubStat === 2) {
        ret = '发布中'
      }
      return ret
    },
    // 创建时间
    createTimeFormatter(row) {
      return this.datetimeFormat(row.CREATE_TIME)
    },
    // 任务状态
    taskStatusFormatter(row) {
      const taskStatus = row.TASK_STATUS
      let ret = ''
      if (taskStatus === 0) {
        ret = '待完成'
      } else if (taskStatus === 1) {
        ret = '完成'
      }
      return ret
    },
    // 结果状态
    rsPubStatFormatter(row) {
      const rsPubStat = row.RS_PUB_STAT
      let ret = ''
      if (row.TASK_TYPE === 1) {
        ret = '-'
        return ret
      } else if (rsPubStat === 0) {
        ret = '未上报'
      } else if (rsPubStat === 1) {
        ret = '已上报'
      } else if (rsPubStat === 2) {
        ret = '上报中'
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
