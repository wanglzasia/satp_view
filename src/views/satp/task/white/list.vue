<template>
  <div>
    <div class="app-container">
      <el-card>
        <div>
          <el-row>
            <el-form
              ref="elForm"
              :model="queryArgs"
              label-position="left"
              label-width="70px"
              size="small"
              class="satp-form-inline"
            >
              <el-col :span="5">
                <el-form-item label="地址" prop="ipAddress">
                  <el-input v-model="queryArgs.ipAddress" placeholder="地址" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="资产名称" prop="port">
                  <el-input v-model="queryArgs.assetName" placeholder="资产名称" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="资产类型" prop="assetType">
                  <el-select v-model="queryArgs.assetType" placeholder="资产类型" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="(item, index) in assetTypeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="报备状态" prop="approvalStatus">
                  <el-select v-model="queryArgs.approvalStatus" placeholder="报备状态" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="(item, index) in approvalStatusOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div class="satp-from-btngrp-std">
                  <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid()">
                    <i class="el-icon-search" />查询
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native.prevent="moreParams= !moreParams">更多条件</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button type="success" icon="el-icon-plus" size="small" @click="showDialog({},'add')">新增</el-button>
                </div>
              </el-col>
              <div v-if="moreParams">
                <el-col :span="5">
                  <el-form-item label="生效日期" prop="effectTime">
                    <el-date-picker
                      v-model="queryArgs.effectTime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="生效日期"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </div>
            </el-form>
          </el-row>
        </div>
        <div>
          <satp-datagrid
            ref="scheWlistDgd"
            :url="scheWlistUrl"
            :qparams="queryArgs"
            :columns="columns"
            idx
            border
            @operClick="operClick"
          />
        </div>

        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="40%" :model="formObj" @close="cancle">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="80px" @submit.native.prevent>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="资产名称" prop="assetName">
                    <el-input v-model="formObj.assetName" placeholder="资产名称" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="资产类型" prop="assetType">
                    <el-select v-model="formObj.assetType" placeholder="资产类型" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in assetTypeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <div v-if="formAttr.formType=='detail'">
                  <el-col :span="12">
                    <el-form-item label="组织机构" prop="orgName">
                      <el-input v-model="formObj.orgName" clearable readonly prefix-icon="iconfont el-icon-s-home" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="责任人" prop="respUserName">
                      <el-input v-model="formObj.respUserName" clearable readonly prefix-icon="iconfont el-icon-s-custom" />
                    </el-form-item>
                  </el-col>
                </div>
                <div v-else>
                  <el-col :span="12">
                    <el-form-item label="组织机构" prop="orgName">
                      <el-input v-model="formObj.orgName" clearable readonly prefix-icon="iconfont el-icon-s-home" @click.native="serviceMultiVisible = true" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="责任人" prop="respUserName">
                      <el-input v-model="formObj.respUserName" clearable readonly prefix-icon="iconfont el-icon-s-custom" @click.native.prevent="getDataRootUser()" />
                    </el-form-item>
                  </el-col>
                </div>

                <el-col :span="24">
                  <el-form-item label="地址" prop="ipAddress">
                    <el-input
                      v-model="formObj.ipAddress"
                      placeholder="IP地址或者URL"
                      :readonly="formAttr.formType=='detail'"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="检测类型" prop="chkType">
                    <el-radio-group v-model="formObj.chkType" size="small" :disabled="formAttr.formType=='detail'">
                      <el-radio-button label="0">暂不扫描</el-radio-button>
                      <el-radio-button label="1">定时扫描</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="扫描类型" prop="scanType">
                    <el-select v-model="formObj.scanType" placeholder="扫描类型" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in scanTypeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <div v-if="formObj.chkType=='1'">
                  <el-col :span="24">
                    <el-form-item label="" prop="scanDate">
                      <el-date-picker
                        v-model="formObj.scanDate"
                        :readonly="formAttr.formType=='detail'"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      />
                    </el-form-item>
                  </el-col>
                </div>
                <el-col :span="24">
                  <el-form-item label="报备原因" prop="approvalReason">
                    <el-input
                      v-model="formObj.approvalReason"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="4"
                      placeholder="报备原因"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="cancle()">取消</el-button>
              <el-button size="small" type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
            </div>
          </el-dialog>

          <user-window
            v-if="userWindowVisible"
            :title="title"
            :parent-component-param="parentComponentParam"
            :multiple="multiple"
            :visible.sync="userWindowVisible"
            :modal-append-to-body="false"
            @getUserInfo="getUserInfo"
          />
          <multi-org
            v-if="serviceMultiVisible"
            :visible.sync="serviceMultiVisible"
            @getOrg="getOrgInfo"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
