<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-page-header @back="goBack" />
        <el-form
          ref="queryForm"
          :model="params"
          size="small"
          label-position="left"
          label-width="70px"
          class="satp-form-inline"
          @submit.native.prevent
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="任务名称">
                <el-input v-model="params.taskName" placeholder="任务名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工具类型">
                <el-select v-model="params.toolType" placeholder="工具类型" clearable>
                  <el-option
                    v-for="(item, index) in toolTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用模式" prop="publicUser">
                <el-select v-model="params.toolMode" clearable>
                  <el-option
                    v-for="(item, index) in toolModeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button size="small" icon="el-icon-search" type="primary" @click="reloadDatagrid()">查询</el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="addTask()">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <satp-datagrid
            ref="specTaskDag"
            :url="specTaskUrl"
            :qparams="params"
            :columns="columns"
            idx
            border
            @operClick="operClick"
          />
        </div>
      </el-card>
    </div>
  </div>

</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'SpecTaskList',
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      params: {},
      formObj: {},
      formAttr: {},
      fileList: [],
      specTaskUrl: 'specTool/specTaskList',
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
        { label: '任务名称', prop: 'taskName' },
        { label: '工具名称', prop: 'toolName' },
        { label: '创建时间', prop: 'createTime', formatter: this.createTimeFormatter },
        { label: '开始时间', prop: 'startTime', formatter: this.startTimeFormatter },
        { label: '结束时间', prop: 'endTime', formatter: this.endTimeFormatter },
        { label: '任务状态', prop: 'taskStatus', formatter: this.taskStatusFormatter },
        { label: '任务发起人', prop: 'opLoginName' },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      addTask() {
        this.$router.push({ path: '/satp-tool/specTool/addTask' })
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    taskStatusFormatter(row) {
      const taskStatus = row.taskStatus
      if (taskStatus === 0) {
        return '草稿'
      }
      if (taskStatus === 1) {
        return '完成'
      }
      if (taskStatus === 2) {
        return '执行中'
      }
      if (taskStatus === 3) {
        return '异常'
      }
    },
    createTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    startTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.startTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    endTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.endTime
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
          { label: '启动', prop: 'startTask', type: 'primary', icon: 'el-icon-caret-right', popconfirm: '确认启动任务?' }
        ]
      } else if (taskStatus === 1) {
        actions = [
          { label: '报告', prop: 'report', type: 'primary', icon: 'el-icon-s-data' }
        ]
      } else if (taskStatus === 2) {
        actions = [
          { label: '详情', prop: 'detail', type: 'primary', icon: 'el-icon-menu' }
        ]
      }
      return actions
    },
    reloadDatagrid() {
      this.$refs['specTaskDag'].reload()
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'startTask':
          this.startTask(row.taskId)
          break
        case 'report':
          this.report(row.taskId)
          break
        case 'detail':
          this.detail(row.taskId)
          break
        default:
          break
      }
    },
    report(taskId) {
      this.$router.push({ path: '/satp-tool/specTool/taskReport', query: { 'taskId': taskId }})
    },
    startTask(taskId) {
      this.$store.dispatch('specTool/startTask', { 'taskId': taskId }).then(response => {
        this.$message({
          message: `操作成功！`,
          type: 'success'
        })
        this.reloadDatagrid()
      }).catch(() => {})
    },
    detail(taskId) {

    },
    goBack() {
      this.$router.push({ path: '/satp-tool/specTool/toolList' })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
