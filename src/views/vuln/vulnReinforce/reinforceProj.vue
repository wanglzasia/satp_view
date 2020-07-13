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
                <el-input v-model="queryParams.projName" placeholder="方案名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方案状态">
                <el-select v-model="queryParams.pubStatus" placeholder="方案状态">
                  <el-option label="全部" value="" />
                  <el-option label="未发布" value="1" />
                  <el-option label="已发布" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方案来源">
                <el-select v-model="queryParams.createBy" placeholder="方案来源">
                  <el-option label="全部" value="" />
                  <el-option label="集团" value="1" />
                  <el-option label="省份" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="getReinforceProjList">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="openAddProjDialog">新建方案</el-button>
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
          @toolbarClick="toolbarClick"
        />
      </el-card>
    </div>
    <!--新增或修改方案弹窗-->
    <el-dialog
      :title="addOrEditTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleBeforeClose"
    >
      <el-form ref="addProjForm" :model="addParams" label-width="120px" :rules="addParamsRules" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="方案名称" prop="projName">
              <el-input v-model="addParams.projName" placeholder="方案名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案来源" prop="projSrc">
              <el-select v-model="addParams.projSrc">
                <el-option label="权威机构" value="1" />
                <el-option label="漏洞验证" value="2" />
                <el-option label="测试基地" value="3" />
                <el-option label="专题漏洞" value="4" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称" prop="vulnName">
              <el-input v-model="addParams.vulnName" placeholder="漏洞名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="影响资产" prop="resType">
              <el-input v-model="addParams.resType" placeholder="影响资产" />
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
            <el-form-item label="方案详情" prop="projDetail">
              <el-input v-model="addParams.projDetail" type="textarea" placeholder="方案详情" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="加固结果" prop="reinStatus">
              <el-select v-model="addParams.reinStatus">
                <el-option label="可行" value="1" />
                <el-option label="不可行" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案状态" prop="pubStatus">
              <el-select v-model="addParams.pubStatus">
                <el-option label="未发布" value="2" />
                <el-option label="已发布" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下发省份" prop="province">
              <el-select v-model="addParams.province" placeholder="下发省份">
                <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案来源" prop="createBy">
              <el-select v-model="addParams.createBy" @change="showGroupView">
                <el-option label="本省" value="2" />
                <el-option label="集团" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="groupView">
          <el-col :span="12">
            <el-form-item label="集团ID" prop="projId">
              <el-input v-model="addParams.projId" placeholder="集团ID" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下发时间" prop="sendTime">
              <el-date-picker
                v-model="addParams.sendTime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="saveProj('addProjForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看方案弹窗-->
    <el-dialog
      title="查看方案"
      :visible.sync="lookDialogVisible"
      width="50%"
      :before-close="handleBeforeClose"
    >
      <el-form ref="form" :model="addParams" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="方案名称">
              <el-input v-model="addParams.projName" placeholder="方案名称" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案来源">
              <el-select v-model="addParams.projSrc" :disabled="true">
                <el-option label="权威机构" value="1" />
                <el-option label="漏洞验证" value="2" />
                <el-option label="测试基地" value="3" />
                <el-option label="专题漏洞" value="4" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="漏洞名称">
              <el-input v-model="addParams.vulnName" placeholder="漏洞名称" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="影响资产">
              <el-input v-model="addParams.resType" placeholder="影响资产" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="漏洞描述">
              <el-input v-model="addParams.vulnDetail" type="textarea" placeholder="漏洞描述" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案详情">
              <el-input v-model="addParams.projDetail" type="textarea" placeholder="方案详情" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="加固结果">
              <el-select v-model="addParams.reinStatus" :disabled="true">
                <el-option label="可行" value="1" />
                <el-option label="不可行" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案状态">
              <el-select v-model="addParams.pubStatus" :disabled="true">
                <el-option label="未发布" value="2" />
                <el-option label="已发布" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下发省份">
              <el-select v-model="addParams.province" placeholder="下发省份" :disabled="true">
                <el-option v-for="prov in provinceList" :key="prov.dictKey" :label="prov.dictValue" :value="prov.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方案来源">
              <el-select v-model="addParams.createBy" :disabled="true" @change="showGroupView">
                <el-option label="本省" value="2" />
                <el-option label="集团" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="groupView">
          <el-col :span="12">
            <el-form-item label="集团ID">
              <el-input v-model="addParams.projId" placeholder="集团ID" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下发时间">
              <el-date-picker
                v-model="addParams.sendTime"
                type="datetime"
                placeholder="选择日期时间"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="lookDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="lookDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'

export default {
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      url: 'vulnReinforce/reinforceProjList',
      saveUrl: 'vulnReinforce/addReinforceProj',
      deleteUrl: 'vulnReinforce/deleteReinforceProj',
      editUrl: 'vulnReinforce/updateReinforceProj',
      provinceUrl: 'dataDict/queryDataDictList',
      queryParams: {
        projName: '',
        pubStatus: '',
        createBy: ''
      },
      columns: [
        { label: '方案名称', prop: 'projName', align: 'left' },
        { label: '一级编号', prop: 'projId', width: 80, align: 'center' },
        { label: '二级编号', prop: 'vulnprojId', width: 80, align: 'center' },
        { label: '方案来源', prop: 'projSrc', width: 80, align: 'center', formatter: this.projSrcFormatter },
        { label: '漏洞名称', prop: 'vulnName', width: 100, align: 'left' },
        { label: '影响资产', prop: 'resType', width: 100, align: 'center' },
        { label: '下发省份', prop: 'provName', width: 100, align: 'center' },
        { label: '加固结果', prop: 'reinStatus', width: 100, align: 'center', formatter: this.reinStatusFormatter },
        { label: '方案来源', prop: 'createBy', width: 100, align: 'center', formatter: this.createByFormatter },
        {
          label: '操作',
          width: 120,
          align: 'center',
          actions: [
            { title: '查看', prop: 'look', type: 'text', icon: 'el-icon-tickets' },
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }
      ],
      toolbar: [],
      addParams: {
        projName: '',
        projSrc: '1',
        vulnName: '',
        resType: '',
        vulnDetail: '',
        projDetail: '',
        reinStatus: '1',
        pubStatus: '2',
        province: '',
        createBy: '2',
        projId: '',
        sendTime: ''
      },
      addParamsRules: {
        projName: [
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ],
        projSrc: [
          { required: true, message: '请选择方案来源', trigger: 'blur' }
        ],
        vulnName: [
          { required: true, message: '请输入漏洞名称', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请输入影响资产', trigger: 'blur' }
        ],
        vulnDetail: [
          { required: true, message: '请输入漏洞描述', trigger: 'blur' }
        ],
        projDetail: [
          { required: true, message: '请输入方案详情', trigger: 'blur' }
        ],
        reinStatus: [
          { required: true, message: '请选择加固结果', trigger: 'blur' }
        ],
        pubStatus: [
          { required: true, message: '请选择方案状态', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择下发省份', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '请选择方案来源', trigger: 'blur' }
        ]
      },
      addOrEditTitle: '',
      // 新增和修改用的同一个弹窗，设置key用来区分是新增还是修改
      addOrEditKey: '',
      dialogVisible: false,
      tableData: [],
      // 下发省份列表
      provinceList: [],
      // 默认不展示集团ID
      groupView: false,
      // 查看方案弹窗
      lookDialogVisible: false
    }
  },
  created() {

  },
  mounted() {
    // 加载数据
    // this.getReinforceProjList()
  },
  methods: {
    // 获取方案列表
    getReinforceProjList() {
      this.$refs['datagridTest'].reload()
    },
    // 新增弹窗
    openAddProjDialog() {
      this.addOrEditTitle = '新增方案'
      this.addOrEditKey = 'add'
      this.dialogVisible = true
      this.getProvinceList()
    },
    handleBeforeClose() {
      this.dialogVisible = false
      this.lookDialogVisible = false
      this.addParams = {
        projName: '',
        projSrc: '1',
        vulnName: '',
        resType: '',
        vulnDetail: '',
        projDetail: '',
        reinStatus: '1',
        pubStatus: '2',
        province: '',
        createBy: '2',
        projId: '',
        sendTime: '' }
    },
    // 保存方案
    async saveProj(formName) {
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrEditKey === 'add') {
            this.$store.dispatch(this.saveUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.getReinforceProjList()
              this.addParams = {
                projName: '',
                projSrc: '1',
                vulnName: '',
                resType: '',
                vulnDetail: '',
                projDetail: '',
                reinStatus: '1',
                pubStatus: '2',
                province: '',
                createBy: '2',
                projId: '',
                sendTime: '' }
            }).catch(
            )
          } else if (this.addOrEditKey === 'edit') {
            this.$store.dispatch(this.editUrl, this.addParams).then(resp => {
              this.dialogVisible = false
              this.getReinforceProjList()
              this.addParams = {
                projName: '',
                projSrc: '1',
                vulnName: '',
                resType: '',
                vulnDetail: '',
                projDetail: '',
                reinStatus: '1',
                pubStatus: '2',
                province: '',
                createBy: '2',
                projId: '',
                sendTime: '' }
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
    // 删除方案
    deleteProj(row) {
      this.$store.dispatch(this.deleteUrl, { 'vulnprojId': row.vulnprojId }).then(resp => {
        this.getReinforceProjList()
      }).catch(
      )
    },
    // 打开编辑方案弹窗
    openEditProjDialog(row) {
      this.getProvinceList()
      this.addOrEditTitle = '修改方案'
      this.addOrEditKey = 'edit'
      this.dialogVisible = true
      this.addParams = {
        projName: row.projName,
        projSrc: row.projSrc + '',
        vulnName: row.vulnName,
        resType: row.resType,
        vulnDetail: row.vulnDetail,
        projDetail: row.projDetail,
        reinStatus: row.reinStatus + '',
        pubStatus: row.pubStatus + '',
        province: row.province,
        createBy: row.createBy + '',
        projId: row.projId,
        sendTime: row.sendTime
      }
      this.addParams.vulnprojId = row.vulnprojId
      if (row.createBy + '' === '1') {
        this.groupView = true
      } else {
        this.groupView = false
      }
    },
    // 打开查看方案弹窗
    openLookProjDialog(row) {
      this.getProvinceList()
      this.lookDialogVisible = true
      this.addParams = Object.assign({}, row)
      this.addParams.projSrc = this.addParams.projSrc + ''
      this.addParams.reinStatus = this.addParams.reinStatus + ''
      this.addParams.pubStatus = this.addParams.pubStatus + ''
      this.addParams.createBy = this.addParams.createBy + ''
      if (row.createBy + '' === '1') {
        this.groupView = true
      } else {
        this.groupView = false
      }
    },
    // 操作按钮点击事件
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'look':
          this.openLookProjDialog(row)
          break
        case 'edit':
          this.openEditProjDialog(row)
          break
        case 'delete':
          this.deleteProj(row)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          console.log('add')
          break
        case 'delete':
          console.log('delete')
          break
        default:
          break
      }
    },
    projSrcFormatter(row) {
      const projSrc = row.projSrc
      let ret = ''
      if (projSrc === 1) {
        ret = '权威机构'
      } else if (projSrc === 2) {
        ret = '漏洞验证'
      } else if (projSrc === 3) {
        ret = '测试基地'
      } else if (projSrc === 4) {
        ret = '专题漏洞'
      }
      return ret
    },
    reinStatusFormatter(row) {
      const reinStatus = row.reinStatus
      let ret = ''
      if (reinStatus === 1) {
        ret = '可行'
      } else if (reinStatus === 2) {
        ret = '不可行'
      }
      return ret
    },
    createByFormatter(row) {
      const createBy = row.createBy
      let ret = ''
      if (createBy === 1) {
        ret = '集团'
      } else if (createBy === 2) {
        ret = '本省'
      }
      return ret
    },
    // 跳转至加固方案列表
    toReinforceProjList() {
      this.$router.push({ path: '/loophole/vulnReinforce/reinforceProjList' })
    },
    // 查询加固省份
    getProvinceList() {
      this.$store.dispatch(this.provinceUrl, { dictName: 'firmProvince', dictService: 'scheme' }).then(resp => {
        this.provinceList = resp.result
      }).catch(
      )
    },
    // 下拉框改变事件
    showGroupView(val) {
      if (val === '1') {
        this.groupView = true
        this.addParamsRules.projId = [{ required: true, message: '请输入集团ID', trigger: 'blur' }]
        this.addParamsRules.sendTime = [{ required: true, message: '请选择下发时间', trigger: 'blur' }]
      } else {
        this.groupView = false
        this.addParams.projId = ''
        this.addParams.sendTime = ''
        this.addParamsRules.projId = []
        this.addParamsRules.sendTime = []
      }
    }

  }
}
</script>

<style scoped>
.el-select {
  width: 100%
}
</style>
