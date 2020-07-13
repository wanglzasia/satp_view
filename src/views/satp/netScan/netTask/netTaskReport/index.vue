<template>
  <div class="app-container">
    <el-card>
      <el-page-header title="任务详情" @back="back" />
      <div style="padding: 20px 0px 20px 0px">

        <el-row>
          <table class="satp-table-detail">
            <tr>
              <th>任务名称</th>
              <td>{{ formObj.taskName }}</td>
              <th>创建人</th>
              <td>{{ formObj.createUserName }}</td>
              <th>创建时间</th>
              <td>{{ dateFormat(formObj.createTime ) }}</td>
            </tr>
            <tr>
              <th>任务状态</th>
              <td>{{ formObj.status }}</td>
              <th>类型</th>
              <td>{{ formObj.scanMode }}</td>
              <th>完成时间</th>
              <td>{{ dateFormat(formObj.closeTime) }}</td>
            </tr>
            <tr>
              <th>备注</th>
              <td colspan="5">{{ formObj.note }}</td>
            </tr>
            <tr><td colspan="6" /></tr>
            <tr>
              <th>IP总数</th>
              <td>{{ formObj.allIp }}</td>
              <th>在线IP</th>
              <td>{{ formObj.onLineIp }}</td>
              <th>不在线IP</th>
              <td>{{ formObj.notOnLineIp }} </td>
            </tr>
            <tr>
              <th>授权端口</th>
              <td>{{ formObj.authPort }}</td>
              <th>发现端口</th>
              <td>{{ formObj.listenPort }}</td>
              <th>异常端口</th>
              <td>{{ formObj.errorPort }} </td>
            </tr>
          </table>
        </el-row>

      </div>
      <satp-datagrid
        ref="reportDag"
        url="netTask/netAllResultList"
        :qparams="queryArgs"
        :columns="columns"
        idx
        border
      />
    </el-card>
  </div>

</template>

<script>
import { findNetTask } from '../../../../../api/satp/netScan/netTask'
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      queryArgs: { taskId: this.$route.query.taskId },
      formAttr: {},
      formObj: {},
      formRule: {},
      tableData: [],
      loading: true,
      tableThead: [
        { 'id': '1', 'field': 'ipMode', 'fieldType': 'text', 'text': '类型', 'align': 'left' },
        { 'id': '2', 'field': 'net', 'fieldType': 'text', 'text': '网络/IP范围', 'align': 'left' },
        { 'id': '9', 'field': 'ip', 'fieldType': 'text', 'text': 'IP', 'align': 'left' },
        { 'id': '3', 'field': 'connect', 'fieldType': 'tag', 'text': '在线状态', 'align': 'left' },
        { 'id': '4', 'field': 'port', 'fieldType': 'text', 'text': '端口', 'align': 'left' },
        { 'id': '5', 'field': 'server', 'fieldType': 'text', 'text': '服务', 'align': 'left' },
        { 'id': '6', 'field': 'authStatus', 'fieldType': 'tag', 'text': '授权情况', 'align': 'left' },
        { 'id': '7', 'field': 'listenStatus', 'fieldType': 'tag', 'text': '监听状态', 'align': 'left' },
        { 'id': '8', 'field': 'scanStatus', 'fieldType': 'tag', 'text': '扫描结果', 'align': 'left' }
      ],
      columns: [
        { label: '类型', prop: 'ipMode', formatter: this.ipModeFormatter },
        { label: '网络/IP范围', prop: 'net' },
        { label: 'IP', prop: 'ip' },
        { label: '在线状态', prop: 'connect', formatter: this.connectFormatter },
        { label: '端口', prop: 'port' },
        { label: '服务', prop: 'server' },
        { label: '授权情况', prop: 'authStatus', formatter: this.authStatusFormatter },
        { label: '监听状态', prop: 'listenStatus', formatter: this.listenStatusFormatter },
        { label: '扫描结果', prop: 'scanStatus', formatter: this.scanStatusFormatter }
      ]
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        if (el) {
          return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return ''
        }
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
    }
  },
  watch: {},
  created() {
    this.findNetTask()
  },
  mounted() {},
  methods: {

    back() {
      // 页面跳转
      this.$router.push({ path: '/satp/netScan/netTask' })
    },

    findNetTask() {
      const $self = this
      $self.loading = true
      findNetTask(this.queryArgs).then(response => {
        if (response.netTask.scanMode === 1) {
          response.netTask.scanMode = '自动'
        } else if (response.netTask.scanMode === 2) {
          response.netTask.scanMode = '手动'
        }
        if (response.netTask.status === 0) {
          response.netTask.status = '未开始'
        } else if (response.netTask.status === 1) {
          response.netTask.status = '已完成'
        } else if (response.netTask.status === 2) {
          response.netTask.status = '进行中'
        }
        this.formObj = response.netTask
      }).catch(error => {
        console.log(error)
      })
    },
    ipModeFormatter(row) {
      if (row.ipMode === 1) {
        return '网络'
      } else if (row.ipMode === 2) {
        return 'IP范围'
      }
    },
    connectFormatter(row) {
      if (row.connect === 1) {
        return '通'
      } else if (row.connect === 0) {
        return '不通'
      }
    },
    authStatusFormatter(row) {
      if (row.authStatus === 1) {
        return '已授权'
      } else if (row.authStatus === 0) {
        return '未授权'
      }
    },
    listenStatusFormatter(row) {
      if (row.listenStatus === 0) {
        return 'Stop'
      } else if (row.listenStatus === 1) {
        return 'Listening'
      }
    },
    scanStatusFormatter(row) {
      if (row.scanStatus === 0) {
        return '未扫描'
      } else if (row.scanStatus === 1) {
        return '已扫描'
      } else if (row.scanStatus === 2) {
        return '异常'
      }
    }

  }
}
</script>

<style lang="scss" scoped>

.el-col{
  height: 50px;
}
</style>
