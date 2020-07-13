<template>
  <div>
    <el-dialog
      title="请选择合规项"
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
            ref="common_taskitemgrid"
            :url="url"
            :qparams="params"
            :columns="columns"
            :rowkey="rowKey"
            :reservesel="true"
            :height="common_task_asset_grid_height"
            class="satp-grid-mini"
            checkbox
          />
        </div>
        <div style="text-align:right;">
          <el-button size="small" type="text" @click="closeWin">取消</el-button>
          <el-button size="small" type="primary" @click="getSelItemRows">确定</el-button>
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
        { label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类型', prop: 'chkType', width: 100 }
      ]
    } },
    multiple: { type: Boolean, default: true },
    taskid: { type: String, default: '' },
    chktype: { type: String, default: '' },
    datatype: { type: String, default: '' },
    chkmode: { type: String, default: '' }
  },
  data() {
    return {
      common_task_asset_grid_height: 400,
      params: { 'taskId': this.taskid, 'chkType': this.chktype, 'dataType': this.datatype, 'chkMode': this.chkmode },
      rowKey: 'assetId'
    }
  },
  mounted() {
    this.params = { 'taskId': this.taskid, 'chkType': this.chktype, 'dataType': this.datatype, 'chkMode': this.chkmode }
  },
  methods: {
    modalClose() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getSelItemRows() {
      const rows = this.$refs.common_taskitemgrid.getSelectRows()
      this.$emit('getItemInfo', rows)
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    closeWin() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    }
  }
}
</script>

