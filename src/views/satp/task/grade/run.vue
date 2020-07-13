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

export default {
  components: { 'satp-treegrid': treegrid },

  data() {
    return {
      loading: false,
      parentTaskId: this.$route.params.taskId,
      taskId: this.$route.query.taskId,
      taskTreeGrid: {
        url: 'task/taskList',
        params: {
          parentTaskId: this.$route.params.taskId,
          taskType: 'grade',
          taskOwner: this.$store.getters.user.userId,
          page: true
        },
        columns: [
          { type: 'text', label: '任务名称', prop: 'taskName', align: 'left' },
          { type: 'text', label: '编号', prop: 'taskId', width: 60, align: 'center' },
          { type: 'text', label: '来源', prop: 'taskSrc', formatter: this.taskSrcFormatter, width: 60, align: 'center' },
          { type: 'text', label: '状态', prop: 'taskStatus', align: 'center', width: 80, formatter: this.statusFormatter },
          { type: 'text', label: '创建时间', prop: 'createTime', align: 'center', width: 180, formatter: this.createTimeFormatter },
          { type: 'text', label: '启动时间', prop: 'startTime', align: 'center', width: 180, formatter: this.startTimeFormatter },
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
    taskGridClick(data) {
      const { row, prop } = data
      const params = { 'taskId': row.taskId }

      switch (prop) {
        case 'start':
          // 先更新状态为 进行中
          // 在跳转
          this.loading = true
          this.$store.dispatch('task/startGradeTask', params).then(resp => {
            if (resp && resp.RET_CODE === '0') {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
          this.$router.push({ path: '/satp-task/grade/paper/' + row.taskId + '/' + this.taskId })
          break
        case 'work':
          this.$router.push({ path: '/satp-task/grade/paper/' + row.taskId + '/' + this.taskId })
          break
        case 'detail':
          this.$router.push({ path: '/satp-task/grade/detail/' + row.taskId })
          break
        default:
          break
      }
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      // const parentTaskId = row.parentTaskId
      if (row.hasChildren === 0) {
        if (taskStatus === 2) { // 执行中,
          actions = [
            { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-monitor' },
            { title: '填报', prop: 'work', type: 'text', icon: 'el-icon-s-claim' }
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
        taskType: 'grade',
        taskOwner: this.$store.getters.user.userId,
        page: false
      }
      this.$store.dispatch($self.taskTreeGrid.url, params).then(resp => {
        resolve(resp.rows)
      })
    },
    createTimeFormatter(row) {
      return this.dateTimeFormat(row.createTime)
    },
    startTimeFormatter(row) {
      return this.dateTimeFormat(row.startTime)
    }
  }

}
</script>
