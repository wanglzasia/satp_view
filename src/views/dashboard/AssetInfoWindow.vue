<template>
  <el-dialog
    :title="assetInfoTitle"
    :visible.sync="visible"
    width="80%"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >

    <el-form label-width="100px">
      <el-row style="padding-right:20px;">
        <el-col :span="8">
          <el-form-item label="资产名称 ">
            <el-input v-model="queryArgs.assetName" placeholder="资产名称 " size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="IP/URL ">
            <el-input v-model="queryArgs.logicAddr" placeholder="IP/URL " size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产类型 ">
            <el-cascader
              :options="assetTypeOptions"
              :show-all-levels="false"
              :props="{ checkStrictly: true }"
              clearable
              @change="getAssetTypeChecked"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6" align="right">
              <el-button-group>
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData()">查询</el-button>
                <el-button size="small" icon="el-icon-close" @click="cleanSearchParm()">重置</el-button>
              </el-button-group>
            </el-col> -->
      </el-row>
      <el-row style="padding-right:20px;">
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
        v-loading="loading"
        class="elTable"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(185, 185, 185, 0.1)"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="250"
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
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    parentComponentParam: Object
  },
  data() {
    return {
      loading: true,
      assetInfoTitle: '',
      title: '',
      tableThead: [], // 表头
      basSecurityThead2: [// 基础安全 系统漏洞明细
        { 'id': '2', 'field': 'assetId', 'fieldType': 'text', 'text': '资产编号', 'align': 'left' },
        { 'id': '3', 'field': 'logicAddr', 'fieldType': 'text', 'text': '地址', 'align': 'left' },
        { 'id': '4', 'field': 'assetName', 'fieldType': 'text', 'text': '资产名称', 'align': 'left' },
        { 'id': '5', 'field': 'assetTypeLabel', 'fieldType': 'text', 'text': '资产类型', 'align': 'left' },
        { 'id': '6', 'field': 'orgName', 'fieldType': 'text', 'text': '所属部门', 'align': 'left' }
      ],
      basSecurityThead: [// 基础安全 系统漏洞明细
        { 'id': '2', 'field': 'assetId', 'fieldType': 'text', 'text': '资产编号', 'align': 'left' },
        { 'id': '3', 'field': 'logicAddr', 'fieldType': 'text', 'text': '地址', 'align': 'left' },
        { 'id': '4', 'field': 'assetName', 'fieldType': 'text', 'text': '资产名称', 'align': 'left' },
        { 'id': '5', 'field': 'assetTypeLabel', 'fieldType': 'text', 'text': '资产类型', 'align': 'left' },
        { 'id': '6', 'field': 'orgName', 'fieldType': 'text', 'text': '所属部门', 'align': 'left' },
        { 'id': '7', 'field': 'isItemLabel', 'fieldType': 'text', 'text': '是否合规', 'align': 'left' }
      ],
      tableData: [], // tables数据
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      queryArgs: {
        assetName: '',
        logicAddr: '',
        assetType: ''
      },
      assetTypeOptions: []

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
    this.getAssetTypeTree()
    this.setTitle()
    this.getTableData()
  },
  methods: {
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    cancel() {
      this.assetInfoTitle = ''
      this.$emit('update:parentComponentParam', {})
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    searchData() {
      const $self = this
      $self.elePagination.pageNum = '1'
      $self.elePagination.pageSize = '10'
      $self.getTableData()
    },
    cleanSearchParm() {
      this.queryArgs = {
        assetName: '',
        logicAddr: '',
        assetType: ''
      }
    },
    getAssetTypeChecked(arr) {
      window.console.info(arr)
      this.queryArgs.assetType = arr[arr.length - 1]
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
    parseYearMonth(yearMonth, param) {
      const $self = this
      var yearStart = yearMonth.substr(0, 4)
      var monthStart = yearMonth.substr(4, 6)
      var yearEnd = ''
      var monthEnd = ''
      if (monthStart == '12') {
        monthEnd = '1'
        yearEnd = parseInt(yearStart) + 1
      } else if (monthStart == '11' || monthStart == '10') {
        monthEnd = parseInt(monthStart) + 1
        yearEnd = yearStart
      } else {
        monthEnd = parseInt(monthStart.substr(1, 2)) + 1
        yearEnd = yearStart
      }
      var beginTime = yearStart + '-' + monthStart + '-02 00:00:01'
      var endTime = yearEnd + '-' + monthEnd + '-02 00:00:01'
      param.beginTime = new Date(beginTime)
      param.endTime = new Date(endTime)
    },
    getTableData() {
      const $self = this
      window.console.info($self.parentComponentParam)
      let param = {}
      param = $self.queryArgs
      $self.loading = true
      const vulnType = $self.parentComponentParam.vulnType
      const vulnClass = $self.parentComponentParam.vulnClass
      const yearMonth = $self.parentComponentParam.yearMonth
      // let rectStat = $self.parentComponentParam.rectStat;

      // let assetName = $self.parentComponentParam.vulnClass;
      const year = yearMonth.substr(0, 4) + '年'
      const month = yearMonth.substr(4, 6) + '月'
      const titleContent = ''
      if (vulnType == '1') { // 基础安全
        param.vulnType = '1'
        param.vulnClass = vulnClass
        if (vulnClass == '1' || vulnClass == '3' || vulnClass == '4') { // 基线系统漏洞 WEB
          $self.tableThead = $self.basSecurityThead
        } else {
          $self.tableThead = $self.basSecurityThead2
        }
      } else if (vulnType == '2') { // 应用安全
        param.vulnType = '2'
        $self.tableThead = $self.basSecurityThead2
      } else if (vulnType == '3') { // 内容安全
        param.vulnType = '3'
        $self.tableThead = $self.basSecurityThead2
      }
      $self.parseYearMonth(yearMonth, $self.queryArgs)
      // param.rectStat = rectStat;
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize

      this.$store.dispatch($self.parentComponentParam.infoUrl, param).then(response => {
        $self.loading = false
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        // this.rowsFormatter(response.rows)
      }).catch(error => {
      })
    },
    getAssetTypeTree() {
      const $self = this
      const param = {}
      this.$store.dispatch('asset/getAssetTypeTree', param).then(response => {
        $self.assetTypeOptions = response.treeList
        // this.rowsFormatter(response.rows)
      }).catch(error => {
        console.log(error)
      })
    },
    setTitle() {
      const $self = this
      const vulnType = $self.parentComponentParam.vulnType
      const vulnClass = $self.parentComponentParam.vulnClass
      const yearMonth = $self.parentComponentParam.yearMonth
      // let rectStat = $self.parentComponentParam.rectStat;
      const year = yearMonth.substr(0, 4) + '年'
      const month = yearMonth.substr(4, 6) + '月'
      let titleContent = ''
      if (vulnType == '1') { // 基础安全
        if (vulnClass == '1') {
          titleContent = '基线合规情况资产明细'
        } else if (vulnClass == '2') {
          titleContent = '弱口令资产明细'
        } else if (vulnClass == '3') {
          titleContent = '系统漏洞资产明细'
        } else if (vulnClass == '4') {
          titleContent = 'WEB漏洞资产明细'
        } else if (vulnClass == '8') {
          titleContent = '互联网资产暴露所涉资产明细'
        }
      } else if (vulnType == '2') { // 应用安全
        if (vulnClass == '7') {
          titleContent = '代码审计缺陷所涉资产明细'
        }
      } else if (vulnType == '3') { // 内容安全
        titleContent = '内容安全资产明细'
      }
      $self.assetInfoTitle = year + month + titleContent
    }
  }
}
</script>

<style  lang="scss" scoped>

</style>
