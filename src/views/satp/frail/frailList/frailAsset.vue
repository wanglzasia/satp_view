<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header content="问题资产" @back="goBack" />
        <router-view />
      </div>
      <div style="padding: 0px 15px 15px 15px;">
        <el-row>
          <el-col :span="12">
            <h3><span class="data_titles">问题信息</span></h3>
          </el-col>
        </el-row>
      </div>
      <table class="gridtable" style="width:100%;padding-left:20px;padding-right:20px;padding-bottom:20px;">
        <tr>
          <th width="80px">问题类型</th>
          <td style="text-align:left;">{{ vulnClassName }}</td>
        </tr>
        <tr>
          <th width="80px">问题名称</th>
          <td style="text-align:left;">{{ vulnTitle }}</td>
        </tr>
      </table>
      <div style="padding-left:20px;padding-right:20px;">
        <el-divider />
      </div>
      <div style="padding: 0px 15px 15px 15px;">
        <el-row>
          <el-col :span="12">
            <h3><span class="data_titles">问题资产</span></h3>
          </el-col>
        </el-row>
      </div>
      <div class="pages" style="padding:20px;">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(185, 185, 185, 0.1)"
          :data="tableData"
          border
          style="width: 100%"
          :height="Height"
        >
          <el-table-column align="center" prop="assetId" label="资产ID " width="180" />
          <el-table-column align="center" prop="assetName" label="资产名称 " width="180" />
          <el-table-column align="center" prop="logicAddr" label="地址 " width="180" />
          <el-table-column align="center" prop="assetTypeLabel" label="资产类型 " width="180" />
          <el-table-column align="center" prop="orgName" label="所属部门 " width="180" />
          <el-table-column align="center" prop="vulnCnt" label="问题复现次数 " width="180" />
          <el-table-column align="center" prop="finishRect" label="已整改个数 " width="180" />
          <el-table-column align="center" prop="ingRect" label="整改中个数 " width="180" />
          <el-table-column fixed="right" label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click.native.prevent="frailAssetInfo(scope.row)">资产脆弱性问题详情</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px">
          <el-pagination
            :current-page="handlePagination.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="handlePagination.pageSize"
            layout="total, sizes, prev, pager, next,jumper"
            :total="handlePagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Height: window.innerHeight - 195,
      loading: true,
      tableData: [],
      handlePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      vulnTitle: '',
      vulnClassName: '',
      vulnClass: '',
      beginTime: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        if (!el) {
          return ''
        }
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.vulnTitle = this.$route.query.vulnTitle
    this.vulnClassName = this.$route.query.vulnClassName
    this.vulnClass = this.$route.query.vulnClass
    this.beginTime = this.$route.query.beginTime
    this.getTableData()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailList'
      })
    },
    handleCurrentChange(val) {
      this.handlePagination.pageNum = val
      this.getTableData()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.handlePagination.pageSize = val
      this.getTableData()
    },
    getTableData() {
      const $self = this
      const param = {}
      param.vulnTitle = this.vulnTitle
      param.vulnClass = this.vulnClass
      param.beginTime = this.beginTime
      param.pageNum = $self.handlePagination.pageNum
      param.pageSize = $self.handlePagination.pageSize
      this.$store.dispatch('frail/queryFragAssetListByPage', param).then(response => {
        $self.loading = false
        $self.tableData = response.rows
        $self.handlePagination.total = response.total
        // this.rowsFormatter(response.rows)
      }).catch(() => {
        $self.loading = false
      })
    },
    frailAssetInfo(row) {
      this.$router.push({
        path: '/satp-prob/frail/frailAssetInfo',
        query: {
          'assetId': row.assetId
        }
      })
    }
  }
}
</script>
<style scoped>
.is-fixed {
    position: fixed;
    bottom: 0;
    padding: 1px;
    top: 100px;
    width: 23%;
}
.data_titles{
  line-height: 32px;
  float: left;
}
.data_titles:before{
  content:"";
  width: 4px;
  height: 25px;
  background-color: #409eff;
  float: left;
  margin: 5px 5px 0px -5px;
}
.radius {
    height: 300px;
    width: 23%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 0px;
    padding:15px;
}
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;min-width:80px;padding:8px;}
</style>
