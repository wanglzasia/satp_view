<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-card>
        <satp-treegrid
          ref="taskTreeGrid"
          :url="taskTreeGrid.url"
          row-key="taskId"
          :qparams="taskTreeGrid.params"
          :columns="taskTreeGrid.columns"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @operClick="taskGridClick"
          @loadSubList="loadSubList"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import treegrid from '@/components/datagrid/treegridx'
import store from '@/store'
export default {
  components: { 'satp-treegrid': treegrid },

  data() {
    return {
      loading: false,
      parentTaskId: this.$route.params.taskId,
      taskTreeGrid: {
        url: 'task/taskList',
        params: {
          parentTaskId: this.$route.params.taskId,
          taskType: 'inte',
          taskOwner: store.getters.user.userId,
          page: true
        },
        columns: [
          { type: 'text', label: '任务名称', prop: 'taskName', align: 'left' },
          { type: 'text', label: '编号', prop: 'taskId', width: 60, align: 'center' },
          { type: 'text', label: '来源', prop: 'taskSrc', formatter: this.taskSrcFormatter, width: 60, align: 'center' },
          { type: 'text', label: '类型', prop: 'chkMode', formatter: this.chkModeFormatter, width: 60, align: 'center' },
          { type: 'text', label: '状态', prop: 'taskStatus', align: 'center', width: 80, formatter: this.statusFormatter },
          { type: 'text', label: '启动时间', prop: 'startTime', align: 'center', width: 180 },
          { type: 'text', label: '创建时间', prop: 'createTime', align: 'center', width: 180 },
          { type: 'text', label: '责任人', prop: 'taskOwnerName', align: 'center', width: 80 },
          { type: 'text', label: '创建人', prop: 'createLoginName', align: 'center', width: 80 },
          { type: 'action',
            label: '操作',
            align: 'center',
            width: 120,
            actions: [],
            formatter: this.operFormatter
          }
        ]
      }
    }
  },
  methods: {
    taskGridClick(row) {

    },
    chkModeFormatter(row) {
      const chkMode = row.chkMode
      if (chkMode === 2) {
        return '手动'
      } else {
        return '自动'
      }
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      // const parentTaskId = row.parentTaskId

      if (taskStatus === 2) { // 执行中,
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '追踪', prop: 'trace', type: 'text', icon: 'el-icon-location-outline' },
          { title: '停止', prop: 'stop', type: 'text', icon: 'el-icon-switch-button', popconfirm: '确定停止此任务' }
        ]
      } else if (taskStatus === 1) { // 已完成,
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '报告', prop: 'report', type: 'text', icon: 'el-icon-data-analysis' }
        ]
      } else if (taskStatus === 21) { // 待执行,按钮不在页面展示,在工作流中
        actions = [
          { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
          { title: '启动', prop: 'start', type: 'text', icon: 'el-icon-caret-right', popconfirm: '确定启动此任务' }
        ]
      }
      return actions
    },
    statusFormatter(row) {
      const status = row.taskStatus
      if (status === 0) {
        return '草稿'
      } else if (status === 1) {
        return '完成'
      } else if (status === 2) {
        return '执行中'
      } else if (status === 20) {
        return '拆分中'
      } else if (status === 21) {
        return '待执行'
      } else {
        return status
      }
    },
    taskSrcFormatter(row) {
      const taskSrc = row.taskSrc
      if (taskSrc === 1) {
        return '省份'
      } else if (taskSrc === 2) {
        return '集团'
      }
      return ''
    },
    // 加载子任务列表
    loadSubList(tree, treeNode, resolve) {
      const $self = this
      const params = {
        parentTaskId: tree.taskId,
        taskType: 'inte',
        page: false
      }
      this.$store.dispatch($self.taskTreeGrid.url, params).then(resp => {
        resolve(resp.rows)
      })
    }
  }
}
</script>
