<template>
  <el-dialog
    title="请选择资产"
    :visible.sync="visible"
    width="65%"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >

    <el-container style="height: 450px; border: 1px solid #eee">
      <el-aside width="180px" style="background-color: rgb(255, 255, 255)">

        <div>
          <el-tree
            v-loading="loadingTree"
            element-loading-spinner="el-icon-loading"
            :data="assetTypeTreeData"
            node-key="value"
            highlight-current
            @node-click="getCurrentNode"
          />
        </div>

      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px;height:120px;">
          <el-form label-width="80px" style="padding:5px;">
            <el-row>
              <el-col :span="12">
                <el-form-item label="地址">
                  <el-input v-model="queryArgs.logicAddr" placeholder="" size="small" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="资产名称">
                  <el-input v-model="queryArgs.assetName" placeholder="" size="small" />
                </el-form-item>
              </el-col>

              <!-- <el-col :span="6">
                            <el-button size="small" @click="cleanSearchParm()">重置</el-button>
                            <el-button type="primary" size="small" @click="searchData()">查询</el-button>
                        </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门">
                  <el-cascader
                    :options="orgOptions"
                    :show-all-levels="false"
                    :props="{ value: 'id',checkStrictly: true }"
                    clearable
                    filterable
                    @change="getOrgIdChecked"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-button size="small" @click="cleanSearchParm()">重置</el-button>
                <el-button type="primary" size="small" @click="searchData()">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-header>

        <el-main>
          <el-table
            :ref="tableRef"
            v-loading="loading"
            :highlight-current-row="highlightCurrentStatus"
            class="elTable"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(185, 185, 185, 0.1)"
            :data="tableData"
            :row-key="getRowKeys"
            stripe
            style="width: 100%;"
            @current-change="selectRow"
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="multiple == true" :reserve-selection="reserveSelection" type="selection" width="55" />
            <el-table-column prop="assetId" label="资产标识" style="white-space:nowrap" />
            <el-table-column prop="assetName" label="资产名称" style="white-space:nowrap" />
            <el-table-column prop="logicAddr" label="IP/URL" style="white-space:nowrap" />
            <el-table-column prop="assetTypeLabel" label="资产类型" style="white-space:nowrap" />
            <el-table-column prop="orgName" label="归属组织" style="white-space:nowrap" />

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
        </el-main>
      </el-container>
    </el-container>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" :loading="savebutton" @click="getAssetInfo()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    parentComponentParam: { type: Object, default() { return {} } }
  },
  data() {
    return {
      savebutton: false,
      reserveSelection: true,
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
        assetName: '',
        logicAddr: '',
        assetType: '',
        orgId: ''
      },
      tableData: [], // tables数据
      assetTypeTreeData: [], // 机构数据
      orgOptions: [],
      loading: false,
      loadingTree: false,
      multipleSelection: null,
      loadingR: true,
      highlightCurrentStatus: true,
      tableRef: 'singleTable'
    }
  },
  created() {
    this.getOrgTree()
    this.getAssetTypeTree()
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
      return row.assetId
    },
    modalClose() {
      this.currentRow = null
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    cancel() {
      this.currentRow = null
      this.$emit('update:parentComponentParam', {})
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getAssetInfo() {
      const $self = this
      if (!$self.multiple) { // 单选
        if ($self.currentRow == null) {
          $self.$message({
            message: `请选择资产！`,
            type: 'warning'
          })
        } else {
          this.$emit('getAssetInfo', $self.currentRow, this.parentComponentParam)//, this.parentComponentParam
          this.$emit('update:visible', false) // 直接修改父组件的属性
        }
      } else {
        if ($self.multipleSelection == null) {
          $self.$message({
            message: `请选择资产！`,
            type: 'warning'
          })
        } else {
          this.$emit('getAssetInfo', $self.multipleSelection, this.parentComponentParam)//, this.parentComponentParam
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
      this.$store.dispatch('asset/getAssetList', _this.queryArgs).then(resp => {
        _this.loading = false
        _this.tableData = resp.rows
        _this.elePagination.total = resp.total
      })
    },

    getAssetTypeTree() {
      const $self = this
      $self.loadingTree = true
      const params = {}
      $self.$store.dispatch('asset/getAssetTypeTree', params).then(response => {
        $self.assetTypeTreeData = response.treeList
        $self.loadingTree = false
      })
    },
    getOrgTree() {
      const $self = this
      const param = {}
      this.$store.dispatch('user/getOrgTree', param).then(response => {
        $self.orgOptions = response.orgList
        // this.rowsFormatter(response.rows)
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
      })
    },
    getOrgIdChecked(arr) {
      window.console.info(arr)
      this.queryArgs.orgId = arr[arr.length - 1]
    },

    // 树点击事件
    getCurrentNode(node) {
      var $self = this
      $self.queryArgs.assetType = node.value

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
      this.queryArgs.assetType = ''
      this.queryArgs.assetName = ''
      this.queryArgs.logicAddr = ''
      this.queryArgs.orgId = ''
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
  .el-dialog__body{
    padding: 0px 30px 10px 0px;
  }
  .el-dialog__header{
    text-align: left;
    background-color: rgba(0, 204, 255, 1);
    padding: 10px 20px 10px;
  }
  .el-dialog__title{
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  .el-dialog__headerbtn .el-dialog__close{
    color: #FFFFFF;
  }
  .el-dialog__footer{
    background-color: rgba(242, 242, 242, 1);
    padding: 10px 20px 10px;
    text-align: center;
  }
  .el-button{
    font-size: 12px;
    padding: 10px 20px;
  }
  .el-dialog__headerbtn{
    top: 15px;
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
  .elTable{
    min-height: 20px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
