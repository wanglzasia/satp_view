<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="ruleForm" :model="formObj" :rules="formRule" label-width="100px" @submit.native.prevent>

            <el-col :span="12">
              <el-form-item label="任务名称" prop="taskName">
                <el-input v-model="formObj.taskName" placeholder="任务名称" :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扫描工具" prop="toolId">
                <el-input v-model="formObj.toolName" placeholder="扫描工具" :style="{width: '100%'}" readonly @click.prevent.native="dialogFormVisible=true" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="taskNote">
                <el-input v-model="formObj.taskNote" type="textarea" :rows="5" />
              </el-form-item>
            </el-col>

            <div>
              <satp-datagrid
                ref="specTaskAssetDag"
                :tabledata="tableData"
                :columns="columns"
                :toolbar="toolBar"
                idx
                border
                @operClick="operClick"
                @toolbarClick="toolbarClick"
              />
            </div>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="addTask()">确 定</el-button>
              <el-button @click="taskList()">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-dialog title="专项工具列表" :visible.sync="dialogFormVisible" width="800px" @close="dialogFormVisible=false">
          <satp-datagrid
            ref="toolDag"
            :url="toolUrl"
            :columns="toolColumns"
            checkbox
            border
          />
          <span slot="footer" class="dialog-footer">
            <el-button type="text" size="small" @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" size="small" @click="closeToolList()">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
    <asset-window
      v-if="assetWindowVisible"
      :title="title"
      :multiple="assetMultiple"
      :visible.sync="assetWindowVisible"
      :modal-append-to-body="false"
      @getAssetInfo="getAssetInfo"
    />
  </div>

</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
import AssetInfo from '@/components/Assetwindow/index.vue'
export default {
  name: 'SpecTaskList',
  components: { 'satp-datagrid': datagrid, 'asset-window': AssetInfo },
  props: [],
  data() {
    return {
      assetWindowVisible: false,
      assetMultiple: true,
      dialogFormVisible: false,
      title: '',
      params: {},
      formObj: {},
      formAttr: {},
      tableData: [],
      formRule: {
        taskName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        toolId: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      specTaskAssetDagUrl: 'specTool/specTaskList',
      toolUrl: 'specTool/specToolList',
      loading: false,
      toolTypeOptions: [
        {
          'label': '漏洞验证类',
          'value': '1'
        }, {
          'label': '测评类',
          'value': '2'
        }, {
          'label': '性能测试类',
          'value': '3'
        }, {
          'label': '安全测评类',
          'value': '4'
        }
      ],
      toolModeOptions: [{
        'label': '在线使用',
        'value': 1
      }, {
        'label': '离线使用',
        'value': 2
      }],
      columns: [
        { label: '资产名称', prop: 'assetName' },
        { label: 'IP/URL', prop: 'logicAddr' },
        { label: '资产类型', prop: 'assetTypeLabel' },
        { label: '归属组织', prop: 'orgName' },
        { label: '操作', prop: 'opt', align: 'center', actions: [{ title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete' }] }
      ],
      toolColumns: [
        { label: '工具名称', prop: 'toolName' },
        { label: '工具类型', prop: 'toolTypeName' },
        { label: '使用模式', prop: 'toolMode', formatter: this.toolModeFormatter },
        { label: '发布时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '发布人', prop: 'publicUserName' },
        { label: '工具简介', prop: 'toolInfo' },
        { label: '适用范围', prop: 'toolScop' },
        { label: '注意事项', prop: 'toolNote' }
      ],
      toolBar: [
        { label: '添加资产', prop: 'assetList', type: 'primary', icon: 'el-icon-s-order' }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    const toolId = this.$route.query.toolId
    const toolName = this.$route.query.toolName
    console.log(toolId)
    if (toolId != null) {
      this.$set(this.formObj, 'toolId', toolId)
      this.$set(this.formObj, 'toolName', toolName)
      this.$refs['ruleForm'].clearValidate('toolId')
    }
  },
  mounted() {},
  methods: {
    openToolList() {
      this.dialogFormVisible = true
    },
    closeToolList() {
      const rows = this.$refs.toolDag.getSelectRows()
      this.$set(this.formObj, 'toolId', rows[0].toolId)
      this.$set(this.formObj, 'toolName', rows[0].toolName)
      this.$refs['ruleForm'].clearValidate('toolId')
      this.dialogFormVisible = false
    },
    getAssetInfo(data) {
      this.$refs.specTaskAssetDag.setTableData(data)
      this.tableData = data
    },
    taskStatusFormatter(row) {
      const taskStatus = row.taskStatus
      if (taskStatus === '0') {
        return '草稿'
      }
      if (taskStatus === '1') {
        return '完成'
      }
      if (taskStatus === '2') {
        return '执行中'
      }
      if (taskStatus === '3') {
        return '异常'
      }
    },
    toolModeFormatter(row) {
      if (row.toolMode === 1) {
        return '在线使用'
      } else {
        return '离线使用'
      }
    },
    dateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      if (taskStatus === 0) {
        actions = [
          { title: '启动', prop: 'startTask', type: 'text', icon: 'el-icon-message-solid' }
        ]
      } else if (taskStatus === 1) {
        actions = [
          { title: '报告', prop: 'report', type: 'text', icon: 'el-icon-edit' }
        ]
      } else if (taskStatus === 2) {
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-edit' }
        ]
      }
      return actions
    },
    reloadDatagrid() {
      this.$refs['specTaskAssetDag'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'delete':
          this.delete(row)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'assetList':
          this.assetList()
          break
        default:
          break
      }
    },
    assetList() {
      this.assetWindowVisible = true
      this.assetMultiple = true
    },
    taskList() {
      this.$router.push({ path: '/satp-tool/specTool/taskList' })
    },
    addTask() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          const assets = JSON.stringify(this.tableData)
          if (this.tableData.length <= 0) {
            this.$alert('请配置资产')
          } else {
            this.$set(this.formObj, 'taskAssets', assets)
            this.$store.dispatch('specTool/addSpecTask', this.formObj).then(response => {
              this.$router.push({ path: '/satp-tool/specTool/taskList' })
            })
          }
        }
      })
    },
    delete(row) {
      this.tableData.splice(this.tableData.indexOf(row), 1)
      this.$refs.specTaskAssetDag.setTableData(this.tableData)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
