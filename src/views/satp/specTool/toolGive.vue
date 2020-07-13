<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-row>
          <el-form ref="elForm" :model="params" size="small" label-width="100px">
            <el-col :span="6">
              <el-form-item label="工具名称">
                <el-input v-model="params.toolName" placeholder="工具名称" clearable :style="{width: '100%'}" /></el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工具类型">
                <el-select v-model="params.toolType" placeholder="工具类型" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in toolTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用条件">
                <el-input v-model="params.toolScope" placeholder="使用条件" clearable :style="{width: '100%'}" /></el-form-item>
            </el-col>

            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click.native.prevent="reloadDatagrid()">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="moreParams=!moreParams">高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col v-if="moreParams" :span="12">
              <el-form-item label="发布时间">
                <el-date-picker
                  v-model="params.createTimeArr"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="dateChange()"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div>
          <satp-datagrid
            ref="datagridTest"
            :url="specToolUrl"
            :qparams="params"
            :columns="columns"
            idx
            border
            @operClick="operClick"
          />
        </div>
        <div>
          <el-dialog :title="formAttr.title" :visible.sync="dialogFormVisible" width="800px" :model="formObj" :close-on-click-modal="false" @close="closeDialog">
            <el-form ref="ruleForm" :model="formObj" label-width="100px" @submit.native.prevent>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="工具名称" prop="toolName">
                    <el-input v-model="formObj.toolName" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工具类型" prop="toolType">
                    <el-select v-model="formObj.toolType" placeholder="工具类型" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in toolTypeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工具有效期" prop="effectDate">
                    <el-date-picker
                      v-model="formObj.effectDate"
                      :readonly="formAttr.formType=='detail'"
                      type="datetime"
                      :style="{width: '100%'}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发布人" prop="publicUser">
                    <div v-if="formAttr.formType=='detail'">
                      <el-input v-model="formObj.publicUserName" readonly />
                    </div>
                    <div v-else>
                      <el-input v-model="formObj.publicUserName" readonly @click.prevent.native="getDataRootUser()" />
                      <el-input v-model="formObj.publicUser" hidden style="display:none;" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="使用模式" prop="publicUser">
                    <el-select v-model="formObj.toolMode" :style="{width: '100%'}" :disabled="formAttr.formType=='detail'">
                      <el-option
                        v-for="(item, index) in toolModeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任务执行类" prop="execClass">
                    <el-input v-model="formObj.execClass" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="执行命令" prop="command">
                    <el-input v-model="formObj.command" :readonly="formAttr.formType=='detail'" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工具简介" prop="toolInfo">
                    <el-input
                      v-model="formObj.toolInfo"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="使用范围" prop="toolScop">
                    <el-input
                      v-model="formObj.toolScop"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工具备注" prop="toolNote">
                    <el-input
                      v-model="formObj.toolNote"
                      :readonly="formAttr.formType=='detail'"
                      type="textarea"
                      :rows="3"
                    />
                  </el-form-item>
                </el-col>
                <div>
                  <el-row v-for="file in fileList" :key="file.idx">
                    <el-link type="primary" @click.native.prevent="downloadFile(file)">{{ file.realName }}</el-link>
                  </el-row>
                </div>
              </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="closeDialog()">取 消</el-button>
              <el-button type="primary" size="small" @click="closeDialog()">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <el-dialog :visible.sync="userVisible" title="专项工具分发" width="800px" :close-on-click-modal="false">
            <el-container style="height: 450px;">
              <el-aside width="200px" style="background-color: rgb(255, 255, 255);border:1px solid #eee">
                <div>
                  <el-tree
                    v-loading="loading1"
                    element-loading-spinner="el-icon-loading"
                    :data="orgTreeData"
                    node-key="label"
                    :default-expanded-keys="['中国移动通信集团安徽省移动','安徽移动']"
                    highlight-current
                    @node-click="getCurrentNode"
                  />
                </div>

              </el-aside>

              <div style="width:559px;padding-left:10px;">
                <el-form label-width="50px" class="satp-form-inline" size="small">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="账号">
                        <el-input v-model="queryArgs.loginNo" placeholder="" size="small" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="9">
                      <el-form-item label="姓名">
                        <el-input v-model="queryArgs.userName" placeholder="" size="small" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <div style="float:right;">
                        <el-button size="small" type="text" @click="cleanSearchParm()">重置</el-button>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="searchData()">查询</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>

                <el-table
                  ref="multipleTable"
                  v-loading="loading"
                  class="satp-userwin"
                  element-loading-text="加载中"
                  element-loading-spinner="el-icon-loading"
                  :data="tableData"
                  :row-key="getRowKeys"
                  border
                  :height="userWinHeight"
                  @current-change="selectRow"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column :reserve-selection="reserveSelection" type="selection" />
                  <el-table-column v-if="show" prop="userId" label="序号" width="50" title="userId" />
                  <el-table-column prop="userName" label="姓名" width="150" />
                  <el-table-column prop="loginNo" label="账号" width="100" />
                  <el-table-column prop="phone" label="电话" width="100" />
                  <el-table-column prop="eMail" label="邮箱" />
                </el-table>

                <div class="satp-pagination-container">
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
              </div>
            </el-container>

            <div slot="footer" class="dialog-footer">
              <el-button type="text" size="small" @click="cancel()">取消</el-button>
              <el-button type="primary" size="small" :loading="savebutton" @click="saveToolUser()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <user-window
          v-if="userWindowVisible"
          :title="title"
          :parent-component-param="parentComponentParam"
          :multiple="multiple"
          :visible.sync="userWindowVisible"
          :modal-append-to-body="false"
        />
      </el-card>
    </div>
  </div>

