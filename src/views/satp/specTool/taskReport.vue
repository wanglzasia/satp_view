<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-page-header style="margin-bottom:10px" @back="cancle" />
        <el-row>
          <table class="satp-table-detail" style="margin-bottom:10px">
            <tr>
              <th>任务名称</th>
              <td>{{ formObj.taskName }}</td>
              <th>工具信息</th>
              <td>{{ formObj.toolName }}</td>
            </tr>
            <tr>
              <th>开始时间</th>
              <td>{{ dateFormat(formObj.startTime ) }}</td>
              <th>完成时间</th>
              <td>{{ dateFormat( formObj.endTime) }}</td>
            </tr>
            <tr>
              <th>任务创建人</th>
              <td>{{ formObj.opLoginName }}</td>
              <th>任务状态</th>
              <td>{{ formObj.taskStatus }}</td>
            </tr>
            <tr>
              <th>备注信息</th>
              <td colspan="5">{{ formObj.taskNote }}</td>
            </tr>
            <tr>
              <th>扫描结果</th>
              <td colspan="5" />
            </tr>
          </table>

          <div>
            <satp-datagrid
              ref="specTaskAssetDag"
              title="扫描资产"
              :url="url"
              :qparams="params"
              :columns="columns"
              idx
              border
            />
          </div>
        </el-row>

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
      url: 'specTool/specTaskAssetList',
      columns: [
        { label: '资产ID', prop: 'assetId' },
        { label: '资产名称', prop: 'name' },
        { label: 'IP/URL', prop: 'logicAddr' },
        { label: '完成时间', prop: 'updateTime' },
        { label: '扫描结果', prop: 'rptInfo' }
      ]
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  watch: {},
  created() {
    this.params = { taskId: this.$route.query.taskId }
    this.$store.dispatch('specTool/findSpecTask', this.params).then(response => {
      const taskStatus = response.specTask.taskStatus
      if (taskStatus === 0) {
        response.specTask.taskStatus = '草稿'
      }
      if (taskStatus === 1) {
        response.specTask.taskStatus = '完成'
      }
      if (taskStatus === 2) {
        response.specTask.taskStatus = '执行中'
      }
      if (taskStatus === 3) {
        response.specTask.taskStatus = '异常'
      }
      this.formObj = response.specTask
    }).catch(() => {})
  },
  mounted() {

  },
  methods: {
    cancle() {
      this.$router.push({ path: '/satp-tool/specTool/taskList' })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
