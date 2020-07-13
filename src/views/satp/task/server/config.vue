<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-card>
        <div class="satp-title">任务信息</div>
        <table class="satp-table-detail">
          <tr>
            <th>任务名称</th>
            <td colspan="5">{{ taskInfo.taskName }}</td>
          </tr>
          <tr>
            <th>任务编号</th>
            <td>{{ taskInfo.taskId }}</td>
            <th>任务类型</th>
            <td>{{ SATP_TaskTypeFormat(taskInfo.taskType) }}</td>
            <th>任务来源</th>
            <td>{{ SATP_TaskSrcFormat(taskInfo.taskSrc) }}</td>
          </tr>
          <tr>
            <th>责任人</th>
            <td>{{ taskInfo.taskOwnerName }}</td>
            <th>创建人</th>
            <td>{{ taskInfo.createLoginName }}</td>
            <th>创建时间</th>
            <td>{{ SATP_DateTimeFormat(taskInfo.createTime) }}</td>
          </tr>
          <tr>
            <th>任务状态</th>
            <td>{{ SATP_TaskStatusFormat(taskInfo.taskStatus) }}</td>
            <th>任务进度</th>
            <td>{{ taskInfo.taskProgress }}%</td>
            <th>要求完成时间</th>
            <td>{{ SATP_DateTimeFormat(taskInfo.closeTime) }}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="5">{{ taskInfo.taskDesc }}</td>
          </tr>
        </table>
        <el-tabs>
          <el-tab-pane label="检查范围">
            <div :style="panelHeight">
              <div style="text-align:left;margin-bottom:5px;">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAddTarget()">添加目标</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" @click="removeAsset()">移除目标</el-button>
                </el-button-group>
              </div>
              <satp-datagrid
                ref="assetGridDest"
                :url="d.url"
                idx
                :qparams="d.params"
                :columns="d.columns"
                :height="tableHeight"
                :pagesizes="pagesizes"
                checkbox
                class="satp-grid-mini"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="工具信息">
            <div :style="panelHeight">
              <div style="text-align:left;margin-bottom:5px;">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-plus" size="mini" @click="showToolDlg()">选择工具</el-button>
                  <el-button type="primary" icon="el-icon-delete" size="mini" @click="removeTool()">移除工具</el-button>
                </el-button-group>
              </div>
              <div>
                <satp-datagrid
                  ref="toolGridDest"
                  :url="f.url"
                  :qparams="f.params"
                  :columns="f.columns"
                  :height="tableHeight"
                  :pagesizes="pagesizes"
                  idx
                  checkbox
                  class="satp-grid-mini"
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="执行计划">
            <crontab ref="crontabHandle" />
          </el-tab-pane>
          <div style="text-align:right;">
            <el-button type="success" icon="el-icon-check" size="small" @click="configDone">配置完成</el-button>
          </div>
        </el-tabs>
      </el-card>
    </div>

    <div>

      <task-tool
        v-if="toolWinShow"
        :title="toolWinTitle"
        :url="toolUrl"
        :multiple="toolMultiple"
        :visible.sync="toolWinShow"
        :modal-append-to-body="false"
        :taskid="taskId"
        :chktype="itemType"
        @getToolInfo="getToolInfo"
      />
    </div>

    <div>
      <!--添加目标对话框-->
      <el-dialog
        title="添加目标"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleBeforeClose"
        class="satp-dlg"
        :close-on-click-modal="false"
      >
        <el-form
          ref="dataAddForm"
          :model="dataAddForm"
          :rules="dataAddrules"
          :label-position="labelPosition"
          label-width="100px"
          size="small"
          class="satp-form-label-top"
        >
          <el-form-item label="检测类型" prop="targetType">
            <el-radio-group v-model="dataAddForm.targetType" size="mini" @change="chgTargetType">
              <el-radio-button label="IP" />
              <el-radio-button label="URL" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="检测地址">
            <el-input v-model="dataAddForm.logicAddr" placeholder="检测地址" />
          </el-form-item>

          <div :style="{ display:dtlShow}">
            <el-form-item>
              <table>
                <tr>
                  <td style="width:33px">协议</td>
                  <td>
                    <el-select v-model="dataAddForm.protType" placeholder="任务来源">
                      <el-option v-for="item in protTypes" :key="item.value" :label="item.label" :value="item.value" size="small" />
                    </el-select>
                  </td>
                  <td style="width:33px">端口</td>
                  <td>
                    <el-input v-model="dataAddForm.port" placeholder="端口" size="small" />
                  </td>
                  <td style="width:33px">后缀</td>
                  <td>
                    <el-select v-model="dataAddForm.suffix" placeholder="后缀">
                      <el-option v-for="item in suffixs" :key="item.value" :label="item.label" :value="item.value" size="small" />
                    </el-select>
                  </td>
                </tr>
              </table>
            </el-form-item>
          </div>

          <el-form-item label="附加地址" prop="extraAddr">
            <el-input v-model="dataAddForm.extraAddr" placeholder="附加地址" />
          </el-form-item>

          <el-form-item label="备注" prop="taskDesc">
            <el-input v-model="dataAddForm.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="任务备注" />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="text" size="small" @click="closeAddDlg">取 消</el-button>
          <el-button type="primary" size="small" @click="saveTarget('dataAddForm')">确 定</el-button>
        </span>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagridx.vue'
