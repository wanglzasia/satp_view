<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="5">
          <span class="titles">制度管理</span>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-form ref="elForm" :model="queryArgs" size="medium" label-width="100px">
          <el-col :span="4">
            <el-form-item label="发文名称" prop="ip">
              <el-input v-model="queryArgs.fileName" placeholder="发文名称" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="发文文号" prop="port">
              <el-input v-model="queryArgs.docNo" placeholder="发文文号" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="制度类型" prop="fileType">
              <el-select :value="fileTypeValueTitleSearch" :clearable="clearable" @clear="fileTypeClearHandleSearch">
                <el-option :value="fileTypeValueTitleSearch" :label="fileTypeValueTitleSearch">
                  <el-tree
                    id="fileType-tree-search"
                    ref="selectFileTypeTreeSearch"
                    :accordion="accordion"
                    :data="fileTypes"
                    :props="fileTypeProps"
                    :node-key="fileTypeProps.id"
                    @node-click="fileTypeHandleNodeClickSearch"
                  />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item size="large" style="float: left;">
              <el-button type="primary" icon="el-icon-search" @click="searchData()">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="showDialog({},'add')">新增</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div>
      <template>
        <el-tabs>
          <el-tab-pane>
            <el-table
              v-loading="loading"
              class="elTable"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(185, 185, 185, 0.1)"
              :data="tableData"
              stripe
              style="width: 100%"
            >
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
                <template slot-scope="scope">
                  <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.field],scope.row.format) }}</span>
                  <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle title="修改" @click="showDialog(scope.row,'edit')" />
                  <el-button type="danger" icon="el-icon-delete" circle title="删除" @click.native.prevent="deletePolicyFile(scope.row)" />
                  <el-button type="success" icon="el-icon-s-promotion" circle title="审批" @click.native.prevent="approval(scope.row) " />
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top:10px">
              <el-pagination
                :current-page="elePagination.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="elePagination.pageSize"
                layout="total, sizes, prev, pager, next,jumper"
                :total="elePagination.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div>

      <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="30%" :model="formObj" @close="cancle">
        <el-form ref="ruleForm" :rules="formRule" :model="formObj" label-width="110px" @submit.native.prevent>
          <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="发文名称" prop="fileName">
                <el-input v-model="formObj.fileName" placeholder="发文名称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="可见组织" prop="org">
                <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
                  <el-option :value="valueTitle" :label="valueTitle">
                    <el-tree
                      id="tree-option"
                      ref="selectTree"
                      :accordion="accordion"
                      :data="orgs"
                      :props="props"
                      :node-key="props.id"
                      @node-click="handleNodeClick"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="制度类型" prop="fileType">
                <el-select :value="fileTypeValueTitle" :clearable="clearable" @clear="fileTypeClearHandle">
                  <el-option :value="fileTypeValueTitle" :label="fileTypeValueTitle">
                    <el-tree
                      id="fileType-tree"
                      ref="selectFileTypeTree"
                      :accordion="accordion"
                      :data="fileTypes"
                      :props="fileTypeProps"
                      :node-key="fileTypeProps.id"
                      @node-click="fileTypeHandleNodeClick"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="发文时间" prop="policyTime">
                <el-date-picker
                  v-model="formObj.policyTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="生效日期"
                  clearable
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="制度来源" prop="source">
                <el-input v-model="formObj.source" placeholder="制度来源" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="发文文号" prop="docNo">
                <el-input v-model="formObj.docNo" placeholder="发文文号" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="上传附件" prop="upload">
                <el-upload
                  class="upload-demo"
                  action="/proxy/rbac/base/fileUpload"
                  :data="datas"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle()">取消</el-button>
          <el-button type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => { return [] }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      queryArgs: {},
      savebutton: false,
      dialogFormVisible: false,
      formAttr: {
        // 弹出框属性
        title: '',
        type: '',
        formLabelWidth: '130px'
      },
      formObj: {
      },
      formRule: {// 验证必填项
        fileName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        docNo: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]

      },
      tableData: [],
      loading: true,
      tableThead: [
        { 'id': '2', 'field': 'fileName', 'fieldType': 'text', 'text': '发文名称', 'align': 'left' },
        { 'id': '3', 'field': 'fileTypeName', 'fieldType': 'text', 'text': '制度类型', 'align': 'left' },
        { 'id': '4', 'field': 'source', 'fieldType': 'text', 'text': '制度来源', 'align': 'left' },
        { 'id': '5', 'field': 'docNo', 'fieldType': 'text', 'text': '发文文号', 'align': 'left' },
        { 'id': '6', 'field': 'policyTime', 'fieldType': 'datetime', 'text': '发文时间', 'align': 'left' },
        { 'id': '7', 'field': 'crtTime', 'fieldType': 'datetime', 'text': '创建时间', 'align': 'left' },
        { 'id': '8', 'field': 'auditState', 'fieldType': 'text', 'text': '审核状态', 'align': 'left' }
      ],
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userWindowVisible: false,
      props: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      fileTypeProps: {
        id: 'id',
        label: 'fileTypeName',
        children: 'children'
      },
      orgs: [],
      fileTypes: [],
      valueId: '', // 初始值
      valueTitle: '',
      fileTypeValueId: '', // 初始值
      fileTypeValueTitle: '',
      fileTypeValueIdSearch: '', // 初始值
      fileTypeValueTitleSearch: '',
      fileList: [],
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      datas: {
        fileType: 'systemManage',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      },
      idx: '',
      fileIdx: '',
      url: '',
      name: ''
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
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
    this.getTableData()
  },
  mounted() {
    this.listOrgs()
    this.listFileTypes()
  },
  methods: {
    listOrgs() {
      var _this = this
      this.$store.dispatch('org/list').then(resp => {
        _this.orgs = resp.data
      })
    },
    listFileTypes() {
      var _this = this
      this.$store.dispatch('systemManage/listFileTypes').then(resp => {
        _this.fileTypes = resp.data
      })
    },
    // 查询当前条件
    searchData() {
      this.getTableData()
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.elePagination.pageNum = val
      this.getTableData()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.getTableData()
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    saveForm() {
      // 遍历附件信息，分为加载已有的附件以及新上传的附件
      this.fileList.forEach(fileList => {
        // 新上传的附件
        if (fileList.response) {
          const files = fileList.response.files
          files.forEach(file => {
            if (this.fileIdx === '') {
              this.fileIdx = file.idx
            } else {
              this.fileIdx = this.fileIdx + ',' + file.idx
            }
          })
        } else {
          if (this.fileIdx === '') {
            this.fileIdx = fileList.idx
          } else {
            this.fileIdx = this.fileIdx + ',' + fileList.idx
          }
        }
      })
      if (this.fileIdx === '') {
        this.$message.warning(`请上传附件`)
        return
      }
      const $self = this
      this.savebutton = true
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let url = ''
          if ($self.formAttr.formType === 'add') {
            url = 'systemManage/addPolicyFile'
          } else if ($self.formAttr.formType === 'edit') {
            url = 'systemManage/updatePolicyFile'
          } else {
            this.formAttr.title = `详情`
          }
          $self.formObj.operOrg = this.valueId
          $self.formObj.fileIdx = this.fileIdx
          $self.formObj.fileType = this.fileTypeValueId
          $self.formObj.isFile = 0
          this.$store.dispatch(url, $self.formObj).then(response => {
            $self.savebutton = false
            $self.formObj = {}
            this.fileIdx = ''
            $self.getTableData()
            $self.dialogFormVisible = false
            $self.$message({
              message: '操作成功！',
              type: 'success'
            })
          })
        } else {
          $self.savebutton = false
          return false
        }
      })
    },
    deletePolicyFile(row) {
      const $self = this
      const policyFile = { id: row.id }
      this.$confirm(`您确认要删除吗?`)
        .then(() => {
          this.$store.dispatch('systemManage/deletePolicyFile', policyFile).then(response => {
            $self.getTableData()
            $self.$message({
              message: `删除操作成功！`,
              type: 'success'
            })
          })
        }).catch(() => {})
    },
    // 获取当前tables数据
    getTableData() {
      const $self = this
      $self.loading = true
      const params = JSON.parse(JSON.stringify($self.queryArgs))
      params.pageNum = this.elePagination.pageNum
      params.pageSize = this.elePagination.pageSize
      params.isFile = 0
      params.fileType = this.fileTypeValueIdSearch
      this.$store.dispatch('systemManage/policyFileList', params).then(response => {
        response.rows.forEach(row => {
          if (row.auditState === 1) {
            row.auditState = '已审核'
          } else if (row.auditState === 0) {
            row.auditState = '待审核'
          }
        })
        $self.loading = false
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        this.rowsFormatter(response.rows)
        // this.queryArgs = {}
      }).catch(error => {
        console.log(error)
      })
    },
    rowsFormatter(data) {
      for (let index = 0; index < data.length; index++) {
        var row = data[index]
        if (row.approvalStatus === 1) {
          this.tableData[index].approvalStatus = '通过'
        } else if (row.approvalStatus === 2) {
          this.tableData[index].approvalStatus = '未通过'
        } else if (row.approvalStatus === 0) {
          this.tableData[index].approvalStatus = '未审批'
        }
      }
    },
    approval(row) {
      const $self = this
      if (row.auditState === '已审核') {
        this.$message({
          message: '禁止重复审核',
          type: 'warning'
        })
        return
      } else {
        const policyFile = { id: row.id, auditState: 1 }
        this.$store.dispatch('systemManage/updatePolicyFile', policyFile).then(response => {
          if (response && response.RET_CODE === '0') {
            $self.getTableData()
            $self.$message({
              message: `审核成功`,
              type: 'success'
            })
          }
        })
      }
    },
    // 显示弹出框判断是添加还是编辑该节点
    showDialog(row, type) {
      const $self = this
      this.savebutton = false
      this.fileList = []
      event.stopPropagation()
      if (type === 'add') {
        this.formAttr.title = `新增`
        this.clearHandle()
        this.fileTypeClearHandle()
      } else if (type === 'edit') {
        this.formAttr.title = `修改`
      } else {
        this.formAttr.title = `详情`
      }
      const policyFile = { id: row.id, isFile: 0 }
      if (type === 'edit') {
        this.$store.dispatch('systemManage/findPolicyFile', policyFile).then(response => {
          this.formObj = {}
          // 深克隆
          this.formObj = Object.assign({}, response.policyFile)
          // 附件信息，如果业务表里的附件id不存在，不会报错
          if (response.policyFile.fileList) {
            this.fileList = response.policyFile.fileList
          }
          this.valueTitle = this.formObj.orgName
          this.valueId = this.formObj.operOrg
          this.fileTypeValueTitle = this.formObj.fileTypeName
          this.fileTypeValueId = this.formObj.fileType
        })
      }
      this.formAttr.formType = type
      $self.dialogFormVisible = true
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label]
      this.valueId = node[this.props.id]
      this.$emit('getValue', this.valueId)
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.clearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },

    // 切换选项
    fileTypeHandleNodeClick(node) {
      this.fileTypeValueTitle = node[this.fileTypeProps.label]
      this.fileTypeValueId = node[this.fileTypeProps.id]
      this.$emit('getValue', this.fileTypeValueId)
    },
    // 清除选中
    fileTypeClearHandle() {
      this.fileTypeValueTitle = ''
      this.fileTypeValueId = null
      this.fileTypeClearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    fileTypeClearSelected() {
      const allNode = document.querySelectorAll('#fileType-tree .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    // 切换选项
    fileTypeHandleNodeClickSearch(node) {
      this.fileTypeValueTitleSearch = node[this.fileTypeProps.label]
      this.fileTypeValueIdSearch = node[this.fileTypeProps.id]
      this.$emit('getValue', this.fileTypeValueId)
    },
    // 清除选中
    fileTypeClearHandleSearch() {
      this.fileTypeValueTitleSearch = ''
      this.fileTypeValueIdSearch = null
      this.fileTypeClearSelectedSearch()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    fileTypeClearSelectedSearch() {
      const allNode = document.querySelectorAll('#fileType-tree-search .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    handleRemove(file, fileList) {
      // 只有新上传的附件才会有response
      if (file.response) {
        const files = file.response.files
        // 由于本业务只允许上传一个附件，所以这么写。如果支持多附件，需要循环删除
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
        if (file.idx === this.idx) {
          this.fileList.splice(i, 1)
        }
      })
    },
    handlePreview(file) {
      if (file.response) {
        file.response.files.forEach(file => {
          this.url = file.fileUrl
        })
      } else {
        this.url = file.url
      }
      const params = { realName: file.name, fileUrl: this.url }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      this.fileList.push(file)
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
    }
  }
}
</script>
<style>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
}
