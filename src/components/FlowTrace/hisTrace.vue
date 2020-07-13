<template>
  <div>
    <!--流程跟踪弹窗-->
    <el-dialog title="流程跟踪" :visible.sync="visible" width="75%" :before-close="taskTraceHandleBeforeClose">
      <div style="text-align: center;">
        <img ref="img" class="code-img-box" :src="codeImg" alt="">
      </div>

      <!--datagrid表格-->
      <satp-datagrid
        v-if="visible"
        ref="datagridTest2"
        :url="url"
        :qparams="taskTraceParams"
        :columns="columns"
        class="satp-grid-mini"
        border
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="taskTraceHandleBeforeClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import datagrid from '@/components/datagrid/datagrid'

export default {
  components: { 'satp-datagrid': datagrid },
  props: {
    visible: { type: Boolean, default: false },
    procDefId: { type: String, default: '' },
    procInstId: { type: String, default: '' }
  },
  data() {
    return {
      url: 'workflow/taskTraceListData',
      taskTraceParams: { processDefinitionId: this.procDefId, processInstanceId: this.procInstId },
      columns: [
        { label: '任务编号', prop: 'taskid', width: 150, align: 'center' },
        { label: '当前环节', prop: 'actname', align: 'center' },
        { label: '处理人', prop: 'realName', width: 150, align: 'center' },
        { label: '开始时间', prop: 'starttime', width: 170, align: 'center', formatter: this.starttimeFormatter },
        { label: '结束时间', prop: 'endtime', width: 170, align: 'center', formatter: this.endtimeFormatter },
        { label: '耗时（天）', prop: 'duration', width: 150, align: 'center', formatter: this.durationFormatter }
      ],
      codeImg: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        const value = this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
        // eslint-disable-next-line no-irregular-whitespace
        return value
      }
    },
    datetimeFormat() {
      return function(el, format) {
        let fmt = 'YYYY-MM-DD HH:mm:ss'
        let value = ''
        if (format) {
          fmt = format
        }
        if (el) {
          value = this.moment(el).format(fmt)
        }
        return value
      }
    },
    durationFormat() {
      return function(val) {
        const value = Math.round(val / 1000 / 60 * 100 / 60 / 24) / 100
        return value
      }
    }
  },
  created() {
    this.taskTracePicture()
  },
  methods: {
    // 流程跟踪图片
    taskTracePicture() {
      const params = { 'processDefinitionId': this.procDefId, 'processInstanceId': this.procInstId }
      this.$store.dispatch('workflow/taskTracePicture', params).then(resp => {
        const bufferUrl = btoa(new Uint8Array(resp).reduce((body, byte) => body + String.fromCharCode(byte), ''))
        this.codeImg = 'data:image/png;base64,' + bufferUrl
      }).catch(
      )
    },
    // 流程跟踪弹窗关闭执行事件
    taskTraceHandleBeforeClose() {
      this.taskTraceDialogVisible = false
      this.$emit('update:visible', false)
    },
    starttimeFormatter(row) {
      return this.datetimeFormat2(row.starttime)
    },
    endtimeFormatter(row) {
      return this.datetimeFormat2(row.endtime)
    },
    // 时间转换
    datetimeFormat2(el) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      let value = ''
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    durationFormatter(row) {
      return Math.round(row.duration / 1000 / 60 * 100 / 60 / 24) / 100
    }
  }
}
</script>
