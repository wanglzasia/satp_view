<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div :style="panelHeight">
            <table class="satp-table-detail">
              <tr>
                <th>任务名称</th>
                <td colspan="5">{{ taskInfo.taskName }}</td>
              </tr>
              <tr>
                <th>任务编号</th>
                <td>{{ taskId }}</td>
                <th>任务类型</th>
                <td>综合检测任务</td>
                <th>任务来源</th>
                <td>{{ taskInfo.taskSrc }}</td>
              </tr>
              <tr>
                <th>责任人</th>
                <td>{{ taskInfo.taskOwnerName }}</td>
                <th>创建人</th>
                <td>{{ taskInfo.createLoginName }}</td>
                <th>创建时间</th>
                <td>{{ taskInfo.createTime }}</td>
              </tr>
              <tr>
                <th>任务状态</th>
                <td>{{ taskInfo.taskStatus }}</td>
                <th>任务进度</th>
                <td>{{ taskInfo.taskProgress }}%</td>
                <th>要求完成时间</th>
                <td>{{ taskInfo.closeTime }}</td>
              </tr>
              <tr>
                <th>备注</th>
                <td colspan="5">{{ taskInfo.taskDesc }}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检查项">
          <div :style="panelHeight">
            <el-row>
              <el-col :span="12">
                <div style="text-align:left;">
                  <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="showItemDlg()">选择</el-button>
                    <el-button type="primary" icon="el-icon-delete" size="mini" @click="removeItem()">移除</el-button>
                  </el-button-group>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align:right;margin-bottom:5px;">
                  <el-radio-group v-model="chkType" size="mini">
                    <el-radio-button label="合规项" />
                    <el-radio-button label="合规模板" />
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <div>
              <el-row>
                <satp-datagrid
                  ref="itemGridDest"
                  :url="b.url"
                  :qparams="b.params"
                  :columns="chkTypeColumns"
                  :height="tableHeight"
                  :pagesizes="pagesizes"
                  checkbox
                  class="satp-grid-mini"
                />
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检查范围">
          <div :style="panelHeight">
            <div style="text-align:left;margin-bottom:5px;">
              <el-button-group>
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="showAssetDlg()">选择资产</el-button>
                <el-button type="primary" icon="el-icon-delete" size="mini" @click="removeAsset()">移除资产</el-button>
              </el-button-group>
            </div>
            <satp-datagrid
              ref="assetGridDest"
              :url="d.url"
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
                checkbox
                class="satp-grid-mini"
              />
            </div>
          </div>
        </el-tab-pane>
        <div style="text-align:right;">
          <el-button type="success" icon="el-icon-check" size="small" @click="configDone">配置完成</el-button>
        </div>
      </el-tabs>
    </div>

    <div>
      <task-asset
        v-if="assetWindowVisible"
        :title="assetWinTitle"
        :url="assetUrl"
        :multiple="assetMultiple"
        :visible.sync="assetWindowVisible"
        :modal-append-to-body="false"
        :taskid="taskId"
        @getAssetInfo="getAssetInfo"
      />

      <task-item
        v-if="itemWinShow"
        :title="itemWinTitle"
        :url="itemUrl"
        :multiple="itemMultiple"
        :visible.sync="itemWinShow"
        :modal-append-to-body="false"
        :taskid="taskId"
        chktype="GRADE"
        @getItemInfo="getItemInfo"
      />
      <!--等保只做基线检查-->
      <task-tool
        v-if="toolWinShow"
        :title="toolWinTitle"
        :url="toolUrl"
        :multiple="toolMultiple"
        :visible.sync="toolWinShow"
        :modal-append-to-body="false"
        :taskid="taskId"
        chktype=""
        @getToolInfo="getToolInfo"
      />
    </div>

  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagrid.vue'
import taskasset from '@/components/TaskConfig/taskasset.vue'
import taskitem from '@/components/TaskConfig/taskitem.vue'
import tasktool from '@/components/TaskConfig/tasktool.vue'

// import tasktmpl from '@/components/TaskConfig/tasktmpl.vue'

