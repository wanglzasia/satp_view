<template>
  <div>
    <div class="app-container">
      <div>
        <el-page-header content="评估清单详情" @back="goBack" />
        <router-view />
      </div>
      <el-card>
        <el-form
          :model="pageForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="10">
              <el-form-item label="名称" prop="evalName" right>
                <el-input v-model="pageForm.evalName" placeholder="名称" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="创建人" prop="createUser">
                <el-input v-model="pageForm.createUser" placeholder="创建人" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="pageForm.createTime" placeholder="创建时间" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="省份" prop="evalProvince">
                <el-input v-model="pageForm.evalProvince" placeholder="省份" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="部门名称" prop="orgName">
                <el-input v-model="pageForm.orgName" placeholder="部门名称" readonly />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider />
        <h4>
          <center>业务详情</center>
        </h4>
        <satp-datagrid
          ref="businessGrid"
          :url="url"
          :qparams="searchForm"
          :columns="columns"
          border
          :pagesizes="a.pSizes"
          @operClick="operClick"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index.js'
import datagrid from '@/components/datagrid/datagrid'
import store from '@/store'
export default {
  name: 'EvalInfo',
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      Height: window.innerHeight - 195,
      pageForm: {
        evalName: '',
        createUser: '',
        createTime: '',
        evalProvince: '',
        orgName: ''
      },
      searchForm: {
        evalId: '',
        workflowKey: '',
        page: true
      },
      a: {
        pSizes: [10, 15, 20]
      },
      columns: [
        { label: '业务名称', prop: 'serviceName', width: 120, align: 'left' },
        { label: '业务归属', prop: 'belongStage', align: 'center' },
        { label: '业务类别', prop: 'serviceType', align: 'center' },
        { label: '状态 ', prop: 'auditStatus', align: 'center', formatter: this.dataFormatter },
        {
          label: '操作',
          align: 'center',
          width: 300,
          actions: [],
          formatter: this.operFormatter
        }
      ],
      url: 'evalInfo/loadEvalutionInfo',
      user: store.getters.user
    }
  },
  created() {
    this.pageForm.evalName = this.$route.query.evalName
    this.pageForm.createUser = this.$route.query.createUser
    this.pageForm.createTime = this.dateFormatter(this.$route.query.createTime)
    this.pageForm.evalProvince = this.$route.query.evalProvince
    this.pageForm.orgName = this.$route.query.orgName
    this.searchForm.evalId = this.$route.query.evalId
    this.searchForm.workflowKey = 'doubleEval'
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/doubleNew/eval' })
    },
    dateFormatter(date) {
      const time = parseTime(date, '')
      return time
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'initiate':
          this.$router.push({
            path: '/doubleNew/busInfo',
            query: {
              'serviceId': row.serviceId,
              'tetongList': row.tetongList,
              'assesHidden': false,
              'bussId': row.bussId,
              'evalName': this.pageForm.evalName,
              'createUser': this.pageForm.createUser,
              'createTime': this.pageForm.createTime,
              'evalProvince': this.pageForm.evalProvince,
              'orgName': this.pageForm.orgName,
              'evalId': this.searchForm.evalId
            }
          })
          break
        case 'more':
          this.$router.push({
            path: '/doubleNew/busInfo',
            query: {
              'serviceId': row.serviceId,
              'tetongList': row.tetongList,
              'assesHidden': true,
              'bussId': row.bussId,
              'evalName': this.pageForm.evalName,
              'createUser': this.pageForm.createUser,
              'createTime': this.pageForm.createTime,
              'evalProvince': this.pageForm.evalProvince,
              'orgName': this.pageForm.orgName,
              'evalId': this.searchForm.evalId
            }
          })
          break
        default:
          break
      }
    },
    operFormatter(row) {
      let actions = []
      const evalResult = row.evalResult
      if (evalResult === '0') {
        if (row.bussCreator === this.user.userId) {
          actions = [
            { title: '业务信息', prop: 'more', type: 'primary', icon: 'el-icon-s-data' },
            { title: '发起评估', prop: 'initiate', type: 'success', icon: 'el-icon-s-check' }
          ]
        } else {
          actions = [
            { title: '业务信息', prop: 'more', type: 'primary', icon: 'el-icon-s-data' }
          ]
        }
      } else {
        actions = [
          { title: '业务信息', prop: 'more', type: 'primary', icon: 'el-icon-s-data' },
          { title: '流程追踪', prop: 'track', type: 'success', icon: 'el-icon-s-promotion' }
        ]
      }
      return actions
    },
    dataFormatter(row) {
      if (row.auditStatus === '0') {
        return '未评估'
      } else {
        return '评估中'
      }
    }
  }
}
</script>