import tasktool from '@/components/TaskConfig/tasktool.vue'
import crontab from '@/components/crontab/crontab.vue'
export default {
  name: 'SingleTaskConfig',
  components: { 'satp-datagrid': datagrid, 'task-tool': tasktool, 'crontab': crontab },
  data() {
    return {
      taskId: this.$route.params.taskId,
      taskType: '',
      itemType: '',
      loading: false,
      taskInfo: '',
      // 新增对话框
      dialogVisible: false,
      labelPosition: 'top',
      panelHeight: {
        height: 200 + 'px'
      },
      transBtnStyle: {
        textAlign: 'center',
        marginTop: '20px'
      },
      chkType: '合规项',
      // 统一高度
      tableHeight: 400,

      // 增加相关
      dataAddForm: {
        taskId: this.taskId,
        targetType: 'IP',
        logicAddr: '',
        protType: '',
        port: '',
        suffix: '',
        extraAddr: '',
        taskDesc: ''
      },
      dataAddrules: {
        logicAddr: [{ required: true, message: '请输入检测地址', trigger: 'blur' }]
      },
      dtlShow: 'block',

      staskSources: [{ value: '1', label: '省份' }],

      protTypes: [
        { value: 'http', label: 'http' },
        { value: 'https', label: 'https' }
      ],

      suffixs: [
        { value: '', label: '无' },
        { value: '.html', label: '.html' },
        { value: '.htm', label: '.htm' },
        { value: '.asp', label: '.asp' },
        { value: '.shtml', label: '.shtml' },
        { value: '.action', label: '.action' },
        { value: '.do', label: '.do' }
      ],

      d: {
        url: 'task/taskServerAssets',
        params: {
          taskId: this.$route.params.taskId
        },
        columns: [
          { type: 'text', label: '检测类型', prop: 'targetType', align: 'left', width: 80 },
          { type: 'text', label: '协议类型', prop: 'protType', align: 'left', width: 80 },
          { type: 'text', label: '地址', prop: 'logicAddr', align: 'left' },
          { type: 'text', label: '附加地址', prop: 'extraAddr', align: 'left' },
          { type: 'text', label: '端口', prop: 'port', align: 'left', width: 60 },
          { type: 'text', label: '后缀', prop: 'suffix', align: 'left', width: 60 }
        ]
      },
      f: {
        url: 'task/taskToolList',
        params: {
          taskId: this.$route.params.taskId
        },
        columns: [
          { type: 'text', label: '工具ID', prop: 'toolId', align: 'left', width: 80 },
          { type: 'text', label: '名称', prop: 'productName', align: 'left' },
          { type: 'text', label: '厂家', prop: 'companyName', align: 'left', width: 80 },
          { type: 'text', label: '地址', prop: 'toolAddr', align: 'left' }
        ]
      },
      pagesizes: [20, 30, 40],

      chkTypeColumns: [
        { type: 'text', label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
        { type: 'text', label: '合规项名称', prop: 'itemName' },
        { type: 'text', label: '合规项类型', prop: 'chkType', width: 100 }
      ],

      // 资产弹框相关变量
      assetWindowVisible: false,
      assetMultiple: true,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      assetWinTitle: '添加目标',
      assetUrl: 'task/loadAssetToSel', // 待选择资产

      // 工具弹窗相关变量
      toolWinShow: false,
      toolWinTitle: '',
      toolUrl: 'task/taskToolToSel',
      toolMultiple: true
    }
  },
  watch: {
    chkType(val) {
      if (val === '合规项') {
        console.log('合规项')
      } else if (val === '合规模板') {
        console.log('合规模板')
      }
    }
  },
  created() {
    const path = this.$route.path
    if (path.indexOf('base') !== -1) {
      this.taskType = 'base'
      this.itemType = 'BASE'
    } else if (path.indexOf('web') !== -1) {
      this.taskType = 'web'
      this.itemType = 'WEB'
    } else if (path.indexOf('weak') !== -1) {
      this.taskType = 'weak'
      this.itemType = 'WEAK'
    } else if (path.indexOf('content') !== -1) {
      this.taskType = 'content'
      this.itemType = 'CONTENT'
    } else if (path.indexOf('vuln') !== -1) {
      this.taskType = 'vuln'
      this.itemType = 'VULN'
    } else if (path.indexOf('app') !== -1) {
      this.taskType = 'app'
      this.itemType = 'APP'
    } else {
      this.taskType = 'error'
    }
    this.panelHeight.height = window.innerHeight - 175 + 'px'
    this.tableHeight = window.innerHeight - 280
    this.transBtnStyle.marginTop = (this.tableHeight / 2) + 'px'
  },
  mounted() {
    this.loadTaskInfo()
  },
  methods: {
    loadTaskInfo() {
      this.loading = true
      this.$store.dispatch('task/loadTask', { 'taskId': this.taskId }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.taskInfo = resp.task[0]
          this.loading = false
          this.taskType = this.taskInfo.taskType
        }
      }).catch(() => {
        this.loading = false
      })
    },
    showAddTarget() {
      this.dialogVisible = true
    },
    saveTarget(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const $self = this
          $self.dataAddForm.taskId = this.taskId
          const params = JSON.parse(JSON.stringify($self.dataAddForm))
          this.$store.dispatch('task/saveServerTarget', params).then(resp => {
            if (resp && resp.RET_CODE === '0') {
              this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
              this.dialogVisible = false
              this.resetTargetForm()
              this.$refs.assetGridDest.reload()
            }
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    handleBeforeClose() {
      this.dialogVisible = false
      this.resetTargetForm()
    },
    closeAddDlg() {
      this.dialogVisible = false
      this.resetTargetForm()
    },
    chgTargetType(label) {
      this.dataAddForm.targetType = label
      if (label === 'IP') {
        this.dtlShow = 'block'
      } else {
        this.dtlShow = 'none'
      }
    },
    resetTargetForm() {
      this.dataAddForm.targetType = 'IP'
      this.dataAddForm.logicAddr = ''
      this.dataAddForm.protType = ''
      this.dataAddForm.port = ''
      this.dataAddForm.suffix = ''
      this.dataAddForm.extraAddr = ''
      this.dataAddForm.taskDesc = ''
    },

    getAssetInfo(rows) {
      this.setAssetInfo(rows)
    },
    setAssetInfo(rows) {
      this.aboutAsset('task/saveAsset', rows)
    },
    removeAsset() {
      const row = this.$refs.assetGridDest.getSelectRows()
      let targetId = ''
      for (var i = 0; i < row.length; i++) {
        targetId += ',' + row[i].targetId
      }
      if (targetId.length > 0) {
        targetId = targetId.substring(1, targetId.length)
      } else {
        this.$alert('请选择目标', '提示', { confirmButtonText: '确定', type: 'warning' })
        return false
      }
      // ajax -> send remove request
      this.loading = true
      const params = { 'targetIds': targetId, 'taskId': this.taskId }
      this.$store.dispatch('task/removeServerTarget', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
          this.$refs.assetGridDest.reload()
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },

    showToolDlg() {
      this.toolWinShow = true
    },
    removeTool() {
      const selData = this.$refs.toolGridDest.getSelectRows()
      if (selData.length <= 0) { return }
      let jsonStr = '{"tools":['
      if (selData.length > 0) {
        for (var i = 0; i < selData.length; i++) {
          jsonStr = jsonStr + '{' +
          '"' + 'toolId' + '"' + ':' + '"' + selData[i]['toolId'] + '"' +
          '},'
        }
        jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      }
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.taskId }
      this.loading = true
      this.$store.dispatch('task/deleteTaskTool', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.toolGridDest.reload()
          this.toolWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.toolWinShow = false
        this.loading = false
      })
    },
    getToolInfo(selData) {
      if (selData.length <= 0) { return }
      let jsonStr = '{"tools":['
      if (selData.length > 0) {
        for (var i = 0; i < selData.length; i++) {
          jsonStr = jsonStr + '{' +
          '"' + 'toolId' + '"' + ':' + '"' + selData[i]['toolId'] + '"' + '},'
        }
        jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      }
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.taskId }
      this.loading = true
      this.$store.dispatch('task/saveTaskTool', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.toolGridDest.reload()
          this.toolWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.toolWinShow = false
        this.loading = false
      })
    },
    configDone() {
      let config = this.$refs.crontabHandle.getConfig()
      config = JSON.stringify(config)
      const params = { 'taskPlan': config, 'taskId': this.taskId }
      this.loading = true
      this.$store.dispatch('task/taskServerConfigDone', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
          this.loading = false

          this.$router.push({ path: '/satp-task/server/list/server' })
        }
      }).catch(() => {
        this.toolWinShow = false
        this.loading = false
      })
    }
  }
}
</script>
