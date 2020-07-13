<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="800px"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >

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
          :ref="tableRef"
          v-loading="loading"
          :highlight-current-row="highlightCurrentStatus"
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
          <el-table-column v-if="multiple == true" :reserve-selection="reserveSelection" type="selection" />
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
      <el-button type="primary" size="small" :loading="savebutton" @click="getUserInfo()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    title: { type: String, default: '' },
    // eslint-disable-next-line vue/require-default-prop
    parentComponentParam: Object
  },
  data() {
    return {
      userWinHeight: 376,
      loading: false,
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
      highlightCurrentStatus: true,
      tableRef: 'singleTable'
    }
  },
  created() {
    this.getOrgTree()
    this.getTableData()
    if (this.multiple) {
      this.highlightCurrentStatus = false
      this.tableRef = 'multipleTable'
    } else {
      this.highlightCurrentStatus = true
      this.tableRef = 'singleTable'
    }
  },
  methods: {
    getRowKeys(row) {
      return row.userId
    },
    modalClose() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    cancel() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getUserInfo() {
      const $self = this
      if (!$self.multiple) { // 单选
        if ($self.currentRow == null) {
          $self.$message({
            message: `请选择用户！`,
            type: 'warning'
          })
        } else {
          this.$emit('getUserInfo', $self.currentRow, this.parentComponentParam)//, this.parentComponentParam
          this.$emit('update:visible', false) // 直接修改父组件的属性
        }
      } else {
        if ($self.multipleSelection == null) {
          $self.$message({
            message: `请选择用户！`,
            type: 'warning'
          })
        } else {
          this.$emit('getUserInfo', $self.multipleSelection, this.parentComponentParam)//, this.parentComponentParam
          this.$emit('update:visible', false) // 直接修改父组件的属性
        }
      }
    },
    selectRow(val) {
      this.currentRow = val
    },
    getTableData() {
      var _this = this
      _this.loading = true
      _this.queryArgs.pageNum = this.elePagination.pageNum
      _this.queryArgs.pageSize = this.elePagination.pageSize
      window.console.info(_this.queryArgs)
      this.$store.dispatch('user/userList', _this.queryArgs).then(resp => {
        _this.loading = false
        _this.tableData = resp.rows
        _this.elePagination.total = resp.total
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
