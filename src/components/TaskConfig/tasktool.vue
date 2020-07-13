<template>
  <div>
    <el-dialog
      title="请选择工具"
      :visible.sync="visible"
      :before-close="modalClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      width="70%"
    >

      <el-container>
        <el-header>
          <div>Hearder</div>
        </el-header>

        <div>
          <satp-datagrid
            ref="common_tasktoolgrid"
            :url="url"
            :qparams="params"
            :columns="columns"
            :rowkey="rowKey"
            :reservesel="true"
            :height="common_task_asset_grid_height"
            class="satp-grid-mini"
            checkbox
          />
          <div style="text-align:right;">
            <el-button size="small" type="text" @click="closeWin">取消</el-button>
            <el-button size="small" type="primary" @click="getSelItemRows">确定</el-button>
          </div>
        </div>
      </el-container>

    </el-dialog>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  props: {
    visible: { type: Boolean, default: false },
    url: { type: String, default: '' },
    columns: { type: Array, default() {
      return [
        { label: '工具ID', prop: 'toolId', align: 'left', width: 80 },
        { label: '名称', prop: 'productName', align: 'left' },
        { label: '厂家', prop: 'companyName', align: 'left', width: 80 },
        { label: '地址', prop: 'toolAddr', align: 'left' }
      ]
    } },
    multiple: { type: Boolean, default: true },
    taskid: { type: String, default: '' },
    chktype: { type: String, default: '' }
  },
  data() {
    return {
      common_task_asset_grid_height: 400,
      params: { 'taskId': this.taskid, 'chkType': this.chktype },
      rowKey: 'assetId'
    }
  },
  mounted() {
    this.params = { 'taskId': this.taskid, 'chkType': this.chktype }
  },
  methods: {
    modalClose() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getSelItemRows() {
      const rows = this.$refs.common_tasktoolgrid.getSelectRows()
      this.$emit('getToolInfo', rows)
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    closeWin() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    }
  }
}
</script>

