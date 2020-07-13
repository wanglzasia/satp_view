<template>
  <div>
    <div class="app-container">
      <el-card>

        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="a.params"
          :columns="columns"
          :toolbar="toolbar"
          checkbox
          idx
          title="表格的标题,默认为空,高度自适应"
          border
          :pagesizes="a.pSizes"
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />

        <satp-datagrid
          ref="datagridTest1"
          :url="url"
          :qparams="b.params"
          :columns="columns"
          :toolbar="toolbar"
          checkbox
          idx
          :height="test1Height"
          title="mini表格 class='satp-grid-mini' 固定高度:height='test1Height',height可选,默认自适应高度 分页记住勾选 rowkey='rowKey' reservesel='true'"
          border
          class="satp-grid-mini"
          :rowkey="rowKey"
          :reservesel="true"
          :pagesizes="b.pSizes"
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />

        <satp-datagrid
          ref="datagridTest2"
          :qparams="c.params"
          :columns="columns"
          checkbox
          idx
          :height="test1Height"
          title="表格传json数据"
          :tabledata="tableData"
          border
          class="satp-grid-mini"
          :pagesizes="c.pSizes"
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />
        <el-button @click="getSelData()">Test</el-button>
      </el-card></div>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'InteTaskList',
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      rowKey: 'taskId',
      a: {
        pSizes: [10, 15, 20],
        params: {
          id: 0,
          parentTaskId: 0,
          page: true,
          taskType: 'inte'
        }
      },
      b: {
        pSizes: [5, 10, 15, 20],
        params: {
          id: 0,
          parentTaskId: 0,
          page: true,
          taskType: 'inte'
        }
      },
      c: {
        pSizes: [5, 10, 15],
        params: {
          id: 0,
          parentTaskId: 0,
          page: true,
          taskType: 'inte'
        }
      },

      test1Height: 300,
      url: 'task/taskList',
      tableData: [{ 'taskSrc': 1, 'parentTaskId': '0', 'taskOwner': '普通员工', 'hasChildren': 1, 'isReport': 1, 'createLogin': '2', 'isActive': 'Y', 'parentId': '0', 'rpt_status': 0, 'taskDesc': '1231', 'taskType': 'inte', 'createTime': '2020-04-09T08:33:51.000+0000', 'createLoginName': '普通员工', 'hasChild': 'Y', 'closeTime': '2020-04-09T08:33:44.000+0000', 'taskName': '测试任务12', 'taskProgress': 0, 'taskId': '221', 'taskStatus': 0 }, { 'taskSrc': 1, 'parentTaskId': '0', 'taskOwner': '黑龙江测试用户', 'hasChildren': 1, 'isReport': 1, 'createLogin': '2', 'isActive': 'Y', 'parentId': '0', 'rpt_status': 0, 'taskDesc': '任务11', 'taskType': 'inte', 'createTime': '2020-04-06T11:35:48.000+0000', 'createLoginName': '普通员工', 'hasChild': 'Y', 'closeTime': '2020-04-15T16:00:00.000+0000', 'taskName': '任务名称11', 'taskProgress': 100, 'taskId': '220', 'taskStatus': 0 }, { 'taskSrc': 1, 'parentTaskId': '0', 'taskOwner': '普通员工', 'hasChildren': 0, 'isReport': 1, 'createLogin': '2', 'isActive': 'Y', 'parentId': '0', 'rpt_status': 0, 'taskDesc': '任务10', 'taskType': 'inte', 'createTime': '2020-04-06T11:35:35.000+0000', 'createLoginName': '普通员工', 'hasChild': 'N', 'closeTime': '2020-04-23T16:00:00.000+0000', 'taskName': '任务名称10', 'taskProgress': 100, 'taskId': '219', 'taskStatus': 0 }, { 'taskSrc': 1, 'parentTaskId': '0', 'taskOwner': '普通员工', 'hasChildren': 0, 'isReport': 1, 'createLogin': '2', 'isActive': 'Y', 'parentId': '0', 'rpt_status': 0, 'taskDesc': '任务9', 'taskType': 'inte', 'createTime': '2020-04-06T11:35:19.000+0000', 'createLoginName': '普通员工', 'hasChild': 'N', 'closeTime': '2020-04-13T16:00:00.000+0000', 'taskName': '任务名称9', 'taskProgress': 90, 'taskId': '218', 'taskStatus': 0 }, { 'taskSrc': 1, 'parentTaskId': '0', 'taskOwner': '管理员', 'hasChildren': 0, 'isReport': 1, 'createLogin': '2', 'isActive': 'Y', 'parentId': '0', 'rpt_status': 0, 'taskDesc': '任务8', 'taskType': 'inte', 'createTime': '2020-04-06T11:35:00.000+0000', 'createLoginName': '普通员工', 'hasChild': 'N', 'closeTime': '2020-04-14T16:00:00.000+0000', 'taskName': '任务名称8', 'taskProgress': 80, 'taskId': '217', 'taskStatus': 0 }],
      columns: [
        { label: '任务名称', prop: 'taskName', width: 120, align: 'left', actions: [{ prop: 'detail', type: 'text', link: 'taskName' }] },
        { label: '任务编号', prop: 'taskId' },
        { label: '进度', prop: 'taskProgress', progress: true, align: 'center' },
        { label: '父节点', prop: 'hasChild', align: 'center' },
        { label: '动态按钮', prop: 'taskStatus', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 300,
          actions: [
            { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit', popconfirm: '确认修改这条记录?' },
            { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' },
            { title: '设置', prop: 'delete', type: 'text', icon: 'el-icon-setting', popconfirm: '确认设置这条记录?' },
            { title: '修改', prop: 'detail', type: 'text', icon: 'el-icon-edit' }
          ]
        }
      ],
      toolbar: [
        { label: '新增', prop: 'add', type: 'primary', icon: 'el-icon-plus' },
        { label: '删除多行', prop: 'delete', type: 'danger', icon: 'el-icon-delete', usableAfterSelect: true }
      ]
    }
  },
  methods: {
    operClick(data) {
      const { row, prop } = data
      const taskId = row.taskId
      console.log(taskId)
      switch (prop) {
        case 'edit':
          console.log('edit')
          break
        case 'delete':
          console.log('delete')
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows.taskId)
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

    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },
    testFormatter(row) {
      const hasChild = row.hasChild
      let ret = ''
      if (hasChild === 'Y') {
        ret = '<i class="el-icon-loading"></i>'
      } else {
        ret = '<i class="el-icon-goods"></i>'
      }
      return ret
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.taskStatus
      if (taskStatus === 0) {
        actions = [
          { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit' },
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
          { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
        ]
      } else {
        actions = [
          { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' },
          { title: '修改', prop: 'delete', type: 'text', icon: 'el-icon-edit' }
        ]
      }
      return actions
    },
    getSelData() {
      const selectRows = this.$refs.datagridTest2.getSelectRows()
      console.log(selectRows)
    }
  }

}
</script>
