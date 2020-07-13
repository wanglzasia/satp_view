<template>
  <div style="text-align: left">
    <el-button style="margin: 18px 2%;" class="add-button" type="primary" @click="dialogFormVisible = true">添加根节点</el-button>
    <el-dialog
      title="添加文档目录"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="fileTypeForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="fileTypeName">
          <el-input
            v-model="fileTypeForm.name"
            type="text"
            auto-complete="off"
            placeholder="文档目录名称"
          />
        </el-form-item>
        <el-form-item prop="fileTypeCode">
          <el-input
            v-model="fileTypeForm.code"
            type="text"
            auto-complete="off"
            placeholder="文档代码"
          />
        </el-form-item>
        <el-form-item prop="desc">
          <el-input
            v-model="fileTypeForm.desc"
            type="text"
            auto-complete="off"
            placeholder="描述"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="createFileType">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MenuCreate',
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '文档目录名称不能为空', trigger: 'blur' }]
      },
      checked: true,
      fileTypeForm: {
        name: '',
        code: '',
        desc: ''
      },
      loading: false
    }
  },
  methods: {
    clear() {
      this.fileTypeForm = {
        name: '',
        code: '',
        desc: ''
      }
    },
    createFileType() {
      this.$store.dispatch('docManage/fileTypeAdd', {
        fileTypeName: this.fileTypeForm.name,
        fileTypeCode: this.fileTypeForm.code,
        fileTypeDesc: this.fileTypeForm.desc,
        pFileTypeId: 0
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
