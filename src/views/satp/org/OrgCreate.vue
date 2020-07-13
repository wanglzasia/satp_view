<template>
  <div style="text-align: left">
    <el-button style="margin: 18px 2%;" class="add-button" type="primary" @click="dialogFormVisible = true">添加根节点</el-button>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="orgForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="orgForm.name"
            type="text"
            auto-complete="off"
            placeholder="部门名称"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="createOrg">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrgCreate',
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }]
      },
      checked: true,
      orgForm: {
        name: ''
      },
      loading: false
    }
  },
  methods: {
    clear() {
      this.orgForm = {
        name: ''
      }
    },
    createOrg() {
      this.$store.dispatch('org/add', {
        name: this.orgForm.name
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clear()
          this.dialogFormVisible = false
          this.$emit('onSubmit')
        } else {
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>
