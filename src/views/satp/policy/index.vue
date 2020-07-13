<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="elForm" :model="params" size="small" label-width="100px">
            <el-col :span="8">
              <el-form-item label="合规策略编号" prop="policyNum">
                <el-input v-model="params.policyNum" placeholder="合规策略编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合规策略名称" prop="policyName">
                <el-input v-model="params.policyName" placeholder="合规策略名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <div>
              <el-col :span="8">
                <el-form-item label="合规策略描述" prop="policyDesc">
                  <el-input v-model="params.policyDesc" placeholder="合规策略描述" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合规策略状态" prop="policyStatus">
                  <el-select
                    v-model="params.policyStatus"
                    placeholder="合规策略状态"
                    clearable
                    :style="{width: '100%'}"
                  >
                    <el-option
                      v-for="(item, index) in policyStatusOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合规策略来源" prop="field108">
                  <el-select v-model="params.policySrc" placeholder="合规策略来源" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="(item, index) in policySrcOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源文件编号" prop="fileNo">
                  <el-input v-model="params.fileNo" placeholder="来源文件编号" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源文件名称" prop="fileName">
                  <el-input v-model="params.fileName" placeholder="来源文件名称" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源文件章节" prop="fileChapter">
                  <el-input v-model="params.fileChapter" placeholder="来源文件章节" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合规备案状态" prop="recordStatus">
                  <el-select v-model="params.recordStatus" placeholder="合规备案状态" clearable :style="{width: '100%'}">
                    <el-option
                      v-for="(item, index) in recordStatusOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
            <el-col :span="24">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid()">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>更多条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(0,'add')">新增</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <div>
          <satp-datagrid
            ref="datagridTest"
            :url="url"
            :qparams="params"
            :columns="columns"
            :toolbar="toolbar"
            idx
            border
            @operClick="operClick"
            @toolbarClick="toolbarClick"
          />
        </div>
        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="600px" :model="formObj" @close="closeDialog">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="120px" @submit.native.prevent>
              <el-row>
                <div v-if="formAttr.formType=='add'">
                  <el-col :span="12">
                    <el-form-item label="合规策略编号" prop="policyNum">
                      <el-input v-model="formObj.policyNum1" readonly />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-select v-model="formObj.policyNum2">
                      <el-option
                        v-for="(item, index) in policyNumOption"
                        :key="index"
                        :label="item.dictKey"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-input v-model="formObj.policyNum3" readonly />
                  </el-col>
                </div>
                <div v-if="formAttr.formType=='edit'">
                  <el-col :span="24">
                    <el-form-item label="合规策略编号" prop="policyNo">
                      <el-input v-model="formObj.policyNo" readonly />
                    </el-form-item>
                  </el-col>
                </div>
                <el-col :span="24">
                  <el-form-item label="合规策略名称" prop="policyName">
                    <el-input v-model="formObj.policyName" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="来源文件名称" prop="fileName">
                    <el-input v-model="formObj.fileName" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="来源文件编号" prop="fileNo">
                    <el-input v-model="formObj.fileNo" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="来源文件章节" prop="fileChapter">
                    <el-input v-model="formObj.fileChapter" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="合规策略状态" prop="policyStatus">
                    <div v-if="formAttr.formType=='edit'">
                      <el-select v-model="formObj.policyStatus">
                        <el-option
                          v-for="(item, index) in policyStatusOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div v-if="formAttr.formType=='add'">
                      <el-select v-model="formObj.policyStatus">
                        <el-option
                          v-for="(item, index) in policyStatusOptions2"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="合规策略来源" prop="policySrc">
                    <el-input value="省端" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="合规策略描述" prop="policyDesc">
                    <el-input
                      v-model="formObj.policyDesc"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeDialog()">取 消</el-button>
              <el-button type="primary" size="small" @click="saveForm()">确 定</el-button>
            </span>
          </el-dialog>
        </div>

        <div id="detail">
          <el-dialog title="详情" :visible.sync="detailDagVisible" width="1000px" :model="detailObj" @close="detailDagVisible=false">
            <el-form ref="deatilForm" :model="formObj" label-width="120px" @submit.native.prevent>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合规策略编号" prop="policyNo">
                    <el-input v-model="detailObj.policyNo" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合规策略名称" prop="policyName">
                    <el-input v-model="detailObj.policyName" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="来源文件名称" prop="fileName">
                    <el-input v-model="detailObj.fileName" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="来源文件编号" prop="fileNo">
                    <el-input v-model="detailObj.fileNo" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="来源文件章节" prop="fileChapter">
                    <el-input v-model="detailObj.fileChapter" readonly />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合规策略状态" prop="policyStatus">
                    <div>
                      <el-select v-model="detailObj.policyStatus" disabled>
                        <el-option
                          v-for="(item, index) in policyStatusOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合规策略来源" prop="policySrc">
                    <el-select v-model="detailObj.policySrc" disabled>
                      <el-option
                        v-for="(item, index) in policySrcOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="合规策略描述" prop="policyDesc">
                    <el-input
                      v-model="detailObj.policyDesc"
                      type="textarea"
                      :rows="3"
                      readonly
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="padding:25px">
              <satp-datagrid
                ref="itemDatagrid"
                :url="itemUrl"
                :qparams="itemParams"
                :columns="itemColumns"
                title="关联合规项列表"
                :pagesizes="pSizes"
                idx
                border
              />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="detailDagVisible=false">返 回</el-button>
            </span>
          </el-dialog>
        </div>
        <el-dialog title="合规策略导入" :visible.sync="dialogImportVisible" width="700px" @close="closeImportDag">
          <!-- <el-form> -->
          <el-row>
            <el-col :span="6">
              <el-button type="primary" size="small" icon="el-icon-download" @click="exportPolicyTemplate('xls')">xls导入模板</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small" icon="el-icon-download" @click="exportPolicyTemplate('csv')">csv导入模板</el-button>
            </el-col>

            <el-col :span="10">
              <el-upload
                ref="upload"
                class="upload-demo"
                action=" "
                :on-change="changeFile"
                :file-list="fileList"
                :auto-upload="false"
                multiple
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="importPolicy">上传到服务器</el-button>
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

      </el-card>
    </div>
  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'PolicyList',
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      pSizes: [5, 10, 15, 20],
      moreParams: false,
      fileList: [],
      formAttr: {},
      formObj: {},
      detailObj: {},
      formRule: {
        policyName: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        policyDesc: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        fileNo: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        fileName: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        fileChapter: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      detailDagVisible: false,
      dialogImportVisible: false,
      policyStatusOptions: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }, {
        'label': '失效',
        'value': 2
      }],
      policyStatusOptions2: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }],
      policySrcOptions: [{
        'label': '集团',
        'value': 2
      }, {
        'label': '省份',
        'value': 1
      }],
      recordStatusOptions: [{
        'label': '已备案',
        'value': 1
      }, {
        'label': '未备案',
        'value': 2
      }],
      policyNumOption: [

      ],
      url: 'policy/policyList',
      itemUrl: 'policy/itemList',
      params: {},
      itemParams: {},
      columns: [
        { label: '合规策略编号', prop: 'policyNo', actions: [{ prop: 'detail', type: 'success', link: 'policyNo' }] },
        { label: '合规策略名称', prop: 'policyName' },
        { label: '合规策略描述', prop: 'policyDesc' },
        { label: '来源文件名称', prop: 'fileName' },
        { label: '来源文件章节', prop: 'fileChapter' },
        { label: '合规策略状态', prop: 'policyStatus', formatter: this.policyStatusFormatter },
        { label: '合规策略来源', prop: 'policySrc', formatter: this.policySrcFormatter },
        { label: '备案状态', prop: 'recordStatus', formatter: this.recordStatusFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      itemColumns: [
        { label: '合规项编号', prop: 'itemNo' },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类别', prop: 'chkType', formatter: this.chkTypeFormatter },
        { label: '适用对象类型', prop: 'itemScope' },
        { label: '合规项状态', prop: 'itemStatus', formatter: this.itemStatusFormatter }
      ],

      toolbar: [
        { label: '导入', prop: 'import', type: 'primary', icon: 'el-icon-upload2' },
        { label: '导出', prop: 'export', type: 'primary', icon: 'el-icon-download' },
        { label: '同步', prop: 'synchro', type: 'primary', icon: 'el-icon-s-order' },
        { label: '备案', prop: 'record', type: 'primary', icon: 'el-icon-video-camera-solid' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'effect':
          this.policyEffect(row.policyId)
          break
        case 'invalid':
          this.policyInvalid(row.policyId)
          break
        case 'delete':
          this.deletePolicy(row.policyId)
          break
        case 'update':
          this.openDialog(row.policyId, 'edit')
          break
        case 'detail':
          this.openDetailDag(row.policyId)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'export':
          this.exportPolicy()
          break
        case 'import':
          this.dialogImportVisible = true
          break
        default:
          break
      }
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formObj = {}
    },
    policyNoFormatter(row) {
      return '<a style="color:orange">' + row.policyNo + '</a>'
    },
    policyStatusFormatter(row) {
      if (row.policyStatus === 0) {
        return '草稿'
      } else if (row.policyStatus === 1) {
        return '生效'
      } else if (row.policyStatus === 2) {
        return '失效'
      }
    },
    policySrcFormatter(row) {
      if (row.policySrc === 1) {
        return '省级'
      } else if (row.policySrc === 2) {
        return '集团'
      }
    },
    recordStatusFormatter(row) {
      if (row.recordStatus === 1) {
        return '已备案'
      } else if (row.recordStatus === 2) {
        return '未备案'
      }
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
      if (value === 'GRADE') {
        dictValue = '等保2.0自评类'
      }
      return dictValue
    },
    operFormatter(row) {
      let actions = []
      const policyStatus = row.policyStatus
      const policySrc = row.policySrc
      if (policySrc === 1) {
        if (policyStatus === 0 || policyStatus === 2) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' },
            { title: '修改', prop: 'update', type: 'text', icon: 'el-icon-edit' }
          ]
        } else if (policyStatus === 1) {
          actions = [
            { title: '失效', prop: 'invalid', type: 'text', icon: 'el-icon-remove-outline', popconfirm: '确认失效吗?' }
          ]
        }
      } else {
        if (policyStatus === 0) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' }
          ]
        }
      }
      // actions.push({ title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-menu' })
      return actions
    },
    policyEffect(policyId) {
      const params = { policyId: policyId }
      this.$store.dispatch('policy/policyEffect', params).then(response => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    policyInvalid(policyId) {
      const params = { policyId: policyId }
      this.$store.dispatch('policy/policyInvalid', params).then(response => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    openDialog(policyId, type) {
      this.$store.dispatch('policy/getDictList').then(response => {
        this.policyNumOption = Object.assign({}, response.ditList)
      }).catch(() => {})

      this.formAttr.formType = type
      if (type === 'add') {
        this.formAttr.title = `新增`

        // 省端编码
        this.formObj.policyNum1 = 'SEC-PCP-'
        // 对象类型默认为网络设备
        // this.formObj.policyNum2 = 'NE-'
        this.$set(this.formObj, 'policyNum2', 'NE')
        // 获取序列
        this.$store.dispatch('policy/findPolicyNum').then(response => {
          this.$set(this.formObj, 'policyNum3', response.policyNum)
        })

        // 状态默认为草稿
        this.formObj.policyStatus = 0
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
        const params = { policyId: policyId }
        this.$store.dispatch('policy/findPolicy', params).then(response => {
          this.formObj = {}
          // 深克隆
          this.formObj = Object.assign({}, response.policy)
        })
      }
      this.dialogFormVisible = true
    },
    saveForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if (this.formAttr.formType === 'edit') {
            url = 'policy/updatePolicy'
          } else if (this.formAttr.formType === 'add') {
            url = 'policy/addPolicy'
            this.formObj.policyNo = this.formObj.policyNum1 + this.formObj.policyNum2 + '-' + this.formObj.policyNum3
          }
          const params = this.formObj
          this.formObj.policySrc = 1
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
    exportPolicy() {
      console.log(this.params)
      const params = this.params
      this.$store.dispatch('policy/exportPolicy', params).then(response => {
      })
    },
    exportPolicyTemplate(ext) {
      this.$store.dispatch('policy/exportPolicyTemplate', { 'ext': ext }).then(response => {
      })
    },
    importPolicy() {
      const $self = this
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      // console.log(param.get('file'))
      this.$store.dispatch('policy/importPolicy', param).then(response => {
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.fileList = []
        this.reloadDatagrid()
        this.dialogImportVisible = false
      })
    },
    openDetailDag(policyId) {
      const param = { policyId: policyId }
      this.$store.dispatch('policy/findPolicy', param).then(response => {
        this.formObj = {}
        // 深克隆
        this.detailObj = Object.assign({}, response.policy)
      })
      this.itemParams.policyId = policyId
      try {
        this.$refs.itemDatagrid.reload()
      } catch {
        console.log('itemDatagrid未加载')
      }

      this.detailDagVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList.splice(0, 1)
    },
    changeFile(file) {
      this.fileList.push(file)
    },
    closeImportDag() {
      this.dialogImportVisible = false
      this.fileList = []
      this.reloadDatagrid()
    }
  }
}
</script>
<style lang="scss" scoped>
#detail .el-col{
  height: 50px;
}
</style>

