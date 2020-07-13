<template>
  <div>
    <div class="app-container">
      <el-card>
        <div v-html="htmlMsg" />
        <el-form
          :model="ruleForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="任务名称">
                <el-input v-model="ruleForm.taskName" placeholder="任务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="业务系统">
                <el-select v-model="ruleForm.bussiness" placeholder="业务系统">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="任务来源">
                <el-select v-model="ruleForm.taskSource" placeholder="任务来源">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="合规项">
                <label slot="label">&emsp;合规项</label>
                <el-select v-model="ruleForm.itemType" placeholder="合规项类别">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="getTaskList">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <el-table
          :data="tableData"
          style="width: 100%;"
          row-key="id"
          border
          :height="Height"
          default-expand-all
          class="satp-grid"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="taskName"
            label="任务名称"
            width="250"
          />
          <el-table-column
            prop="name"
            label="编号"
            width="60"
          />
          <el-table-column
            prop="address"
            label="来源"
            width="60"
          />
          <el-table-column
            prop="address"
            label="状态"
            width="60"
          />

          <el-table-column
            prop="taskProgress"
            label="任务进度"
            :formatter="testFormatter"
          >
            <template>
              <div v-html="htmlMsg" />
              <div v-html="htmlMsg" />
            </template>

          </el-table-column>
          <el-table-column
            prop="address"
            label="任务开始时间"
          />
          <el-table-column
            prop="address"
            label="任务结束时间"
          />
          <el-table-column
            prop="address"
            label="创建人"
            width="80"
          />
          <el-table-column
            prop="address"
            label="责任人"
            width="80"
          />
          <el-table-column
            prop="address"
            label="操作"
          />
        </el-table>
        <div class="satp-pagination-container">
          <el-pagination
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          />
        </div>
      </el-card>
    </div>

    <el-dialog
      title="新建任务"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleBeforeClose"
    >
      <el-form ref="form" :model="ruleForm" label-width="100px" size="small">
        <el-form-item label="任务名称">
          <el-input v-model="ruleForm.taskName" placeholder="任务名称" />
        </el-form-item>
        <el-form-item label="任务来源">
          <el-input v-model="ruleForm.taskName" placeholder="任务来源" />
        </el-form-item>
        <el-form-item label="要求完成时间">
          <el-input v-model="ruleForm.taskName" placeholder="要求完成时间" />
        </el-form-item>
        <el-form-item label="任务责任人">
          <el-input v-model="ruleForm.taskName" placeholder="任务责任人" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleForm.taskName" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="任务备注" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InteTaskList',
  data() {
    return {
      Height: window.innerHeight - 195,
      ruleForm: {
        taskName: '',
        bussiness: '',
        taskSource: '',
        itemType: '',
        taskType: 'inte',
        parentTaskId: '0',
        id: '0'
      },
      dialogVisible: false,
      tableData: [],
      htmlMsg: '<span style="color:red">Hello</span>'
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
    // 加载数据
    this.getTaskList()
  },
  methods: {
    // 获取任务列表
    getTaskList() {
      const $self = this
      $self.loading = true
      $self.loading = false

      const params = JSON.parse(JSON.stringify($self.ruleForm))
      params.pageNum = 1
      params.pageSize = 10
      $self.loading = true
      this.$store.dispatch('task/taskList', params).then(resp => {
        $self.tableData = resp.rows
        $self.loading = false
      }).catch(
        $self.loading = false
      )
    },
    // 新增任务
    addTask() {
      this.$router.push({ path: '/satp-task/inte/add' })
    },
    handleBeforeClose() {
      this.dialogVisible = false
    },
    testFormatter(row, column, cellValue) {
      console.log('777777777777')
      console.log(cellValue)
      cellValue = "<div style='color:red'>hi</div>"
      return cellValue
    }
  }
}
</script>
