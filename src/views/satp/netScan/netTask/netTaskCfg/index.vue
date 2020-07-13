<template>
  <div class="app-container">
    <el-card>
      <el-page-header title="任务配置" @back="back" />
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
              <th>端口</th>
              <td><el-input v-model="formObj.portCfgName" placeholder="请选择端口" readonly @click.native.prevent="openPortCfg()" />
                <el-input v-model="formObj.portCfg" type="hidden" style="display:none;" /></td>
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
          ref="netCfgDag"
          url="netTask/netTaskCfgList"
          :qparams="queryArgs"
          :columns="columns"
          :toolbar="toolbar"
          idx
          border
          @operClick="operClick"
          @toolbarClick="toolbarClick"
        />
      </div>
      <div>

        <el-dialog title="添加配置" :visible.sync="netCfgDagVisible" width="50%" :close-on-click-modal="false" @close="cancleNetCfg">
          <satp-datagrid
            ref="netNoCfgDag"
            url="netTask/netTaskNotCfgList"
            :qparams="queryArgs"
            :columns="columns"
            checkbox
            idx
            border
          />
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancleNetCfg()">取消</el-button>
            <el-button size="small" type="primary" @click="addNetTaskCfg()">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="选择端口配置" :visible.sync="portDagVisible" width="30%" @close="cancle">
          <template>
            <el-tabs>
              <el-tab-pane>
                <el-table
                  class="elTable"
                  :data="portTableData"
                  highlight-current-row
                  style="width: 100%"
                  @current-change="portTableChange"
                >
                  <el-table-column
                    prop="group"
                    label="端口分组"
                    width="180"
                  />
                  <el-table-column
                    prop="detail"
                    label="详情"
                  >
                    <template slot-scope="scope">
                      <el-button type="text" icon="el-icon-s-grid" circle @click.native.prevent="openNetCfgList(scope.row)" />
                    </template>
                  </el-table-column>
                </el-table>

              </el-tab-pane>
            </el-tabs>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="cancle()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="端口列表" :visible.sync="portCfgDagVisible" width="30%" @close="canclePortCfg">
          <satp-datagrid
            ref="portDag"
            url="netTask/portCfgList"
            :qparams="portArgs"
            :columns="portColumns"
            idx
            border
          />
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="canclePortCfg()">返 回</el-button>
            <el-button type="primary" size="small" @click="canclePortCfg()">返 回</el-button>
          </div>
        </el-dialog>
      </div>

      <el-footer>
        <el-button size="small" @click="back">取 消</el-button>
        <el-button size="small" type="primary" :loading="savebutton" @click="updateNetTask">确 定</el-button>
      </el-footer>
    </el-card></div></template>

