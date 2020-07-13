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
          </table>
        </el-row>
      </div>

      <div>
        <satp-datagrid
          ref="taskDetailDag"
          title="资产列表"
          :url="taskDetailUrl"
          :qparams="queryArgs"
          :columns="columns"
          idx
          border
          @operClick="operClick"
        />

        <div>
          <el-dialog title="网络扫描详情" :visible.sync="dialogFormVisible" width="50%" :model="netResult" @close="cancle">
            <el-row>
              <table class="satp-table-detail" style="margin-bottom:10px">
                <tr>
                  <th>地址类型</th>
                  <td colspan="5">{{ netResult.ipMode===1?'整个网络':'IP范围' }}</td>
                </tr>
                <tr>
                  <th>网络/IP范围</th>
                  <td colspan="5">{{ netResult.net }}</td>
                </tr>
                <tr>
                  <th>IP地址</th>
                  <td colspan="5"> {{ netResult.ip }}
                    <span v-if="netResult.connect===1">
                      <el-tag type="success">通</el-tag>
                    </span>
                    <span v-else>
                      <el-tag type="danger">不通</el-tag>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>扫描状态</th>
                  <td colspan="5">
                    <span v-if="netResult.status===0">
                      <el-tag type="primary">未扫描</el-tag>
                    </span>
                    <span v-else-if="netResult.status===2">
                      <el-tag type="warning">扫描中</el-tag>
                    </span>
                    <span v-else-if="netResult.status===1">
                      <el-tag type="success">已扫描</el-tag>
                    </span>
                    <span v-else-if="netResult.status===3">
                      <el-tag type="danger">异常</el-tag>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>扫描结果</th>
                  <td colspan="5">
                    已授权端口<font color="green">{{ netResult.authPort }}</font>个，探测监听端口<font color="green">{{ netResult.listenPort }}</font>个<br>
                    异常情况：<br>
                    已授权未发现端口<font color="red">{{ netResult.anthNoListenPort }}</font>个<br>
                    未授权新发现端口<font color="red">{{ netResult.noAuthNewListenPort }}</font>个
                  </td>
                </tr>
              </table>
            </el-row>
            <satp-datagrid
              ref="portDag"
              title="端口列表"
              url="netTask/netResultPortList"
              :pagesizes="portSize"
              :qparams="portArgs"
              :columns="portColumns"
              idx
              border
            />

          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findNetResult, findNetTask, updateNetTask } from '../../../../../api/satp/netScan/netTask'
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      taskDetailUrl: 'netTask/netResultList',
      queryArgs: { taskId: this.$route.query.taskId },
      portArgs: {},
      formRule: {// 验证必填项
        portCfgName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      taskId: 0,
      formAttr: {},
      formObj: {},
      netResult: {},
      dialogFormVisible: false,
      savebutton: false,
      portSize: [5, 10, 20],
      loading: true,
      columns: [
        { label: '类型', prop: 'ipMode', formatter: this.ipModeFormatter },
        { label: '网络/IP范围', prop: 'net' },
        { label: 'IP', prop: 'ip' },
        { label: '开始时间', prop: 'startTime', formatter: this.startTimeFormatter },
        { label: '结束时间', prop: 'endTime', formatter: this.endTimeFormatter },
        { label: '操作', prop: 'opt', align: 'center', actions: [], formatter: this.operFormatter }
      ],
      portColumns: [
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
    this.taskId = this.$route.query.taskId
    this.queryNetTask()
  },
  mounted() {},
  methods: {

    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.openDag(row)
          break
        default:
          break
      }
    },
    statusFormatter(row) {
      if (row.status === 2) {
        return '扫描中'
      } else if (row.status === 1) {
        return '已完成'
      } else if (row.status === 0) {
        return '未扫描'
      } else if (row.status === 3) {
        return '异常'
      }
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
    ipModeFormatter(row) {
      if (row.ipMode === 1) {
        return '网络'
      } else if (row.ipMode === 2) {
        return 'IP范围'
      }
    },
    operFormatter(row) {
      let actions = []
      const taskStatus = row.status
      if (taskStatus === 1) {
        actions = [
          { label: '详情', prop: 'detail', type: 'primary', icon: 'el-icon-menu' }
        ]
      }
      return actions
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
    },
    // 端口配置窗口关闭/取消
    cancle() {
      this.dialogFormVisible = false
      this.netResult = false
    },
    // 提交页面修改任务
    updateNetTask() {
      const $self = this
      const netTask = { taskId: this.taskId, portCfg: this.formObj.portCfg }
      $self.$refs['elForm'].validate(valid => {
        if (valid) {
          updateNetTask(netTask).then(response => {
            $self.getTableData()
            $self.$message({
              message: `保存成功！`,
              type: 'success'
            })
          })
        } else {
          return false
        }
      })
    },
    openDag(row) {
      const params = {}
      params.id = row.id

      findNetResult(params).then(response => {
        this.loading = false
        this.netResult = response.netResult
      }).catch(error => {
        console.log(error)
      })

      this.dialogFormVisible = true
      this.$set(this.portArgs, 'id', row.id) // 端口列表查询参数
      this.$refs['portDag'].reload() // table第一次被加载后才能获取到 'portDag' 元素
    },
    back() {
      // 页面跳转
      this.$router.push({ path: '/satp-task/netScan/netTask' })
    },

    queryNetTask() {
      const params = {}
      params.taskId = this.taskId
      findNetTask(params).then(response => {
        if (response.netTask.scanMode === 1) {
          response.netTask.scanMode = '手动'
        } else if (response.netTask.scanMode === 2) {
          response.netTask.scanMode = '自动'
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
    }

  }
}
</script>

<style lang="scss" scoped>

.el-dialog .el-col{
  height: 40px;
}
</style>
