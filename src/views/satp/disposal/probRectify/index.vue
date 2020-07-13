<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header :content="parentParam.taskName" @back="goBack" />
        <router-view />
      </div>
      <div style="margin-top: 5px;">
        <el-row>
          <el-card shadow="never">
            <div style="padding: 0px 15px 15px 15px;">
              <el-row>
                <el-col :span="12">
                  <h3><span class="satp-div-titles">问题资产</span></h3>
                </el-col>
              </el-row>
            </div>
            <table class="satp-table-detail">
              <tr>
                <th>资产</th>
                <td>{{ probcenBean.assetName }}</td>
                <th>地址</th>
                <td>{{ probcenBean.logicAddr }}</td>
                <th>业务系统</th>
                <td>{{ probcenBean.bizName }}</td>
                <th>资产类型</th>
                <td>{{ probcenBean.assetTypeLabel }}</td>
              </tr>

              <tr>
                <th>安全责任人</th>
                <td>{{ probcenBean.scyRespName }}</td>
                <th>厂商负责人</th>
                <td>{{ probcenBean.safetyMfrsName }}</td>
                <th>安全管理员</th>
                <td>{{ probcenBean.safetyMgrName }}</td>
                <th>问题数量</th>
                <td>{{ probcenBean.probNo }}</td>
              </tr>

              <tr>
                <th>整改状态</th>
                <td>{{ probcenBean.rectStatLabel }}</td>
                <th>整改期限</th>
                <td>{{ probcenBean.rectPeriod }}工作日</td>
                <th>整改发起时间</th>
                <td colspan="3">{{ dateFormat(probcenBean.rectTime) }}</td>
              </tr>

            </table>
            <div style="padding-left:20px;padding-right:20px;">
              <el-divider />
            </div>
            <div style="padding: 0px 15px 15px 15px;">
              <el-row>
                <el-col :span="12">
                  <h3><span class="satp-div-titles">问题信息</span></h3>
                </el-col>
              </el-row>
            </div>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
            />
            <!--审批记录-->
            <!-- <div style="padding-left:20px;padding-right:20px;">
              <el-divider />
            </div> -->
            <div style="padding-top:30px" />
            <flowTrace-view :proc-def-key="procDefKey" :busi-id="busiId" />
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <h3><span class="satp-div-titles">审批</span></h3>
                  </el-col>
                </el-row>
                <el-form v-if=" parentParam.formKey == 'reform' " ref="formObj" :rules="rules" :model="formObj" label-width="85px" @submit.native.prevent>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item prop="rectCnclsn" label="整改结论:">
                        <el-select v-model="formObj.rectCnclsn" placeholder="整改结论" size="small" @change="changeLocationValue">
                          <el-option
                            v-for="item in rectCnclsnOptions"
                            :key="item.dictKey"
                            :label="item.dictValue"
                            :value="item.dictKey"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="处理意见:">
                        <el-input
                          v-model="auditFormObj.note"
                          autocomplete="off"
                          type="textarea"
                          maxlength="400"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form v-if=" parentParam.formKey == 'audit' " ref="auditFormObj" :rules="auditRules" :model="auditFormObj" label-width="85px" @submit.native.prevent>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="整改结论:">
                        <el-input v-model="probcenBean.rectCnclsn" :disabled="true" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="处理结果" prop="rectifyComments">
                        <el-radio-group v-model="auditFormObj.rectifyComments">
                          <el-radio label="Y">通过</el-radio>
                          <el-radio label="N">未通过</el-radio>
                          <el-radio label="other">其他</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="处理意见:">
                        <el-input
                          v-model="auditFormObj.note"
                          autocomplete="off"
                          type="textarea"
                          maxlength="400"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form v-if=" parentParam.formKey == 'check' " ref="checkFormObj" :rules="checkRules" :model="checkFormObj" label-width="85px" @submit.native.prevent>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="整改结论:">
                        <el-input v-model="probcenBean.rectCnclsn" :disabled="true" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="处理结果" prop="rectifyComments">
                        <el-radio-group v-model="checkFormObj.rectifyComments">
                          <el-radio label="Y">整改</el-radio>
                          <el-radio label="N">未整改</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="处理意见:">
                        <el-input
                          v-model="auditFormObj.note"
                          autocomplete="off"
                          type="textarea"
                          maxlength="400"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-form v-if=" parentParam.formKey == 'auditCfm' " ref="auditCfmFormObj" :rules="auditCfmRules" :model="auditCfmFormObj" label-width="85px" @submit.native.prevent>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="整改结论:">
                        <el-input v-model="probcenBean.rectCnclsn" :disabled="true" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="处理结果" prop="rectifyComments">
                        <el-radio-group v-model="auditCfmFormObj.rectifyComments">
                          <el-radio label="Y">通过</el-radio>
                          <el-radio label="N">未通过</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="处理意见:">
                        <el-input
                          v-model="auditFormObj.note"
                          autocomplete="off"
                          type="textarea"
                          maxlength="400"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col align="center">
            <el-button v-if=" parentParam.formKey == 'reform' " type="primary" size="small" :loading="savebutton" @click="doDisDeal('formObj')">确 定</el-button>
            <el-button v-if=" parentParam.formKey == 'audit' " type="primary" size="small" :loading="savebutton" @click="doDisDeal('auditFormObj')">确 定</el-button>
            <el-button v-if=" parentParam.formKey == 'check' " type="primary" size="small" :loading="savebutton" @click="doDisDeal('checkFormObj')">确 定</el-button>
            <el-button v-if=" parentParam.formKey == 'auditCfm' " type="primary" size="small" :loading="savebutton" @click="doDisDeal('auditCfmFormObj')">确 定</el-button>
            <el-button size="small" @click="goBack">返 回</el-button>
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
      url: 'disposal/queryProbdetailListByPage',
      tableHeight: 250,
      params: {
        probId: '',
        vulnClass: ''
      },
      columns: [
      ],
      componentData: {},
      rectCnclsnOptions: [
        { dictKey: '1', dictValue: '整改完成' },
        { dictKey: '4', dictValue: '误报' },
        { dictKey: '5', dictValue: '无法整改' },
        { dictKey: '7', dictValue: '延期整改' },
        { dictKey: '8', dictValue: '临时整改' }
      ],
      parentParam: {
        formKey: '',
        busiId: '',
        taskName: '',
        taskId: '',
        procInstId: ''
      },
      formObj: {
        rectCnclsn: '',
        rectCnclsnVal: '',
        note: ''
      },
      auditFormObj: {
        rectifyComments: '',
        note: ''
      },
      checkFormObj: {
        rectifyComments: '',
        note: ''
      },
      auditCfmFormObj: {
        rectifyComments: '',
        note: ''
      },
      probcenBean: {},
      savebutton: false,
      rules: {
        // 验证必填项
        rectCnclsn: [
          { required: true, message: '请选择整改结论' }
        ]
      },
      auditRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      checkRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      auditCfmRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      tableLoading: true,
      detailTableData: [],
      vulnClass: '',
      procDefKey: '',
      busiId: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        if (!el) {
          return ''
        }
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.procDefKey = this.$route.query.procDefKey
    this.busiId = this.$route.query.busiId
    this.parentParam.formKey = this.$route.query.formKey
    this.parentParam.busiId = this.$route.query.busiId
    this.parentParam.taskName = this.$route.query.taskName
    this.parentParam.taskId = this.$route.query.taskId
    this.parentParam.procInstId = this.$route.query.procInstId
    this.queryProbcenListById()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
    queryProbcenListById() {
      const param = {}
      const $self = this
      param.probId = $self.parentParam.busiId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryProbcenListById', param).then(response => {
        $self.probcenBean = response.result
        $self.vulnClass = response.result.vulnClass
        loading.close()
        $self.initTable()
      }).catch(() => {
        loading.close()
      })
    },
    initTable() {
      const $self = this
      const probId = $self.parentParam.busiId
      const vulnClass = $self.vulnClass
      $self.params.probId = probId
      if (vulnClass === '1') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '合规项编码', prop: 'itemNo', 'minWidth': 100, align: 'center' },
          { label: '合规项内容', prop: 'itemContent', 'minWidth': 100, align: 'center' },
          { label: '合规项要求', prop: 'itemStandard', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '2') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '弱口令账号', prop: 'account', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '3') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '4') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '5') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '7') {
        $self.columns = [
          { label: '缺陷名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '缺陷说明', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '8') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '服务名称', prop: 'serviceName', 'minWidth': 100, align: 'center' },
          { label: '端口', prop: 'port', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      }
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    dcvrTimeFormatter(row) {
      if (!row.dcvrTime) {
        return ''
      }
      return this.moment(row.dcvrTime).format('YYYY-MM-DD HH:mm:ss')
    },
    rectTimeFormatter(row) {
      if (!row.rectTime) {
        return ''
      }
      return this.moment(row.rectTime).format('YYYY-MM-DD HH:mm:ss')
    },
    changeLocationValue(vId) {
      let obj = {}
      obj = this.rectCnclsnOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.dictKey === vId// 筛选出匹配数据
      })
      this.formObj.rectCnclsnVal = obj.dictValue
    },
    doDisDeal(formName) {
      const $self = this
      $self.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {}
          param.taskId = $self.parentParam.taskId
          param.busiId = $self.parentParam.busiId
          param.formKey = $self.parentParam.formKey
          if (formName === 'formObj') {
            param.nextLogin = $self.probcenBean.safetyMgr
            param.rectCnclsnVal = $self.formObj.rectCnclsnVal
            param.rectCnclsn = $self.formObj.rectCnclsn
            param.note = $self.formObj.note
          } else if (formName === 'auditFormObj') {
            param.note = $self.auditFormObj.note
            param.isOk = $self.auditFormObj.rectifyComments
            if (param.isOk === 'Y') {
              param.nextLogin = $self.probcenBean.safetyMfrs
              param.appd = '通过'
            } else if (param.isOk === 'N') {
              param.nextLogin = $self.probcenBean.scyRespId
              param.appd = '未通过'
            } else {
              param.appd = '其他'
            }
          } else if (formName === 'checkFormObj') {
            param.note = $self.checkFormObj.note
            param.isOk = $self.checkFormObj.rectifyComments
            if (param.isOk === 'Y') {
              param.nextLogin = $self.probcenBean.safetyMgr
              param.appd = '已整改'
            } else if (param.isOk === 'N') {
              param.nextLogin = $self.probcenBean.scyRespId
              param.appd = '未整改'
            }
          } else if (formName === 'auditCfmFormObj') {
            param.note = $self.auditCfmFormObj.note
            param.isOk = $self.auditCfmFormObj.rectifyComments

            if (param.isOk === 'Y') {
              if ($self.probcenBean.rectCnclsn === '整改完成') {
                param.rectStat = '1'
              } else if ($self.probcenBean.rectCnclsn === '误报') {
                param.rectStat = '4'
              } else if ($self.probcenBean.rectCnclsn === '无法整改') {
                param.rectStat = '5'
              } else if ($self.probcenBean.rectCnclsn === '延期整改') {
                param.rectStat = '7'
              } else if ($self.probcenBean.rectCnclsn === '临时整改') {
                param.rectStat = '8'
              }
              window.console.info('$self.probcenBean.rectCnclsn')
              window.console.info(param)
            } else if (param.isOk === 'N') {
              param.nextLogin = $self.probcenBean.scyRespId
              param.appd = '未通过'
            }
          }
          $self.savebutton = true
          $self.$store.dispatch('disposal/doDisDeal', param).then(response => {
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
            }
          }).catch(() => {
            $self.savebutton = false
            this.$router.push({ path: '/system/workflow/busiTaskList' })
          })
        }
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
