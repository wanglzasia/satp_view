<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="elForm" :model="params" size="small" label-width="100px">
            <el-col :span="6">
              <el-form-item label="合规项编码" prop="itemNum">
                <el-input v-model="params.itemNum" placeholder="合规项编码" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规项名称" prop="itemName">
                <el-input v-model="params.itemName" placeholder="合规项名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规项类别" prop="chkType">
                <el-select
                  v-model="params.chkType"
                  placeholder="合规项类别"
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in chkTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="漏洞编号" prop="itemNum">
                <el-input v-model="params.vulnNo" placeholder="漏洞编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规策略编号" prop="itemNum">
                <el-input v-model="params.policyNum" placeholder="合规策略编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规策略名称" prop="itemName">
                <el-input v-model="params.policyName" placeholder="合规策略名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规策略描述" prop="policyDesc">
                <el-input v-model="params.policyDesc" placeholder="合规策略描述" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="适用对象类型" prop="itemScope">
                <el-select
                  v-model="params.itemScope"
                  placeholder="适用对象类型"
                  clearable
                  :style="{width: '100%'}"
                >
                  <el-option
                    v-for="(item, index) in itemScopeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源文件编号" prop="fileNo">
                <el-input v-model="params.fileNo" placeholder="来源文件编号" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源文件名称" prop="fileName">
                <el-input v-model="params.fileName" placeholder="来源文件名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="来源文件章节" prop="fileChapter">
                <el-input v-model="params.fileChapter" placeholder="来源文件章节" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="适用范围" prop="fileChapter">
                <el-input v-model="params.fileChapter" placeholder="适用范围" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规项来源" prop="itemSrc">
                <el-select v-model="params.itemSrc" placeholder="合规项来源" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in itemSrcOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检查手段" prop="chkMode">
                <el-select v-model="params.chkMode" placeholder="检查手段" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in chkModeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合规项状态" prop="itemStatus">
                <el-select v-model="params.itemStatus" placeholder="合规项状态  " clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in itemStatusOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" icon="el-icon-search" type="primary" @click="reloadDatagrid()">查询</el-button>
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
            @operClick="rowClick"
            @toolbarClick="toolbarClick"
          />
        </div>
        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="1000px" :model="formObj" @close="closeDialog">
            <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="140px" @submit.native.prevent>
              <el-row>
                <div>
                  <el-col :span="12">
                    <el-form-item label="合规项类别" prop="chkType">
                      <el-select v-model="formObj.chkType" :disabled="formAttr.formType=='edit' ||formAttr.formType=='detail' " :style="{width: '100%'}" @change="changChkType()">
                        <el-option
                          v-for="(item, index) in chkTypeOptions2"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <div>
                    <el-col :span="12">
                      <el-form-item label="检查手段" prop="chkMode">
                        <el-select v-model="formObj.chkMode" :disabled="formAttr.formType=='detail'" :style="{width: '100%'}">
                          <el-option
                            v-for="(item, index) in chkModeOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <div v-if="formAttr.formType=='add' && formObj.chkType==='BASE' || formAttr.formType=='add' && formObj.chkType==='GRADE'">
                      <el-col :span="6">
                        <el-form-item label="合规项编号" prop="itemNum">
                          <el-input v-model="formObj.itemNum1" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">
                        <el-select v-model="formObj.itemNum2" :style="{width: '100%'}">
                          <el-option
                            v-for="(item, index) in itemNumOptions"
                            :key="index"
                            :label="item.dictKey"
                            :value="item.dictValue"
                          />
                        </el-select>
                      </el-col>
                      <el-col :span="3">
                        <el-input v-model="formObj.itemNum3" />
                      </el-col>

                    </div>
                    <div v-else>
                      <el-col :span="12">
                        <el-form-item label="合规项编号" prop="itemNum">
                          <el-input v-model="formObj.itemNo" readonly />
                        </el-form-item>
                      </el-col>
                    </div>

                    <el-col :span="12">
                      <el-form-item label="合规项名称" prop="itemName">
                        <el-input v-model="formObj.itemName" :readonly="formAttr.formType=='detail'" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" style="height:80px">
                      <el-form-item label="合规项内容" prop="itemContent">
                        <el-input
                          v-model="formObj.itemContent"
                          :readonly="formAttr.formType=='detail'"
                          type="textarea"
                          :rows="3"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" style="height:80px">
                      <el-form-item label="合规项标准" prop="itemStandard">
                        <el-input
                          v-model="formObj.itemStandard"
                          :readonly="formAttr.formType=='detail'"
                          type="textarea"
                          :rows="3"
                        />
                      </el-form-item>
                    </el-col>

                  </div>
                  <div v-if="formObj.chkType==='BASE'">
                    <el-col :span="12" style="height:80px">
                      <el-form-item label="检查步骤" prop="chkStep">
                        <el-input
                          v-model="formObj.chkStep"
                          :readonly="formAttr.formType=='detail'"
                          type="textarea"
                          :rows="3"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" style="height:80px">
                      <el-form-item label="修复建议" prop="repairSugest">
                        <el-input
                          v-model="formObj.repairSugest"
                          :readonly="formAttr.formType=='detail'"
                          type="textarea"
                          :rows="3"
                        />
                      </el-form-item>
                    </el-col>
                  </div>
                  <div v-if="formObj.chkType==='VULN'">
                    <el-col :span="12">
                      <el-form-item label="漏洞编号" prop="cveId">
                        <el-input v-model="formObj.cveId" :readonly="formAttr.formType=='detail'" />
                      </el-form-item>
                    </el-col>
                  </div>
                  <el-col :span="12">
                    <el-form-item label="适用对象类型" prop="itemScope">
                      <el-select v-model="formObj.itemScope" :disabled="formAttr.formType=='detail'" :style="{width: '100%'}">
                        <el-option
                          v-for="(item, index) in itemScopeOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="适用范围" prop="itemTarget">
                      <el-input v-model="formObj.itemTarget" :readonly="formAttr.formType=='detail'" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="适用系统版本参考" prop="trialVersion">
                      <el-input v-model="formObj.trialVersion" :readonly="formAttr.formType=='detail'" />
                    </el-form-item>
                  </el-col>

                  <div v-if="formAttr.formType==='add'">
                    <el-col :span="12">
                      <el-form-item label="合规项状态" prop="itemStatus">
                        <el-select v-model="formObj.itemStatus" :disabled="formAttr.formType=='detail'" :style="{width: '100%'}">
                          <el-option
                            v-for="(item, index) in itemStatusOptions2"
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
                      <el-form-item label="合规项状态" prop="itemStatus">
                        <el-select v-model="formObj.itemStatus" :disabled="formAttr.formType=='detail'" :style="{width: '100%'}">
                          <el-option
                            v-for="(item, index) in itemStatusOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </div>
                  <el-col :span="12">
                    <el-form-item label="合规项来源" prop="itemSrc">
                      <el-select v-model="formObj.itemSrc" :disabled="formAttr.formType=='detail'" :style="{width: '100%'}">
                        <el-option
                          v-for="(item, index) in itemSrcOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </div>

              </el-row></el-form>
            <satp-datagrid
              ref="itemPolicyDatagrid"
              :tabledata="policyTableData"
              :columns="policyColumns"
              :pagesizes="pSizes"
              :toolbar="itemPolicyToolbar"
              :title="itemPolicyTitle"
              idx
              border
              @operClick="rowClick"
              @toolbarClick="itemToolbarClick"
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeDialog()">取 消</el-button>
              <el-button type="primary" size="small" @click="saveForm()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-dialog title="安全合规策略列表" :visible.sync="policyDag" width="800px" @close="closePolicyDag">
            <satp-datagrid
              ref="policyDatagrid"
              :url="policyUrl2"
              :qparams="policyParams"
              :columns="policyColumns1"
              checkbox
              border
            />
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closePolicyDag()">取 消</el-button>
              <el-button type="primary" size="small" @click="checkItemPolicy()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>

          <el-dialog title="合规项导入" :visible.sync="dialogImportVisible" width="700px" @close="closeImportDag">
            <!-- <el-form> -->
            <el-row>
              <el-col :span="6">
                <el-button type="primary" size="small" icon="el-icon-download" @click="exportItemTemplate('xls')">xls导入模板</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" size="small" icon="el-icon-download" @click="exportItemTemplate('csv')">csv导入模板</el-button>
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
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="importItem">上传到服务器</el-button>
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
  name: 'ItemList',
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      fileList: [],
      formAttr: {},
      itemPolicyTitle: '',
      formObj: {},
      pSizes: [5, 10, 15, 20],
      detailObj: {},
      formRule: {
        itemName: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        itemContent: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        itemTarget: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        itemScope: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        trialVersion: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        itemStandard: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      detailDagVisible: false,
      dialogImportVisible: false,
      policyDag: false,
      chkTypeOptions: [{
        'label': '基线检查类',
        'value': 'BASE'
      }, {
        'label': '系统漏洞类',
        'value': 'VULN'
      }, {
        'label': '弱口令类',
        'value': 'WEAK'
      }, {
        'label': 'Web漏洞类',
        'value': 'WEB'
      }, {
        'label': '内容安全类',
        'value': 'CONTENT'
      }, {
        'label': '等保2.0自评类',
        'value': 'GRADE'
      }],
      chkTypeOptions2: [{
        'label': '基线检查类',
        'value': 'BASE'
      }, {
        'label': '系统漏洞类',
        'value': 'VULN'
      }, {
        'label': '弱口令类',
        'value': 'WEAK'
      }, {
        'label': '内容安全类',
        'value': 'CONTENT'
      }, {
        'label': '等保2.0自评类',
        'value': 'GRADE'
      }],
      itemScopeOptions: [],
      chkModeOptions: [{
        'label': '手动',
        'value': 2
      }, {
        'label': '自动',
        'value': 1
      }, {
        'label': '自适应',
        'value': 3
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
      itemStatusOptions2: [{
        'label': '草稿',
        'value': 0
      }, {
        'label': '生效',
        'value': 1
      }],
      itemSrcOptions: [{
        'label': '集团',
        'value': 2
      }, {
        'label': '省份',
        'value': 1
      }],
      itemNumOptions: [
        {
          'label': 'NE-',
          'value': 'NE-'
        }, {
          'label': 'SE-',
          'value': 'SE-'
        }, {
          'label': 'HT-',
          'value': 'HT-'
        }, {
          'label': 'DB-',
          'value': 'DB-'
        }, {
          'label': 'MW-',
          'value': 'MW-'
        }, {
          'label': 'WEB-',
          'value': 'WEB-'
        }, {
          'label': 'BD-',
          'value': 'BD-'
        }, {
          'label': 'MS-',
          'value': 'MS-'
        }, {
          'label': 'CB',
          'value': 'CB'
        }, {
          'label': 'OT-',
          'value': 'OT-'
        }
      ],
      url: 'item/itemList',
      policyUrl: 'item/policyList',
      policyUrl2: 'policy/policyList',
      params: {},
      itemParams: {},
      policyParams: {
        policyStatus: 1
      },
      columns: [
        { label: '合规项编码', prop: 'itemNo', actions: [{ prop: 'detail', type: 'success', link: 'itemNo' }] },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类别', prop: 'chkType', formatter: this.chkTypeFormatter },
        { label: '创建时间', prop: 'createTime', formatter: this.dateTimeFormatter },
        { label: '合规项状态', prop: 'itemStatus', formatter: this.itemStatusFormatter },
        { label: '检查手段', prop: 'chkMode', formatter: this.chkModeFormatter },
        { label: '合规项来源', prop: 'itemSrc', formatter: this.itemSrcFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      policyColumns: [],
      policyColumns1: [
        { label: '合规策略编号', prop: 'policyNo' },
        { label: '合规策略名称', prop: 'policyName' },
        { label: '文件名称', prop: 'fileName' },
        { label: '来源 ', prop: 'policySrc', formatter: this.policySrcFormatter },
        { label: '状态', prop: 'policyStatus', formatter: this.policyStatusFormatter }
      ],
      policyColumns2: [
        { label: '合规策略编号', prop: 'policyNo' },
        { label: '合规策略名称', prop: 'policyName' },
        { label: '文件名称', prop: 'fileName' },
        { label: '来源 ', prop: 'policySrc', formatter: this.policySrcFormatter },
        { label: '状态', prop: 'policyStatus', formatter: this.policyStatusFormatter },
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
      itemPolicyToolbar: [],
      itemToolbar: [
        { label: '关联合规策略', prop: 'checkItemPolicy', type: 'primary', icon: 'el-icon-plus' }
      ],
      policyToolbar: [
        { label: '选定', prop: 'check', type: 'primary', icon: 'el-icon-check' }
      ],
      policyTableData: []

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
          this.itemEffect(row.itemId)
          break
        case 'invalid':
          this.itemInvalid(row.itemId)
          break
        case 'update':
          this.openDialog(row.itemId, 'edit')
          break
        case 'detail':
          this.openDialog(row.itemId, 'detail')
          break
        case 'delete':
          this.policyTableData.splice(this.policyTableData.indexOf(row), 1)
          this.$refs.itemPolicyDatagrid.setTableData(this.policyTableData)
          break

        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'export':
          this.exportItem()
          break
        case 'import':
          this.dialogImportVisible = true
          break

        default:
          break
      }
    },
    itemToolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'checkItemPolicy':
          this.openAddItemPolicy()
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
      this.policyTableData = []
      this.$refs.itemPolicyDatagrid.setTableData(this.policyTableData)
    },
    closeImportDag() {
      this.dialogImportVisible = false
      this.fileList = []
      this.reloadDatagrid()
    },
    itemNoFormatter(row) {
      return '<font style="color:orange">' + row.itemNo + '</font>'
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
    itemStatusFormatter(row) {
      if (row.itemStatus === 0) {
        return '草稿'
      } else if (row.itemStatus === 1) {
        return '生效'
      } else if (row.itemStatus === 2) {
        return '失效'
      }
    },
    chkModeFormatter(row) {
      if (row.chkMode === 1) {
        return '自动'
      } else if (row.chkMode === 2) {
        return '手动'
      } else if (row.chkMode === 3) {
        return '自适应'
      }
    },
    itemSrcFormatter(row) {
      if (row.itemSrc === 1) {
        return '省级'
      } else if (row.itemSrc === 2) {
        return '集团'
      }
    },
    policySrcFormatter(row) {
      if (row.policySrc === 1) {
        return '省级'
      } else if (row.policySrc === 2) {
        return '集团'
      }
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
    dateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    operFormatter(row) {
      let actions = []
      const itemStatus = row.itemStatus
      const itemSrc = row.itemSrc
      if (itemSrc === 1) {
        if (itemStatus === 0 || itemStatus === 2) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' },
            { title: '修改', prop: 'update', type: 'text', icon: 'el-icon-edit' }
          ]
        } else if (itemStatus === 1) {
          actions = [
            { title: '失效', prop: 'invalid', type: 'text', icon: 'el-icon-remove-outline', popconfirm: '确认失效吗?' }
          ]
        }
      } else {
        if (itemStatus === 0) {
          actions = [
            { title: '生效', prop: 'effect', type: 'text', icon: 'el-icon-circle-check', popconfirm: '确认生效吗?' }
          ]
        }
      }
      // actions.push({ title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-menu' })
      return actions
    },
    itemEffect(itemId) {
      const params = { itemId: itemId }
      this.$store.dispatch('item/itemEffect', params).then(response => {
        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    itemInvalid(itemId) {
      const params = { itemId: itemId }
      let count
      this.$store.dispatch('item/itemTemplateCount', params).then(response => {
        count = response.count
        this.$confirm(`该合规项被` + count + `条合规模板引用, 确认失效?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('item/itemInvalid', params).then(response => {
            this.$message({
              showClose: true,
              message: `操作成功！`,
              type: 'success'
            })
            this.reloadDatagrid()
          }).catch(() => {})
        })
      }).catch(() => {})
    },
    openDialog(itemId, type) {
      this.formAttr.formType = type
      this.policyColumns = this.policyColumns2
      this.itemPolicyToolbar = this.itemToolbar
      this.itemPolicyTitle = ''
      if (type === 'add') {
        this.formAttr.title = `新增`

        this.$store.dispatch('policy/getDictList').then(response => {
          this.itemNumOptions = Object.assign({}, response.ditList)
        }).catch(() => {})
        // 省端编码
        this.formObj.itemNum1 = 'SEC-CI-'
        // 对象类型默认为网络设备
        this.formObj.itemNum2 = 'NE-'
        this.$set(this.formObj, 'itemNum2', 'NE')
        // 合规项类型默认为基线检查类
        this.$set(this.formObj, 'chkType', 'BASE')
        // 合规项来源默认为省级
        this.$set(this.formObj, 'itemSrc', 1)
        // 获取序列
        this.$store.dispatch('item/findItemNum').then(response => {
          this.$set(this.formObj, 'itemNum3', response.itemNum)
        })

        // 状态默认为草稿
        this.formObj.itemStatus = 0
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
      } else if (type === 'detail') {
        this.itemPolicyToolbar = []
        this.policyColumns = this.policyColumns1
        this.itemPolicyTitle = '关联合规策略列表'
        this.formAttr.title = `详情`
      }

      if (type === 'edit' || type === 'detail') {
        const params = { itemId: itemId }
        this.$store.dispatch('item/findItem', params).then(response => {
          this.formObj = {}
          // 深克隆
          this.formObj = Object.assign({}, response.item)
        })
        this.$store.dispatch('item/policyList', params).then(response => {
          this.policyTableData = Object.assign([], response.rows)
          this.$refs.itemPolicyDatagrid.setTableData(this.policyTableData)
        })
      }
      this.dialogFormVisible = true
    },
    saveForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if (this.formAttr.formType === 'edit') {
            url = 'item/updateItem'
          } else if (this.formAttr.formType === 'add') {
            url = 'item/addItem'
          }

          // 组装合规策略参数
          let policyId = ''
          this.policyTableData.forEach(row => {
            policyId += row.policyId + ','
          })
          policyId = policyId.substring(0, policyId.length - 1)
          this.formObj.policyId = policyId
          console.log(policyId)
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
    exportItem() {
      console.log(this.params)
      const params = this.params
      this.$store.dispatch('item/exportItem', params).then(response => {
      })
    },
    exportItemTemplate(ext) {
      this.$store.dispatch('item/exportItemTemplate', { 'ext': ext }).then(response => {
      })
    },
    importItem() {
      const $self = this
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      // console.log(param.get('file'))
      this.$store.dispatch('item/importItem', param).then(response => {
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.fileList = []
        this.reloadDatagrid()
        this.dialogImportVisible = false
      })
    },
    openDetailDag(itemId) {
      const param = { itemId: itemId }
      this.$store.dispatch('item/findItem', param).then(response => {
        this.formObj = {}
        // 深克隆
        this.detailObj = Object.assign({}, response.item)
      })
      this.itemParams.itemId = itemId
      this.detailDagVisible = true
    },
    getCodeList() {
      this.$store.dispatch('item/codeList').then(response => {
        this.itemScopeOptions = Object.assign([], response.list)
      }).catch(() => {})
    },
    changChkType() {
      if (this.formObj.chkType === 'BASE' || this.formObj.chkType === 'GRADE') {
        this.formObj.itemNo = this.formObj.itemNum1 + this.formObj.itemNum2 + '-' + this.formObj.itemNum3
      } else if (this.formObj.chkType === 'WEAK') {
        this.$set(this.formObj, 'itemNo', 'SEC-PCI-SYS-WP-' + this.formObj.itemNum3)
      } else if (this.formObj.chkType === 'VULN') {
        this.formObj.itemNo = 'SEC-PCI-SYS-VULN-' + this.formObj.itemNum3
      } else if (this.formObj.chkType === 'CONTENT') {
        this.formObj.itemNo = 'CONT-WD-' + this.formObj.itemNum3
      }
    },
    openAddItemPolicy() {
      this.policyDag = true
    },
    closePolicyDag() {
      this.policyDag = false
    },
    checkItemPolicy() {
      const rows = this.$refs.policyDatagrid.getSelectRows()
      this.policyTableData = Object.assign([], rows)
      this.$refs.itemPolicyDatagrid.setTableData(this.policyTableData)
      this.policyDag = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList.splice(0, 1)
    },
    changeFile(file) {
      this.fileList.push(file)
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

