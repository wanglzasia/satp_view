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
              <el-form-item label="CVEID">
                <el-input v-model="queryParams.vulnId" placeholder="CVEID" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏洞名称">
                <el-input v-model="queryParams.vulnName" placeholder="漏洞名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名单来源">
                <el-select v-model="queryParams.whiteSource" placeholder="名单来源">
                  <el-option label="全部" value="" />
                  <el-option label="自建" value="1" />
                  <el-option label="同步" value="2" />
                  <el-option label="补录" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" type="primary" @click="getWhiteList">
                  <i class="el-icon-search" />查询
                </el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddWhiteDialog">新建</el-button>
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

        <!--新增或修改白名单弹窗-->
        <el-dialog
          :title="addOrEditTaskTitle"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="白名单名称" prop="vulWhitelistName">
                  <el-input v-model="addParams.vulWhitelistName" placeholder="白名单名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名单来源">
                  <el-select v-model="addParams.whiteSource" placeholder="名单来源" @change="changeWhiteSource">
                    <el-option label="自建" value="1" />
                    <el-option label="补录" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="CVEID" prop="vulnId">
                  <el-input v-model="addParams.vulnId" placeholder="CVEID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称" prop="vulnName">
                  <el-input v-model="addParams.vulnName" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="入库原因" prop="reason">
                  <el-input v-model="addParams.reason" type="textarea" placeholder="入库原因" />
                </el-form-item>
              </el-col>
            </el-row>

            <div v-if="fillView">
              <p style="color: red;padding-left: 30px;">补录信息一经录入,不允许人工修改、删除</p>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="一级编号" prop="vulWhitelistId">
                    <el-input v-model="addParams.vulWhitelistId" placeholder="一级编号" @input="forceUpdate" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="入库时间" prop="storageTime">
                    <el-date-picker
                      v-model="addParams.storageTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      @input="forceUpdate"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="启用时间" prop="enableTime">
                    <el-date-picker
                      v-model="addParams.enableTime"
                      type="datetime"
                      placeholder="选择日期时间"
                      @input="forceUpdate"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="handleBeforeClose">取 消</el-button>
            <el-button type="primary" size="small" @click="saveWhite('addForm')">确 定</el-button>
          </span>
        </el-dialog>

        <!--查看白名单弹窗-->
        <el-dialog
          title="白名单详情"
          :visible.sync="lookDialogVisible"
          width="50%"
          :before-close="handleBeforeClose"
          :close-on-click-modal="false"
        >
          <el-form ref="addForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="白名单名称">
                  <el-input v-model="addParams.vulWhitelistName" :readonly="true" placeholder="白名单名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名单来源">
                  <el-select v-model="addParams.whiteSource" :disabled="true" placeholder="名单来源" @change="changeWhiteSource">
                    <el-option label="自建" value="1" />
                    <el-option label="补录" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="CVEID">
                  <el-input v-model="addParams.vulnId" :readonly="true" placeholder="CVEID" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="漏洞名称">
                  <el-input v-model="addParams.vulnName" :readonly="true" placeholder="漏洞名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="入库原因">
                  <el-input v-model="addParams.reason" type="textarea" :readonly="true" placeholder="入库原因" />
                </el-form-item>
              </el-col>
            </el-row>

            <div v-if="fillView">
              <p style="color: red;padding-left: 30px;">补录信息一经录入,不允许人工修改、删除</p>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="一级编号">
                    <el-input v-model="addParams.vulWhitelistId" :readonly="true" placeholder="一级编号" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="入库时间">
                    <el-date-picker
                      v-model="addParams.storageTime"
                      type="datetime"
                      :readonly="true"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="启用时间">
                    <el-date-picker
                      v-model="addParams.enableTime"
                      type="datetime"
                      :readonly="true"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
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
      url: 'vulnWhite/vulnWhiteListData',
      saveUrl: 'vulnWhite/saveWhite',
      editUrl: 'vulnWhite/updateWhite',
      queryParams: {},
      columns: [
        { label: '二级编号', prop: 'vulnWhiteId', width: 100, align: 'center' },
        { label: '一级编号', prop: 'vulWhitelistId', width: 100, align: 'center' },
        { label: '名单名称', prop: 'vulWhitelistName', width: 160, align: 'left', actions: [{ prop: 'detail', type: 'text', link: 'vulWhitelistName' }] },
        { label: 'CVEID', prop: 'vulnId', width: 120, align: 'center' },
        { label: '漏洞名称', prop: 'vulnName', width: 160, align: 'left' },
        { label: '入库时间', prop: 'storageTime', width: 120, align: 'center', formatter: this.storageTimeFormatter },
        // { label: '入库原因', prop: 'reason', width: 150, align: 'center' },
        // { label: '启用时间', prop: 'enableTime', width: 150, align: 'center', formatter: this.enableTimeFormatter },
        // { label: '禁用时间', prop: 'disableTime', width: 150, align: 'center', formatter: this.disableTimeFormatter },
        { label: '名单状态', prop: 'vulWhitelistState', width: 100, align: 'center', formatter: this.vulWhitelistStateFormatter },
        { label: '名单来源', prop: 'whiteSource', width: 100, align: 'center', formatter: this.whiteSourceFormatter },
        {
          label: '操作',
          align: 'center',
          actions: [],
          formatter: this.opFormatter
          /* actions: [
            { title: '禁用', prop: 'disable', type: 'text', icon: 'el-icon-remove-outline' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete' }
          ]*/
        }
      ],
      // 新增或修改白名单弹窗参数
      dialogVisible: false,
      addOrEditTaskTitle: '',
      addOrEditKey: '',
      addParams: {
        whiteSource: '1'
      },
      addParamsRules: {
        vulWhitelistName: [
          { required: true, message: '请输入白名单名称', trigger: 'blur' }
        ],
        vulnId: [
          { required: true, message: '请输入CVEID', trigger: 'blur' }
        ],
        vulnName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请输入入库原因', trigger: 'blur' }
        ]
      },
      // 补录信息展示view
      fillView: false,
      // 查看白名单弹窗参数
      lookDialogVisible: false
    }
  },
  methods: {
    // 获取白名单列表
    getWhiteList() {
      this.$refs['datagridTest'].reload()
    },
    opFormatter(row) {
      if (row.whiteSource === 1) {
        let actions = []
        if (row.vulWhitelistState === 'ENABLE') {
          actions = [
            { title: '禁用', prop: 'disable', type: 'text', icon: 'el-icon-remove-outline', popconfirm: '确认禁用这条记录?' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        } else {
          actions = [
            { title: '启用', prop: 'enable', type: 'text', icon: 'el-icon-video-play', popconfirm: '确认启用这条记录?' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }
        return actions
      }
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.openWhiteDetailDialog(row)
          break
        case 'disable':
          this.disableWhite(row)
          break
        case 'enable':
          this.enableWhite(row)
          break
        case 'edit':
          this.openEditWhiteDialog(row)
          break
        case 'delete':
          this.deleteWhite(row)
          break
        default:
          break
      }
    },
    // 打开详情弹窗
    openWhiteDetailDialog(row) {
      this.lookDialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.whiteSource = this.addParams.whiteSource + ''
      this.changeWhiteSource()
    },
    // 打开新增弹窗
    openAddWhiteDialog() {
      this.dialogVisible = true
      this.addOrEditTaskTitle = '新增白名单'
      this.addOrEditKey = 'add'
      this.changeWhiteSource()
    },
    // 打开修改弹窗
    openEditWhiteDialog(row) {
      this.dialogVisible = true
      this.addOrEditTaskTitle = '修改白名单'
      this.addOrEditKey = 'edit'
      this.addParams = Object.assign({}, row)
      this.addParams.whiteSource = this.addParams.whiteSource + ''
      this.changeWhiteSource()
    },
    // 保存白名单
    async saveWhite(formName) {
      console.log(this.addParams)
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrEditKey === 'add') {
            this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = { whiteSource: '1' }
              this.getWhiteList()
            }).catch(
            )
          } else if (this.addOrEditKey === 'edit') {
            this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.addParams = { whiteSource: '1' }
              this.getWhiteList()
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
    // 启用操作
    enableWhite(row) {
      const params = {
        vulnWhiteId: row.vulnWhiteId,
        vulWhitelistState: 'ENABLE',
        action: 'UPDATE'
      }
      this.$store.dispatch(this.editUrl, params).then(resp => {
        this.getWhiteList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(
      )
    },
    // 禁用操作
    disableWhite(row) {
      const params = {
        vulnWhiteId: row.vulnWhiteId,
        vulWhitelistState: 'DISABLE',
        action: 'UPDATE'
      }
      this.$store.dispatch(this.editUrl, params).then(resp => {
        this.getWhiteList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(
      )
    },
    // 删除白名单
    deleteWhite(row) {
      const params = {
        vulnWhiteId: row.vulnWhiteId,
        action: 'DELETE',
        delMark: '1'
      }
      this.$store.dispatch(this.editUrl, params).then(resp => {
        this.getWhiteList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(
      )
    },
    // 关闭弹窗执行事件
    handleBeforeClose() {
      this.dialogVisible = false
      this.lookDialogVisible = false
      this.addParams = { whiteSource: '1' }
    },
    // 名单来源改变事件
    changeWhiteSource() {
      const whiteSource = this.addParams.whiteSource
      if (whiteSource === '1') { // 自建
        this.fillView = false
        this.addParams.vulWhitelistId = ''
        this.addParams.storageTime = ''
        this.addParams.enableTime = ''
        this.addParamsRules.vulWhitelistId = []
        this.addParamsRules.storageTime = []
        this.addParamsRules.enableTime = []
      } else {
        this.fillView = true
        this.addParamsRules.vulWhitelistId = [{ required: true, message: '请输入一级编号', trigger: 'blur' }]
        this.addParamsRules.storageTime = [{ required: true, message: '请选择入库时间', trigger: 'blur' }]
        this.addParamsRules.enableTime = [{ required: true, message: '请选择启用时间', trigger: 'blur' }]
      }
    },
    // 入库时间
    storageTimeFormatter(row) {
      return this.datetimeFormat(row.storageTime)
    },
    // 启用时间
    enableTimeFormatter(row) {
      return this.datetimeFormat(row.enableTime)
    },
    // 禁用时间
    disableTimeFormatter(row) {
      return this.datetimeFormat(row.disableTime)
    },
    // 名单状态
    vulWhitelistStateFormatter(row) {
      const vulWhitelistState = row.vulWhitelistState
      let ret = ''
      if (vulWhitelistState === 'ENABLE') {
        ret = '启用'
      } else if (vulWhitelistState === 'DISABLE') {
        ret = '禁用'
      }
      return ret
    },
    // 名单来源
    whiteSourceFormatter(row) {
      const whiteSource = row.whiteSource
      let ret = ''
      if (whiteSource === 1) {
        ret = '自建'
      } else if (whiteSource === 2) {
        ret = '同步'
      } else if (whiteSource === 3) {
        ret = '补录'
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
    },
    forceUpdate() {
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
