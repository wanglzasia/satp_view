<template>
  <el-card class="box-card">
    <div class="satp-grid-title">基本信息</div>
    <el-row>
      <table class="satp-table-detail" style="margin-bottom:20px">
        <tr>
          <th>资产名称</th>
          <td colspan="5">{{ scheWlist.assetName }}</td>
        </tr>
        <tr>
          <th>地址</th>
          <td colspan="5">{{ scheWlist.ipAddress }}</td>
        </tr>
        <tr>
          <th>资产类型</th>
          <td>{{ scheWlist.assetTypeName }}</td>
          <th>申请类别</th>
          <td>{{ typeName }}</td>
        </tr>
        <tr>
          <th>组织机构</th>
          <td>{{ scheWlist.orgName }}</td>
          <th>责任人</th>
          <td>{{ scheWlist.respUserName }}</td>
        </tr>
        <tr>
          <th>检测类型</th>
          <td>{{ scheWlist.chkType==0 ?'暂不扫描':'定时扫描' }}{{ scheWlist.scanDate }}</td>
          <th>扫描类型</th>
          <td>{{ scheWlist.scanType }}</td>
        </tr>

        <tr>
          <th>报备原因</th>
          <td colspan="5">{{ scheWlist.approvalReason }}</td>
        </tr>
      </table>
    </el-row>
    <div class="satp-grid-title">审核处理</div>
    <div>
      <el-row>
        <el-form :model="formObj" label-width="100px" size="small">
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
      id: 0,
      type: '',
      typeName: '',
      formAttr: {},
      scheWlist: {},
      formObj: {},
      savebutton: false,
      approvalStatusOption: [
        {
          value: 1,
          label: '通过'
        }, {
          value: 2,
          label: '驳回'
        }, {
          value: 3,
          label: '不适用'
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
    }
  },
  watch: {},
  created() {
    if (this.$route.query.type === 'insert') {
      this.typeName = '新增'
    } else if (this.$route.query.type === 'update') {
      this.typeName = '修改'
    } else if (this.$route.query.type === 'delete') {
      this.typeName = '删除'
    }

    this.findScheWlist()
  },
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    },
    findScheWlist() {
      let params
      let url = ''
      if (this.$route.query.type === 'update') {
        url = 'scheWlist/findScheWlistByUpdateId'
        params = { updateId: this.$route.query.busiId }
      } else {
        url = 'scheWlist/findScheWlist'
        params = { id: this.$route.query.busiId }
      }
      this.$store.dispatch(url, params).then(response => {
        this.scheWlist = response.scheWlist

        if (this.scheWlist.scanType === 'VULN') {
          this.scheWlist.scanType = '系统漏扫'
        } else if (this.scheWlist.scanType === 'BASE') {
          this.scheWlist.scanType = '基线'
        } else if (this.scheWlist.scanType === 'WEB') {
          this.scheWlist.scanType = 'WEB漏扫'
        }

        if (this.scheWlist.startTime) {
          this.scheWlist.scanDate = this.moment(this.scheWlist.startTime).format('YYYY-MM-DD HH:mm:ss') + '--' + this.moment(this.scheWlist.endTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    },
    approval() {
      this.savebutton = true
      const params = { id: this.$route.query.busiId, taskId: this.$route.query.taskId, type: this.$route.query.type, approvalStatus: this.formObj.approvalStatus }
      this.$store.dispatch('scheWlist/approval', params).then(response => {
        this.$router.push({ path: '/satp-task/whiteList/list' })
        this.$message({
          message: `操作成功！`,
          type: 'success'
        })
      })
    }

  }
}
</script>