import selectMultipleOrg from '@/components/SelectMultipleOrg/index'
export default {
  components: { 'user-window': userInfo, 'satp-datagrid': datagrid, 'multi-org': selectMultipleOrg },
  props: [],
  data() {
    return {
      moreParams: false, // 更多条件
      scheWlistUrl: 'scheWlist/scheWlistList',
      Height: window.innerHeight - 195,
      approvalStatusOptions: [{
        'label': '报备中',
        'value': 0
      }, {
        'label': '已报备',
        'value': 1
      }, {
        'label': '已驳回',
        'value': 2
      }, {
        'label': '不适用',
        'value': 3
      }],
      assetTypeOptions: [{
        'label': '主机',
        'value': '164'
      }, {
        'label': '物理类资源',
        'value': '162'
      }, {
        'label': '应用类资源',
        'value': '163'
      }, {
        'label': '交换机',
        'value': '176'
      }, {
        'label': '中间件',
        'value': '177'
      }],
      scanTypeOptions: [{
        'label': '基线',
        'value': 'BASE'
      }, {
        'label': '系统漏扫',
        'value': 'VULN'
      }, {
        'label': 'WEB漏扫',
        'value': 'WEB'
      }],
      queryArgs: {},
      savebutton: false,
      dialogFormVisible: false,
      serviceMultiVisible: false,
      formAttr: {
        // 弹出框属性
        title: '',
        type: '',
        formLabelWidth: '130px'
      },
      formObj: {
        chkType: '0'
      },
      formRule: {// 验证必填项
        assetName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        assetType: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        respUserName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        ipAddress: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        scanType: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        approvalReason: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      tableData: [],
      loading: true,
      columns: [
        { label: '资产ID', prop: 'id' },
        { label: '资产名称', prop: 'assetName' },
        { label: '资产类型', prop: 'assetTypeName' },
        { label: '地址', prop: 'ipAddress' },
        { label: '报备状态', prop: 'approvalStatus', formatter: this.approvalStatusFormatter },
        { label: '检测类型', prop: 'chkType', formatter: this.chkTypeFormatter },
        { label: '添加时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '更新时间', prop: 'updateTime', formatter: this.updateTimeFormatter },
        { label: '操作', prop: 'opt', width: 160, actions: [], formatter: this.operFormatter }
      ],
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userWindowVisible: false
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).utc().format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.Height = window.innerHeight - 195
      })()
    }
  },
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.showDialog(row, 'edit')
          break
        case 'detail':
          this.showDialog(row, 'detail')
          break
        case 'delete':
          this.deleteScheWlist(row)
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['scheWlistDgd'].reload()
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.multiple = false// true 为复选
    },
    getOrgInfo(data) {
      // 返回的data是集合。自行使用
      this.$set(this.formObj, 'orgId', data[0].id)
      this.$set(this.formObj, 'orgName', data[0].label)
      this.$refs['ruleForm'].clearValidate('orgName')
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      this.$set(this.formObj, 'respUser', data.userId)
      this.$set(this.formObj, 'respUserName', data.userName)
      this.$refs['ruleForm'].clearValidate('respUserName')
    },
    approvalStatusFormatter(row) {
      if (row.approvalStatus === 1) {
        return '已报备'
      } else if (row.approvalStatus === 2) {
        return '已驳回'
      } else if (row.approvalStatus === 3) {
        return '不适用'
      } else if (row.approvalStatus === 0) {
        return '报备中'
      }
    },
    chkTypeFormatter(row) {
      if (row.chkType === 0) {
        return '暂不扫描'
      } else if (row.chkType === 1) {
        return '定时扫描'
      }
    },
    createTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    updateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.updateTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    operFormatter(row) {
      let actions = []
      const approvalStatus = row.approvalStatus
      if (approvalStatus === 0) {
        actions = [{ label: '详情', prop: 'detail', type: 'success' }]
      } else {
        actions = [
          { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除吗?' }
        ]
      }
      return actions
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    saveForm() {
      const $self = this
      this.savebutton = true
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if ($self.formAttr.formType === 'add') {
            url = 'scheWlist/addScheWlist'
          } else if ($self.formAttr.formType === 'edit') {
            url = 'scheWlist/updateScheWlist'
          } else {
            this.formAttr.title = `详情`
          }
          const scanDate = this.formObj.scanDate
          this.formObj.startTime = scanDate[0]
          this.formObj.endTime = scanDate[1]

          this.$store.dispatch(url, $self.formObj).then(response => {
            $self.savebutton = false
            $self.formObj = {}
            $self.reloadDatagrid()
            $self.dialogFormVisible = false
            $self.$message({
              message: '操作成功！',
              type: 'success'
            })
          })
        } else {
          $self.savebutton = false
          return false
        }
      })
    },
    deleteScheWlist(row) {
      const $self = this
      const scheWlist = { id: row.id }
      this.$store.dispatch('scheWlist/deleteScheWlist', scheWlist).then(response => {
        $self.reloadDatagrid()
      })
    },
    // 显示弹出框判断是添加还是编辑该节点
    showDialog(row, type) {
      const $self = this
      this.savebutton = false
      event.stopPropagation()
      if (type === 'add') {
        this.formAttr.title = `新增`
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
        this.formObj = Object.assign({}, row)
        this.formObj.scanDate = [this.formObj.startTime, this.formObj.endTime]
        this.formObj.chkType = this.formObj.chkType + ''
      } else {
        this.formAttr.title = `详情`
        this.formObj = Object.assign({}, row)
        this.formObj.scanDate = [this.formObj.startTime, this.formObj.endTime]
        this.formObj.chkType = this.formObj.chkType + ''
      }
      console.log(this.formObj)
      this.formAttr.formType = type
      $self.dialogFormVisible = true
    }
  }
}
</script>