export default {
  name: 'InteaskConfig',
  components: { 'satp-datagrid': datagrid, 'task-asset': taskasset, 'task-item': taskitem, 'task-tool': tasktool },
  data() {
    return {
      taskInfo: '',
      taskId: this.$route.params.taskId,
      taskType: 'grade',
      itemType: 'GRADE',
      loading: false,
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
      b: {
        url: 'task/taskItemList',
        params: {
          taskId: this.$route.params.taskId
        }
      },
      d: {
        url: 'task/loadTaskAsset',
        params: {
          taskId: this.$route.params.taskId
        },
        columns: [
          { label: '资产ID', prop: 'assetId', align: 'left', width: 80 },
          { label: '名称', prop: 'assetName', align: 'left' },
          { label: '地址', prop: 'logicAddr', align: 'left' },
          { label: '资产类型', prop: 'typeName', align: 'left' },
          { label: '归属', prop: 'orgName', align: 'left' },
          { label: '安全员', prop: 'secAdmName', align: 'left' }

        ]
      },
      f: {
        url: 'task/taskToolList',
        params: {
          taskId: this.$route.params.taskId
        },
        columns: [
          { label: '工具ID', prop: 'toolId', align: 'left', width: 80 },
          { label: '名称', prop: 'productName', align: 'left' },
          { label: '厂家', prop: 'companyName', align: 'left', width: 80 },
          { label: '地址', prop: 'toolAddr', align: 'left' }
        ]
      },
      pagesizes: [20, 30, 40],

      chkTypeColumns: [
        { label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类型', prop: 'chkType', width: 100 }
      ],

      // 资产弹框相关变量
      assetWindowVisible: false,
      assetMultiple: true,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      assetWinTitle: '请选择资产',
      assetUrl: 'task/loadAssetToSel', // 待选择资产

      // 合规项弹窗相关变量
      itemWinShow: false,
      itemWinTitle: '',
      itemMultiple: true,
      itemUrl: 'task/itemList',

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
    this.taskType = 'inte'
    this.panelHeight.height = window.innerHeight - 175 + 'px'
    this.tableHeight = window.innerHeight - 280
    this.transBtnStyle.marginTop = (this.tableHeight / 2) + 'px'
  },
  mounted() {
    this.loadTaskInfo()
  },
  methods: {
    toRight() {

    },
    toLeft() {

    },
    showAssetDlg() {
      this.assetWindowVisible = true
      this.assetMultiple = true
    },
    getAssetInfo(rows) {
      this.setAssetInfo(rows)
    },
    setAssetInfo(rows) {
      this.aboutAsset('task/saveAsset', rows)
    },
    removeAsset() {
      const rows = this.$refs.assetGridDest.getSelectRows()
      this.aboutAsset('task/deleteTaskAsset', rows)
    },
    aboutAsset(url, selData) {
      if (selData.length <= 0) { return }
      let jsonStr = '{"asset":['
      if (selData.length > 0) {
        for (var i = 0; i < selData.length; i++) {
          jsonStr = jsonStr + '{' +
          '"' + 'assetId' + '"' + ':' + '"' + selData[i]['assetId'] + '"' +
          ',"' + 'ip' + '"' + ':' + '"' + selData[i]['logicAddr'] + '"' +
           ',"' + 'assetType' + '"' + ':' + '"' + selData[i]['assetType'] + '"' +
          '},'
        }
        jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      }
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.taskId }
      this.loading = true
      this.$store.dispatch(url, params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.assetGridDest.reload()
          this.dialogVisible = false
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    showItemDlg() {
      this.itemWinShow = true
    },
    removeItem() {
      let jsonStr = ''
      const selData = this.$refs.itemGridDest.getSelectRows()
      if (selData.length <= 0) {
        return
      }
      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.taskId }
      this.loading = true

      this.$store.dispatch('task/deleteTaskItem', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.itemGridDest.reload()
          this.itemWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.itemWinShow = false
        this.loading = false
      })
    },
    getItemInfo(selData) {
      let jsonStr = ''
      if (selData.length <= 0) {
        return
      }
      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'

      const params = { 'ARR': jsonStr, 'taskId': this.taskId }
      this.loading = true
      this.$store.dispatch('task/saveTaskItem', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.itemGridDest.reload()
          this.itemWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.itemWinShow = false
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
    loadTaskInfo() {
      this.loading = true
      this.$store.dispatch('task/loadTask', { 'taskId': this.taskId }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.taskInfo = resp.task[0]
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    configDone() {
      this.loading = true
      const params = { 'taskId': this.taskId, 'chkType': '' }
      if (this.chkType === '合规项') {
        params.chkType = 'item'
      } else if (this.chkType === '模板') {
        params.chkType = 'tmpl'
      }
      this.$store.dispatch('task/gradeConfigDone', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.loading = false
          this.$router.push({ path: '/satp-task/grade/list/grade' })
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
