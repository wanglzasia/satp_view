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
                <el-form-item label="IP地址" prop="ip">
                  <el-input v-model="queryArgs.ip" placeholder="IP地址" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="端口" prop="port">
                  <el-input v-model="queryArgs.port" placeholder="端口" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="服务" prop="server">
                  <el-input v-model="queryArgs.server" placeholder="服务" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="审批状态" prop="approvalStatus">
                  <el-select v-model="queryArgs.approvalStatus" placeholder="审批状态" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="(item, index) in approvalStatusOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
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
                  <el-button type="success" icon="el-icon-plus" size="small" @click="showDialog({},'add')">新建授权</el-button>
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
            ref="netAuthDgd"
            :url="netAuthUrl"
            :qparams="queryArgs"
            :columns="columns"
            idx
            border
            @operClick="operClick"
          />
        </div>

        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="40%" :model="formObj" @close="cancle">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="110px" @submit.native.prevent>
              <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
              <el-row>
                <el-col :span="20">
                  <el-form-item label="IP地址" prop="ip">
                    <el-input v-model="formObj.ip" placeholder="IP地址" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="端口" prop="port">
                    <el-input v-model="formObj.port" placeholder="端口" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="服务" prop="server">
                    <el-input v-model="formObj.server" placeholder="服务" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="生效日期" prop="effectTime">
                    <el-date-picker
                      v-model="formObj.effectTime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="生效日期"
                      clearable
                      :style="{width: '100%'}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="失效日期" prop="invalidTime">
                    <el-date-picker
                      v-model="formObj.invalidTime"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="失效日期"
                      :style="{width: '100%'}"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="审批人" prop="approvalUser">
                    <el-input v-model="formObj.approvalUserName" placeholder="审批人" readonly @click.native.prevent="getDataRootUser()" />
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="formObj.approvalUser" type="hidden" style="display:none;" />
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="备注" prop="note">
                    <el-input
                      v-model="formObj.note"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancle()">取消</el-button>
              <el-button type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
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
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
export default {
  components: { 'user-window': userInfo, 'satp-datagrid': datagrid },

  props: [],
  data() {
    const ipR = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
    const isIp = (rule, value, callback) => {
      if (!ipR.test(value)) {
        return callback(new Error('请输入正确的IP'))
      } else {
        callback()
      }
    }

    const portR = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    const isPort = (rule, value, callback) => {
      if (!portR.test(value)) {
        return callback(new Error('请输入正确的端口'))
      } else {
        callback()
      }
    }
    return {
      moreParams: false, // 更多条件
      netAuthUrl: 'netAuth/netAuthList',
      Height: window.innerHeight - 195,
      approvalStatusOptions: [{
        'label': '待审批',
        'value': 0
      }, {
        'label': '通过',
        'value': 1
      }, {
        'label': '未通过',
        'value': 2
      }],
      queryArgs: {},
      savebutton: false,
      dialogFormVisible: false,
      formAttr: {
        // 弹出框属性
        title: '',
        type: '',
        formLabelWidth: '130px'
      },
      formObj: {
      },
      formRule: {// 验证必填项
        ip: [
          { required: true, message: '请填写必填项', trigger: 'blur' },
          { validator: isIp }
        ],
        port: [
          { required: true, message: '请填写必填项', trigger: 'blur' },
          { validator: isPort }
        ],
        server: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        effectTime: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        invalidTime: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        approvalUser: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]

      },
      tableData: [],
      loading: true,
      columns: [
        { label: 'IP地址', prop: 'ip', actions: [{ prop: 'detail', type: 'text', link: 'ip' }] },
        { label: '端口', prop: 'port' },
        { label: '服务', prop: 'server' },
        { label: '生效日期', prop: 'effectTime', formatter: this.effectTimeFormatter },
        { label: '失效日期', prop: 'invalidTime', formatter: this.invalidTimeFormatter },
        { label: '审批状态', prop: 'approvalStatus', formatter: this.approvalStatusFormatter },
        { label: '申请人', prop: 'createUserName' },
        { label: '审批人', prop: 'approvalUserName' },
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
    },
    datetimeFormat() {
      return function(el, format) {
        let fmt = 'YYYY-MM-DD HH:mm:ss'
        let value = ''
        if (format) {
          fmt = format
        }
        if (el) {
          value = this.moment(el).format(fmt)
        }
        return value
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
        case 'delete':
          this.deleteNetAuth(row)
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['netAuthDgd'].reload()
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      const $self = this
      $self.formObj.approvalUserName = data.userName
      $self.formObj.approvalUser = data.userId
      window.console.info($self.formObj.dataRootUserName)
      this.$refs['ruleForm'].clearValidate('approvalUser')
    },
    approvalStatusFormatter(row) {
      if (row.approvalStatus === 1) {
        return '通过'
      } else if (row.approvalStatus === 2) {
        return '未通过'
      } else if (row.approvalStatus === 0) {
        return '未审批'
      }
    },
    effectTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.effectTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    invalidTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.invalidTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    operFormatter(row) {
      let actions = []
      const approvalStatus = row.approvalStatus
      if (approvalStatus === 1) {
        actions = [
          { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除吗?' }
        ]
      } else {
        actions = [{ label: '-', prop: 'no', type: 'text' }]
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
            url = 'netAuth/addNetAuth'
          } else if ($self.formAttr.formType === 'edit') {
            url = 'netAuth/updateNetAuth'
          } else {
            this.formAttr.title = `详情`
          }
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
          this.reloadDatagrid()
        } else {
          $self.savebutton = false
          return false
        }
      })
    },
    deleteNetAuth(row) {
      const $self = this
      const netAuth = { authId: row.authId }

      this.$store.dispatch('netAuth/deleteNetAuth', netAuth).then(response => {
        $self.reloadDatagrid()
        $self.$message({
          message: `删除操作成功！`,
          type: 'success'
        })
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
      } else {
        this.formAttr.title = `详情`
      }
      const netAuth = { authId: row.authId }
      if (type === 'edit') {
        this.$store.dispatch('netAuth/findNetAuth', netAuth).then(response => {
          this.formObj = {}
          // 深克隆
          this.formObj = Object.assign({}, response.scanAuth)
        })
      }

      this.formAttr.formType = type
      $self.dialogFormVisible = true
    }
  }
}
</script>
<style>
</style>
}
