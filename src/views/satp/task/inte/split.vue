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
                    <template slot-scope="{node,data }">
                      <span class="custom-tree-node">
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
                    </template>
                  </el-tree>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <el-tabs v-model="activeName">
                <el-tab-pane label="检查项" name="first">
                  <satp-datagrid
                    ref="itemGridDest"
                    :url="item.url"
                    :qparams="item.params"
                    :columns="item.columns"
                    :toolbar="item.toolbar"
                    checkbox
                    class="satp-grid-mini"
                    @toolbarClick="itemGridClick"
                  />
                </el-tab-pane>
                <el-tab-pane label="检查范围" name="second">
                  <satp-datagrid
                    ref="assetGridDest"
                    :url="asset.url"
                    :qparams="asset.params"
                    :columns="asset.columns"
                    :toolbar="asset.toolbar"
                    checkbox
                    class="satp-grid-mini"
                    @toolbarClick="assetGirdClick"
                  />
                </el-tab-pane>
              </el-tabs>

            </el-col>
          </el-row>
        </div>
        <div style="text-align:right">
          <el-button type="success" size="small" icon="el-icon-check" @click="splitDone">拆分完成</el-button>
        </div>
      </el-card>
    </div>

    <!--子任务新增对话框-->
    <div>
      <el-dialog
        :title="dlgTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :modal-append-to-body="false"
        :before-close="handleBeforeClose"
        class="satp-dlg"
      >
        <el-form ref="dataAddForm" :model="dataAddForm" :rules="dataAddrules" :label-position="labelPosition" label-width="100px" size="small" class="satp-form-label-top">

          <el-form-item label="父任务ID" prop="parentTaskId" style="display:none">
            <el-input v-model="dataAddForm.parentTaskId" />
          </el-form-item>

          <el-form-item label="子任务名称" prop="taskName">
            <el-input v-model="dataAddForm.taskName" placeholder="子任务名称" />
          </el-form-item>

          <el-form-item label="检查类型" prop="taskName">
            <el-radio-group v-model="dataAddForm.chkMode" size="mini">
              <el-radio-button label="自动" />
              <el-radio-button label="手动" />
            </el-radio-group>
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
        :chkmode="chkMode"
        chktype=""
        @getItemInfo="getItemInfo"
      />
    </div>

  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagridx.vue'
import userInfo from '@/components/Userwindow/index.vue'
import taskassign from '@/components/TaskConfig/taskasset.vue'
import taskitem from '@/components/TaskConfig/taskitem.vue'

