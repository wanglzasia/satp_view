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
                <el-input v-model="queryParams.reinforceName" placeholder="任务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务类型">
                <el-select v-model="queryParams.taskType" placeholder="任务类型">
                  <el-option label="全部" value="" />
                  <el-option label="加固任务" value="1" />
                  <el-option label="执行任务" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务状态">
                <el-select v-model="queryParams.taskStatus" placeholder="任务状态">
                  <el-option label="全部" value="" />
                  <el-option label="未完成" value="1" />
                  <el-option label="已完成" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getReinforceTaskList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddTaskDialog">新建任务</el-button>
                <el-button type="success" icon="el-icon-tickets" size="small" @click="toReinforceProjList">方案列表</el-button>
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
          :toolbar="toolbar"
          border
          @operClick="operClick"
        />
      </el-card>
    </div>
    <!--新增或修改任务弹窗-->
    <el-dialog
      :title="addOrEditTaskTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form ref="addProjForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级编号" prop="reinforceId">
              <el-input v-model="addParams.reinforceId" placeholder="一级编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="reinforceName">
              <el-input v-model="addParams.reinforceName" placeholder="任务名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称" prop="vulnName">
              <el-input v-model="addParams.vulnName" placeholder="漏洞名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="影响资产" prop="resType">
              <el-input v-model="addParams.resType" placeholder="影响资产" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务状态" prop="taskStatus">
              <el-select v-model="addParams.taskStatus">
                <el-option label="未完成" value="1" />
                <el-option label="完成" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务结果" prop="taskResult">
              <el-select v-model="addParams.taskResult" placeholder="任务结果">
                <el-option label="成功" value="1" />
                <el-option label="失败" value="2" />
                <el-option label="未开始" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务类型" prop="taskType">
              <el-select v-model="addParams.taskType" placeholder="任务类型">
                <el-option label="加固任务" value="1" />
                <el-option label="执行任务" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务来源" prop="createBy">
              <el-select v-model="addParams.createBy" placeholder="任务来源">
                <el-option label="本省" value="2" />
                <el-option label="集团" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上报省份" prop="province">
              <el-select v-model="addParams.province" placeholder="上报省份">
                <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
              </el-select>
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
          <el-col :span="22">
            <el-form-item label="方案" prop="planName">
              <el-input v-model="addParams.planName" placeholder="方案" readonly="readonly" />
              <input v-model="addParams.projId" type="hidden">
              <input v-model="addParams.vulnporjId" type="hidden">
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="choosePlan">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="vulDetail">
              <el-input v-model="addParams.vulDetail" type="textarea" placeholder="备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
        <el-button type="primary" size="small" @click="saveReinforceTask('addProjForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看任务弹窗-->
    <el-dialog
      title="任务详情"
      :visible.sync="lookTaskDialogVisible"
      width="50%"
      :before-close="handleBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="addParams" label-width="120px" size="small">
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案">
              <el-input v-model="addParams.planName" placeholder="方案" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="addParams.vulDetail" type="textarea" placeholder="备注" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
        <el-button type="primary" size="small" @click="handleBeforeClose">确 定</el-button>
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

    <!--选择方案弹窗-->
    <el-dialog title="选择方案" :visible.sync="projDialogVisible" width="70%" :close-on-click-modal="false">
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

    <!--查看任务关联的方案弹窗-->
    <el-dialog
      title="查看方案"
      :visible.sync="taskProjDialogVisible"
      width="50%"
      :before-close="taskProjHandleBeforeClose"
      :close-on-click-modal="false"
    >
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
        <el-button type="text" size="small" @click="taskProjHandleBeforeClose">取 消</el-button>
        <el-button type="primary" size="small" @click="taskProjHandleBeforeClose">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  data() {
    return {
      url: 'vulnReinforce/reinforceTaskList',
      provinceUrl: 'dataDict/queryDataDictList',
      projUrl: 'vulnReinforce/reinforceProjList',
      saveUrl: 'vulnReinforce/addReinforceTask',
      editUrl: 'vulnReinforce/updateReinforceTask',
      queryProjUrl: 'vulnReinforce/queryReinforceProj',
      queryParams: {
        reinforceName: '',
        taskType: '',
        taskStatus: ''
      },
      columns: [
        { label: '一级编号', prop: 'reinforceId', width: 120, align: 'center' },
        { label: '二级编号', prop: 'reintaskId', width: 120, align: 'center' },
        { label: '任务名称', prop: 'reinforceName', width: 120, align: 'left' },
        { label: '漏洞名称', prop: 'vulnName', width: 120, align: 'left' },
        { label: '影响资产', prop: 'resType', width: 120, align: 'left', hidden: true },
        { label: '下发省份', prop: 'provName', width: 120, align: 'center' },
        { label: '方案', prop: 'vulnporjId', width: 120, align: 'center', actions: [{ prop: 'projDetail', type: 'text', link: 'vulnporjId' }] },
        { label: '类型', prop: 'taskType', width: 120, align: 'center', formatter: this.taskTypeFormatter },
        { label: '状态', prop: 'taskStatus', width: 120, align: 'center', formatter: this.taskStatusFormatter },
        { label: '结果', prop: 'taskResult', width: 120, align: 'center', formatter: this.taskResultFormatter },
        { label: '方案来源', prop: 'createBy', width: 120, align: 'center', formatter: this.createByFormatter },
        { label: '方案上报', prop: 'pubStatus', width: 120, align: 'center', formatter: this.pubStatusFormatter },
        { label: '结果上报', prop: 'rsStatus', width: 120, align: 'center', formatter: this.rsStatusFormatter },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '查看', prop: 'look', type: 'text', icon: 'el-icon-tickets' }
          ]
        }
      ],
      toolbar: [],
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
      addParamsRules: {
        reinforceId: [
          { required: true, message: '请输入一级编号', trigger: 'blur' }
        ],
        reinforceName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        vulnName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请输入影响资产', trigger: 'blur' }
        ],
        taskStatus: [
          { required: true, message: '请选择任务状态', trigger: 'blur' }
        ],
        taskResult: [
          { required: true, message: '请选择任务结果', trigger: 'blur' }
        ],
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '请选择任务来源', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择上报省份', trigger: 'blur' }
        ],
        dealMan: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        dealManName: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        planName: [
          { required: true, message: '请选择方案', trigger: 'blur' }
        ],
        vulDetail: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      // 新增任务弹窗参数
      dialogVisible: false,
      // 新增和修改用的同一个弹窗，设置key用来区分是新增还是修改
      addOrEditKey: '',
      addOrEditTaskTitle: '',
      tableData: [],
      // 新增责任人弹窗参数
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择责任人', // 弹出框标题
      // 上报省份列表
      provinceList: [],
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
      // 查看任务弹窗参数
      lookTaskDialogVisible: false,
      // 查看任务关联的方案弹窗参数
      taskProjDialogVisible: false,
      taskProjParams: {

      },
      groupView: false
    }
  },
  created() {

  },
  mounted() {
    // 加载数据
    // this.getReinforceTaskList()
  },
  methods: {
    // 获取任务列表
    getReinforceTaskList() {
      this.$refs['datagridTest'].reload()
    },
    // 新增任务弹窗
    openAddTaskDialog() {
      this.addOrEditTaskTitle = '新建任务'
      this.addOrEditKey = 'add'
      this.dialogVisible = true
      this.getProvinceList()
    },
    // 关闭弹窗前操作
    handleBeforeClose() {
      this.dialogVisible = false
      this.lookTaskDialogVisible = false
      this.addParams = {
        taskStatus: '1',
        taskResult: '0',
        taskType: '1',
        createBy: '2'
      }
    },
    // 关闭任务关联的方案弹窗前操作
    taskProjHandleBeforeClose() {
      this.taskProjDialogVisible = false
      this.taskProjParams = {}
    },
    // 选择方案弹窗
    choosePlan() {
      this.projDialogVisible = true
    },
    // 新增任务保存
    async saveReinforceTask(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrEditKey === 'add') {
            this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = {
                taskStatus: '1',
                taskResult: '0',
                taskType: '1',
                createBy: '2'
              }
              this.getReinforceTaskList()
            }).catch(
            )
          } else if (this.addOrEditKey === 'edit') {
            this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = {
                taskStatus: '1',
                taskResult: '0',
                taskType: '1',
                createBy: '2'
              }
              this.getReinforceTaskList()
            }).catch(
            )
          }
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
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.addParams.dealManName = data.userName
      $self.addParams.dealMan = data.userId
    },
    // 任务表格操作
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.openEditTaskDialog(row)
          break
        case 'look':
          this.openLookTaskDialog(row)
          break
        case 'projDetail':
          this.openLookTaskProjDialog(row)
          break
        default:
          break
      }
    },
    // 打开编辑任务弹窗
    openEditTaskDialog(row) {
      this.addOrEditTaskTitle = '修改任务'
      this.addOrEditKey = 'edit'
      this.dialogVisible = true
      this.getProvinceList()
      this.addParams = Object.assign({}, row)
      this.addParams.taskStatus = this.addParams.taskStatus + ''
      this.addParams.taskResult = this.addParams.taskResult + ''
      this.addParams.taskType = this.addParams.taskType + ''
      this.addParams.createBy = this.addParams.createBy + ''
      this.addParams.planName = row.projName
    },
    // 打开查看任务详情窗口
    openLookTaskDialog(row) {
      this.lookTaskDialogVisible = true
      this.getProvinceList()
      this.addParams = Object.assign({}, row)
      this.addParams.taskStatus = this.addParams.taskStatus + ''
      this.addParams.taskResult = this.addParams.taskResult + ''
      this.addParams.taskType = this.addParams.taskType + ''
      this.addParams.createBy = this.addParams.createBy + ''
      this.addParams.planName = row.projName
    },
    // 打开任务关联的方案详情弹窗
    async openLookTaskProjDialog(row) {
      this.getProvinceList()
      this.$store.dispatch(this.queryProjUrl, { vulnprojId: row.vulnporjId }).then(resp => {
        this.taskProjDialogVisible = true
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
    taskTypeFormatter(row) {
      const taskType = row.taskType
      let ret = ''
      if (taskType === 1) {
        ret = '加固任务'
      } else if (taskType === 2) {
        ret = '执行任务'
      }
      return ret
    },
    taskStatusFormatter(row) {
      const taskStatus = row.taskStatus
      let ret = ''
      if (taskStatus === 1) {
        ret = '未完成'
      } else if (taskStatus === 2) {
        ret = '已完成'
      }
      return ret
    },
    taskResultFormatter(row) {
      const taskResult = row.taskResult
      let ret = ''
      if (taskResult === '1') {
        ret = '成功'
      } else if (taskResult === '2') {
        ret = '失败'
      }
      return ret
    },
    createByFormatter(row) {
      const createBy = row.createBy
      let ret = ''
      if (createBy === 1) {
        ret = '集团'
      } else if (createBy === 2) {
        ret = '本省'
      }
      return ret
    },
    pubStatusFormatter(row) {
      const pubStatus = row.pubStatus
      let ret = ''
      if (row.taskType === 2) {
        ret = '-'
      } else {
        if (pubStatus === 1) {
          ret = '已上报'
        } else if (pubStatus === 2) {
          ret = '上报中'
        } else {
          ret = '未上报'
        }
      }
      return ret
    },
    rsStatusFormatter(row) {
      const rsStatus = row.rsStatus
      let ret = ''
      if (row.taskType === 1) {
        ret = '-'
      } else {
        if (rsStatus === 1) {
          ret = '已上报'
        } else if (rsStatus === 2) {
          ret = '上报中'
        } else {
          ret = '未上报'
        }
      }
      return ret
    },
    projPubStatusFormatter(row) {
      const pubStatus = row.pubStatus
      let ret = ''
      if (pubStatus === 1) {
        ret = '未发布'
      } else if (pubStatus === 2) {
        ret = '已发布'
      }
      return ret
    },
    // 跳转至加固方案列表
    toReinforceProjList() {
      this.$router.push({ path: '/vuln/vulnReinforce/reinforceProjList' })
    },
    // 查询加固省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 获取方案列表
    getReinforceProjList() {
      this.$refs['projDatagridTest'].reload()
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
      this.addParams.projId = selectRows[0].projId
      this.addParams.planName = selectRows[0].projName
      this.addParams.vulnporjId = selectRows[0].vulnprojId
      this.projDialogVisible = false
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%
}
</style>
