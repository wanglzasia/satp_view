<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <div style="text-align: left">
            <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisibleAdd = true">发起流程</el-button>
          </div>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <satp-datagrid
                ref="selfCheckGrid"
                :url="url"
                :qparams="props.row"
                :columns="columns"
                :pagesizes="a.pSizes"
                @operClick="operClick"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="任务标识"
            prop="id"
          />
          <el-table-column
            label="自查项"
            prop="flowTypeName"
          />
          <el-table-column
            label="创建时间"
            prop="createTime"
          />
        </el-table>
        <div class="satp-pagination-container">
          <el-pagination
            :current-page="elePagination.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="elePagination.pageSize"
            layout="total, sizes, prev, pager, next,jumper"
            :total="elePagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>

    <el-dialog
      title="发起流程"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="selfCheckForm"
        label-position="left"
        label-width="65px"
      >
        <el-form-item label="负责人" prop="contactsee">
          <el-input v-model="selfCheckForm.userNames" placeholder="请选择处理人" disabled size="small">
            <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="selfCheckStart">确 定</el-button>
      </div>
    </el-dialog>
    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />
  </div>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
import UserInfo from '@/components/Userwindow/index.vue'
import { parseTime } from '@/utils/index.js'
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'SelfCheck',
  components: { 'user-window': UserInfo, 'satp-datagrid': datagrid },
  data() {
    return {
      Height: window.innerHeight - 195,
      dialogVisibleAdd: false,
      tableData: [],
      checked: true,
      selfCheckForm: {
      },
      loading: false,
      columns: [
        { label: '自查项', prop: 'flowType', align: 'center' },
        { label: '任务人姓名 ', prop: 'userName', align: 'center' },
        { label: '填报状态', prop: 'status', align: 'center', formatter: this.statusFormatter },
        { label: '流程状态', prop: 'status1', align: 'center', formatter: this.status1Formatter },
        { label: '开始时间', prop: 'createDate', align: 'center', formatter: this.createDateFormatter },
        { label: '最后更新时间', prop: 'updateDate', align: 'center', formatter: this.updateDateFormatter },
        { label: '流程完成时间', prop: 'finishDate', align: 'center', formatter: this.finishDateFormatter },
        {
          label: '操作',
          align: 'center',
          width: 150,
          actions: [
            { title: '查看详情', prop: 'review', type: 'dashed', icon: 'el-icon-more' }
          ]
        }
      ],
      url: 'selfCheck/loadselfCheckFlow',
      a: {
        pSizes: [10, 15, 20]
      },
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userNames: '',
      userIds: '',
      flowType: 1,
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      }
    }
  },
  created() {

  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
    this.listSelfCheck()
  },
  methods: {
    clear() {
      this.dialogVisibleAdd = false
      this.selfCheckForm = {}
    },
    operClick(data) {
      const { row } = data
      this.$router.push({
        path: '/selfCheck/selfCheckFlowInfo',
        query: {
          'id': row.id
        }
      })
    },
    listSelfCheck() {
      const params = {}
      params.flowType = this.flowType
      params.pageNum = this.elePagination.pageNum
      params.pageSize = this.elePagination.pageSize
      this.$store.dispatch('selfCheck/loadSelfCheck',
        params
      ).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          resp.rows.forEach(element => {
            element.createTime = this.dateFormatter(element.createTime)
            element.page = true
          })
          this.tableData = resp.rows
          this.elePagination.total = resp.total
        }
      })
    },
    selfCheckStart() {
      if (this.userIds === '' || this.userIds === null) {
        this.$message.warning(`选择处理人`)
        return
      }
      this.$store.dispatch('selfCheck/selfCheckAdd', { userIds: this.userIds }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.clear()
          this.listSelfCheck()
        }
      })
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = true// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      data.forEach(element => {
        if (this.userNames === '') {
          this.userNames = element.userName
          this.userIds = element.userId
        } else {
          this.userNames = this.userNames + ',' + element.userName
          this.userIds = this.userIds + ',' + element.userId
        }
        this.selfCheckForm.userNames = this.userNames
      })
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.elePagination.pageNum = val
      this.listRoles()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.listRoles()
    },
    dateFormatter(date) {
      const time = parseTime(date, '')
      return time
    },
    statusFormatter(row) {
      if (row.status === 1) {
        return '填报完成'
      } else {
        return '填报未完成'
      }
    },
    status1Formatter(row) {
      if (row.status1 === 1) {
        return '流程完成'
      } else {
        return '流程未完成'
      }
    },
    createDateFormatter(row) {
      if (row.createDate) {
        const time = parseTime(row.createDate, '')
        return time
      } else {
        return '无记录'
      }
    },
    updateDateFormatter(row) {
      if (row.updateDate) {
        const time = parseTime(row.updateDate, '')
        return time
      } else {
        return '无记录'
      }
    },
    finishDateFormatter(row) {
      if (row.finishDate) {
        const time = parseTime(row.finishDate, '')
        return time
      } else {
        return '无记录'
      }
    }
  }
}
</script>