<script>
import { deleteNetTaskCfg, updateNetTask, findNetTask, addNetTaskCfg } from '../../../../../api/satp/netScan/netTask'
import datagrid from '@/components/datagrid/datagrid'
export default {
  components: { 'satp-datagrid': datagrid },
  props: [],
  data() {
    return {
      queryArgs: { taskId: this.$route.query.busiId }, // 列表查询参数
      portArgs: {}, // 端口列表查询参数
      taskId: 0,
      wfTaskId: 0,
      formAttr: {},
      formObj: {},
      savebutton: false,
      portDagVisible: false,
      portCfgDagVisible: false,
      netCfgDagVisible: false,
      columns: [
        { label: '应用名称', prop: 'appName' },
        { label: '业务系统', prop: 'busiCode' },
        { label: '合规网络/IP范围', prop: 'ipAddress' },
        { label: '操作', prop: 'opt', align: 'center', actions: [{ label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete' }] }
      ],
      portColumns: [
        { label: '端口', prop: 'port' },
        { label: '说明', prop: 'note' }
      ],
      toolbar: [
        { label: '新增', prop: 'add', type: 'primary', icon: 'el-icon-plus' }
      ],
      portTableData: [
        {
          id: 'all',
          group: '全部端口'
        }, {
          id: 'common',
          group: '常用端口'
        }, {
          id: 'base',
          group: '基本端口'
        }, {
          id: 'system',
          group: '系统端口'
        }
      ],
      currentRow: null,
      portName: ''
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
          value = this.moment(el).utc().format(fmt)
        }
        return value
      }
    }
  },
  watch: {},
  created() {
    this.taskId = this.$route.query.busiId
    this.wfTaskId = this.$route.query.taskId
    this.findNetTask()
  },

  mounted() {},
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'delete':
          this.deleteNetTaskCfg(row)
          break
        default:
          break
      }
    },
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'add':
          this.openNetCfg()
          break
        default:
          break
      }
    },
    reloadCfgDag() {
      this.$refs['netCfgDag'].reload()
    },
    // 给端口配置字段赋值
    portTableChange(val) {
      this.$set(this.formObj, 'portCfg', val.id)
      this.$set(this.formObj, 'portCfgName', val.group)
      // this.$refs['elForm'].clearValidate('portCfgName')
    },
    // 端口配置窗口关闭/取消
    cancle() {
      this.portDagVisible = false
    },
    // 配置窗口关闭/取消
    cancleNetCfg() {
      this.netCfgDagVisible = false
    },
    // 配置列表关闭
    canclePortCfg() {
      this.portCfgDagVisible = false
      this.portName = ''
    },
    // 页面取消
    back() {
      // 页面跳转
      const netTaskCfg = { 'taskId': this.taskId }
      deleteNetTaskCfg(netTaskCfg).then(response => {
        this.$router.push({ path: '/system/workflow/busiTaskList' })
      })
    },
    // 提交页面修改任务
    updateNetTask() {
      const $self = this
      const params = { taskId: this.taskId, portCfg: this.formObj.portCfg, wfTaskId: this.wfTaskId }
      if (this.formObj.portCfg == null) {
        $self.$message({
          message: `请选择端口配置`,
          type: 'error'
        })
      }
      this.savebutton = false
      updateNetTask(params).then(response => {
        this.savebutton = true
        $self.reloadCfgDag()
        $self.$message({
          message: `操作成功！`,
          type: 'success'
        })
        this.$router.push({ path: '/satp-task/netScan/netTask' })
      })
    },

    // 添加配置
    addNetTaskCfg(row) {
      const $self = this
      const params = {}
      params.cfgs = this.$refs.netNoCfgDag.getSelectRows()
      params.taskId = this.taskId
      addNetTaskCfg(params).then(response => {
        $self.reloadCfgDag()
        $self.$message({
          message: `操作成功！`,
          type: 'success'
        })
      })
      this.netCfgDagVisible = false
    },

    // 删除配置
    deleteNetTaskCfg(row) {
      const $self = this
      const params = { 'taskId': this.taskId, 'cfgId': row.cfgId }
      deleteNetTaskCfg(params).then(response => {
        this.reloadCfgDag()
        $self.$message({
          message: `删除操作成功！`,
          type: 'success'
        })
      })
    },

    findNetTask() {
      const params = {}
      params.taskId = this.taskId
      findNetTask(params).then(response => {
        if (response.netTask.scanMode === 1) {
          response.netTask.scanMode = '手动'
        } else if (response.netTask.scanMode === 2) {
          response.netTask.scanMode = '自动'
        }
        this.formObj = response.netTask
      }).catch(error => {
        console.log(error)
      })
    },

    openPortCfg() {
      this.portDagVisible = true
    },
    openNetCfg() {
      // this.reloadCfgDag()
      this.netCfgDagVisible = true
    },
    openNetCfgList(row) {
      this.portCfgDagVisible = true
      this.portName = row.id
      this.$set(this.portArgs, 'name', row.id) // 端口列表查询参数
    }
  }
}
</script>

