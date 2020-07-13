<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-button type="success" size="small" @click="dialogVisible = true">对话框-label在左侧</el-button>
        <el-button type="success" size="small" @click="dialogTopVisible = true">对话框-label在上面</el-button>
      </el-card>
      <br>
      <el-card>
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
        <div v-text="htmlTxt1" />
        <div v-text="htmlTxt2" />
      </el-card>
    </div>

    <el-dialog
      title="新建任务-Left"
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

    <el-dialog
      title="新建任务-Top"
      :visible.sync="dialogTopVisible"
      width="30%"
      :before-close="handleBeforeClose"
    >
      <el-form ref="form" :model="ruleForm" :label-position="labelPosition" label-width="100px" size="small" class="satp-form-label-top">
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
          <el-input v-model="ruleForm.taskName" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="<el-form :label-position='labelPosition' class='satp-form-label-top'>" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" size="small" @click="dialogTopVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogTopVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InteTaskList',
  data() {
    return {
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
      dialogTopVisible: false,
      labelPosition: 'top',
      htmlTxt1: "<el-form label-position='left' label-width='70px' size='small' class='satp-form-inline' >",
      htmlTxt2: "<div class='satp-from-btngrp-std'><button/><button/></div>"

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
      const params = JSON.parse(JSON.stringify($self.ruleForm))
      params.pageNum = 1
      params.pageSize = 10
      $self.loading = true
      this.$store.dispatch('task/taskList', params).then(resp => {
        $self.tableData = resp.data
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
    }

  }
}
</script>
