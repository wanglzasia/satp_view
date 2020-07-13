
<template>
  <div v-loading="loading">
    <div>
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
          <el-tabs v-model="activeName">
            <el-tab-pane label="检查项" name="second">
              <!--检查项-->
              <div>
                <satp-datagrid
                  ref="task-item-grid"
                  :url="item.url"
                  :qparams="item.params"
                  :columns="item.columns"
                  :height="defaultHeight"
                  class="satp-grid-mini"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="检查范围" name="third">

              <div>
                <satp-datagrid
                  ref="task-asset-grid"
                  :url="asset.url"
                  :qparams="asset.params"
                  :columns="asset.columns"
                  :height="defaultHeight"
                  class="satp-grid-mini"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="检查工具" name="fourth">

              <!--检查工具-->
              <div>
                <satp-datagrid
                  ref="task-tool-grid"
                  :url="tool.url"
                  :qparams="tool.params"
                  :columns="tool.columns"
                  :height="defaultHeight"
                  class="satp-grid-mini"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="text-align:right;margin-top:20px;">
            <el-button type="success" size="small" icon="el-icon-back" @click="toList">返回</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagridx.vue'
export default {
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      activeName: 'second',
      taskId: this.$route.params.taskId,
      loading: false,
      taskInfo: '',
      defaultHeight: 290,
      // 合规项
      item: {
        url: 'task/taskItemList',
        params: { 'taskId': this.taskId },
        columns: [
          { type: 'text', label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
          { type: 'text', label: '合规项名称', prop: 'itemName' },
          { type: 'text', label: '合规项类型', prop: 'chkType', width: 100 }
        ]
      },
      // 资产
      asset: {
        url: 'task/loadTaskAsset',
        params: { 'taskId': this.taskId },
        columns: [
          { type: 'text', label: '资产ID', prop: 'assetId' },
          { type: 'text', label: '资产名称', prop: 'assetName' },
          { type: 'text', label: '资产地址', prop: 'logicAddr' },
          { type: 'text', label: '资产类型', prop: 'typeName' },
          { type: 'text', label: '归属组织', prop: 'orgName' },
          { type: 'text', label: '安全员', prop: 'secAdmName' }
        ]
      },
      // 工具
      tool: {
        url: 'task/taskToolList',
        params: { 'taskId': this.taskId },
        columns: [
          { type: 'text', label: '工具ID', prop: 'toolId', align: 'left', width: 80 },
          { type: 'text', label: '名称', prop: 'productName', align: 'left' },
          { type: 'text', label: '厂家', prop: 'companyName', align: 'left', width: 80 },
          { type: 'text', label: '地址', prop: 'toolAddr', align: 'left' }
        ]
      }
    }
  },
  mounted() {
    this.item.params.taskId = this.taskId
    this.asset.params.taskId = this.taskId
    this.tool.params.taskId = this.taskId
    this.loadTaskInfo()
  },
  methods: {
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
    toList() {
      this.$router.push({ path: '/satp-task/grade/list/grade' })
    }
  }
}
</script>
