<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="elForm" :model="params" size="small" label-width="100px">
            <el-col :span="8">
              <el-form-item label="模板编号">
                <el-input v-model="params.tempNo" placeholder="模板编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="模板名称">
                <el-input v-model="params.tempName" placeholder="模板名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合规项编码">
                <el-input v-model="params.itemNo" placeholder="合规项编码" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合规项名称">
                <el-input v-model="params.itemName" placeholder="合规项名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="模板状态">
                <el-select
                  v-model="params.tempStatus"
                  placeholder="模板状态"
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in tempStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="satp-from-btngrp-std">
                <el-button size="small" icon="el-icon-search" type="primary" @click="reloadDatagrid()">查询</el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog({},'add')">新增</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <div>
          <satp-datagrid
            ref="tempDatagrid"
            :url="url"
            :qparams="params"
            :columns="columns"
            :toolbar="toolbar"
            idx
            border
            @operClick="rowClick"
            @toolbarClick="toolbarClick"
          />
        </div>
        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="1000px" :model="formObj" @close="closeDialog">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="140px" @submit.native.prevent>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="模板编号" prop="itemNo">
                    <el-input v-model="formObj.tempNo" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="模板名称" prop="tempName">
                    <el-input v-model="formObj.tempName" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="模板来源" prop="tempSrc">
                    <el-select v-model="formObj.tempSrc" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in tempSrcOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <div v-if="formAttr.formType=='detail' || formAttr.formType=='edit'">
                  <el-col :span="12">
                    <el-form-item label="模板状态" prop="tempStatus">
                      <el-select v-model="formObj.tempStatus" :disabled="formAttr.formType=='detail'">
                        <el-option
                          v-for="(item, index) in tempStatusOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </div>
                <div v-else>
                  <el-col :span="12">
                    <el-form-item label="模板状态" prop="tempStatus">
                      <el-select v-model="formObj.tempStatus">
                        <el-option
                          v-for="(item, index) in tempStatusOptions2"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </div>
                <el-col :span="24">
                  <el-form-item label="模板描述" prop="tempDesc">
                    <el-input
                      v-model="formObj.tempDesc"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <satp-datagrid
              ref="tempItemDatagrid"
              :tabledata="itemTableData"
              :columns="itemColumns"
              :toolbar="tempItemToolbar"
              :title="tempItemTitle"
              idx
              border
              @operClick="rowClick"
              @toolbarClick="tempToolbarClick"
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeDialog()">取 消</el-button>
              <el-button type="primary" size="small" @click="saveForm()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-dialog title="安全合规项列表" :visible.sync="itemDag" width="800px" @close="closeItemDag">
            <satp-datagrid
              ref="itemDatagrid"
              :url="itemUrl2"
              :qparams="itemParams"
              :columns="itemColumns1"
              checkbox
              border
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeItemDag()">取 消</el-button>
              <el-button type="primary" size="small" @click="checkTempItem()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>

          <el-dialog title="合规模板导入" :visible.sync="dialogImportVisible" width="700px" @close="closeImportDag">
            <!-- <el-form> -->
            <el-row>
              <el-col :span="6">
                <el-button type="primary" size="small" icon="el-icon-download" @click="exportTempTemplate('xls')">xls导入模板</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small" icon="el-icon-download" @click="exportTempTemplate('csv')">csv导入模板</el-button>
              </el-col>

              <el-col :span="10">
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
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="importTemp">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">
                    1.仅支持后缀名为.xls的文件,红色字段为必填字段！<br>
                    2.字段个数和位置不能随意增添改动,请参考模板文件。
                  </div>
                </el-upload>
              </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeImportDag()">取消</el-button>
            </div>
            <!-- </el-form> -->
          </el-dialog>
        </div>

      </el-card>
    </div>
  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'TempList',
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      fileList: [],
      formAttr: {},
      tempItemTitle: '',
      formObj: {},
      detailObj: {},
      formRule: {
        tempName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        tempDesc: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      detailDagVisible: false,
      dialogImportVisible: false,
      itemDag: false,
      url: 'template/templateList',
      itemUrl: 'template/itemList',
      itemUrl2: 'item/itemList',
      params: {},
      tempParams: {},
      itemParams: {
        itemStatus: 1
      },
      tempStatusOptions: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }, {
        'label': '失效',
        'value': 2
      }],
      tempStatusOptions2: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }],
      tempSrcOptions: [{
        'label': '集团',
        'value': 2
      }, {
        'label': '省份',
        'value': 1
      }],
      itemStatusOptions: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }, {
        'label': '失效',
        'value': 2
      }],
      itemScopeOptions: [],
      columns: [
        { label: '合规项编码', prop: 'tempNo', actions: [{ prop: 'detail', type: 'success', link: 'tempNo' }] },
        { label: '模板名称', prop: 'tempName' },
        { label: '模板描述', prop: 'tempDesc' },
        { label: '模板状态', prop: 'tempStatus', formatter: this.tempStatusFormatter },
        { label: '模板来源', prop: 'tempSrc', formatter: this.tempSrcFormatter },
        { label: '合规项数量', prop: 'itemCount' },
        { label: '创建时间', prop: 'createTime', formatter: this.dateTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      itemColumns: [],
      itemColumns1: [
        { label: '合规项编号', prop: 'itemNo' },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类别', prop: 'chkType', formatter: this.chkTypeFormatter },
        { label: '适用对象类型', prop: 'itemScope', formatter: this.itemScopeFormatter },
        { label: '合规项状态', prop: 'itemStatus', formatter: this.itemStatusFormatter }
      ],
      itemColumns2: [
        { label: '合规项编号', prop: 'itemNo' },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类别', prop: 'chkType', formatter: this.chkTypeFormatter },
        { label: '适用对象类型', prop: 'itemScope', formatter: this.itemScopeFormatter },
        { label: '合规项状态', prop: 'itemStatus', formatter: this.itemStatusFormatter },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete' }
          ]
        }
      ],
      toolbar: [
        { label: '导入', prop: 'import', type: 'primary', icon: 'el-icon-upload2' },
        { label: '导出', prop: 'export', type: 'primary', icon: 'el-icon-download' },
        { label: '同步', prop: 'synchro', type: 'primary', icon: 'el-icon-s-order' },
        { label: '校验', prop: 'check', type: 'primary', icon: 'el-icon-document-checked' }
      ],
      tempItemToolbar: [],
      tempToolbar: [
        { label: '关联合规项', prop: 'checkTempItem', type: 'primary', icon: 'el-icon-plus' }
      ],
      itemToolbar: [
        { label: '选定', prop: 'check', type: 'primary', icon: 'el-icon-check' }
      ],
      itemTableData: []

    }
  },
  computed: {},

  created() {
    this.getCodeList()
  },
  mounted() {
  },
  methods: {
    rowClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'effect':
          this.tempEffect(row.tempId)
          break
        case 'invalid':
          this.tempInvalid(row.tempId)
          break
        case 'update':
          this.openDialog(row, 'edit')
          break
        case 'detail':
          this.openDialog(row, 'detail')
          break
        case 'delete':
          this.itemTableData.splice(this.itemTableData.indexOf(row), 1)
          this.$refs.tempItemDatagrid.setTableData(this.itemTableData)
          break
        case 'copy':
          this.tempCopy(row.tempId)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'export':
          this.exportTemp()
          break
        case 'import':
          this.dialogImportVisible = true
          break

        default:
          break
      }
    },
    tempToolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'checkTempItem':
          this.openAddTempItem()
          break
        default:
          break
      }
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    reloadDatagrid() {
      this.$refs['tempDatagrid'].reload()
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formObj = {}
      this.itemTableData = []
      this.$refs.tempItemDatagrid.setTableData(this.itemTableData)
    },
    tempStatusFormatter(row) {
      if (row.tempStatus === 0) {
        return '草稿'
      } else if (row.tempStatus === 1) {
        return '生效'
      } else if (row.tempStatus === 2) {
        return '失效'
      }
    },
    tempSrcFormatter(row) {
      if (row.tempSrc === 1) {
        return '省级'
      } else if (row.tempSrc === 2) {
        return '集团'
      }
    },
    chkTypeFormatter(row) {
      const value = row.chkType
      let dictValue = ''
      if (value === 'BASE') {
        dictValue = '基线类'
      }
      if (value === 'WEB') {
        dictValue = 'web漏洞类'
      }
      if (value === 'VULN') {
        dictValue = '系统漏洞类'
      }
      if (value === 'WEAK') {
        dictValue = '弱口令类'
      }
      if (value === 'CONTENT') {
        dictValue = '内容合规类'
      }
      if (value === 'EQUAL') {
        dictValue = '等保2.0自评类'
      }
      return dictValue
    },
    itemSrcFormatter(row) {
      if (row.itemSrc === 1) {
        return '省级'
      } else if (row.itemSrc === 2) {
        return '集团'
      }
    },
    itemScopeFormatter(row) {
      let value = ''
      this.itemScopeOptions.forEach(iter => {
        if (row.itemScope === iter.code) {
          value = iter.label
        }
      })
      return value
    },
    itemStatusFormatter(row) {
      if (row.itemStatus === 0) {
        return '草稿'
      } else if (row.itemStatus === 1) {
        return '生效'
      } else if (row.itemStatus === 2) {
        return '失效'
      }
    },
    dateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    closeImportDag() {
      this.dialogImportVisible = false
      this.fileList = []
      this.reloadDatagrid()
    },
    operFormatter(row) {
      let actions = []
      const tempStatus = row.tempStatus
      const tempSrc = row.tempSrc
      if (tempSrc === 1) {
        if (tempStatus === 0 || tempStatus === 2) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' },
            { title: '修改', prop: 'update', type: 'text', icon: 'el-icon-edit' },
            { title: '复制', prop: 'copy', type: 'text', icon: 'el-icon-document-copy', popconfirm: '确认复制吗?' }
          ]
        } else if (tempStatus === 1) {
          actions = [
            { title: '失效', prop: 'invalid', type: 'text', icon: 'el-icon-remove-outline', popconfirm: '确认失效吗?' },
            { title: '复制', prop: 'copy', type: 'text', icon: 'el-icon-document-copy', popconfirm: '确认复制吗?' }
          ]
        }
      } else {
        if (tempStatus === 0) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' },
            { title: '复制', prop: 'copy', type: 'text', icon: 'el-icon-document-copy', popconfirm: '确认复制吗?' }
          ]
        }
      }
      // actions.push({ title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-menu' })
      return actions
    },
    tempEffect(tempId) {
      const params = { tempId: tempId }
      this.$store.dispatch('template/templateEffect', params).then(response => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    tempInvalid(tempId) {
      const params = { tempId: tempId }

      this.$store.dispatch('template/templateInvalid', params).then(response => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    openDialog(row, type) {
      const tempId = row.tempId
      this.formAttr.formType = type
      this.itemColumns = this.itemColumns2
      this.tempItemToolbar = this.tempToolbar
      this.tempItemTitle = ''
      if (type === 'add') {
        this.formAttr.title = `新增`

        // 合规模板状态默认为草稿
        this.$set(this.formObj, 'tempStatus', 0)
        // 合规模板来源默认为省级
        this.$set(this.formObj, 'tempSrc', 1)
        // 获取合规模板编号
        this.$store.dispatch('template/findTemplateNo').then(response => {
          this.$set(this.formObj, 'tempNo', response.templateNo)
        })

        // 状态默认为草稿
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
      } else if (type === 'detail') {
        this.tempItemToolbar = []
        this.itemColumns = this.itemColumns1
        this.tempItemTitle = '关联合规项列表'
        this.formAttr.title = `详情`
      }

      if (type === 'edit' || type === 'detail') {
        const params = { tempId: tempId }

        this.formObj = Object.assign({}, row)

        this.$store.dispatch('template/itemList', params).then(response => {
          this.itemTableData = Object.assign([], response.rows)
          console.log(this.itemTableData)
          this.$refs.tempItemDatagrid.setTableData(this.itemTableData)
        })
      }
      this.dialogFormVisible = true
    },
    saveForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if (this.formAttr.formType === 'edit') {
            url = 'template/updateTemplate'
          } else if (this.formAttr.formType === 'add') {
            url = 'template/addTemplate'
          }

          // 组装合规项参数
          let itemId = ''
          this.itemTableData.forEach(row => {
            itemId += row.itemId + ','
          })
          itemId = itemId.substring(0, itemId.length - 1)
          this.formObj.itemId = itemId
          const params = this.formObj
          this.$store.dispatch(url, params).then(response => {
            this.$message({
              showClose: true,
              message: `操作成功！`,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.reloadDatagrid()
          }).catch(() => {})
        }
      })
    },
    exportTemp() {
      const params = this.params
      this.$store.dispatch('template/exportTemplate', params).then(response => {
      })
    },
    exportTempTemplate(ext) {
      this.$store.dispatch('template/exportTemplateTemplate', { 'ext': ext }).then(response => {
      })
    },
    importTemp() {
      const $self = this
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      this.$store.dispatch('template/importTemplate', param).then(response => {
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.fileList = []
        this.reloadDatagrid()
        this.dialogImportVisible = false
      })
    },
    openDetailDag(tempId) {
      const param = { tempId: tempId }
      this.$store.dispatch('template/findTemplate', param).then(response => {
        this.formObj = {}
        // 深克隆
        this.detailObj = Object.assign({}, response.temp)
      })
      this.tempParams.tempId = tempId
      this.detailDagVisible = true
    },
    changChkType() {
      if (this.formObj.chkType === 'BASE' || this.formObj.chkType === 'EQUAL') {
        this.formObj.tempNo = this.formObj.tempNum1 + this.formObj.tempNum2 + '-' + this.formObj.tempNum3
      } else if (this.formObj.chkType === 'WEAK') {
        this.$set(this.formObj, 'tempNo', 'SEC-PCI-SYS-WP-' + this.formObj.tempNum3)
      } else if (this.formObj.chkType === 'VULN') {
        this.formObj.tempNo = 'SEC-PCI-SYS-VULN-' + this.formObj.tempNum3
      } else if (this.formObj.chkType === 'CONTENT') {
        this.formObj.tempNo = 'CONT-WD-' + this.formObj.tempNum3
      }
    },
    openAddTempItem() {
      this.itemDag = true
    },
    closeItemDag() {
      this.itemDag = false
    },
    checkTempItem() {
      const rows = this.$refs.itemDatagrid.getSelectRows()
      this.itemTableData = Object.assign([], rows)
      this.$refs.tempItemDatagrid.setTableData(this.itemTableData)
      this.itemDag = false
    },
    handleRemove(file, fileList) {
      this.fileList.splice(0, 1)
    },
    changeFile(file) {
      this.fileList.push(file)
    },
    getCodeList() {
      this.$store.dispatch('item/codeList').then(response => {
        this.itemScopeOptions = Object.assign([], response.list)
      }).catch(() => {})
    },
    tempCopy(tempId) {
      const param = { 'tempId': tempId }
      this.$store.dispatch('template/tempCopy', param).then(response => {
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.reloadDatagrid()
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.el-dialog .el-col{
  height: 50px;
}
.el-dialog .el-col{
  height: 50px;
}
</style>

