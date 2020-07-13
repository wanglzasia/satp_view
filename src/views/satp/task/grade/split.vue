<template>
  <div>
    <div v-loading="taskLoading" class="app-container">
      <el-card>
        <div>
          <el-row>
            <el-col :span="6">
              <div style="margin-right:20px">
                <div class="block">
                  <el-tree
                    ref="taskTree"
                    :props="props"
                    :load="loadNode"
                    node-key="taskId"
                    lazy
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                  >
                    <span slot-scope="{ node,data }" class="custom-tree-node">
                      <span>{{ node.label }}</span>
                      <span>
                        <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-plus"
                          @click="() => appendNode(node,data)"
                        />
                        <el-popconfirm
                          title="确认删除这个子任务？"
                          @onConfirm="removeNode(node,data)"
                        >
                          <el-button
                            v-if="data.taskId !== taskId "
                            slot="reference"
                            type="text"
                            size="mini"
                            icon="el-icon-delete"
                          />
                        </el-popconfirm>
                      </span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="配置合规项" name="first">
                  <div>
                    <el-row>
                      <satp-datagrid
                        ref="itemGridDest"
                        :url="b.url"
                        :qparams="b.params"
                        :columns="chkTypeColumns"
                        :height="tableHeight"
                        :pagesizes="pagesizes"
                        :toolbar="b.toolbar"
                        checkbox
                        class="satp-grid-mini"
                        @toolbarClick="toolbarClick"
                      />
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="配置资产" name="second">
                  <div>
                    <el-row>
                      <satp-datagrid
                        ref="assetGridDest"
                        :url="d.url"
                        :qparams="d.params"
                        :columns="d.columns"
                        :height="tableHeight"
                        checkbox
                        :toolbar="d.toolbar"
                        class="satp-grid-mini"
                        @toolbarClick="toolbarClick"
                      />
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <div style="text-align:right;margin-top:10px;">
            <el-button type="success" icon="el-icon-check" size="mini" @click="gradeSplitDone">拆分完成</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div>
      <el-dialog
        :title="dlgTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleBeforeClose"
        :model-append-to-body="true"
        :close-on-click-modal="false"
        class="satp-dlg"
      >
        <el-form
          ref="dataAddForm"
          :model="dataAddForm"
          :rules="dataAddrules"
          :label-position="labelPosition"
          label-width="100px"
          size="small"
          class="satp-form-label-top"
        >

          <el-form-item label="父任务ID" prop="parentTaskId" style="display:none">
            <el-input v-model="dataAddForm.parentTaskId" />
          </el-form-item>

          <el-form-item label="子任务名称" prop="taskName">
            <el-input v-model="dataAddForm.taskName" placeholder="子任务名称" />
          </el-form-item>
          <el-form-item label="要求完成时间" prop="closeTime">
            <el-date-picker
              v-model="dataAddForm.closeTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item label="任务责任人" prop="taskOwner">
            <el-input v-model="dataAddForm.taskOwner" placeholder="任务责任人" @click.prevent.native="getDataRootUser" />
          </el-form-item>

          <el-form-item label="任务责任人ID" prop="taskOwnerId" style="display:none">
            <el-input v-model="dataAddForm.taskOwnerId" />
          </el-form-item>

          <el-form-item label="备注" prop="taskDesc">
            <el-input v-model="dataAddForm.taskDesc" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="任务备注" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" size="small" @click="closeAddDlg">取 消</el-button>
          <el-button type="primary" size="small" @click="saveTask('dataAddForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <user-window
        v-if="userWindowVisible"
        :title="title"
        :parent-component-param="parentComponentParam"
        :multiple="multiple"
        :visible.sync="userWindowVisible"
        :modal-append-to-body="false"
        @getUserInfo="getUserInfo"
      />
    </div>
    <div>
      <assign-window
        v-if="assetWindowVisible"
        :title="assetWinTitle"
        :url="assetUrl"
        :multiple="assetMultiple"
        :visible.sync="assetWindowVisible"
        :modal-append-to-body="false"
        :taskid="selTaskId"
        datatype="asset"
        @getAssetInfo="getAssetInfo"
      />
    </div>
    <div>
      <task-item
        v-if="itemWinShow"
        :title="itemWinTitle"
        :url="itemUrl"
        :multiple="itemMultiple"
        :visible.sync="itemWinShow"
        :modal-append-to-body="false"
        :taskid="selTaskId"
        datatype="item"
        :chktype="itemType"
        @getItemInfo="getItemInfo"
      />
    </div>
  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagrid.vue'