</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
import userInfo from '@/components/Userwindow/index.vue'

export default {
  name: 'SpecToolList',
  components: { 'satp-datagrid': datagrid, 'user-window': userInfo },
  props: [],
  data() {
    return {
      moreParams: false, // 是否展示更多查询条件
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      fileList: [],
      formAttr: {},
      formObj: {},
      dialogFormVisible: false,
      userWindowVisible: false,
      userVisible: false,
      specToolUrl: 'specTool/specToolGiveList',
      params: {},
      toolTypeOptions: [
        {
          'label': '漏洞验证类',
          'value': '1'
        }, {
          'label': '测评类',
          'value': '2'
        }, {
          'label': '性能测试类',
          'value': '3'
        }, {
          'label': '安全测评类',
          'value': '4'
        }
      ],
      toolModeOptions: [{
        'label': '在线使用',
        'value': 1
      }, {
        'label': '离线使用',
        'value': 2
      }],
      columns: [
        { label: '工具名称', prop: 'toolName', actions: [{ prop: 'detail', type: 'success', link: 'toolName' }] },
        { label: '工具类型', prop: 'toolTypeName' },
        { label: '使用模式', prop: 'toolMode', formatter: this.toolModeFormatter },
        { label: '发布时间', prop: 'createTime', formatter: this.dateTimeFormatter },
        { label: '发布人', prop: 'publicUserName' },
        { label: '工具简介', prop: 'toolInfo' },
        { label: '适用范围', prop: 'toolScop' },
        { label: '注意事项', prop: 'toolNote' },
        { label: '操作', prop: 'opt', align: 'center', actions: [{ label: '分发', prop: 'giveUser', type: 'text', icon: 'el-icon-finished' }] }
      ],
      datas: {
        fileType: 'specTool',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      },

      // 用户树数据
      userWinHeight: 376,
      loading: false,
      loading1: false,
      savebutton: false,
      reserveSelection: true,
      show: false,
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      currentRow: null,
      queryArgs: {
        // tables数据查询条件
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10,
        orgId: ''
      },
      tableData: [], // tables数据
      orgTreeData: [], // 机构数据
      // loading: true,
      multipleSelection: null,
      toolId: 0
    }
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'giveUser':
          this.giveUser(row)
          break
        case 'detail':
          this.openDialog(row, 'detail')
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['datagridTest'].reload()
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.fileList = []
      this.formObj = {}
    },
    dateChange() {
      if (this.params.createTimeArr == null) {
        this.params.createTime = null
      } else {
        this.params.beginTime = this.params.createTimeArr[0]
        this.params.endTime = this.params.createTimeArr[1]
        this.params.createTime = this.params.createTimeArr[0]
      }
    },
    toolModeFormatter(row) {
      if (row.toolMode === 1) {
        return '在线使用'
      } else {
        return '离线使用'
      }
    },
    dateTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.createTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    openDialog(row, type) {
      this.formAttr.formType = type
      this.formObj = Object.assign({}, row)
      this.datas.busiId = this.formObj.toolId
      this.formAttr.title = `详情`
      // console.log(row)
      // 获取已上传文件列表
      this.$store.dispatch('specTool/findSpecTool', { toolId: row.toolId }).then(response => {
        this.fileList = response.fileList
      }).catch(() => {})
      this.dialogFormVisible = true
    },
    downloadFile(file) {
      const params = { realName: file.realName, fileUrl: file.fileUrl }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },

    getRowKeys(row) {
      return row.userId
    },
    modalClose() {
      this.currentRow = null
    },
    cancel() {
      this.currentRow = null
      this.userVisible = false
      this.toolId = 0
      this.multipleSelection = null
    },
    saveToolUser() {
      this.savebutton = true
      console.log(this.multipleSelection)
      const specUserJson = JSON.stringify(this.multipleSelection)
      const params = { specUserJson: specUserJson, toolId: this.toolId }
      this.$store.dispatch('specTool/saveToolUser', params).then(resp => {
        this.userVisible = false
        this.toolId = 0
        this.multipleSelection = null
        this.savebutton = false
      })
    },
    selectRow(val) {
      this.currentRow = val
    },
    getTableData() {
      var _this = this
      _this.loading = true
      _this.queryArgs.pageNum = this.elePagination.pageNum
      _this.queryArgs.pageSize = this.elePagination.pageSize
      // window.console.info(_this.queryArgs)
      this.$store.dispatch('user/userList', _this.queryArgs).then(resp => {
        _this.loading = false
        _this.tableData = resp.rows
        _this.elePagination.total = resp.total
        // .log(this.tableData)
      })
    },

    getOrgTree() {
      const $self = this
      $self.loading1 = true
      const params = {}
      $self.$store.dispatch('user/getOrgTree', params).then(response => {
        $self.orgTreeData = response.orgList
        $self.loading1 = false
      })
    },

    // 树点击事件
    getCurrentNode(node) {
      var $self = this
      $self.queryArgs.orgId = node.id

      this.getTableData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },

    // 查询当前条件
    searchData() {
      this.getTableData()
    },
    // 查询当前条件
    cleanSearchParm() {
      this.queryArgs.loginNo = ''
      this.queryArgs.userName = ''
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
    giveUser(row) {
      this.getOrgTree()
      this.getTableData()

      const params = { toolId: row.toolId }
      this.toolId = row.toolId

      console.log(this.tableData)
      this.$store.dispatch('specTool/toolUserList', params).then(response => {
        const list = response.rows
        for (let i = 0; i <= list.length - 1; i++) {
          // console.log(list[i])
          this.$refs.multipleTable.toggleRowSelection(list[i])
        }
        this.multipleSelection = response.rows
      })
      this.userVisible = true
    }

  }

}
</script>

<style  lang="scss" scoped>
.pages {
    height: 100%;
    position: relative;
}

  /*****自定义样式 提示* 必填 */
  .rowHand{
    text-align:left;
    padding: 5px 0px 20px 15px;
    font-size: 12px;
    color: #999999;
  }
  /*************************Head头样式 */
  .el-card__header{
    padding: 8px 10px;
    text-align: left;
    font-size: 16px;
    font-weight: 700;
  }
  .el-card__body{
    padding: 10px;
  }
  .titles{
    line-height: 32px;
    float: left;
  }
  .titles:before{
		content:"";
		width: 4px;
		height: 20px;
		background-color: rgba(0, 204, 255, 1);
		float: left;
		margin: 5px 5px 0px -5px;
	}
  .el-upload{
    float: right;
    margin-right: -5px;
  }
  .btnRigth{
    float: right;
    margin-right: 3px;
  }
  /*
  .elTable{
    min-height: 20px;
  }
  */
</style>
