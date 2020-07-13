<template>
  <div class="app-container">
    <el-card>
      <!-- <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="5">
          <span class="titles">网络配置</span>
        </el-col>
      </el-row>
    </div> -->
      <div>
        <el-row>
          <el-form ref="elForm" :model="queryArgs" size="small" label-width="100px">
            <el-col :span="6">
              <el-form-item label="应用名称" prop="appName">
                <el-input v-model="queryArgs.appName" placeholder="应用名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="归属业务系统" prop="busiCode" label-width="110px">
                <el-input v-model="queryArgs.busiCode" placeholder="归属业务系统" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网络/IP范围" prop="ipAddress" label-width="100px">
                <el-input v-model="queryArgs.ipAddress" placeholder="网络/IP范围" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button type="primary" size="small" icon="el-icon-search" @click="reloadDatagrid()">查询</el-button>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog({},'add')">新增</el-button>
              <!-- <el-button type="primary" size="small" icon="el-icon-document" @click="exportNetCfg()">导出</el-button>
              <el-button type="primary" size="small" icon="el-icon-download" @click="openImportDag()">导入</el-button> -->
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <!-- <div>
      <template>
        <el-tabs>
          <el-tab-pane>
            <el-table
              v-loading="loading"
              class="elTable"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(185, 185, 185, 0.1)"
              :data="tableData"
              stripe
              style="width: 100%"
            >
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150" />
              <el-table-column fixed="right" label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="success" icon="el-icon-menu" circle @click="showDialog(scope.row,'view')" />
                  <el-button type="primary" icon="el-icon-edit" circle @click="showDialog(scope.row,'edit')" />
                  <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="deleteNetCfg(scope.row)" />
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:10px">
              <el-pagination
                :current-page="elePagination.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="elePagination.pageSize"
                layout="total, sizes, prev, pager, next,jumper"
                :total="elePagination.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div> -->

      <div>
        <satp-datagrid
          ref="netCfgDgd"
          :url="netCfgUrl"
          :qparams="queryArgs"
          :columns="columns"
          :toolbar="toolbar"
          idx
          border
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />
      </div>
      <div>

        <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="45%" :model="formObj" center @close="cancle">
          <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="110px" @submit.native.prevent>
            <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="应用名称" prop="appName">
                  <el-input v-model="formObj.appName" placeholder="应用名称" size="small" clearable :disabled="formAttr.canWrite" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="业务系统" prop="busiCode">
                  <el-input v-model="formObj.busiCode" placeholder="业务系统" size="small" clearable :disabled="formAttr.canWrite" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="扫描" prop="ipMode">
                  <!--  <el-radio-group v-model="formObj.ipMode">
                  <el-radio label="1">整个网络</el-radio>
                  <el-radio label="2">IP地址范围</el-radio>
                </el-radio-group> -->
                  <el-radio v-model="formObj.ipMode" label="1" :disabled="formAttr.canWrite">整个网络</el-radio>
                  <el-radio v-model="formObj.ipMode" label="2" :disabled="formAttr.canWrite">IP地址范围</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="网络" prop="ip1">
                  <el-input v-model="formObj.ip1" :style="{width: '100%'}" size="small" :disabled="formAttr.canWrite" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item v-if="formObj.ipMode==2" label="--" prop="ip2" label-width="50px">
                  <el-input v-model="formObj.ip2" :style="{width: '100%'}" size="small" :disabled="formAttr.canWrite" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="扫描除外IP" prop="extraIp">
                  <el-input v-model="formObj.extraIp" placeholder="扫描除外IP" size="small" clearable :disabled="formAttr.canWrite" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="note">
                  <el-input
                    v-model="formObj.note"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    size="small"
                    clearable
                    :disabled="formAttr.canWrite"
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
      </div>
      <div>
        <el-dialog title="导入网络配置" :visible.sync="importDag" width="30%" :model="fileObj" center @close="closeImportDag">
          <el-form :model="fileObj">
            <el-row>
              <el-col :span="10">
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-download" @click="exportTemplate('xls')">xls导入模板</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-download" @click="exportTemplate('csv')">csv导入模板</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action=" "
                    :on-change="changeFile"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                  >
                    <el-button icon="el-icon-upload2" type="primary">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xls/csv文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeImportDag()">取消</el-button>
            <el-button type="primary" :loading="savebutton" @click="importNetCfg()">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </el-card>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    const ipR = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
    const isIp = (rule, value, callback) => {
      if (value == null || value === '') {
        callback()
      }
      if (!ipR.test(value)) {
        return callback(new Error('请输入正确的IP'))
      } else {
        callback()
      }
    }
    return {
      netCfgUrl: 'netCfg/netCfgList',
      formRule: {// 验证必填项
        appName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        busiCode: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        ip1: [
          { required: true, message: '请填写必填项', trigger: 'blur' },
          { validator: isIp }
        ],
        ip2: [
          { required: true, message: '请填写必填项', trigger: 'blur' },
          { validator: isIp }
        ],
        extraIp: [
          { required: false, trigger: 'blur' },
          { validator: isIp }
        ],
        createUser: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      formAttr: {},
      formObj: {},
      queryArgs: {},
      savebutton: false,
      dialogFormVisible: false,
      importDag: false,
      fileList: [],
      loading: true,
      fileObj: {},
      columns: [
        { label: '应用名称', prop: 'appName', actions: [{ prop: 'detail', type: 'text', link: 'appName' }] },
        { label: '业务系统', prop: 'busiCode' },
        { label: '合规网络/IP范围', prop: 'ipAddress' },
        { label: '创建人', prop: 'createUserName' },
        { label: '操作', prop: 'opt', align: 'center', actions: [
          { label: '编辑', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除吗?' }
        ] }
      ],
      toolbar: [
        { label: '导入', prop: 'import', type: 'primary', icon: 'el-icon-upload2' },
        { label: '导出', prop: 'export', type: 'primary', icon: 'el-icon-download' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    reloadDatagrid() {
      this.$refs['netCfgDgd'].reload()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList.splice(0, 1)
    },
    changeFile(file) {
      this.fileList.push(file)
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'export':
          this.exportNetCfg()
          break
        case 'import':
          this.openImportDag()
          break
        default:
          break
      }
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.showDialog(row, 'view')
          break
        case 'edit':
          this.showDialog(row, 'edit')
          break
        case 'delete':
          this.deleteNetCfg(row)
          break
        default:
          break
      }
    },
    // 显示弹出框判断是添加还是编辑该节点
    showDialog(row, type) {
      const $self = this
      this.savebutton = false
      event.stopPropagation()
      if (type === 'add') {
        this.formAttr.title = `新增`
        this.formObj = { ipMode: '1' }
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
      } else if (type === 'view') {
        this.formAttr.canWrite = true
        this.formAttr.title = `详情`
      }
      const netConfig = { cfgId: row.cfgId }
      if (type === 'edit' || type === 'view') {
        this.$store.dispatch('netCfg/findNetCfg', netConfig).then(response => {
          this.formObj = {}
          if (response.netConfig.ipMode === 1) {
            response.netConfig.ip1 = response.netConfig.ipAddress
          } else {
            response.netConfig.ip1 = response.netConfig.ipAddress.split('-')[0]
            response.netConfig.ip2 = response.netConfig.ipAddress.split('-')[1]
          }
          // 深克隆
          this.formObj = Object.assign({}, response.netConfig)
          this.formObj.ipMode = String(this.formObj.ipMode)
          console.log(this.formObj)
        })
      }
      this.formAttr.formType = type
      $self.dialogFormVisible = true
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
      this.formAttr.canWrite = false
      // 清空校验规则
      this.$refs.ruleForm.resetFields()
    },
    saveForm() {
      const $self = this
      this.savebutton = true
      if (this.formObj.ipMode === '1') {
        this.formObj.ipAddress = this.formObj.ip1
      } else {
        this.formObj.ipAddress = this.formObj.ip1 + '-' + this.formObj.ip2
      }

      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if ($self.formAttr.formType === 'add') {
            url = 'netCfg/addNetCfg'
          } else if ($self.formAttr.formType === 'edit') {
            url = 'netCfg/updateNetCfg'
          } else {
            this.cancle()
            return
          }
          this.$store.dispatch(url, $self.formObj).then(response => {
            $self.savebutton = false
            $self.formObj = { ipMode: '1' }
            $self.dialogFormVisible = false
            $self.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.reloadDatagrid()
          })
        } else {
          $self.savebutton = false
          return false
        }
      })
    },

    deleteNetCfg(row) {
      const $self = this
      const netCfg = { cfgId: row.cfgId }
      this.$confirm(`您确认要删除吗?`)
        .then(() => {
          this.$store.dispatch('netCfg/deleteNetCfg', netCfg).then(response => {
            $self.$message({
              message: `删除操作成功！`,
              type: 'success'
            })
            this.reloadDatagrid()
          })
        }).catch(() => {})
    },
    exportTemplate(ext) {
      this.$store.dispatch('netCfg/exportTemplate', { ext: ext }).then(response => {
      })
    },
    exportNetCfg() {
      this.$store.dispatch('netCfg/exportNetCfg', this.queryArgs).then(response => {
      })
    },
    importNetCfg() {
      // const $self = this
      console.log(this.fileList)
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      // console.log(param.get('file'))
      // this.$store.dispatch('netCfg/importNetCfg', param).then(response => {
      //   $self.$message({
      //     message: '操作成功！',
      //     type: 'success'
      //   })
      //   this.fileList = []
      //   this.importDag = false
      //   this.reloadDatagrid()
      // })
    },
    openImportDag() {
      this.importDag = true
    },
    closeImportDag() {
      this.importDag = false
    }
  }
}
</script>
<style>
</style>
}
