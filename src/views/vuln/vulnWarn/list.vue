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
            <el-col :span="5">
              <el-form-item label="预警名称">
                <el-input v-model="queryParams.vulAlertingName" placeholder="预警名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="漏洞名称">
                <el-input v-model="queryParams.vulName" placeholder="漏洞名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="预警状态">
                <el-select v-model="queryParams.vulAlertingState" placeholder="预警状态">
                  <el-option label="全部" value="" />
                  <el-option label="未发布" value="0" />
                  <el-option label="已发布" value="1" />
                  <el-option label="已归档" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="预警级别">
                <el-select v-model="queryParams.vulAlertingLevel" placeholder="预警级别">
                  <el-option label="全部" value="" />
                  <el-option label="低危" value="0" />
                  <el-option label="中危" value="1" />
                  <el-option label="高危" value="2" />
                  <el-option label="超危" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="">
                <el-button size="small" type="primary" @click="getVulnWarnList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddVulnWarnDialog">新建</el-button>
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
          title="新增预警信息"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞预警名称" prop="vulAlertingName">
                  <el-input v-model="addParams.vulAlertingName" placeholder="漏洞预警名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总部漏洞预警ID">
                  <el-input v-model="addParams.vulAlertingId" placeholder="总部漏洞预警ID" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="CVE_ID">
                  <el-input v-model="addParams.vulId" placeholder="CVE_ID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="通知方式" prop="noticeWay">
                  <el-select v-model="addParams.noticeWay" placeholder="通知方式">
                    <el-option label="邮件" value="0" />
                    <el-option label="短信" value="1" />
                    <el-option label="平台内部短消息" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警来源" prop="vulWarnSrc">
                  <el-select v-model="addParams.vulWarnSrc" placeholder="预警来源">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省份创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="响应级别" prop="vulAlertingLevel">
                  <el-select v-model="addParams.vulAlertingLevel" placeholder="响应级别">
                    <el-option label="低危" value="0" />
                    <el-option label="中危" value="1" />
                    <el-option label="高危" value="2" />
                    <el-option label="超危" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警状态" prop="vulAlertingState">
                  <el-select v-model="addParams.vulAlertingState" placeholder="预警状态">
                    <el-option label="未发布" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警发布确认人" prop="warnPubManName">
                  <el-input v-model="addParams.warnPubManName" placeholder="预警发布确认人" readonly="readonly" @click.native.prevent="getDataRootUser" />
                  <input v-model="addParams.warnPubMan" type="hidden">
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警入库时间">
                  <el-date-picker
                    v-model="addParams.storageTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警通知范围" prop="noticeScope">
                  <el-select v-model="addParams.noticeScope" placeholder="预警通知范围" @change="chooseNoticeScope">
                    <el-option label="请选择" value="" />
                    <el-option label="组织" value="2" />
                    <el-option label="人员" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="orgView" :span="12">
                <el-form-item label="通知组织" prop="orgNames">
                  <el-input v-model="addParams.orgNames" placeholder="通知组织" clearable disabled prefix-icon="iconfont el-icon-s-home">
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
                <el-form-item label="漏洞预警备注" prop="vulNote">
                  <el-input v-model="addParams.vulNote" type="textarea" placeholder="漏洞预警备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="saveVulnWarn('addForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--修改弹窗-->
        <el-dialog
          title="修改预警信息"
          :visible.sync="editDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="editForm" :model="addParams" label-width="120px" :rules="editParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞预警名称">
                  <el-input v-model="addParams.vulAlertingName" placeholder="漏洞预警名称" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总部漏洞预警ID">
                  <el-input v-model="addParams.vulAlertingId" placeholder="总部漏洞预警ID" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="CVE_ID">
                  <el-input v-model="addParams.vulId" placeholder="CVE_ID" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="通知方式">
                  <el-select v-model="addParams.noticeWay" placeholder="通知方式" :disabled="true">
                    <el-option label="邮件" value="0" />
                    <el-option label="短信" value="1" />
                    <el-option label="平台内部短消息" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警来源">
                  <el-select v-model="addParams.vulWarnSrc" placeholder="预警来源" :disabled="true">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省份创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="响应级别">
                  <el-select v-model="addParams.vulAlertingLevel" placeholder="响应级别" :disabled="true">
                    <el-option label="低危" value="0" />
                    <el-option label="中危" value="1" />
                    <el-option label="高危" value="2" />
                    <el-option label="超危" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警状态" prop="vulAlertingState">
                  <el-select v-model="addParams.vulAlertingState" placeholder="预警状态" :disabled="true">
                    <el-option label="未发布" value="0" />
                    <el-option label="已发布" value="1" />
                    <el-option label="已归档" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警发布确认人">
                  <el-input v-model="addParams.warnPubMan" placeholder="预警发布确认人" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警入库时间">
                  <el-date-picker
                    v-model="addParams.storageTime"
                    type="datetime"
                    readonly="readonly"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警通知范围">
                  <el-select v-model="addParams.noticeScope" placeholder="预警通知范围" :disabled="true">
                    <el-option label="请选择" value="" />
                    <el-option label="组织" value="2" />
                    <el-option label="人员" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方案发布人">
                  <el-input v-model="addParams.planPubMan" placeholder="方案发布人" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="orgView" :span="12">
                <el-form-item label="通知组织">
                  <el-input v-model="addParams.orgNames" type="textarea" placeholder="通知组织" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col v-if="personView" :span="12">
                <el-form-item label="通知人员" prop="noticeUserNames">
                  <el-input v-model="addParams.noticeUserNames" type="textarea" placeholder="通知人员" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞预警备注" prop="vulNote">
                  <el-input v-model="addParams.vulNote" type="textarea" placeholder="漏洞预警备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="editVulnWarn('editForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--详情弹窗-->
        <el-dialog
          title="预警信息详情"
          :visible.sync="detailDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form :model="addParams" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞预警名称">
                  <el-input v-model="addParams.vulAlertingName" placeholder="漏洞预警名称" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总部漏洞预警ID">
                  <el-input v-model="addParams.vulAlertingId" placeholder="总部漏洞预警ID" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="CVE_ID">
                  <el-input v-model="addParams.vulId" placeholder="CVE_ID" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="通知方式">
                  <el-select v-model="addParams.noticeWay" placeholder="通知方式" :disabled="true">
                    <el-option label="邮件" value="0" />
                    <el-option label="短信" value="1" />
                    <el-option label="平台内部短消息" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警来源">
                  <el-select v-model="addParams.vulWarnSrc" placeholder="预警来源" :disabled="true">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省份创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="响应级别">
                  <el-select v-model="addParams.vulAlertingLevel" placeholder="响应级别" :disabled="true">
                    <el-option label="低危" value="0" />
                    <el-option label="中危" value="1" />
                    <el-option label="高危" value="2" />
                    <el-option label="超危" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警状态" prop="vulAlertingState">
                  <el-select v-model="addParams.vulAlertingState" placeholder="预警状态" :disabled="true">
                    <el-option label="未发布" value="0" />
                    <el-option label="已发布" value="1" />
                    <el-option label="已归档" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警发布确认人">
                  <el-input v-model="addParams.warnPubMan" placeholder="预警发布确认人" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预警入库时间">
                  <el-date-picker
                    v-model="addParams.storageTime"
                    type="datetime"
                    readonly="readonly"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预警通知范围">
                  <el-select v-model="addParams.noticeScope" placeholder="预警通知范围" :disabled="true">
                    <el-option label="请选择" value="" />
                    <el-option label="组织" value="2" />
                    <el-option label="人员" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方案发布人">
                  <el-input v-model="addParams.planPubMan" placeholder="方案发布人" readonly="readonly" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-if="orgView" :span="12">
                <el-form-item label="通知组织">
                  <el-input v-model="addParams.orgNames" type="textarea" placeholder="通知组织" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col v-if="personView" :span="12">
                <el-form-item label="通知人员" prop="noticeUserNames">
                  <el-input v-model="addParams.noticeUserNames" type="textarea" placeholder="通知人员" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞预警备注">
                  <el-input v-model="addParams.vulNote" type="textarea" placeholder="漏洞预警备注" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否已解决">
                  <el-input v-model="addParams.solutionFlag" placeholder="是否已解决" readonly="readonly" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="解决方案">
                  <el-input v-model="addParams.solutionDetail" type="textarea" placeholder="解决方案" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="附件">
                  <a v-for="fileBean in alldesFile" :key="fileBean.idx" style="size:10px;color:#9A9898;" href="#" :title="fileBean.realName" :download="fileBean.realName" @click="downloadFile(fileBean)">{{ fileBean.realName }}<br></a>
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

      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
import selectMultipleOrg from '@/components/SelectMultipleOrg/index'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo, 'multi-org': selectMultipleOrg },
  data() {
    return {
      url: 'vulnWarn/vulnWarnListData',
      queryOrgUrl: 'vulnWarn/queryScopeOrg',
      queryUserUrl: 'vulnWarn/queryScopeUser',
      saveUrl: 'vulnWarn/saveVulnWarn',
      editUrl: 'vulnWarn/updateVulnWarn',
      fileUrl: 'vulnWarn/findVulnWarnFiles',
      queryParams: {},
      columns: [
        { label: '二级ID', prop: 'VUL_WARN_ID', width: 100, align: 'center' },
        { label: '一级预警ID', prop: 'VUL_ALERTING_ID', width: 100, align: 'center' },
        { label: '预警名称', prop: 'VUL_ALERTING_NAME', width: 160, align: 'left' },
        { label: 'CVE_ID', prop: 'VUL_ID', width: 100, align: 'left' },
        { label: '漏洞名称', prop: 'VUL_NAME', width: 100, align: 'left' },
        { label: '来源', prop: 'VUL_WARN_SRC', width: 100, align: 'center', formatter: this.vulWarnSrcFormatter },
        { label: '响应级别', prop: 'VUL_ALERTING_LEVEL', width: 100, align: 'center', formatter: this.vulAlertingLevelFormatter },
        { label: '预警状态', prop: 'VUL_ALERTING_STATE', width: 120, align: 'center', formatter: this.vulAlertingStateFormatter },
        { label: '发布时间', prop: 'STORAGE_TIME', width: 100, align: 'center', formatter: this.storageTimeFormatter },
        { label: '预警确认人', prop: 'WARN_NAME', width: 100, align: 'center' },
        { label: '方案发布人', prop: 'PLAN_NAME', width: 100, align: 'center' },
        {
          label: '操作',
          align: 'center',
          actions: [],
          formatter: this.opFormatter
        }],
      // 新增弹窗参数
      addDialogVisible: false,
      addParams: {},
      addParamsRules: {
        vulAlertingName: [
          { required: true, message: '请输入漏洞预警名称', trigger: 'blur' }
        ],
        noticeWay: [
          { required: true, message: '请选择通知方式', trigger: 'blur' }
        ],
        vulWarnSrc: [
          { required: true, message: '请选择预警来源', trigger: 'blur' }
        ],
        vulAlertingLevel: [
          { required: true, message: '请选择响应级别', trigger: 'blur' }
        ],
        vulAlertingState: [
          { required: true, message: '请选择预警状态', trigger: 'blur' }
        ],
        warnPubMan: [
          { required: true, message: '请选择预警发布确认人', trigger: 'blur' }
        ],
        warnPubManName: [
          { required: true, message: '请选择预警发布确认人', trigger: 'blur' }
        ],
        noticeScope: [
          { required: true, message: '请选择预警通知范围', trigger: 'blur' }
        ],
        vulNote: [
          { required: true, message: '请输入预警备注', trigger: 'blur' }
        ]
      },
      // 修改弹窗参数
      editDialogVisible: false,
      editParamsRules: {
        vulNote: [
          { required: true, message: '请输入预警备注', trigger: 'blur' }
        ]
      },
      // 详情弹窗参数
      detailDialogVisible: false,
      // 通知组织输入框
      orgView: false,
      serviceMultiVisible: false,
      // 通知人员输入框
      personView: false,
      // 新增责任人弹窗参数
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择发布确认人', // 弹出框标题
      // 添加通知人员弹窗参数
      noticeUserWindowVisible: false,
      noticepPrentComponentParam: {}, // 向子组件传递自定义参数对象
      noticeMultiple: true, // 默认false 单选;
      noticeTitle: '请选择通知人员', // 弹出框标题
      alldesFile: [] // 初始附件列表
    }
  },
  methods: {
    // 获取漏洞预警列表
    getVulnWarnList() {
      this.$refs['datagridTest'].reload()
    },
    opFormatter(row) {
      let actions = []
      if (row.VUL_ALERTING_STATE === '0') {
        actions = [
          { title: '查看', prop: 'detail', type: 'text', icon: 'el-icon-tickets' },
          { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' }
        ]
      } else {
        actions = [
          { title: '查看', prop: 'detail', type: 'text', icon: 'el-icon-tickets' },
          { title: '转换为漏洞', prop: 'change', type: 'text', icon: 'el-icon-refresh', popconfirm: '确认转换这条记录?' }
        ]
      }
      return actions
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'change':
          this.toChangeVulnPage(row)
          break
        case 'detail':
          this.openVulnWarnInfoDialog(row)
          break
        case 'edit':
          this.openEditVulnWarnDialog(row)
          break
        default:
          break
      }
    },
    // 打开新增弹窗
    openAddVulnWarnDialog() {
      this.addDialogVisible = true
    },
    // 新增
    async saveVulnWarn(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
            this.handleBeforeClose()
            this.getVulnWarnList()
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
    // 打开修改弹窗
    openEditVulnWarnDialog(row) {
      this.editDialogVisible = true

      this.$set(this.addParams, 'vulWarnId', row.VUL_WARN_ID)
      this.$set(this.addParams, 'vulAlertingName', row.VUL_ALERTING_NAME)
      this.$set(this.addParams, 'vulAlertingId', row.VUL_ALERTING_ID)
      this.$set(this.addParams, 'vulId', row.VUL_ID)
      this.$set(this.addParams, 'vulName', row.VUL_NAME)
      this.$set(this.addParams, 'noticeWay', row.NOTICE_WAY + '')
      this.$set(this.addParams, 'vulWarnSrc', row.VUL_WARN_SRC + '')
      this.$set(this.addParams, 'vulAlertingLevel', row.VUL_ALERTING_LEVEL + '')
      this.$set(this.addParams, 'vulAlertingState', row.VUL_ALERTING_STATE)

      this.$set(this.addParams, 'warnPubMan', row.WARN_NAME)
      this.$set(this.addParams, 'planPubMan', row.PLAN_NAME)
      this.$set(this.addParams, 'storageTime', row.STORAGE_TIME)
      this.$set(this.addParams, 'noticeScope', row.NOTICE_SCOPE + '')
      this.$set(this.addParams, 'vulNote', row.VUL_NOTE)

      this.queryOrgOrUser(row.VUL_WARN_ID, row.NOTICE_SCOPE + '')
      this.setNoticeScope(row.NOTICE_SCOPE + '')
    },
    // 修改
    async editVulnWarn(formName) {
      await this.$confirm('预警信息已通知相关人员,当前更改只对漏洞预警备注有效', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {}
            params.vulWarnId = this.addParams.vulWarnId + ''
            params.vulNote = this.addParams.vulNote
            this.$store.dispatch(this.editUrl, params).then(resp => {
              this.handleBeforeClose()
              this.getVulnWarnList()
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // 打开详情弹窗
    openVulnWarnInfoDialog(row) {
      this.detailDialogVisible = true

      this.$set(this.addParams, 'vulWarnId', row.VUL_WARN_ID)
      this.$set(this.addParams, 'vulAlertingName', row.VUL_ALERTING_NAME)
      this.$set(this.addParams, 'vulAlertingId', row.VUL_ALERTING_ID)
      this.$set(this.addParams, 'vulId', row.VUL_ID)
      this.$set(this.addParams, 'vulName', row.VUL_NAME)
      this.$set(this.addParams, 'noticeWay', row.NOTICE_WAY + '')
      this.$set(this.addParams, 'vulWarnSrc', row.VUL_WARN_SRC + '')
      this.$set(this.addParams, 'vulAlertingLevel', row.VUL_ALERTING_LEVEL + '')
      this.$set(this.addParams, 'vulAlertingState', row.VUL_ALERTING_STATE)

      this.$set(this.addParams, 'warnPubMan', row.WARN_NAME)
      this.$set(this.addParams, 'planPubMan', row.PLAN_NAME)
      this.$set(this.addParams, 'storageTime', row.STORAGE_TIME)
      this.$set(this.addParams, 'noticeScope', row.NOTICE_SCOPE + '')
      this.$set(this.addParams, 'vulNote', row.VUL_NOTE)
      if (row.SOLUTION_FLAG === '0') {
        this.$set(this.addParams, 'solutionFlag', '未解决')
      } else if (row.SOLUTION_FLAG === '1') {
        this.$set(this.addParams, 'solutionFlag', '已解决')
      }

      this.$set(this.addParams, 'solutionDetail', row.SOLUTION_DETAIL)

      this.queryOrgOrUser(row.VUL_WARN_ID, row.NOTICE_SCOPE + '')
      this.setNoticeScope(row.NOTICE_SCOPE + '')
      this.queryVulnWarnFiles(row.VUL_WARN_ID)
    },
    // 页面跳转
    toChangeVulnPage(row) {
      alert('TODO 转换为漏洞')
    },
    // 关闭弹窗执行函数
    handleBeforeClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.detailDialogVisible = false
      this.addParams = {}
    },
    // 查询通知组织或人员
    queryOrgOrUser(vulWarnId, noticeScope) {
      if (noticeScope === '2') { // 组织
        const params = {}
        params.vulWarnId = vulWarnId
        this.$store.dispatch(this.queryOrgUrl, params).then(resp => {
          this.$set(this.addParams, 'orgNames', resp.data)
        }).catch(
        )
      } else if (noticeScope === '3') { // 人员
        const params = {}
        params.vulWarnId = vulWarnId
        this.$store.dispatch(this.queryUserUrl, params).then(resp => {
          this.$set(this.addParams, 'noticeUserNames', resp.data)
        }).catch(
        )
      }
    },
    // 查询附件信息
    queryVulnWarnFiles(id) {
      const params = { busiId: id }
      this.$store.dispatch(this.fileUrl, params).then(response => {
        // 附件信息，如果业务表里的附件id不存在，不会报错
        if (response.data) {
          this.alldesFile = response.data
        }
      })
    },
    downloadFile(fileBean) {
      const params = { 'realName': fileBean.realName, 'fileUrl': fileBean.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    // 通知范围改变事件
    setNoticeScope(noticeScope) {
      if (noticeScope === '2') {
        this.orgView = true
        this.personView = false
      } else if (noticeScope === '3') {
        this.orgView = false
        this.personView = true
      } else {
        this.orgView = false
        this.personView = false
      }
    },
    // 通知范围改变事件
    chooseNoticeScope() {
      const noticeScope = this.addParams.noticeScope
      if (noticeScope === '2') {
        this.orgView = true
        this.personView = false
        // this.addParamsRules.orgNames = [{ required: true, message: '请选择通知组织', trigger: 'blur' }]
        this.addParamsRules.noticeUserNames = []
      } else if (noticeScope === '3') {
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
    // 选择确认人
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.addParams.warnPubManName = data.userName
      $self.addParams.warnPubMan = data.userId
    },
    // 选择组织
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
    // 来源
    vulWarnSrcFormatter(row) {
      const vulWarnSrc = row.VUL_WARN_SRC
      let ret = ''
      if (vulWarnSrc === 1) {
        ret = '集团'
      } else {
        ret = '省份'
      }
      return ret
    },
    // 响应级别
    vulAlertingLevelFormatter(row) {
      const vulAlertingLevel = row.VUL_ALERTING_LEVEL
      let ret = ''
      if (vulAlertingLevel === 0) {
        ret = '低危'
      } else if (vulAlertingLevel === 1) {
        ret = '中危'
      } else if (vulAlertingLevel === 2) {
        ret = '高危'
      } else if (vulAlertingLevel === 3) {
        ret = '超危'
      }
      return ret
    },
    // 预警状态
    vulAlertingStateFormatter(row) {
      const vulAlertingState = row.VUL_ALERTING_STATE
      let ret = ''
      if (vulAlertingState === '0') {
        ret = '未发布'
      } else if (vulAlertingState === '1') {
        ret = '已发布'
      } else if (vulAlertingState === '2') {
        ret = '已归档'
      }
      return ret
    },
    // 发布时间
    storageTimeFormatter(row) {
      return this.datetimeFormat(row.STORAGE_TIME)
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
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>

