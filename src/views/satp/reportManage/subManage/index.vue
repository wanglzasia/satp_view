<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" size="small">
      <el-form-item label="订阅状态">
        <el-input v-model="ruleForm.subStsLabel" :disabled="true" />
      </el-form-item>
      <el-form-item label="订阅类型" prop="sub_type">
        <el-radio-group v-model="ruleForm.sub_type">
          <el-radio label="1">月报</el-radio>
          <el-radio label="2">季报</el-radio>
          <el-radio label="3">年报</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报告时间" prop="report_date">
        <el-date-picker
          v-model="ruleForm.report_date"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="savebutton" @click="submitForm('1')">确认订阅</el-button>
        <el-button type="primary" :loading="savebutton" @click="submitForm('0')">取消订阅</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        report_date: '',
        sub_type: '',
        subStsLabel: ''
      },
      rules: {
        report_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        sub_type: [
          { required: true, message: '请选择订阅类型', trigger: 'change' }
        ]
      },
      subSts: '',
      subType: '',
      savebutton: false
    }
  },
  created() {
    this.querySubReport()
  },
  methods: {
    querySubReport() {
      this.$store.dispatch('reportManage/querySubReport', {}).then(response => {
        this.ruleForm = response
        if (response.sub_sts === '1') {
          this.ruleForm.subStsLabel = '已订阅'
        } else {
          this.ruleForm.subStsLabel = '未订阅'
        }
      }).catch(() => {
      })
    },
    submitForm(subSts) {
      this.$refs['ruleForm'].validate((valid) => {
        window.console.info(this.ruleForm)
        let url = ''
        const param = {}
        if (subSts === '1') {
          url = 'reportManage/subManage'
        } else {
          url = 'reportManage/cancelSubManage'
        }
        param.sub_sts = subSts
        param.sub_type = this.ruleForm.sub_type
        param.report_date = this.ruleForm.report_date
        if (valid) {
          this.savebutton = true
          this.$store.dispatch(url, param).then(response => {
            this.savebutton = false
            if (response.RET_CODE === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            this.querySubReport()
          }).catch(() => {
            this.savebutton = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
