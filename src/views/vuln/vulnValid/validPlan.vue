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
                <el-input v-model="queryParams.valprojName" placeholder="方案名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="CVEID">
                <el-input v-model="queryParams.cveId" placeholder="CVEID" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方案来源">
                <el-select v-model="queryParams.projSrc" placeholder="方案来源">
                  <el-option label="全部" value="" />
                  <el-option label="集团下发" value="1" />
                  <el-option label="省公司创建" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getValidPlanList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddValidPlanDialog">新建</el-button>
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
          title="新增方案"
          :visible.sync="addDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞名称" prop="vulnName">
                  <el-input v-model="addParams.vulnName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="projId">
                  <el-input v-model="addParams.projId" placeholder="一级编码" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下发时间">
                  <el-date-picker
                    v-model="addParams.sendTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称" prop="valprojName">
                  <el-input v-model="addParams.valprojName" placeholder="方案名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方案来源" prop="projSrc">
                  <el-select v-model="addParams.projSrc" placeholder="方案来源">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省公司创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞CVEID">
                  <el-input v-model="addParams.cveId" placeholder="漏洞CVEID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受影响资产" prop="resType">
                  <el-input v-model="addParams.resType" placeholder="受影响资产" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞描述" prop="vulnDetail">
                  <el-input v-model="addParams.vulnDetail" type="textarea" placeholder="漏洞描述" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="验证方案详情" prop="projDetail">
                  <el-input v-model="addParams.projDetail" type="textarea" placeholder="验证方案详情" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="savePlan('addForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--修改弹窗-->
        <el-dialog
          title="修改方案"
          :visible.sync="editDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="editForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="projId">
                  <el-input v-model="addParams.projId" placeholder="一级编码" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级编码" prop="valprojId">
                  <el-input v-model="addParams.valprojId" placeholder="二级编码" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称" prop="valprojName">
                  <el-input v-model="addParams.valprojName" placeholder="方案名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方案来源" prop="projSrc">
                  <el-select v-model="addParams.projSrc" placeholder="方案来源">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省公司创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞CVEID">
                  <el-input v-model="addParams.cveId" placeholder="漏洞CVEID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称" prop="vulnName">
                  <el-input v-model="addParams.vulnName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="受影响资产" prop="resType">
                  <el-input v-model="addParams.resType" placeholder="受影响资产" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下发时间">
                  <el-date-picker
                    v-model="addParams.sendTime"
                    type="datetime"
                    :readonly="true"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="方案状态" prop="isActive">
                  <el-select v-model="addParams.isActive" placeholder="方案状态">
                    <el-option label="失效" value="0" />
                    <el-option label="有效" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞描述" prop="vulnDetail">
                  <el-input v-model="addParams.vulnDetail" type="textarea" placeholder="漏洞描述" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="验证方案详情" prop="projDetail">
                  <el-input v-model="addParams.projDetail" type="textarea" placeholder="验证方案详情" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="editPlan('editForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--详情弹窗-->
        <el-dialog
          title="方案详情"
          :visible.sync="lookDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form :model="addParams" label-width="120px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="一级编码" prop="projId">
                  <el-input v-model="addParams.projId" placeholder="一级编码" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级编码" prop="valprojId">
                  <el-input v-model="addParams.valprojId" placeholder="二级编码" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="方案名称" prop="valprojName">
                  <el-input v-model="addParams.valprojName" placeholder="方案名称" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="方案来源" prop="projSrc">
                  <el-select v-model="addParams.projSrc" placeholder="方案来源" :disabled="true">
                    <el-option label="集团下发" value="1" />
                    <el-option label="省公司创建" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="漏洞CVEID">
                  <el-input v-model="addParams.cveId" placeholder="漏洞CVEID" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称" prop="vulnName">
                  <el-input v-model="addParams.vulnName" placeholder="漏洞名称" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="受影响资产" prop="resType">
                  <el-input v-model="addParams.resType" placeholder="受影响资产" :readonly="true" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="下发时间">
                  <el-date-picker
                    v-model="addParams.sendTime"
                    type="datetime"
                    :readonly="true"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="方案状态" prop="isActive">
                  <el-select v-model="addParams.isActive" placeholder="方案状态" :disabled="true">
                    <el-option label="失效" value="0" />
                    <el-option label="有效" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="漏洞描述" prop="vulnDetail">
                  <el-input v-model="addParams.vulnDetail" type="textarea" placeholder="漏洞描述" :readonly="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="验证方案详情" prop="projDetail">
                  <el-input v-model="addParams.projDetail" type="textarea" placeholder="验证方案详情" :readonly="true" />
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
      url: 'vulnValid/vulnValidPlanListData',
      saveUrl: 'vulnValid/saveValidPlan',
      infoUrl: 'vulnValid/queryValidPlanById',
      editUrl: 'vulnValid/updateValidPlan',
      deleteUrl: 'vulnValid/deleteValidPlan',
      queryParams: {},
      columns: [
        { label: '二级编码', prop: 'VALPROJ_ID', width: 100, align: 'center' },
        { label: '一级编码', prop: 'PROJ_ID', width: 100, align: 'center' },
        { label: '方案名称', prop: 'VALPROJ_NAME', width: 160, align: 'left' },
        { label: '漏洞名称', prop: 'VULN_NAME', width: 160, align: 'left' },
        { label: 'CVEID', prop: 'CVE_ID', width: 100, align: 'center' },
        { label: '受影响资产', prop: 'RES_TYPE', width: 100, align: 'center' },
        { label: '下发时间', prop: 'SEND_TIME', width: 120, align: 'center', formatter: this.sendTimeFormatter },
        { label: '创建时间', prop: 'CREATE_TIME', width: 120, align: 'center', formatter: this.createTimeFormatter },
        { label: '方案来源', prop: 'PROJ_SRC', width: 100, align: 'center', formatter: this.projSrcFormatter },
        { label: '状态', prop: 'IS_ACTIVE', width: 100, align: 'center', formatter: this.isActiveFormatter },
        {
          label: '操作',
          width: 130,
          align: 'center',
          actions: [
            { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-tickets' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }],
      // 弹窗定义参数
      addDialogVisible: false,
      editDialogVisible: false,
      lookDialogVisible: false,
      addParams: {},
      addParamsRules: {
        projId: [
          { required: true, message: '请输入一级编码', trigger: 'blur' }
        ],
        valprojName: [
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ],
        vulnName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请输入影响资产', trigger: 'blur' }
        ],
        projSrc: [
          { required: true, message: '请选择方案来源', trigger: 'blur' }
        ],
        vulnDetail: [
          { required: true, message: '请输入漏洞描述', trigger: 'blur' }
        ],
        projDetail: [
          { required: true, message: '请输入验证方案详情', trigger: 'blur' }
        ],
        isActive: [
          { required: true, message: '请选择方案状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取验证方案列表
    getValidPlanList() {
      this.$refs['datagridTest'].reload()
    },
    // 根据id查询验证方案详情
    getValidPlanById(id) {
      this.$store.dispatch(this.infoUrl, { valprojId: id }).then(resp => {
        this.$set(this.addParams, 'vulnDetail', resp.data.VULN_DETAIL)
        this.$set(this.addParams, 'projDetail', resp.data.PROJ_DETAIL)
      }).catch(
      )
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.openValidPlanDetailDialog(row)
          break
        case 'edit':
          this.openEditValidPlanDialog(row)
          break
        case 'delete':
          this.deleteValidPlan(row)
          break
        default:
          break
      }
    },
    // 打开新增方案弹窗
    openAddValidPlanDialog() {
      this.addDialogVisible = true
    },
    // 打开修改方案弹窗
    openEditValidPlanDialog(row) {
      this.editDialogVisible = true

      this.$set(this.addParams, 'projId', row.PROJ_ID)
      this.$set(this.addParams, 'valprojId', row.VALPROJ_ID)
      this.$set(this.addParams, 'valprojName', row.VALPROJ_NAME)
      this.$set(this.addParams, 'projSrc', row.PROJ_SRC + '')
      this.$set(this.addParams, 'cveId', row.CVE_ID)
      this.$set(this.addParams, 'vulnName', row.VULN_NAME)
      this.$set(this.addParams, 'resType', row.RES_TYPE)
      this.$set(this.addParams, 'sendTime', this.datetimeFormat(row.SEND_TIME))
      this.$set(this.addParams, 'isActive', row.IS_ACTIVE + '')

      this.getValidPlanById(row.VALPROJ_ID)
    },
    // 打开方案详情弹窗
    openValidPlanDetailDialog(row) {
      this.lookDialogVisible = true

      this.$set(this.addParams, 'projId', row.PROJ_ID)
      this.$set(this.addParams, 'valprojId', row.VALPROJ_ID)
      this.$set(this.addParams, 'valprojName', row.VALPROJ_NAME)
      this.$set(this.addParams, 'projSrc', row.PROJ_SRC + '')
      this.$set(this.addParams, 'cveId', row.CVE_ID)
      this.$set(this.addParams, 'vulnName', row.VULN_NAME)
      this.$set(this.addParams, 'resType', row.RES_TYPE)
      this.$set(this.addParams, 'sendTime', this.datetimeFormat(row.SEND_TIME))
      this.$set(this.addParams, 'isActive', row.IS_ACTIVE + '')

      this.getValidPlanById(row.VALPROJ_ID)
    },
    // 关闭弹窗执行函数
    handleBeforeClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.lookDialogVisible = false
      this.addParams = {}
    },
    // 新增保存
    async savePlan(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
            this.handleBeforeClose()
            this.getValidPlanList()
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
    // 修改保存
    async editPlan(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
            this.handleBeforeClose()
            this.getValidPlanList()
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
    // 删除验证方案
    deleteValidPlan(row) {
      this.$store.dispatch(this.deleteUrl, { 'valprojId': row.VALPROJ_ID }).then(resp => {
        this.getValidPlanList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(
      )
    },
    // 下发时间
    sendTimeFormatter(row) {
      return this.datetimeFormat(row.SEND_TIME)
    },
    // 创建时间
    createTimeFormatter(row) {
      return this.datetimeFormat(row.CREATE_TIME)
    },
    // 方案来源
    projSrcFormatter(row) {
      const projSrc = row.PROJ_SRC
      let ret = ''
      if (projSrc === 1) {
        ret = '集团下发'
      } else if (projSrc === 2) {
        ret = '省公司创建'
      }
      return ret
    },
    // 状态
    isActiveFormatter(row) {
      const isActive = row.IS_ACTIVE
      let ret = ''
      if (isActive === 0) {
        ret = '失效'
      } else if (isActive === 1) {
        ret = '有效'
      }
      return ret
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
