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
                <el-input v-model="queryParams.vulTesttaskName" placeholder="任务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏洞名称">
                <el-input v-model="queryParams.vulName" placeholder="漏洞名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="任务状态">
                <el-select v-model="queryParams.vulTesttaskState" placeholder="任务状态">
                  <el-option label="全部" value="" />
                  <el-option label="未测试" value="0" />
                  <el-option label="测试中" value="1" />
                  <el-option label="已测试" value="2" />
                  <el-option label="已发布" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getTestTaskList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddTaskDialog">新建任务</el-button>
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
      <el-form ref="addTaskForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="vulTesttaskName">
              <el-input v-model="addParams.vulTesttaskName" placeholder="任务名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库时间" prop="storageTime">
              <el-date-picker
                v-model="addParams.storageTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称" prop="vulName">
              <el-input v-model="addParams.vulName" placeholder="漏洞名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务响应级别">
              <el-select v-model="addParams.vulTesttaskLevel">
                <el-option label="高" value="1" />
                <el-option label="中" value="2" />
                <el-option label="低" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级编码" prop="vulTesttaskId">
              <el-input v-model="addParams.vulTesttaskId" placeholder="一级编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CVEID" prop="vulCveid">
              <el-input v-model="addParams.vulCveid" placeholder="CVEID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="爆发省份">
              <el-select v-model="addParams.fromProvice" placeholder="爆发省份">
                <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="爆发业务系统">
              <el-select v-model="addParams.fromBusi" placeholder="爆发业务系统">
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
            <el-form-item label="当前责任人" prop="responName">
              <el-input v-model="addParams.responName" placeholder="当前责任人" readonly="readonly" @click.native.prevent="getDataRootUser" />
              <input v-model="addParams.responId" type="hidden">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试状态">
              <el-select v-model="addParams.vulTesttaskState" placeholder="测试状态">
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
              <el-select v-model="addParams.taskSrc" placeholder="方案来源">
                <el-option label="集团" value="1" />
                <el-option label="省份" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试通知范围" prop="noticeType">
              <el-select v-model="addParams.noticeType" placeholder="测试通知范围" @change="chooseNoticeType">
                <el-option label="请选择" value="" />
                <el-option label="组织" value="2" />
                <el-option label="人员" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布时间" prop="publishTime">
              <el-date-picker
                v-model="addParams.publishTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="orgView" :span="12">
            <el-form-item label="通知组织" prop="orgIds">
              <!--<el-input v-model="addParams.orgNames" type="textarea" placeholder="通知组织" />-->
              <el-input v-model="addParams.orgNames" placeholder="部门测试" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceMultiVisible = true" />
              </el-input>

              <input v-model="addParams.orgIds" type="hidden">
            </el-form-item>
          </el-col>
          <el-col v-if="personView" :span="12">
            <el-form-item label="通知人员" prop="noticeUserNames">
              <el-input v-model="addParams.noticeUserNames" type="textarea" placeholder="通知人员" readonly="readonly" @click.native.prevent="getDataRootNoticeUser" />
              <input v-model="addParams.noticeUsers" type="hidden">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="addParams.note" type="textarea" placeholder="备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
        <el-button type="primary" size="small" @click="saveTestTask('addTaskForm')">确 定</el-button>
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

    <!--选择通知组织弹窗-->
    <multi-org
      v-if="serviceMultiVisible"
      :visible.sync="serviceMultiVisible"
      @getOrg="getOrgInfo"
    />

    <!--选择通知人员弹窗-->
    <user-window
      v-if="noticeUserWindowVisible"
      :title="noticeTitle"
      :parent-component-param="noticepPrentComponentParam"
      :multiple="noticeMultiple"
      :visible.sync="noticeUserWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getNoticeUserInfo"
    />

    <!--查看任务弹窗-->
    <el-dialog
      title="任务详情"
      :visible.sync="lookDialogVisible"
      width="50%"
      :before-close="handleBeforeClose"
      :close-on-click-modal="false"
    >
      <el-form ref="addTaskForm" :model="addParams" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务名称">
              <el-input v-model="addParams.vulTesttaskName" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库时间">
              <el-date-picker
                v-model="addParams.storageTime"
                type="datetime"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称" prop="vulName">
              <el-input v-model="addParams.vulName" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务响应级别">
              <el-select v-model="addParams.vulTesttaskLevel" :disabled="true">
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
              <el-input v-model="addParams.vulTesttaskId" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CVEID" prop="vulCveid">
              <el-input v-model="addParams.vulCveid" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="爆发省份">
              <el-select v-model="addParams.fromProvice" :disabled="true">
                <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="爆发业务系统">
              <el-select v-model="addParams.fromBusi" :disabled="true">
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
            <el-form-item label="当前责任人" prop="responName">
              <el-input v-model="addParams.responName" placeholder="当前责任人" readonly="readonly" />
              <input v-model="addParams.responId" type="hidden">
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试状态">
              <el-select v-model="addParams.vulTesttaskState" :disabled="true">
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
              <el-select v-model="addParams.taskSrc" :disabled="true">
                <el-option label="集团" value="1" />
                <el-option label="省份" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="测试通知范围" prop="noticeType">
              <el-select v-model="addParams.noticeType" :disabled="true">
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
                v-model="addParams.publishTime"
                type="datetime"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="orgView" :span="12">
            <el-form-item label="通知组织" prop="orgIds">
              <el-input v-model="addParams.orgNames" type="textarea" :readonly="true" />
              <input v-model="addParams.orgIds" type="hidden">
            </el-form-item>
          </el-col>
          <el-col v-if="personView" :span="12">
            <el-form-item label="通知人员" prop="noticeUserNames">
              <el-input v-model="addParams.noticeUserNames" type="textarea" readonly="readonly" />
              <input v-model="addParams.noticeUsers" type="hidden">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="addParams.note" type="textarea" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="lookDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="lookDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import selectMultipleOrg from '@/components/SelectMultipleOrg/index'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'multi-org': selectMultipleOrg, 'user-window': userInfo },
  data() {
    return {
      // datagrid参数
      url: 'vulnTest/testTaskList',
      saveUrl: 'vulnTest/saveTestTask',
      editUrl: 'vulnTest/updateTestTask',
      provinceUrl: 'dataDict/queryDataDictList',
      orgOrUserUrl: 'vulnTest/queryOrgsOrUsers',
      planUrl: 'vulnTest/queryTestPlan',
      queryParams: {
        vulTesttaskName: '',
        vulName: '',
        vulTesttaskState: '',
        vulTesttaskLevel: ''
      },
      columns: [
        { label: '一级编号', prop: 'vulTesttaskId', width: 120, align: 'center' },
        { label: '二级编号', prop: 'taskId', width: 120, align: 'center' },
        { label: '任务名称', prop: 'vulTesttaskName', width: 120, align: 'left' },
        { label: '漏洞名称', prop: 'vulName', width: 120, align: 'left' },
        { label: '爆发省份', prop: 'provName', width: 120, align: 'center' },
        { label: '方案来源', prop: 'taskSrc', width: 120, align: 'center', formatter: this.taskSrcFormatter },
        { label: '爆发系统', prop: 'fromBusi', width: 120, align: 'center', formatter: this.fromBusiFormatter },
        { label: '响应级别', prop: 'vulTesttaskLevel', width: 120, align: 'center', formatter: this.vulTesttaskLevelFormatter },
        { label: '测试状态', prop: 'vulTesttaskState', width: 120, align: 'center', formatter: this.vulTesttaskStateFormatter },
        { label: '是否解决', prop: 'solutionFlag', width: 120, align: 'center', formatter: this.solutionFlagFormatter },
        { label: '入库时间', prop: 'storageTime', width: 120, align: 'center', formatter: this.storageTimeFormatter },
        { label: '测试方案', prop: 'vulPlanname', width: 120, align: 'center', actions: [{ prop: 'planDetail', type: 'text', link: 'vulPlanname' }] },
        { label: '发布状态', prop: 'planPubStat', width: 120, align: 'center', formatter: this.planPubStatFormatter },
        { label: '发布时间', prop: 'publishTime', width: 120, align: 'center', formatter: this.publishTimeFormatter },
        { label: '当前责任人', prop: 'responName', width: 120, align: 'center' },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '查看', prop: 'look', type: 'text', icon: 'el-icon-tickets' }
          ]
        }
      ],
      // 新增或修改弹窗参数
      addOrEditTaskTitle: '',
      addOrEditKey: '',
      dialogVisible: false,
      // 新增任务参数
      addParams: {
        vulTesttaskLevel: '1',
        fromBusi: '0',
        vulTesttaskState: '0',
        taskSrc: '1',
        noticeUserNames: ''
      },
      addParamsRules: {
        vulTesttaskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        storageTime: [
          { required: true, message: '请选择入库时间', trigger: 'blur' }
        ],
        vulName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        vulTesttaskId: [
          { required: true, message: '请输入一级编码', trigger: 'blur' }
        ],
        vulCveid: [
          { required: true, message: '请输入CVEID', trigger: 'blur' }
        ],
        responName: [
          { required: true, message: '请选择责任人', trigger: 'blur' }
        ],
        noticeType: [
          { required: true, message: '请选择通知范围', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择发布时间', trigger: 'blur' }
        ]
      },
      // 通知组织输入框
      orgView: false,
      serviceMultiVisible: false,
      // 通知人员输入框
      personView: false,
      // 上报省份列表
      provinceList: [],
      // 新增责任人弹窗参数
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择责任人', // 弹出框标题
      // 添加通知人员弹窗参数
      noticeUserWindowVisible: false,
      noticepPrentComponentParam: {}, // 向子组件传递自定义参数对象
      noticeMultiple: true, // 默认false 单选;
      noticeTitle: '请选择通知人员', // 弹出框标题
      // 查看任务弹窗参数
      lookDialogVisible: false,
      // 查看方案弹窗参数
      lookPlanDialogVisible: false,
      planParams: {}
    }
  },
  created() {

  },
  mounted() {
    // 加载数据
    this.getProvinceList()
  },
  methods: {
    // 获取任务列表
    getTestTaskList() {
      this.$refs['datagridTest'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.openEditTaskDialog(row)
          break
        case 'look':
          this.openLookTaskDialog(row)
          break
        case 'planDetail':
          this.openLookPlanDialog(row)
          break
        default:
          break
      }
    },
    // 打开新增任务弹窗
    openAddTaskDialog() {
      this.addOrEditTaskTitle = '新增任务'
      this.addOrEditKey = 'add'
      this.dialogVisible = true
    },
    // 打开修改任务弹窗
    openEditTaskDialog(row) {
      this.addOrEditTaskTitle = '修改任务'
      this.addOrEditKey = 'edit'
      this.dialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.taskSrc = this.addParams.taskSrc + ''
      this.chooseNoticeType()
      this.queryOrgOrUser(row)
    },
    // 打开查看任务弹窗
    openLookTaskDialog(row) {
      this.lookDialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.taskSrc = this.addParams.taskSrc + ''
      this.chooseNoticeType()
      this.queryOrgOrUser(row)
    },
    // 打开查看方案弹窗
    openLookPlanDialog(row) {
      this.lookPlanDialogVisible = true
      this.$store.dispatch(this.planUrl, { planId: row.planId }).then(resp => {
        this.planParams = Object.assign({}, resp)
        this.planParams.planSrc = this.planParams.planSrc + ''
      }).catch(
      )
    },
    // 查询通知组织或人员
    queryOrgOrUser(row) {
      this.$store.dispatch(this.orgOrUserUrl, { taskId: row.taskId, noticeType: row.noticeType }).then(resp => {
        if (row.noticeType === '2') { // 组织
          let orgNames = ''
          let orgIds = ''
          resp.rows.forEach(e => {
            orgNames += e.orgName + ','
            orgIds += e.orgId + ','
          })
          this.addParams.orgNames = orgNames.substring(0, orgNames.length - 1)
          this.addParams.orgIds = orgIds.substring(0, orgIds.length - 1)
        } else if (row.noticeType === '3') { // 人员
          let userNames = ''
          let userIds = ''
          resp.rows.forEach(e => {
            userNames += e.userName + ','
            userIds += e.userId + ','
          })
          this.addParams.noticeUserNames = userNames.substring(0, userNames.length - 1)
          this.addParams.noticeUsers = userIds.substring(0, userIds.length - 1)
        }
      }).catch(
      )
    },
    // 关闭新增或修改弹窗执行事件
    handleBeforeClose() {
      this.dialogVisible = false
      this.lookDialogVisible = false
      this.addParams = {
        vulTesttaskLevel: '1',
        fromBusi: '0',
        vulTesttaskState: '0',
        taskSrc: '1'
      }
      this.orgView = false
      this.personView = false
    },
    // 保存任务
    async saveTestTask(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrEditKey === 'add') {
            this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = {
                vulTesttaskLevel: '1',
                fromBusi: '0',
                vulTesttaskState: '0',
                taskSrc: '1'
              }
              this.getTestTaskList()
            }).catch(
            )
          } else if (this.addOrEditKey === 'edit') {
            this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = {
                vulTesttaskLevel: '1',
                fromBusi: '0',
                vulTesttaskState: '0',
                taskSrc: '1'
              }
              this.getTestTaskList()
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
    // 通知范围改变事件
    chooseNoticeType() {
      const noticeType = this.addParams.noticeType
      if (noticeType === '2') {
        this.orgView = true
        this.personView = false
        // this.addParamsRules.orgNames = [{ required: true, message: '请选择通知组织', trigger: 'blur' }]
        this.addParamsRules.noticeUserNames = []
      } else if (noticeType === '3') {
        this.orgView = false
        this.personView = true
        this.addParamsRules.orgNames = []
        // this.addParamsRules.noticeUserNames = [{ required: true, message: '请选择通知人员', trigger: 'blur' }]
      } else {
        this.orgView = false
        this.personView = false
        this.addParamsRules.orgNames = []
        this.addParamsRules.noticeUserNames = []
      }
    },
    // 查询省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 方案来源
    taskSrcFormatter(row) {
      const taskSrc = row.taskSrc
      let ret = ''
      if (taskSrc === 1) {
        ret = '集团'
      } else if (taskSrc === 2) {
        ret = '省份'
      }
      return ret
    },
    // 爆发系统
    fromBusiFormatter(row) {
      const fromBusi = row.fromBusi
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
    vulTesttaskLevelFormatter(row) {
      const vulTesttaskLevel = row.vulTesttaskLevel
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
    vulTesttaskStateFormatter(row) {
      const vulTesttaskState = row.vulTesttaskState
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
    // 是否解决
    solutionFlagFormatter(row) {
      const solutionFlag = row.solutionFlag
      let ret = ''
      if (solutionFlag === '1') {
        ret = '解决'
      } else if (solutionFlag === '2') {
        ret = '未解决'
      }
      return ret
    },
    // 发布状态
    planPubStatFormatter(row) {
      const planPubStat = row.planPubStat
      let ret = ''
      if (planPubStat === '0') {
        ret = '未发布'
      } else if (planPubStat === '1') {
        ret = '已发布'
      } else if (planPubStat === '2') {
        ret = '发布中'
      }
      return ret
    },
    // 入库时间
    storageTimeFormatter(row) {
      return this.datetimeFormat(row.storageTime)
    },
    // 发布时间
    publishTimeFormatter(row) {
      return this.datetimeFormat(row.publishTime)
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
    // 选择责任人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.addParams.responName = data.userName
      $self.addParams.responId = data.userId
    },
    // 选择通知人员
    getDataRootNoticeUser() { // 调弹窗时可修改参数
      this.noticeUserWindowVisible = true
    },
    getNoticeUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      let userNames = ''
      let userIds = ''
      data.forEach(e => {
        userNames += e.userName + ','
        userIds += e.userId + ','
      })
      $self.addParams.noticeUserNames = userNames.substring(0, userNames.length - 1)
      $self.addParams.noticeUsers = userIds.substring(0, userIds.length - 1)
    },
    getOrgInfo(data) {
      // 返回的data是集合。自行使用
      console.log(data)
      let orgNames = ''
      let orgIds = ''
      data.forEach(e => {
        orgNames += e.label + ','
        orgIds += e.id + ','
      })
      this.addParams.orgIds = orgIds.substring(0, orgIds.length - 1)
      this.addParams.orgNames = orgNames.substring(0, orgNames.length - 1)
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
