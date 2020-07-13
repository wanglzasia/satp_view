<template>
  <el-upload
    class="upload-demo"
    action="/proxy/rbac/base/fileUpload"
    :data="qrydata"
    :headers="headers"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :limit="numlimit"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button type="primary" :disabled="disabled">上传<i class="el-icon-upload el-icon--right" /></el-button>
  </el-upload>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    // 如果不传limit默认只能上传一个文件
    numlimit: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    // eslint-disable-next-line vue/require-default-prop
    qrydata: Object,
    fileList: { type: Array, default: () => { return [] } }
  },
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      idx: '',
      fileIdx: '',
      fileUrl: ''
    }
  },

  methods: {
    handleRemove(file, fileList) {
      // 只有新上传的附件才会有response
      if (file.response) {
        const files = file.response.files
        files.forEach(file => {
          this.idx = file.idx
        })
      } else {
        this.idx = file.idx
      }
      const fileUpLoad = { idx: this.idx }
      this.$store.dispatch('base/delFileUpLoad', fileUpLoad).then(response => {
        if (response && response.RET_CODE === '0') {
          this.$alert('删除成功')
        }
      })
      this.fileList.forEach((file, i) => {
        if (file.response) {
          const files = file.response.files
          files.forEach(file => {
            if (file.idx === this.idx) {
              this.fileList.splice(i, 1)
            }
          })
        } else {
          if (file.idx === this.idx) {
            this.fileList.splice(i, 1)
          }
        }
      })
      this.getFileList()
    },
    handlePreview(file) {
      this.fileUrl = file.fileUrl

      const params = { realName: file.name, fileUrl: this.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      if (response.RET_CODE === '0') {
        response.files.forEach(file => {
          file.name = file.realName
          file.url = file.fileUrl
          this.fileList.push(file)
        })
      }
      this.getFileList()
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const extension3 = testmsg === 'doc'
      const extension4 = testmsg === 'txt'
      const extension5 = testmsg === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5) {
        this.$message({
          message: '上传文件只能是 xls、xlsx、doc、txt、docx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }
      return extension || extension2 || extension3 || extension4 || extension5 && isLt2M
    },
    getFileList() {
      const $self = this
      if ($self.fileList.length > 0) {
        this.$emit('getFileList', $self.fileList)
      }
    }
  }

}
</script>
