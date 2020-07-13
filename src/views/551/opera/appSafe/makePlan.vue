<template>
  <div>
    <div class="app-cotainer">
      <el-card class="box-card">
        <div>
          <el-page-header :content="parentParam.taskName" @back="goBack" />
        </div>
        <!-- 任务信息 -->
        <div style="margin: 20px 15px 0 15px;">
          <div class="satp-grid-title">任务信息</div>
          <table class="satp-table-detail">
            <tr>
              <th>工单标题</th>
              <td>{{ operInfo.oper_title }}</td>
              <th>工单编号</th>
              <td>{{ operInfo.oper_no }}</td>
              <th>创建时间</th>
              <td>{{ operInfo.create_time }}</td>
            </tr>
          </table>
        </div>
        <!-- 扫描计划 -->
        <div style="margin: 35px 15px 0 15px;">
          <div>
            <div class="satp-grid-title" style="float:left;margin-bottom:0px;margin-top:3px;">扫描计划</div>
            <div style="float:left;">
              <el-button type="primary" size="mini" icon="el-icon-plus" style="margin:0 0 10px 10px;padding:5px 6px;" @click="addPlan">新增</el-button>
            </div>
          </div>
          <satp-datagrid
            ref="planDataTable"
            :url="planDataUrl"
            :qparams="planDataParams"
            :columns="columns"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mid"
            @operClick="operClick"
          />
          <el-row />
          <el-form
            ref="operForm"
            :model="operForm"
            :rules="operFormRules"
            label-width="110px"
            size="small"
            class="plan-form"
            style="margin:0 auto;width:300px;"
          >
            <el-form-item label="安全管理员" prop="safety_mgr_name">
              <el-input v-model="operForm.safety_mgr_name" placeholder="请选择安全管理员" readonly autocomplete="off" style="cursor: pointer;" @click.native.prevent="selectSafeMgr()" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="margin:0 auto;width:110px;">
            <el-button size="small" type="text" @click="goBack">取 消</el-button>
            <el-button size="small" type="primary" @click="doPlanApply('operForm')">确 定</el-button>
          </div>
        </div>
      </el-card>
    </div>

    <!--添加功能-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="planDigVisible"
      width="540px"
      :close-on-click-modal="false"
      @close="clear"
    >
      <el-form
        ref="planForm"
        :model="planForm"
        :rules="planFormRules"
        label-width="110px"
        size="small"
        class="plan-form"
      >
        <el-form-item label="类型" prop="oper_type">
          <el-select v-model="planForm.oper_type" placeholder="请选择类型">
            <el-option label="代码审计" value="1" />
            <el-option label="渗透" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属系统" prop="app_name">
          <el-input v-model="planForm.app_name" autocomplete="off" placeholder="请输入所属系统" />
        </el-form-item>
        <el-form-item label="科室领导" prop="dept_resp">
          <el-select v-model="planForm.dept_resp" placeholder="请选择科室领导">
            <el-option
              v-for="item in orgLeaderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="应用负责人" prop="resp_usr_name">
          <el-input v-model="planForm.resp_usr_name" placeholder="请选择应用负责人" readonly autocomplete="off" style="cursor: pointer;" @click.native.prevent="selectRespUsr()" />
        </el-form-item>
        <el-form-item label="计划开始时间" prop="begin_time">
          <el-date-picker
            v-model="planForm.begin_time"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="计划开始时间"
          />
        </el-form-item>
        <el-form-item label="计划结束时间" prop="end_time">
          <el-date-picker
            v-model="planForm.end_time"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd"
            placeholder="计划结束时间"
          />
        </el-form-item>
        <el-form-item label="备注" prop="plan_note">
          <el-input v-model="planForm.plan_note" type="textarea" autocomplete="off" placeholder="备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="planDigVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='add'" size="small" type="primary" @click="savePlan('planForm')">确 定</el-button>
        <el-button v-else size="small" type="primary" @click="updatePlan('planForm')">确 定</el-button>
      </div>
    </el-dialog>

    <user-window
      v-if="userWindowVisible"
      title="请选择负责人"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'
