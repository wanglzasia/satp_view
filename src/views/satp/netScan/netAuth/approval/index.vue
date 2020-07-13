<template>
  <el-card class="box-card">
    <div class="satp-grid-title">基本信息</div>
    <el-row>
      <table class="satp-table-detail" style="margin-bottom:20px">
        <tr>
          <th>任务名称</th>
          <td colspan="5">{{ scanAuth.taskName }}</td>
        </tr>
        <tr>
          <th>申请时间</th>
          <td>{{ dateFormat(scanAuth.createTime ) }}</td>
          <th>申请类别</th>
          <td>{{ type }}</td>
        </tr>
        <tr>
          <th>端口</th>
          <td>{{ scanAuth.port }}</td>
          <th>服务</th>
          <td>{{ scanAuth.server }}</td>
        </tr>
        <tr>
          <th>备注</th>
          <td colspan="5">{{ scanAuth.note }}</td>
        </tr>
      </table>
    </el-row>
    <div class="satp-grid-title">审核处理</div>
    <div>
      <el-row>
        <el-form :model="formObj" label-width="100px" size="small" :label-position="right">
          <el-col :span="12" :offset="6">
            <el-form-item label="审核意见">
              <el-select v-model="formObj.approvalStatus" style="width: 80%">
                <el-option v-for="item in approvalStatusOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12" :offset="6">
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="formObj.note"
                type="textarea"
                :rows="4"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>

    <el-footer style="text-align:center">
      <el-button size="small" @click="back">取 消</el-button>
      <el-button type="primary" :loading="savebutton" size="small" @click="approval">确 定</el-button>
    </el-footer>
  </el-card>

</template>

<script>
import { findNetAuthWithBusi, approval } from '../../../../../api/satp/netScan/netAuth'

export default {
  components: {},
  props: [],
  data() {
    return {
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      formRule: {// 验证必填项
      },
      wfTaskId: 0,
      authId: 0,
      type: '',
      formAttr: {},
      scanAuth: {},
      formObj: { approvalStatus: 1 },
      savebutton: false,
      approvalStatusOption: [
        {
          value: 1,
          label: '通过'
        }, {
          value: 2,
          label: '不通过'
        }
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
    this.type = this.$route.query.type
    this.authId = this.$route.query.busiId
    this.wfTaskId = this.$route.query.taskId
    this.findNetAuth()
  },
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
    findNetAuth() {
      const params = { authId: this.authId }
      findNetAuthWithBusi(params).then(response => {
        this.scanAuth = response.scanAuth

        this.scanAuth.taskName = response.scanAuth.ip + '授权变更申请'
        if (this.type === 'delete') {
          this.type = '新增'
        } else if (this.type === 'update') {
          this.type = '修改'
        } else if (this.type === 'delete') {
          this.type = '删除'
        }
      })
    },
    approval() {
      this.savebutton = true
      if (this.formObj.approvalStatus === 1 && this.type === '删除') {
        this.formObj.approvalStatus = 3
      }
      this.formObj.wfTaskId = this.wfTaskId
      this.formObj.authId = this.authId
      approval(this.formObj).then(response => {
        this.savebutton = false
        this.$router.push({ path: '/satp-task/netScan/netAuth' })
      })
    }

  }
}
</script>
