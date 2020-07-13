<template>
  <div>
    <div class="app-container">
      <el-card>
        <div>
          <el-form
            :inline="true"
            :model="formQueryParams"
            label-position="right"
            label-width="80px"
            size="small"
            class="demo-form-inline"
          >
            <el-row style="padding-top: 20px;">
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input v-model="formQueryParams.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Key">
                  <el-input v-model="formQueryParams.key" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" @click="getProcessList">查询</el-button>
                  <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--新增弹窗-->
          <el-dialog title="新增流程" :visible.sync="addDialogVisible">
            <el-upload
              class="upload-demo"
              drag
              :headers="headers"
              action="/proxy/satp/workflow/deploy"
              :on-success="deploySuccess"
              :on-error="deployError"
              multiple
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-dialog>
        </div>

        <!--datagrid表格-->
        <satp-datagrid
          ref="datagridTest"
          :url="url"
          :qparams="formQueryParams"
          :columns="columns"
          border
          @operClick="operClick"
        />

        <div>

          <!--弹窗展示xml或图片-->
          <el-dialog :title="procTitle" :width="width" :visible.sync="procDialogVisible" @closed="closeProcDialog">
            <div v-if="imgView">
              <img ref="img" class="code-img-box" :src="codeImg" alt="">
            </div>
            <div v-if="xmlView">
              <el-input v-model="procXml" type="textarea" rows="10" />
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeProcDialog">关 闭</el-button>
            </span>
          </el-dialog>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import workflow from '@/api/satp/workflow/workflow'
import { getToken } from '../../../../utils/auth'
import datagrid from '@/components/datagrid/datagrid'

export default {
  components: { 'satp-datagrid': datagrid },
  data() {
    return {
      url: 'workflow/processList',
      formQueryParams: {
        name: '',
        key: ''
      },
      columns: [
        { label: 'ProcDefId', prop: 'id', width: 150, align: 'left' },
        { label: 'DeployId', prop: 'deploymentId', width: 120, align: 'center' },
        { label: '名称', prop: 'name', width: 150, align: 'left' },
        { label: 'Key', prop: 'key', width: 120, align: 'left' },
        { label: '版本号', prop: 'version', width: 120, align: 'center' },
        { label: '流程xml', prop: 'proc', width: 120, align: 'center', actions: [{ prop: 'xml', type: 'success', label: 'xml' }] },
        { label: '流程图片', prop: 'proc', width: 120, align: 'center', actions: [{ prop: 'img', type: 'success', label: '图片' }] },
        { label: '部署时间', prop: 'deploymentTime', width: 150, align: 'center', formatter: this.deploymentTimeFormatter },
        {
          label: '操作',
          align: 'center',
          actions: [
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }
      ],
      addDialogVisible: false,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      procDialogVisible: false,
      procTitle: '',
      codeImg: '',
      width: '',
      procXml: '',
      imgView: false,
      xmlView: false
    }
  },
  computed: {
    /* dateFormat() {
      return function(el) {
        const value = this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
        // eslint-disable-next-line no-irregular-whitespace
        return value
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
    }*/
  },
  created() {
  },
  methods: {
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'delete':
          this.deleteProcess(row)
          break
        case 'xml':
          this.processXml(row)
          break
        case 'img':
          this.processPicture(row)
          break
        default:
          break
      }
    },
    // 流程列表
    getProcessList() {
      this.$refs['datagridTest'].reload()
    },
    // 删除流程
    deleteProcess(row) {
      this.$confirm('确认删除 ' + row.name + ' 流程吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        workflow.deleteProcess({ 'deploymentId': row.deploymentId }).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          // console.log(res)
          this.getProcessList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    // 查看流程xml
    processXml(row) {
      this.xmlView = true
      this.procTitle = '流程xml'
      this.procDialogVisible = true
      const params = { 'processDefinitionId': row.id, 'resourceType': 'xml' }
      workflow.processXmlResource(params).then(res => {
        // console.log(res)
        this.procXml = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看流程图
    async processPicture(row) {
      this.procTitle = '流程图片'
      this.imgView = true
      this.procDialogVisible = true
      const params = { 'processDefinitionId': row.id, 'resourceType': 'image' }
      // 设置请求为同步，当图片渲染成功后，获取图片宽度，以调整弹窗宽度
      await workflow.processPicResource(params).then(res => {
        const bufferUrl = btoa(new Uint8Array(res).reduce((body, byte) => body + String.fromCharCode(byte), ''))
        this.codeImg = 'data:image/png;base64,' + bufferUrl
        // console.log(this.codeImg)
      }).catch(err => {
        console.log(err)
      })
      // console.log(this.$refs.img.clientWidth)
      // 为弹窗设置宽度
      this.width = this.$refs.img.clientWidth + 40 + 'px'
      // console.log(this.width)
    },
    // 关闭流程图片和xml弹窗的回调
    closeProcDialog() {
      this.procDialogVisible = false
      // console.log('关闭弹窗啦')
      this.imgView = false
      this.xmlView = false
    },
    // 新增流程成功执行函数
    deploySuccess(response, file, fileList) {
      console.log('新增流程成功执行函数')
      this.addDialogVisible = false
      console.log(response)
      this.$message({
        message: response.data,
        type: 'success'
      })
      this.getProcessList()
    },
    // 新增流程失败执行函数
    deployError(err, file, fileList) {
      console.log(err)
      this.$message({
        message: err.data,
        type: 'error'
      })
    },
    //
    deploymentTimeFormatter(row) {
      return this.datetimeFormat(row.deploymentTime)
    },
    // 时间转换
    datetimeFormat(el) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      let value = ''
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    }
  }
}
</script>

<style scoped>

</style>
