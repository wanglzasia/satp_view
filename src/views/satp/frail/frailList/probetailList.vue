<template>
  <div>
    <div style="padding: 0px 15px 15px 15px;">
      <el-row>
        <el-col :span="24">
          <h3><span class="data_titles">{{ title }}</span></h3>
        </el-col>
      </el-row>
    </div>
    <div class="app-container">
      <el-card>

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
          <el-table-column v-for="thead in tableThead" :key="thead.id" align="center" :show-overflow-tooltip="true" :prop="thead.field" :label="thead.text" min-width="150">
            <template slot-scope="scope">
              <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.field],scope.row.format) }}</span>
              <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="satp-pagination-container">
          <el-pagination
            :current-page="elePagination.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="elePagination.pagesize"
            layout="total, sizes, prev, pager, next,jumper"
            :total="elePagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  props: {
    parentComponentParam: { type: Object, default() { return {} } }
  },
  data() {
    return {
      Height: window.innerHeight - 195,
      loading: false,
      title: '',
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      tableThead: [],
      baseLineThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '问题名称', 'align': 'left' },
        { 'id': '2', 'field': 'itemNo', 'fieldType': 'text', 'text': '合规项编码', 'align': 'left' },
        { 'id': '3', 'field': 'itemContent', 'fieldType': 'text', 'text': '合规项内容', 'align': 'left' },
        { 'id': '4', 'field': 'itemStandard', 'fieldType': 'text', 'text': '合规项要求', 'align': 'left' },
        { 'id': '5', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '6', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '7', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '8', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '9', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '10', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '11', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '12', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '13', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      weakPwdThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '问题名称', 'align': 'left' },
        { 'id': '2', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '问题描述', 'align': 'left' },
        { 'id': '3', 'field': 'account', 'fieldType': 'text', 'text': '弱口令账号', 'align': 'left' },
        { 'id': '4', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '5', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '6', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '7', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '8', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '9', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '11', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '12', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      sysThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE_ID', 'align': 'left' },
        { 'id': '3', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' },
        { 'id': '4', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '5', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '6', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '7', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '8', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '9', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '11', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '12', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      webThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE_ID', 'align': 'left' },
        { 'id': '3', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '漏洞描述', 'align': 'left' },
        { 'id': '4', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '5', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '6', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '7', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '8', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '9', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '11', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '12', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      contentThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '问题名称', 'align': 'left' },
        { 'id': '2', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '问题描述', 'align': 'left' },
        { 'id': '3', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '4', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '5', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '6', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '7', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '8', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '11', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '12', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      codeThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '缺陷名称', 'align': 'left' },
        { 'id': '2', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '缺陷说明', 'align': 'left' },
        { 'id': '3', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '4', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '5', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '6', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '7', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '8', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '11', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '12', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      internetThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '问题名称', 'align': 'left' },
        { 'id': '2', 'field': 'vulnDesc', 'fieldType': 'text', 'text': '问题描述', 'align': 'left' },
        { 'id': '3', 'field': 'serviceName', 'fieldType': 'text', 'text': '服务名称', 'align': 'left' },
        { 'id': '4', 'field': 'port', 'fieldType': 'text', 'text': '端口', 'align': 'left' },
        { 'id': '5', 'field': 'vulnTypeLabel', 'fieldType': 'text', 'text': '问题类型', 'align': 'left' },
        { 'id': '6', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '问题发现时间', 'align': 'left' },
        { 'id': '7', 'field': 'vulnSrc', 'fieldType': 'text', 'text': '问题来源', 'align': 'left' },
        { 'id': '8', 'field': 'isRepet', 'fieldType': 'text', 'text': '重复出现', 'align': 'left' },
        { 'id': '9', 'field': 'occNo', 'fieldType': 'text', 'text': '发现次数', 'align': 'left' },
        { 'id': '10', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '整改状态', 'align': 'left' },
        { 'id': '11', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '整改发起时间', 'align': 'left' },
        { 'id': '12', 'field': 'rectPeriod', 'fieldType': 'text', 'text': '整改期限', 'align': 'left' },
        { 'id': '13', 'field': 'rectCnclsn', 'fieldType': 'text', 'text': '整改最终结论', 'align': 'left' }
      ],
      tableData: []
    }
  },
  // 格式化返回的时间格式
  computed: {
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
    const vulnClass = this.parentComponentParam.vulnClass
    if (vulnClass === '1') {
      //
    } else if (vulnClass === '8') {
      this.tableThead = this.internetThead
      this.title = '互联网暴露资产问题'
    }
    this.getTableData()
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
  },
  methods: {
    getTableData() {
      const $self = this
      $self.loading = true
      const param = {}
      param.assetId = this.parentComponentParam.assetId
      param.vulnClass = this.parentComponentParam.vulnClass
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('disposal/queryProbdetailListByPage', param).then(response => {
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        $self.loading = false
      }).catch(() => {
        $self.loading = false
      })
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
<style scoped>
.is-fixed {
    position: fixed;
    bottom: 0;
    padding: 1px;
    top: 200px;
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
