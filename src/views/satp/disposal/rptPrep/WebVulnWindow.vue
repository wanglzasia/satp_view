<template>
  <el-dialog
    title="请选择WEB漏洞"
    :visible.sync="visible"
    width="80%"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >

    <el-form label-width="100px">
      <el-row>

        <el-col :span="8">
          <el-form-item label="漏洞编号">
            <el-input v-model="queryArgs.cveId" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="漏洞厂家编号">
            <el-input v-model="queryArgs.vulId" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="国家漏洞库编号" label-width="120px">
            <el-input v-model="queryArgs.cnnveId" size="small" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>

        <el-col :span="8">
          <el-form-item label="漏洞名称">
            <el-input v-model="queryArgs.vulnName" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="漏洞描述">
            <el-input v-model="queryArgs.vulnDesc" size="small" />
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="24" align="right">
          <el-button-group style="margin-right:40px;">
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchData()">查询</el-button>
            <el-button size="small" icon="el-icon-close" @click="cleanSearchParm()">重置</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>

    <div style="margin-top:10px">
      <el-table
        :ref="tableRef"
        v-loading="loading"
        :highlight-current-row="highlightCurrentStatus"
        class="elTable"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(185, 185, 185, 0.1)"
        :data="tableData"
        stripe
        style="width: 100%;"
        @current-change="selectRow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
          <template slot-scope="scope">
            <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.field],scope.row.format) }}</span>
            <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
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
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" :loading="savebutton" @click="getWebVulnInfo()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    highlightCurrentStatus: { type: Boolean, default: true },
    tableRef: { type: String, default: 'singleTable' },
    multiple: { type: Boolean, default: false },
    parentComponentParam: { type: Object, default() { return {} } }
  },
  data() {
    return {
      loading: true,
      savebutton: false,
      title: '',
      tableThead: [// 漏洞明细
        { 'id': '1', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
        { 'id': '2', 'field': 'vulId', 'fieldType': 'text', 'text': '安全厂家漏洞编号', 'align': 'left' },
        { 'id': '3', 'field': 'cnnveId', 'fieldType': 'text', 'text': '国家漏洞库编号', 'align': 'left' },
        { 'id': '4', 'field': 'vulnName', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '5', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' }
      ],

      tableData: [], // tables数据
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      queryArgs: {
      }
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
  created() {
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
    modalClose() {
      this.cancel()
      // this.$emit('update:visible', false); // 直接修改父组件的属性
    },
    cancel() {
      this.queryArgs = {
      }
      this.$emit('update:parentComponentParam', {})
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    getWebVulnInfo() {
      const $self = this
      if (!$self.multiple) { // 单选
        if ($self.currentRow == null) {
          $self.$message({
            message: `请选择漏洞！`,
            type: 'warning'
          })
        } else {
          this.$emit('getWebVulnInfo', $self.currentRow, this.parentComponentParam)//, this.parentComponentParam
          this.$emit('update:visible', false) // 直接修改父组件的属性
        }
      } else {
        if ($self.multipleSelection == null) {
          $self.$message({
            message: `请选择漏洞！`,
            type: 'warning'
          })
        } else {
          this.$emit('getWebVulnInfo', $self.multipleSelection, this.parentComponentParam)//, this.parentComponentParam
          this.$emit('update:visible', false) // 直接修改父组件的属性
        }
      }
    },
    searchData() {
      const $self = this
      $self.elePagination.pageNum = '1'
      $self.elePagination.pageSize = '10'
      $self.getTableData()
    },
    cleanSearchParm() {
      this.queryArgs = {
      }
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
    selectRow(val) {
      this.currentRow = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getTableData() {
      const $self = this
      let param = {}
      param = $self.queryArgs
      $self.loading = true
      const logicAddr = $self.parentComponentParam.logicAddr
      param.webUrl = logicAddr
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      window.console.info('webwindow')
      this.$store.dispatch('disposal/queryWebVulnListByPage', param).then(response => {
        $self.loading = false
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        // this.rowsFormatter(response.rows)
      }).catch(() => {
        $self.loading = false
      })
    }
  }
}
</script>

<style  lang="scss" scoped>

</style>