export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  data() {
    return {
      parentParam: {
        formKey: '',
        busiId: '',
        taskName: '',
        taskId: '',
        procInstId: ''
      },
      operInfo: {
        oper_title: undefined,
        oper_no: undefined,
        create_time: undefined
      },
      tableHeight: window.innerHeight - 470,
      planDataUrl: 'opera/operPlanList',
      planDataParams: {
        oper_id: undefined
      },
      columns: [
        { label: '类型', prop: 'oper_type', formatter: this.operTypeFormat },
        { label: '所属系统', prop: 'app_name' },
        { label: '应用负责人', prop: 'resp_usrname', width: 130, align: 'center' },
        { label: '责任科室', prop: 'dept_name', width: 110, align: 'center' },
        { label: '科室领导', prop: 'dept_respname', width: 160, align: 'center' },
        { label: '计划开始时间', prop: 'begin_time', width: 160, align: 'center' },
        { label: '计划结束时间', prop: 'end_time', width: 160, align: 'center' },
        { label: '备注', prop: 'plan_note', width: 160, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 140,
          actions: [
            { label: '修改', prop: 'edit', type: 'primary' },
            { label: '删除', prop: 'del', type: 'primary' }
          ]
        }
      ],
      operForm: {
        bus_id: undefined,
        safety_mgr: undefined,
        safety_mgr_name: undefined
      },
      operFormRules: {
        safety_mgr_name: [{ required: true, message: '请选择安全管理员', trigger: 'change' }]
      },
      planDigVisible: false,
      planForm: {
        plan_id: undefined,
        oper_type: undefined,
        app_name: undefined,
        dept_resp: undefined,
        resp_usr: undefined,
        resp_usr_name: undefined,
        begin_time: undefined,
        end_time: undefined,
        plan_note: undefined
      },
      planFormRules: {
        oper_type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        app_name: [{ required: true, message: '请输入所属系统', trigger: 'blur' }],
        dept_resp: [{ required: true, message: '请选择科室领导', trigger: 'change' }],
        resp_usr_name: [{ required: true, message: '请选择应用负责人', trigger: 'change' }],
        begin_time: [{ required: true, message: '请选择计划开始时间', trigger: 'blur' }],
        end_time: [{ required: true, message: '请选择计划结束时间', trigger: 'blur' }]
      },
      orgLeaderOptions: [
      ],
      userType: 1,
      userWindowVisible: false,
      parentComponentParam: {},
      multiple: false,
      dialogStatus: undefined,
      textMap: {
        add: '新增计划',
        edit: '修改计划'
      }
    }
  },
  created() {
    this.parentParam.formKey = this.$route.query.formKey
    this.parentParam.busiId = this.$route.query.busiId
    this.parentParam.taskName = this.$route.query.taskName
    this.parentParam.taskId = this.$route.query.taskId
    this.parentParam.procInstId = this.$route.query.procInstId
    this.planDataParams.oper_id = this.$route.query.busiId
    this.operForm.bus_id = this.$route.query.busiId
    this.getOperInfo()
    this.getOrgLeaderOptions()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 470
      })()
    }
  },
  methods: {
    // 保存应用安全制定计划
    doPlanApply(formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          var form = that.operForm
          form.busiId = that.parentParam.busiId
          form.taskId = that.parentParam.taskId
          that.$store.dispatch('opera/doPlanApply', form).then(ret => {
            if (ret.code === '0') {
              this.$message({
                showClose: true,
                message: ret.msg,
                type: 'success'
              })
              that.goBack()
            } else {
              this.$message({
                showClose: true,
                message: ret.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 选择安全管理员
    selectSafeMgr() {
      this.userType = 1
      this.userWindowVisible = true
    },
    // 选择应用负责人
    selectRespUsr() {
      this.userType = 2
      this.userWindowVisible = true
    },
    getOperInfo() {
      var that = this
      var oper_id = that.planDataParams.oper_id
      that.$store.dispatch('opera/infoData', { 'oper_id': oper_id }).then(ret => {
        if (ret.code === '0') {
          var data = ret.data
          that.operInfo = {
            oper_title: data.oper_title,
            oper_no: data.oper_no,
            create_time: data.create_time
          }
        } else {
          this.$message({
            showClose: true,
            message: ret.msg,
            type: 'error'
          })
        }
      })
    },
    goBack() {
      if (this.parentParam.formKey === 'view') {
        this.$router.push({ path: '/satp/disposal/rptPrep' })
      } else {
        this.$router.push({ path: '/system/workflow/busiTaskList' })
      }
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.editPlan(row)
          break
        case 'del':
          this.delPlan(row)
          break
        default:
          break
      }
    },
    // 新增计划
    addPlan() {
      this.dialogStatus = 'add'
      this.planDigVisible = true
    },
    // 保存扫描计划
    savePlan(formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          var form = that.planForm
          form.busiId = that.parentParam.busiId
          form.taskId = that.parentParam.taskId
          that.$store.dispatch('opera/savePlan', form).then(ret => {
            if (ret.code === '0') {
              this.$message({
                showClose: true,
                message: '保存成功',
                type: 'success'
              })
              this.planDigVisible = false
              that.getPlanList()
            } else {
              this.$message({
                showClose: true,
                message: ret.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改扫描计划
    editPlan(row) {
      var that = this
      that.$store.dispatch('opera/planInfo', { 'plan_id': row.plan_id }).then(ret => {
        if (ret.code === '0') {
          var obj = ret.data
          that.planForm = {
            plan_id: obj.plan_id,
            oper_type: obj.oper_type + '',
            app_name: obj.app_name,
            dept_resp: obj.dept_id + '--' + obj.dept_resp,
            resp_usr: obj.resp_usr,
            resp_usr_name: obj.resp_usr_name,
            begin_time: obj.begin_time,
            end_time: obj.end_time,
            plan_note: obj.plan_note
          }
          that.dialogStatus = 'edit'
          that.planDigVisible = true
        } else {
          that.$message({
            showClose: true,
            message: ret.msg,
            type: 'error'
          })
        }
      })
    },
    updatePlan(formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          var form = that.planForm
          form.busiId = that.parentParam.busiId
          form.taskId = that.parentParam.taskId
          that.$store.dispatch('opera/editPlan', form).then(ret => {
            if (ret.code === '0') {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.planDigVisible = false
              that.getPlanList()
            } else {
              this.$message({
                showClose: true,
                message: ret.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 删除扫描计划
    delPlan(row) {

    },
    operTypeFormat(row) {
      var operType = row.oper_type
      var str = ''
      if (operType === 1) {
        str = '代码审计'
      } else {
        str = '渗透测试'
      }
      return str
    },
    getOrgLeaderOptions() {
      var that = this
      that.$store.dispatch('opera/orgLeaderList', {}).then(ret => {
        var list = ret.list
        for (var i = 0; i < list.length; i++) {
          var obj = list[i]
          that.orgLeaderOptions[i] = {
            value: obj.org_id + '--' + obj.user_id,
            label: obj.org_name + '--' + obj.user_name
          }
        }
      }).catch(
        // 撤销loading 遮罩
      )
    },
    // // 单选时data 传回用户对象;复选传回用户数组
    getUserInfo(data, parentComponentParam) {
      var that = this
      if (that.userType === 1) {
        that.operForm.safety_mgr = data.userId
        that.operForm.safety_mgr_name = data.userName
      } else if (that.userType === 2) {
        that.planForm.resp_usr = data.userId
        that.planForm.resp_usr_name = data.userName
      }
    },
    // 扫描计划列表
    getPlanList() {
      this.$refs.planDataTable.query({})
    },
    clear() {
      this.$refs['planForm'].resetFields()
      this.planForm = {
        plan_id: undefined,
        oper_type: undefined,
        app_name: undefined,
        dept_resp: undefined,
        resp_usr: undefined,
        resp_usr_name: undefined,
        begin_time: undefined,
        end_time: undefined,
        plan_note: undefined
      }
      this.dialogStatus = undefined
    },
    downloadFile(file) {
      const params = { realName: file.name, fileUrl: file.url }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    }
  }
}
</script>
<style scoped>
.el-datagrid{
  padding: 0 0;
}
.plan-form .el-form-item{
  margin-right: 15px;
}
.plan-form .el-select{
  width: 100%;
}
.plan-form .el-date-editor{
  width: 100%;
}
.is-fixed {
    position: fixed;
    bottom: 0;
    padding: 1px;
    top: 100px;
    width: 23%;
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