export default {
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo, 'assign-window': taskassign, 'task-item': taskitem },
  data() {
    return {
      taskId: this.$route.params.taskId,
      actTaskId: this.$route.query.taskId,
      //
      chkType: 'inte',
      gNode: '',
      gNodeData: '',
      treeUrl: '',
      taskLoading: false,
      // 资产配置弹窗
      assetWindowVisible: false,
      assetUrl: 'task/loadAssetToSel',
      assetWinTitle: '',
      assetMultiple: true,
      selTaskId: this.$route.params.taskId,
      // 合规项弹窗相关变量
      itemWinShow: false,
      itemWinTitle: '',
      itemMultiple: true,
      itemUrl: 'task/itemList',
      chkMode: '1',
      //
      labelPosition: 'top',
      dlgTitle: '拆分任务',
      props: {
        label: 'taskName',
        isLeaf: 'leaf'
      },
      node: '',
      resolve: '',
      activeName: 'first',

      // datagrid
      item: {
        url: 'task/taskItemList',
        params: {
          taskId: this.$route.params.taskId
        },
        columns: [
          { type: 'text', label: '合规项编号', prop: 'itemNo', align: 'left', width: 200 },
          { type: 'text', label: '合规项名称', prop: 'itemName' },
          { type: 'text', label: '合规项类型', prop: 'chkType', width: 100 }
        ],
        toolbar: [
          { label: '选择', prop: 'add', type: 'primary', size: 'mini', icon: 'el-icon-plus' },
          { label: '移除', prop: 'remove', type: 'primary', size: 'mini', icon: 'el-icon-delete' }
        ]
      },
      asset: {
        url: 'task/loadTaskAsset',
        params: {
          taskId: this.$route.params.taskId,
          parentTaskId: this.$route.params.taskId
        },
        columns: [
          { type: 'text', label: '资产ID', prop: 'assetId', align: 'left', width: 80 },
          { type: 'text', label: '名称', prop: 'assetName', align: 'left' },
          { type: 'text', label: '地址', prop: 'logicAddr', align: 'left' },
          { type: 'text', label: '类型', prop: 'typeName', align: 'left' },
          { type: 'text', label: '归属组织', prop: 'orgName' },
          { type: 'text', label: '安全员', prop: 'secAdmName' }
        ],
        toolbar: [
          { label: '选择', prop: 'add', type: 'primary', size: 'mini', icon: 'el-icon-plus' },
          { label: '移除', prop: 'remove', type: 'primary', size: 'mini', icon: 'el-icon-delete' }
        ]
      },

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
        chkMode: '自动',
        taskType: 'inte'
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
  methods: {
    loadNode(node, resolve) {
      let params = []
      if (node.level === 0) {
        params = { 'taskId': this.taskId }
        this.treeUrl = 'task/loadTask'
      } else {
        params = { 'taskId': node.key }
        this.treeUrl = 'task/loadSubTaskTree'
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

    taskArrayToTreeData(task) {
      const treeData = []
      let taskId = ''
      let taskName = ''
      let leaf = false
      for (var i = 0; i < task.length; i++) {
        taskId = task[i].taskId
        taskName = task[i].taskName
        leaf = task[i].hasChild
        if (leaf === 'Y') { // 有子任务,那么就不是叶子节点
          leaf = false
        } else {
          leaf = true
        } // 无子任务 ,那么就是叶子节点
        treeData.push({ 'id': taskId, 'taskId': taskId, 'taskName': taskName, 'leaf': leaf, children: [] })
      }
      return treeData
    },

    // 相应追加节点操作
    appendNode(node, data) {
      this.dataAddForm.parentTaskId = data.taskId
      this.dataAddForm.chkMode = '自动'
      this.parentTaskName = data.taskName
      this.dlgTitle = '拆分' + data.taskName
      this.dialogVisible = true
      this.gNode = node
      this.gNodeData = data
    },

    // 追加节点
    doAppend(data) {
      const newChild = { 'id': data.taskId, 'taskId': data.taskId, 'taskName': data.taskName, 'leaf': true, children: [] }
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

    // 响应树形控件节点点击事件
    handleNodeClick(data) {
      this.dataAddForm.parentTaskId = data.taskId
      this.parentTaskName = data.taskName
      this.dlgTitle = '拆分' + data.taskName
      this.selTaskId = data.taskId
      // datagrid参数
      this.asset.params.taskId = this.selTaskId
      this.item.params.taskId = this.selTaskId
      this.$refs.assetGridDest.reQuery(this.asset.url, this.asset.params)
      this.$refs.itemGridDest.reload()
    },

    // 资产工具栏按钮响应事件
    assetGirdClick(data) {
      const { prop } = data
      switch (prop) {
        case 'add':
          this.showAssetDlg()
          break
        case 'remove':
          // 移除已选资产
          this.moveOut()
          break
        default:
          break
      }
    },
    saveTask(formName) {
      // 读取数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const $self = this
          if (this.dataAddForm.chkMode === '自动') {
            this.dataAddForm.chkMode = 1
          } else if (this.dataAddForm.chkMode === '手动') {
            this.dataAddForm.chkMode = 2
          }
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
    handleBeforeClose() {
      this.dialogVisible = false
      this.$refs['dataAddForm'].resetFields()
    },
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
    getUserInfo(data, parentComponentParam) { // 单选时data 传回用户对象;复选传回用户数组
      this.$refs['dataAddForm'].clearValidate('taskOwner')
      this.$refs['dataAddForm'].clearValidate('taskOwnerId')
      const $self = this
      $self.dataAddForm.taskOwner = data.userName
      $self.dataAddForm.taskOwnerId = data.userId
    },
    reloadTree() {
      this.loadNode(this.node, this.resolve)
    },
    // 拆分完成
    splitDone() {
      this.taskLoading = true
      const params = { 'taskId': this.actTaskId, 'busiId': this.taskId }
      this.$store.dispatch('task/splitDone', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.taskLoading = false
          // 返回待办任务列表
          this.$router.push({ path: '/system/workflow/busiTaskList' })
        }
      }).catch(() => {
        this.taskLoading = false
      })
    },

    // 资产分配相关
    showAssetDlg() {
      if (this.selTaskId === this.taskId) {
        this.$message({
          showClose: true,
          message: '根节点不能选择资产',
          type: 'warning'
        })
        return
      }
      this.assetWindowVisible = true
      this.assetMultiple = true
    },
    getAssetInfo(rows) {
      this.moveIn(rows)
    },
    moveIn(selData) {
      if (selData.length === 0) { return }
      let jsonStr = '{"asset":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' +
          '"' + 'assetId' + '"' + ':' + '"' + selData[i]['assetId'] + '"' +
          '},'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'
      this.aboutAsset('task/saveAsset', jsonStr)
    },
    moveOut() {
      if (this.selTaskId === this.taskId) {
        this.$message({
          showClose: true,
          message: '根节点资产不能移除',
          type: 'warning'
        })
        return
      }
      const selData = this.$refs.assetGridDest.getSelectRows()
      if (selData.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择资产',
          type: 'warning'
        })
        return
      }
      let jsonStr = '{"asset":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' +
          '"' + 'assetId' + '"' + ':' + '"' + selData[i]['assetId'] + '"' +
          '},'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'
      this.aboutAsset('task/deleteTaskAsset', jsonStr)
    },
    aboutAsset(url, idxStr) {
      if (idxStr.length <= 0) { return }
      this.taskLoading = true
      const params = { 'ARR': idxStr, 'taskId': this.selTaskId }
      this.$store.dispatch(url, params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$refs.assetGridDest.reload()
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.$refs.assetGridDest.reload()
          this.assetWindowVisible = false
          this.taskLoading = false
        }
      }).catch(() => {
        this.taskLoading = false
      })
    },

    // 合规项工具栏按钮响应事件
    itemGridClick(data) {
      const { prop } = data
      switch (prop) {
        case 'add':
          this.showItemDlg()
          break
        case 'remove':
          // 移除已选资产
          this.removeItem()
          break
        default:
          break
      }
    },
    showItemDlg() {
      if (this.selTaskId === this.taskId) {
        this.$message({
          showClose: true,
          message: '根节点不能选择合规项',
          type: 'warning'
        })
        return
      }
      this.itemWinShow = true
    },
    removeItem() {
      if (this.selTaskId === this.taskId) {
        this.$message({
          showClose: true,
          message: '根节点合规项不能移除',
          type: 'warning'
        })
        return
      }

      const selData = this.$refs.itemGridDest.getSelectRows()
      if (selData.length <= 0) {
        this.$message({
          showClose: true,
          message: '请选择合规项',
          type: 'warning'
        })
        return
      }

      let jsonStr = ''
      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'
      const params = { 'ARR': jsonStr, 'taskId': this.selTaskId }
      this.loading = true

      this.$store.dispatch('task/deleteTaskItem', params).then(resp => {
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
    getItemInfo(selData) {
      let jsonStr = ''
      if (selData.length <= 0) { return }

      jsonStr = '{"item":['
      for (var i = 0; i < selData.length; i++) {
        jsonStr = jsonStr + '{' + '"' + 'itemId' + '"' + ':' + '"' + selData[i]['itemId'] + '"' + ',"itemNo"' + ':' + '"' + selData[i]['itemNo'] + '"' + ',"chkType"' + ':' + '"' + selData[i]['chkType'] + '"' + ' },'
      }
      jsonStr = jsonStr.substring(0, jsonStr.length - 1)
      jsonStr = jsonStr + ']}'

      const params = { 'ARR': jsonStr, 'taskId': this.selTaskId }
      this.loading = true
      this.$store.dispatch('task/saveTaskItem', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.item.params.taskId = this.selTaskId
          this.$refs.itemGridDest.reload()
          this.itemWinShow = false
          this.loading = false
        }
      }).catch(() => {
        this.itemWinShow = false
        this.loading = false
      })
    }
  }
}
</script>
