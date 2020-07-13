<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="searchForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="创建时间" prop="createTime">
                <el-input v-model="searchForm.createTime" placeholder="创建时间" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std" right>
                <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-form>

        <satp-datagrid
          ref="evalVerifyListGrid"
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
import datagrid from '@/components/datagrid/datagrid'
export default {
  name: 'EvalVerifyList',
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      Height: window.innerHeight - 195,
      searchForm: {
        createTime: '',
        page: true
      },
      a: {
        pSizes: [10, 15, 20]
      },
      url: 'evalVerify/loadEvalVerifyList',
      columns: [
        { label: '业务名称', prop: 'bussName', align: 'left' },
        { label: '评估名称', prop: 'evalName', align: 'center' },
        { label: '业务类别', prop: 'bussType', align: 'center' },
        { label: '业务属性', prop: 'bussPro', align: 'center' },
        { label: '业务简介', prop: 'bussSyn', align: 'center' },
        { label: '业务部门', prop: 'orgName', align: 'center' },
        { label: '负责人', prop: 'leaderName', align: 'center' },
        { label: '评估完成时间', prop: 'bussMtime', align: 'center' },
        { label: '(拟)上线时间', prop: 'bussEuptime', align: 'center' },
        { label: '评估标识', prop: 'evalNo', align: 'center' },
        { label: '业务核查次数', prop: 'verifyNum', align: 'center' },
        { label: '安全核验次数', prop: 'safetyNum', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 150,
          actions: [
            { title: '明细', prop: 'detail', type: 'primary', icon: 'el-icon-edit' },
            { title: '核查', prop: 'review', type: 'dashed', icon: 'el-icon-more' },
            { title: '核验', prop: 'safeview', type: 'danger', icon: 'el-icon-delete' }
          ]
        }
      ]
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    }
  },
  methods: {
    operClick(data) {
      const $self = this
      const { row, prop } = data
      switch (prop) {
        case 'review':
          if (row.progressNum && row.progressNum > 0) {
            this.$message.warning(`有未完成的核查任务，请勿重复发起 ！`)
            return
          }
          this.$confirm(`确认将工单派发给` + row.leaderName + `进行核查？`)
            .then(() => {
              const params = {}
              params.bussId = row.bussId
              params.bussLeader = row.bussLeader
              params.bussName = row.bussName
              this.$store.dispatch('evalVerify/verifyAdd', params).then(response => {
                $self.$message({
                  message: `派发成功！`,
                  type: 'success'
                })
                this.reloadDatagrid()
              })
            }).catch(() => {})
          break
        case 'safeview':
          if (row.safeWaitNum && row.safeWaitNum > 0) {
            this.$message.warning(`有未完成的核验任务，请勿重复发起 ！`)
            return
          }
          this.$confirm(`您确定要对该业务发起安全核验吗？`)
            .then(() => {
              const params = {}
              params.bussId = row.bussId
              params.bussLeader = row.bussLeader
              params.bussName = row.bussName
              this.$store.dispatch('evalVerify/safetyAdd', params).then(response => {
                $self.$message({
                  message: `发起成功！`,
                  type: 'success'
                })
                this.reloadDatagrid()
              })
            }).catch(() => {})
          break
        case 'detail':
          this.$router.push({
            path: '/doubleNew/evalVerifyInfo',
            query: {
              'serviceId': row.serviceId,
              'tetongList': row.tetongList,
              'bussId': row.bussId
            }
          })
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['evalVerifyListGrid'].reload()
    }
  }
}
</script>
