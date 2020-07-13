<template>
  <div>
    <el-dialog
      title="请选择资产"
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
            ref="common_taskassetgrid"
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
            <el-button size="small" type="primary" @click="getSelAssetRows">确定</el-button>
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
        { label: '资产ID', prop: 'assetId' },
        { label: '资产名称', prop: 'assetName' },
        { label: '资产地址', prop: 'logicAddr' },
        { label: '资产类型', prop: 'typeName' },
        { label: '归属组织', prop: 'orgName' },
        { label: '安全员', prop: 'secAdmName' }

      ]
    } },
    multiple: { type: Boolean, default: true },
    taskid: { type: String, default: '' }
  },
  data() {
    return {
      common_task_asset_grid_height: 400,
      params: { 'taskId': this.taskId },
      rowKey: 'assetId'
    }
  },
  mounted() {
    this.params = { 'taskId': this.taskid }
  },
  methods: {
    modalClose() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getSelAssetRows() {
      const rows = this.$refs.common_taskassetgrid.getSelectRows()
      this.$emit('getAssetInfo', rows)
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    closeWin() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    }
  }
}
</script>

