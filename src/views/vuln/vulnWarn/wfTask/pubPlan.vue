<template>
  <div>
    <div class="app-container">
      <el-card>
        <!--漏洞预警信息-->
        <div>
          <div class="satp-grid-title">预警信息</div>
          <el-form ref="addForm" :model="addParams" label-width="120px" size="small">
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
                  <el-input v-model="addParams.planPubMan" placeholder="方案发布人" :readonly="true" />
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
              <el-col :span="24">
                <el-form-item label="附件">
                  <a v-for="fileBean in warnFile" :key="fileBean.idx" style="size:10px;color:#9A9898;" href="#" :title="fileBean.realName" :download="fileBean.realName" @click="downloadFile(fileBean)">{{ fileBean.realName }}<br></a>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!--解决方案-->
        <div>
          <div class="satp-grid-title">解决方案</div>
          <el-form ref="planForm" :model="planParams" label-width="120px" :rules="planParamsRules" size="small">
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="是否解决" prop="solutionFlag">
                  <el-select v-model="planParams.solutionFlag" placeholder="是否解决">
                    <el-option label="未解决" value="0" />
                    <el-option label="已解决" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="解决方案" prop="solutionDetail">
                  <el-input v-model="planParams.solutionDetail" type="textarea" placeholder="解决方案" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="附件" prop="managementDoc">
                  <file-upload
                    :qrydata="allDesDatas"
                    :numlimit="limitDoc"
                    :file-list="alldesFile"
                    :disabled="true"
                    @getFileList="getalldesList"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div style="text-align: center;padding-top: 30px;">
          <span>
            <el-button type="text" size="small" @click="cancle">取 消</el-button>
            <el-button type="primary" size="small" @click="save('planForm')">确认</el-button>
          </span>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import fileUpload from '@/components/fileUpload/index'

export default {
  components: { 'file-upload': fileUpload },
  data() {
    return {
      queryUrl: 'vulnWarn/queryVulnWarnById',
      queryOrgUrl: 'vulnWarn/queryScopeOrg',
      queryUserUrl: 'vulnWarn/queryScopeUser',
      saveUrl: 'vulnWarn/pubPlan',
      fileUrl: 'vulnWarn/findVulnWarnFiles',
      taskId: '',
      busiId: '',
      addParams: {},
      planParams: {},
      planParamsRules: {
        solutionFlag: [
          { required: true, message: '请选择预是否解决', trigger: 'blur' }
        ],
        solutionDetail: [
          { required: true, message: '请输入解决方案', trigger: 'blur' }
        ]
      },
      // 通知组织
      orgView: false,
      // 通知人员
      personView: false,
      warnFile: [],
      limitDoc: 3, // 限制附件上传个数
      alldesFile: [], // 初始附件列表
      allDesDatas: {
        fileType: 'vulnWarn',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      } // 附件上传参数
    }
  },
  mounted() {
    const taskId = this.$route.query.taskId
    const busiId = this.$route.query.busiId
    this.taskId = taskId
    this.busiId = busiId
    this.allDesDatas.busiId = busiId

    this.queryVulnWarn()
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
          const params = this.planParams
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
    // 查询预警信息详情
    queryVulnWarn() {
      const params = {}
      params.vulWarnId = this.busiId
      this.$store.dispatch(this.queryUrl, params).then(resp => {
        this.$set(this.addParams, 'vulAlertingName', resp.data.VUL_ALERTING_NAME)
        this.$set(this.addParams, 'vulAlertingId', resp.data.VUL_ALERTING_ID)
        this.$set(this.addParams, 'vulId', resp.data.VUL_ID)
        this.$set(this.addParams, 'vulName', resp.data.VUL_NAME)
        this.$set(this.addParams, 'noticeWay', resp.data.NOTICE_WAY + '')
        this.$set(this.addParams, 'vulWarnSrc', resp.data.VUL_WARN_SRC + '')
        this.$set(this.addParams, 'vulAlertingLevel', resp.data.VUL_ALERTING_LEVEL + '')
        this.$set(this.addParams, 'vulAlertingState', resp.data.VUL_ALERTING_STATE)

        this.$set(this.addParams, 'planPubMan', resp.data.PLAN_NAME)
        this.$set(this.addParams, 'storageTime', resp.data.STORAGE_TIME)
        this.$set(this.addParams, 'noticeScope', resp.data.NOTICE_SCOPE + '')
        this.$set(this.addParams, 'vulNote', resp.data.VUL_NOTE)

        this.queryOrgOrUser(resp.data.VUL_WARN_ID, resp.data.NOTICE_SCOPE + '')
        this.chooseNoticeScope(resp.data.NOTICE_SCOPE + '')
        this.queryVulnWarnFiles(resp.data.VUL_WARN_ID)
      }).catch(
      )
    },
    // 查询通知组织或人员
    queryOrgOrUser(vulWarnId, noticeScope) {
      if (noticeScope === '2') { // 组织
        const params = {}
        params.vulWarnId = this.busiId
        this.$store.dispatch(this.queryOrgUrl, params).then(resp => {
          this.$set(this.addParams, 'orgNames', resp.data)
        }).catch(
        )
      } else if (noticeScope === '3') { // 人员
        const params = {}
        params.vulWarnId = this.busiId
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
          this.warnFile = response.data
        }
      })
    },
    downloadFile(fileBean) {
      const params = { 'realName': fileBean.realName, 'fileUrl': fileBean.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    getalldesList(data) {
      this.alldesFile = data
    },
    // 通知范围改变事件
    chooseNoticeScope(noticeScope) {
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
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select {
  width: 100%;
}
</style>
