<template>
  <div>
    <div class="app-container">
      <el-card>
        <div style="text-align:center;font-size:22px;">{{ taskInfo.taskName }}报告</div>

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
            <td>应用管理地址探测</td>
            <th>任务来源</th>
            <td>{{ taskInfo.taskSrc }}</td>
          </tr>
          <tr>
            <th>责任人</th>
            <td>{{ taskInfo.taskOwnerName }}</td>
            <th>创建人</th>
            <td>{{ taskInfo.createLoginName }}</td>
            <th>创建时间</th>
            <td>{{ dateTimeFormat(taskInfo.createTime) }}</td>
          </tr>
          <tr>
            <th>任务状态</th>
            <td>{{ taskInfo.taskStatus }}</td>
            <th>任务进度</th>
            <td>{{ taskInfo.taskProgress }}%</td>
            <th>要求完成时间</th>
            <td>{{ dateTimeFormat(taskInfo.closeTime) }}</td>
          </tr>
          <tr>
            <th>执行计划</th>
            <td colspan="5">{{ taskPlan }}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="5">{{ taskInfo.taskDesc }}</td>
          </tr>
        </table>
        <el-tabs>
          <el-tab-pane label="检查范围">
            <div>
              <satp-datagrid
                ref="assetGridDest"
                :url="d.url"
                idx
                :qparams="d.params"
                :columns="d.columns"
                :height="tableHeight"
                :pagesizes="pagesizes"
                class="satp-grid-mini"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="工具信息">
            <div>
              <satp-datagrid
                ref="toolGridDest"
                :url="f.url"
                :qparams="f.params"
                :columns="f.columns"
                :height="tableHeight"
                :pagesizes="pagesizes"
                idx
                class="satp-grid-mini"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagridx.vue'
export default {
  name: 'ServerTaskDetail',
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      taskId: this.$route.params.taskId,

      labelPosition: 'top',
      panelHeight: {
        height: 200 + 'px'
      },

      taskInfo: '',
      taskPlan: '',
      taskSummary: '',

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
      pagesizes: [10, 20, 40]
    }
  },
  created() {
    // this.panelHeight.height = window.innerHeight - 175 + 'px'
    this.tableHeight = window.innerHeight - 400
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
          this.taskPlan = this.parserTaskPlan(resp.taskPlan)
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    toList() {
      this.$router.push({ path: '/satp-task/server/list/server' })
    }

  }
}
</script>