import userInfo from '@/components/Userwindow/index.vue'
import taskassign from '@/components/TaskConfig/taskasset.vue'
import taskitem from '@/components/TaskConfig/taskitem.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo, 'task-item': taskitem, 'assign-window': taskassign },
  data() {
    return {
      taskId: this.$route.params.taskId,
      actTaskId: this.$route.query.taskId,
      chkType: 'grade',
      gNode: '',
      treeUrl: '',
      menuVisible: false,
      taskLoading: false,
      activeName: 'first',
      selTaskId: this.$route.params.taskId,

      // 资产配置
      assetWindowVisible: false,
      assetUrl: 'task/loadGradeAssetData',
      assetWinTitle: '',
      assetMultiple: true,
      // 检查项配置
      itemWinShow: false,
      itemUrl: 'task/loadGradeItemData',
      itemWinTitle: '',
      itemMultiple: true,
      itemType: 'GRADE',

      //
      labelPosition: 'top',
      dlgTitle: '拆分任务',
      props: {
        label: 'taskName',
        isLeaf: 'leaf'
      },

      b: {
        url: 'task/loadGradeItemData',
        params: {
          taskId: this.$route.params.taskId,
          dataType: 'assign'
        },
        toolbar: [
          { label: '选择', prop: 'addItem', type: 'primary', size: 'mini', icon: 'el-icon-plus' },
          { label: '移除', prop: 'removeItem', type: 'primary', size: 'mini', icon: 'el-icon-delete' }
        ]
      },

      pagesizes: [20, 30, 40],

      chkTypeColumns: [
        { label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
        { label: '合规项名称', prop: 'itemName' },
        { label: '合规项类型', prop: 'chkType', width: 100 }
      ],

      tableHeight: 200,

      d: {
        url: 'task/loadGradeAssetData',
        params: {
          taskId: this.$route.params.taskId,
          dataType: 'assign'
          // parentTaskId: this.$route.params.taskId
        },
        columns: [
          { label: '资产ID', prop: 'assetId', align: 'left', width: 80 },
          { label: '名称', prop: 'assetName', align: 'left' },
          { label: '地址', prop: 'logicAddr', align: 'left' },
          { label: '类型', prop: 'typeName', align: 'left' },
          { label: '归属组织', prop: 'orgName' },
          { label: '安全员', prop: 'secAdmName' }
        ],
        toolbar: [
          { label: '选择', prop: 'addAsset', type: 'primary', size: 'mini', icon: 'el-icon-plus' },
          { label: '移除', prop: 'removeAsset', type: 'primary', size: 'mini', icon: 'el-icon-delete' }
        ]
      },
      assetcolumns: [
        { label: '资产ID', prop: 'assetId', align: 'left', width: 80 },
        { label: '名称', prop: 'assetName', align: 'left' },
        { label: '地址', prop: 'logicAddr', align: 'left' },
        { label: '类型', prop: 'typeName', align: 'left' },
        { label: '归属组织', prop: 'orgName' },
        { label: '安全员', prop: 'secAdmName' }
      ],
      assignColumns: [
        { label: '资产ID', prop: 'assetId', align: 'left', width: 80 },
        { label: '名称', prop: 'assetName', align: 'left' },
        { label: '资产地址', prop: 'logicAddr', align: 'left' },
        { label: '检查类型', prop: 'toolChkType', align: 'left', formatter: this.chkTypeFormatter },
        { label: '类型', prop: 'typeName', align: 'left' },
        { label: '归属组织', prop: 'orgName' },
        { label: '安全员', prop: 'secAdmName' }
      ],
      parentTaskName: '',
      // 增加相关
      dataAddForm: {
        parentTaskId: '',
        taskName: '',
        taskSource: '1',
        closeTime: '',
        taskOwner: '',
        taskOwnerId: '',
        taskDesc: '',
        taskType: 'grade'
      },
      dataAddrules: {
        taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        taskOwner: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        taskOwnerId: [{ required: true, message: '请输选择用户', trigger: 'blur' }],
        closeTime: [{ required: true, message: '请选择要求完成时间', trigger: 'blur' }],
        taskDesc: [{ required: false, message: '任务描述', trigger: 'blur' }]
      },
      dialogVisible: false,
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户' // 弹出框标题
    }
  },
  created() {
    this.tableHeight = window.innerHeight - 275
  },
  methods: {
    loadNode(node, resolve) {
      let params = []
      // 不同级别，加载的资产、检查项数据不同
      if (node.level === 0) {
        params = { 'taskId': this.taskId }
        this.treeUrl = 'task/loadTask'
        this.d.taskId = this.taskId
        this.d.columns = this.assetcolumns
      } else {
        params = { 'taskId': node.key }
        this.treeUrl = 'task/loadSubTaskTree'
        this.d.taskId = node.key
        this.d.columns = this.assignColumns
      }
      // ajax 加载task
      this.taskLoading = true
      this.$store.dispatch(this.treeUrl, params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          const treeData = this.taskArrayToTreeData(resp.task)
          return resolve(treeData)
        }
      }).catch(() => {
        this.taskLoading = false
      })
      this.taskLoading = false
    },
    // 查询结果进行格式化
    taskArrayToTreeData(task) {
      const treeData = []
      let taskId = ''
      let taskName = ''
      let leaf = false
      for (var i = 0; i < task.length; i++) {
        taskId = task[i].taskId
        taskName = task[i].taskName
        leaf = task[i].hasChild
        if (leaf === 'Y') {
          leaf = false
        } else {
          leaf = true
        } // 无子任务 ,那么就是叶子节点
        treeData.push({ 'id': taskId, 'taskId': taskId, 'taskName': taskName, 'leaf': leaf, children: [] })
      }

      return treeData
    },
    // 鼠标左键点击树形控件的节点
    handleNodeClick(data) {
      this.d.params.taskId = data.taskId
      this.b.params.taskId = data.taskId

      this.dataAddForm.parentTaskId = data.taskId
      this.parentTaskName = data.taskName
      this.dlgTitle = '拆分' + data.taskName
      this.selTaskId = data.taskId

      if (this.selTaskId === this.taskId) {
        this.d.taskId = this.taskId
        this.d.columns = this.assetcolumns
      } else {
        this.d.taskId = this.selTaskId
        this.d.columns = this.assignColumns
      }
      this.$refs.itemGridDest.reload()
      this.$refs.assetGridDest.reload()
    },
    // 工具栏按钮相应事件
    toolbarClick(data) {
      const { prop } = data
      switch (prop) {
        case 'addAsset':
          if (this.taskId === this.selTaskId) {
            this.$message({
              showClose: true,
              message: '根节点资产不能添加资产',
              type: 'warning'
            })
          } else {
            this.showAssetDlg()
          }
          break
        case 'removeAsset':
          // 移除已选资产
          if (this.taskId === this.selTaskId) {
            this.$message({
              showClose: true,
              message: '根节点资产不能移除资产',
              type: 'warning'
            })
          } else {
            this.removeAsset()
          }
          break
        case 'addItem':
          // 添加合规项
          if (this.taskId === this.selTaskId) {
            this.$message({
              showClose: true,
              message: '根节点资产不能添加合规项',
              type: 'warning'
            })
          } else {
            this.showItemDlg()
          }
          break
        case 'removeItem':
          // 移除合规项
          if (this.taskId === this.selTaskId) {
            this.$message({
              showClose: true,
              message: '根节点资产不能移除合规项',
              type: 'warning'
            })
          } else {
            this.removeItem()
          }
          break
        default:
          break
      }
    },
    // 保存子任务
    saveTask(formName) {
      // 读取数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const $self = this
          const params = JSON.parse(JSON.stringify($self.dataAddForm))
          this.$store.dispatch('task/addSubTask', params).then(resp => {
            if (resp && resp.RET_CODE === '0') {
              this.$notify({
                showClose: true,
                message: resp.RET_INFO,
                type: 'success'
              })
              this.doAppend(resp.task)
              this.dialogVisible = false
              this.$refs[formName].resetFields()
            }
          }).catch(() => {
            this.taskLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 对话框关闭
    handleBeforeClose() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
    // 对话框关闭
    closeAddDlg() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
    // 用户对话框
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.multiple = false// true 为复选
    },
    // 选择的用户进行赋值
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      this.$refs['dataAddForm'].clearValidate('taskOwner')
      this.$refs['dataAddForm'].clearValidate('taskOwnerId')
      const $self = this
      $self.dataAddForm.taskOwner = data.userName
      $self.dataAddForm.taskOwnerId = data.userId
    },
    // 加载树形控件数据
    reloadTree() {
      this.loadNode(this.node, this.resolve)
    },

    // ///////////////////////
    // /资产相关
    // ///////////////////////
    // 显示资产选择对话框
    showAssetDlg() {
      this.assetWindowVisible = true
      this.assetMultiple = true
    },
    getAssetInfo(rows) {
      this.moveIn(rows)
    },
    // 选择资产
    moveIn(rows) {
      if (rows.length === 0) { return }
      let idxStr = ''
      for (var i = 0; i < rows.length; i++) {
        idxStr += rows[i].assetId + ','
      }
      this.aboutAsset('task/saveGradeAsset', idxStr)
    },
    // 移除资产
    removeAsset() {
      if (this.selTaskId === this.taskId) {
        this.$message({
          showClose: true,
          message: '根节点资产不能移除',
          type: 'warning'
        })
        return
      }
      const rows = this.$refs.assetGridDest.getSelectRows()
      if (rows.length === 0) {
        this.$message({ showClose: true, message: '请选择资产', type: 'warning' })
        return
      }
      let idxStr = ''
      for (var i = 0; i < rows.length; i++) {
        idxStr += rows[i].assetId + ','
      }
      this.aboutAsset('task/removeGradeAsset', idxStr)
    },
    // 资产通用函数
    aboutAsset(url, idxStr) {
      if (idxStr.length <= 0) { return }
      this.taskLoading = true
      const params = { 'idxStr': idxStr, 'taskId': this.selTaskId }
      this.$store.dispatch(url, params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$refs.assetGridDest.reload()
          this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
          this.assetWindowVisible = false
          this.taskLoading = false
        }
      }).catch(() => {
        this.taskLoading = false
      })
    },
    // //////////////////////////
    // 检查项相关
    // //////////////////////////
    // 合规项对话框展示
    showItemDlg(rows) {
      this.itemWinShow = true
    },
    getItemInfo(selData) {
      let jsonStr = ''
      if (selData.length <= 0) {
        this.$message({ showClose: true, message: '未选择合规项', type: 'warning' })

        return
      }
      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'

      const params = { 'ARR': jsonStr, 'taskId': this.selTaskId }
      this.loading = true
      this.$store.dispatch('task/saveGradeItem', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.itemGridDest.reload()
          this.itemWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.itemWinShow = false
        this.loading = false
      })
    },
    removeItem() {
      let jsonStr = ''
      const selData = this.$refs.itemGridDest.getSelectRows()
      if (selData.length <= 0) {
        this.$message({ showClose: true, message: '请选择合规项', type: 'warning' })
        return
      }
      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.selTaskId }
      this.loading = true

      this.$store.dispatch('task/removeGradeItem', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.itemGridDest.reload()
          this.itemWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.itemWinShow = false
        this.loading = false
      })
    },
    // 检查类型格式化
    chkTypeFormatter(row) {
      const chkType = row.toolChkType
      let ret = ''
      if (chkType === 'VULN') {
        ret = '系统漏扫'
      } else if (chkType === 'WEB') {
        ret = 'Web漏扫'
      } else if (chkType === 'WEAK') {
        ret = '弱口令'
      } else if (chkType === 'BASE') {
        ret = '基线检查'
      } else if (chkType === 'NET') {
        ret = '暴露面'
      } else if (chkType === 'CONTENT') {
        ret = '内容合规'
      } else if (chkType === 'APP') {
        ret = 'APP'
      } else if (chkType === 'GRADE') {
        ret = '等保自评'
      }
      return ret
    },
    handleClick() {

    },
    // 相应追加节点操作
    appendNode(node, data) {
      this.dataAddForm.parentTaskId = data.taskId
      this.parentTaskName = data.taskName
      this.dlgTitle = '拆分' + data.taskName
      this.dialogVisible = true
      this.gNode = node
    },
    doAppend(data) {
      const newChild = { id: data.taskId, 'leaf': true, taskId: data.taskId, taskName: data.taskName, children: [] }
      this.$refs.taskTree.append(newChild, this.gNode)
    },
    // 删除节点任务
    removeNode(node, data) {
      this.taskLoading = true
      const params = { 'taskId': data.taskId }
      this.$store.dispatch('task/removeSubTask', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.taskLoading = false
          this.$refs.taskTree.remove(data.id, node)
        }
      }).catch(() => {
        this.taskLoading = false
      })
    },
    gradeSplitDone() {
      this.taskLoading = true
      const params = { 'taskId': this.actTaskId, 'busiId': this.taskId }
      this.$store.dispatch('task/gradeSplitDone', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({ showClose: true, message: resp.RET_INFO, type: 'success' })
          this.taskLoading = false
          this.$router.push({ path: '/system/workflow/busiTaskList' })
        }
      }).catch(() => {
        this.taskLoading = false
      })
    },
    // 树形组件右键菜单 --废弃
    handleContextMenu(event, object, value, element) {
    // this.node = object
      this.d.params.taskId = object.taskId
      this.dataAddForm.parentTaskId = object.taskId
      this.parentTaskName = object.taskName
      this.dlgTitle = '拆分' + object.taskName
      this.selTaskId = object.taskId
      this.menuVisible = true

      if (this.selTaskId === this.taskId) {
        this.d.url = 'task/loadTaskAsset'
        this.d.taskId = this.taskId
        this.d.columns = this.assetcolumns
      } else {
        this.d.url = 'task/loadTaskAssignList'
        this.d.taskId = this.selTaskId
        this.d.columns = this.assignColumns
      }

      const menu = document.querySelector('#menu')
      /* 菜单定位基于鼠标点击位置 */
      menu.style.left = event.offsetX + 60 + 'px'
      menu.style.top = event.offsetY + 40 + 'px'
    },
    // 右键菜单 处理 --废弃
    handleSelect(key) {
      if (key === '1') {
        this.dialogVisible = true
      } else if (key === '2') {
      // console.log(key)
      }
      this.menuVisible = false
    }
  }
}
</script>

