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
              <el-form-item label="方案名称">
                <el-input v-model="queryParams.vulPlanname" placeholder="方案名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏洞名称">
                <el-input v-model="queryParams.vulName" placeholder="漏洞名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="CVE_ID">
                <el-input v-model="queryParams.vulId" placeholder="CVE_ID" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getTestPlanList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddPlanDialog">新建方案</el-button>
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

        <!--新增或修改方案弹窗-->
        <el-dialog
          :title="addOrEditTaskTitle"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addPlanForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称" prop="vulPlanname">
                  <el-input v-model="addParams.vulPlanname" placeholder="方案名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="vulPlanid">
                  <el-input v-model="addParams.vulPlanid" placeholder="一级编码" />
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
                <el-form-item label="CVEID" prop="vulId">
                  <el-input v-model="addParams.vulId" placeholder="CVEID" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="方案来源" prop="planSrc">
                  <el-select v-model="addParams.planSrc" placeholder="方案来源">
                    <el-option label="集团" value="1" />
                    <el-option label="省份" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="解决方案" prop="solutionDetails">
                  <el-input v-model="addParams.solutionDetails" type="textarea" placeholder="解决方案" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注信息">
                  <el-input v-model="addParams.note" type="textarea" placeholder="备注信息" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="saveTestPlan('addPlanForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--查看方案弹窗-->
        <el-dialog
          title="方案详情"
          :visible.sync="lookDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="" :model="addParams" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称">
                  <el-input v-model="addParams.vulPlanname" :readonly="true" placeholder="方案名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="一级编码">
                  <el-input v-model="addParams.vulPlanid" :readonly="true" placeholder="一级编码" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulName" :readonly="true" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="CVEID">
                  <el-input v-model="addParams.vulId" :readonly="true" placeholder="CVEID" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="方案来源">
                  <el-select v-model="addParams.planSrc" :disabled="true" placeholder="方案来源">
                    <el-option label="集团" value="1" />
                    <el-option label="省份" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="解决方案">
                  <el-input v-model="addParams.solutionDetails" :readonly="true" type="textarea" placeholder="解决方案" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注信息">
                  <el-input v-model="addParams.note" :readonly="true" type="textarea" placeholder="备注信息" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="handleBeforeClose">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>

</template>

<script>
import datagrid from '@/components/datagrid/datagrid'

export default {
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      url: 'vulnTest/testPlanList',
      saveUrl: 'vulnTest/saveTestPlan',
      editUrl: 'vulnTest/updateTestPlan',
      queryParams: {},
      columns: [
        { label: '方案ID', prop: 'planId', width: 120, align: 'center' },
        { label: '一级ID', prop: 'vulPlanid', width: 120, align: 'center' },
        { label: 'CVEID', prop: 'vulId', width: 120, align: 'center' },
        { label: '方案名称', prop: 'vulPlanname', width: 160, align: 'left' },
        { label: '漏洞名称', prop: 'vulName', width: 160, align: 'left' },
        { label: '方案来源', prop: 'planSrc', width: 120, align: 'center', formatter: this.planSrcFormatter },
        { label: '创建时间', prop: 'createTime', width: 150, align: 'center', formatter: this.createTimeFormatter },
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
      // 新增或修改方案弹窗参数
      dialogVisible: false,
      addOrEditTaskTitle: '',
      addOrEditKey: '',
      addParams: {
        solutionFlag: '2'
      },
      addParamsRules: {
        vulPlanname: [
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ],
        vulPlanid: [
          { required: true, message: '请输入一级编码', trigger: 'blur' }
        ],
        vulName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        vulId: [
          { required: true, message: '请输入CVEID', trigger: 'blur' }
        ],
        planSrc: [
          { required: true, message: '请选择方案来源', trigger: 'blur' }
        ],
        solutionDetails: [
          { required: true, message: '请选输入解决方案', trigger: 'blur' }
        ]
      },
      // 查看方案弹窗参数
      lookDialogVisible: false
    }
  },
  methods: {
    // 获取方案列表
    getTestPlanList() {
      this.$refs['datagridTest'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.openEditPlanDialog(row)
          break
        case 'look':
          this.openLookPlanDialog(row)
          break
        default:
          break
      }
    },
    // 打开新增方案弹窗
    openAddPlanDialog() {
      this.addOrEditTaskTitle = '新增方案'
      this.addOrEditKey = 'add'
      this.dialogVisible = true
    },
    // 打开修改方案弹窗
    openEditPlanDialog(row) {
      this.addOrEditTaskTitle = '修改方案'
      this.addOrEditKey = 'edit'
      this.dialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.planSrc = this.addParams.planSrc + ''
    },
    // 保存方案
    async saveTestPlan(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrEditKey === 'add') {
            this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = { solutionFlag: '2' }
              this.getTestPlanList()
            }).catch(
            )
          } else if (this.addOrEditKey === 'edit') {
            this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = { solutionFlag: '2' }
              this.getTestPlanList()
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
    // 打开查看方案弹窗
    openLookPlanDialog(row) {
      this.lookDialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.planSrc = this.addParams.planSrc + ''
    },
    // 关闭弹窗执行事件
    handleBeforeClose() {
      this.dialogVisible = false
      this.lookDialogVisible = false
      this.addParams = { solutionFlag: '2' }
    },
    // 方案来源
    planSrcFormatter(row) {
      const planSrc = row.planSrc
      let ret = ''
      if (planSrc === 1) {
        ret = '集团'
      } else if (planSrc === 2) {
        ret = '省份'
      }
      return ret
    },
    // 创建时间
    createTimeFormatter(row) {
      return this.datetimeFormat(row.createTime)
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
