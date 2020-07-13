<template>
  <div>
    <div class="app-container">
      <div>
        <el-page-header content="核验" @back="goBack" />
        <router-view />
      </div>
      <el-card>
        <el-form
          :model="selectObj"
          :label-position="labelPosition"
          label-width="auto"
          size="small"
          disabled
        >
          <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
          <h4>
            <center>业务信息</center>
          </h4>
          <el-row>
            <el-col :span="24">
              <el-form-item label="业务名称" prop="serviceName">
                <el-input v-model="selectObj.serviceName" placeholder="业务名称" disabled clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="业务归属单位" prop="serviceBelongUnit">
                <el-input v-model="selectObj.serviceBelongUnitName" placeholder="业务归属单位" clearable disabled prefix-icon="iconfont el-icon-s-home">
                  <el-button slot="append" icon="el-icon-search" @click="serviceBelongUnitVisible = true" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="业务主管部门" prop="serviceDepart">
                <el-input v-model="selectObj.serviceDepartName" placeholder="业务主管部门" clearable disabled prefix-icon="iconfont el-icon-s-home">
                  <el-button slot="append" icon="el-icon-search" @click="serviceDepartVisible = true" />
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="业务类别" prop="serviceType" disabled>
                <el-select v-model="selectObj.serviceTypeName" placeholder="业务类别,请选择">
                  <el-option
                    v-for="item in serviceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="所属阶段" prop="belongStage" disabled>
                <el-select v-model="selectObj.belongStageName" placeholder="所属阶段,请选择">
                  <el-option
                    v-for="item in belongStageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="业务属性" prop="evalPracStage" disabled>
                <el-select v-model="selectObj.evalPracStageName" placeholder="业务属性,请选择">
                  <el-option
                    v-for="item in evalPracStageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="业务(拟)上线时间" prop="serviceOnlineTime" disabled>
                <el-date-picker
                  v-model="selectObj.serviceOnlineTime"
                  placeholder="业务(拟)上线时间"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="业务简介" prop="synopsis" disabled>
                <el-input v-model="selectObj.synopsis" type="textarea" placeholder="业务简介" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="负责人" prop="contactsee" disabled>
                <el-input v-model="selectObj.contactseeName" placeholder="请选择负责人 " disabled size="small">
                  <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="联系电话" prop="contactsNumber" disabled>
                <el-input v-model="selectObj.contactsNumber" placeholder="联系电话" disabled clearable />
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" prop="contactsMail" disabled>
                <el-input v-model="selectObj.contactsMail" placeholder="联系邮箱" disabled clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="总体说明文档" prop="upload">
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="技术文档" prop="technologyDoc">
                <file-upload
                  :qrydata="techDatas"
                  :numlimit="limitTech"
                  :file-list="techFile"
                  :disabled="true"
                  @getFileList="getTechList"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="管理文档" prop="managementDoc">
                <file-upload
                  :qrydata="manageDatas"
                  :numlimit="limitManage"
                  :file-list="manageFile"
                  :disabled="true"
                  @getFileList="getManageList"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-form
            ref="ruleForm"
            :model="assessmentObj"
            :label-position="labelPosition"
            label-width="150px"
            :rules="formRule"
            size="small"
          >
            <h4>
              <center>业务负责人核验</center>
            </h4>

            <el-row>
              <el-col :span="22">
                <el-form-item label="信息安全风险情况" prop="safeSituation">
                  <el-input v-model="assessmentObj.safeSituation" type="textarea" placeholder="信息安全风险情况 " size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="经营限制情况" prop="restrictSituation">
                  <el-input v-model="assessmentObj.restrictSituation" type="textarea" placeholder="经营限制情况 " size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="安全保障情况" prop="safetyGuarantee">
                  <el-input v-model="assessmentObj.safetyGuarantee" type="textarea" placeholder="安全保障情况 " size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="核验意见" prop="safetyAdvice">
                  <el-input v-model="assessmentObj.safetyAdvice" type="textarea" placeholder="核验意见 " size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="上传附件" prop="managementDoc">
                  <file-upload
                    :qrydata="accessDatas"
                    :numlimit="limitAccess"
                    :file-list="accessFile"
                    @getFileList="getAccessList"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确定</el-button>
                  <el-button @click="goBack">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
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
</template>
<script>
import UserInfo from '@/components/Userwindow/index.vue'
import fileUpload from '@/components/fileUpload/index'
export default {
  name: 'BusInfo',
  components: { 'user-window': UserInfo, 'file-upload': fileUpload },
  data() {
    return {
      Height: window.innerHeight - 195,
      selectObj: {},
      limitDoc: 3, // 限制附件上传个数
      alldesFile: [], // 初始附件列表
      allDesDatas: {
        fileType: 'doubleNew',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limitTech: 3, // 限制附件上传个数
      techFile: [], // 初始附件列表
      techDatas: {
        fileType: 'doubleNew',
        busiId: '2',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limitManage: 3, // 限制附件上传个数
      manageFile: [], // 初始附件列表
      manageDatas: {
        fileType: 'doubleNew',
        busiId: '3',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      evalPracStageOptions: [{
        value: '1',
        label: '新业务上线'
      }, {
        value: '2',
        label: '存量重点业务'
      }],
      belongStageOptions: [{
        value: '1',
        label: '试点'
      }, {
        value: '2',
        label: '试商用'
      }, {
        value: '3',
        label: '正式商用'
      }],

      serviceTypeOptions: [{
        value: '1',
        label: '一类业务'
      }, {
        value: '2',
        label: '二类业务'
      }, {
        value: '3',
        label: '三类业务'
      }],
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      assessmentObj: {},
      labelPosition: 'left',
      bussTtOptions: [],
      bussTttypeOptions: [{
        value: '1',
        label: '不确定'
      }, {
        value: '2',
        label: '无改造'
      }, {
        value: '3',
        label: '有改造'
      }],
      recordFlagOptions: [
        {
          value: '1',
          label: '是'
        }, {
          value: '2',
          label: '否'
        }
      ],
      bussId: '',
      safetyId: '',
      taskId: '',
      accessDatas: {
        fileType: 'doubleNew',
        busiId: '4',
        busiSeg: '1',
        busiIndex: '1'
      },
      limitAccess: 1,
      accessFile: [],
      fileUrl: '',
      fileName: '',
      realName: '',
      formRule: {
        safeSituation: [
          { required: true, message: '请填写信息安全风险情况', trigger: 'blur' }
        ],
        restrictSituation: [
          { required: true, message: '请填写经营限制情况', trigger: 'blur' }
        ],
        safetyGuarantee: [
          { required: true, message: '请填写安全保障情况', trigger: 'blur' }
        ],
        safetyAdvice: [
          { required: true, message: '请填写核验意见', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.bussId = this.$route.query.busiId
    this.safetyId = this.$route.query.safetyId
    this.taskId = this.$route.query.taskId
  },
  mounted() {
    this.moreInfo()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/doubleNew/evalVerify'
      })
    },
    onSubmit() {
      const $self = this

      $self.accessFile.forEach(file => {
        if (this.fileName === '' || this.fileName === null) {
          this.fileName = file.fileName
        } else {
          this.fileName = this.fileName + ',' + file.fileName
        }
        if (this.fileUrl === '' || this.fileUrl === null) {
          this.fileUrl = file.fileUrl
        } else {
          this.fileUrl = this.fileUrl + ',' + file.fileUrl
        }
        if (this.realName === '' || this.realName === null) {
          this.realName = file.realName
        } else {
          this.realName = this.realName + ',' + file.realName
        }
      })

      const params = $self.assessmentObj
      params.safetyId = $self.safetyId
      params.bussId = $self.bussId
      params.taskId = $self.taskId
      params.fileName = $self.fileName
      params.fileUrl = $self.fileUrl
      params.realName = $self.realName
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('evalVerify/safetyResult', params).then(response => {
            if (response && response.RET_CODE === '0') {
              $self.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.goBack()
            }
          })
        }
      })
    },
    moreInfo() {
      this.$store.dispatch('businessInfo/findBusinessInfoByBussId', { bussId: this.bussId }).then(response => {
        this.selectObj = {}
        // 深克隆
        this.selectObj = Object.assign({}, response.businessInfo)
        // 附件信息，如果业务表里的附件id不存在，不会报错
        if (response.businessInfo.allDescList) {
          this.alldesFile = response.businessInfo.allDescList
        }
        if (response.businessInfo.techList) {
          this.techFile = response.businessInfo.techList
        }
        if (response.businessInfo.manageList) {
          this.manageFile = response.businessInfo.manageList
        }
        this.selectObj.serviceDepartName = response.businessInfo.serviceDepartName
        this.selectObj.serviceDepart = response.businessInfo.serviceDepart
        this.selectObj.serviceBelongUnitName = response.businessInfo.serviceBelongUnitName
        this.selectObj.serviceBelongUnit = response.businessInfo.serviceBelongUnit
      })
      this.$store.dispatch('evalInfo/findEvalInfo', { bussId: this.bussId }).then(response => {
        this.assessmentObj = {}
        // 深克隆
        this.assessmentObj = Object.assign({}, response.evalutionInfo)
      })
      this.$store.dispatch('evalVerify/findTetongList', { bussId: this.bussId }).then(response => {
        this.bussTtOptions = {}
        // 深克隆
        this.bussTtOptions = Object.assign({}, response.tetongList)
      })
    },
    getalldesList(data) {
      this.alldesFile = data
    },
    getTechList(data) {
      this.techFile = data
    },
    getManageList(data) {
      this.manageFile = data
    },
    getAccessList(data) {
      this.accessFile = data
    },
    cancleMore() {
      this.selectObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.assessmentObj.bussLeaderName = data.userName
      $self.assessmentObj.bussLeader = data.userId
    }
  }
}
</script>
