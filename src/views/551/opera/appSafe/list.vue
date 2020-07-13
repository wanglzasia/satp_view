<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="qparams"
          label-position="left"
          label-width="80px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="工单标题">
                <el-input v-model="qparams.oper_title" placeholder="工单标题" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="工单编号">
                <el-input v-model="qparams.oper_no" placeholder="工单编号" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="审批结果">
                <el-select v-model="qparams.status" placeholder="审批结果" clearable>
                  <el-option value="" label="全部" />
                  <el-option value="0" label="审批中" />
                  <el-option value="1" label="审批完成" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="应用负责人">
                <el-input v-model="qparams.resp_usr" placeholder="应用负责人" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="当前处理人">
                <el-input v-model="qparams.assignee" placeholder="当前处理人" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div class="satp-from-btngrp-std" style="width:inherit;float:inherit;">
                <el-button type="primary" icon="el-icon-search" size="small" @click="doSearch">查询</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <satp-datagrid
          ref="dataTable"
          :url="url"
          :qparams="qparams"
          :columns="columns"
          idx
          :height="tableHeight"
          border
          class="satp-grid-mid"
          @operClick="operClick"
        />
      </el-card>
    </div>

    <hisTrace-view
      v-if="taskTraceDialogVisible"
      :visible.sync="taskTraceDialogVisible"
      :proc-def-id="processDefinitionId"
      :proc-inst-id="processInstanceId"
    />
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
import hisTrace from '@/components/FlowTrace/hisTrace.vue'
export default {
  name: 'AppSafe',
  components: { 'satp-datagrid': datagrid, 'hisTrace-view': hisTrace },
  data() {
    return {
      tableHeight: window.innerHeight - 195,
      qparams: {
        oper_title: undefined,
        oper_no: undefined,
        status: undefined,
        resp_usr: undefined,
        assignee: undefined
      },
      url: 'opera/appSafeListData',
      columns: [
        { label: '工单名称', prop: 'oper_title' },
        { label: '任务编号', prop: 'oper_no', width: 140 },
        { label: '安全厂商负责人', prop: 'safe_name', width: 130 },
        { label: '安全管理员', prop: 'safety_name', width: 110 },
        { label: '发起时间', prop: 'create_time', width: 160, align: 'center' },
        { label: '状态', prop: 'status', width: 100, align: 'center', formatter: this.statFormatter },
        {
          label: '操作',
          align: 'center',
          width: 140,
          actions: [
            { label: '审批流程', prop: 'cha', type: 'primary' }
          ]
        }
      ],
      taskTraceDialogVisible: false,
      processDefinitionId: undefined,
      processInstanceId: undefined
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
  },
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'cha':
          this.showView(row)
          break
        default:
          break
      }
    },
    showView(obj) {
      this.processDefinitionId = obj.proc_inst_defid_
      this.processInstanceId = obj.proc_inst_id_
      this.taskTraceDialogVisible = true
    },
    doSearch() {
      this.$refs.dataTable.query(this.qparams)
      // this.getListData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.elePagination.pageNum = val
      this.getListData()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.getListData()
    },
    statFormatter(row) {
      const status = row.status
      let ret = ''
      if (status === '0') {
        ret = '审批中'
      } else {
        ret = '已完成'
      }
      return ret
    }
  }
}
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
