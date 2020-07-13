<template>
  <div class="app-container">
    <el-card>
      <el-form
        :model="queryArgs"
        label-position="left"
        label-width="100px"
        size="small"
        class="satp-form-inline"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="地址">
              <el-input v-model="queryArgs.logicAddr" placeholder="地址" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="问题类型">
              <el-select v-model="queryArgs.vulnClass" placeholder="问题类型">
                <el-option
                  v-for="item in vulnClassOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起止时间">
              <el-date-picker
                v-model="queryArgs.dateValue"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                value-format="yyyyMM"
              />
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-dropdown size="small" split-button type="primary" @click="searchData">
              <i class="el-icon-search" />查询
              <!-- <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>高级条件</el-dropdown-item>
              </el-dropdown-menu> -->
            </el-dropdown>
          </el-col>
        </el-row>
      </el-form>

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
        <el-table-column :show-overflow-tooltip="true" align="center" prop="logicAddr" label="IP/URL " width="180">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="vulnChart(scope.row)">{{ scope.row.logicAddr }}</el-link>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" prop="vulnClassName" label="问题类型 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="scanCnt" label="扫描次数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="sumVuln" label="总漏洞数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="finishRect" label="已整改总数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="ingRect" label="整改中总数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="probAvg" label="平均漏洞数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="finishAvg" label="平均已整改数 " width="180" />
        <el-table-column :show-overflow-tooltip="true" align="center" prop="ingAvg" label="平均整改中数 " width="180" />
        <el-table-column fixed="right" label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="probInfo(scope.row)">问题详情</el-link>
            <el-link type="primary" @click.native.prevent="charts(scope.row)">趋势图</el-link>
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
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  data() {
    return {
      Height: window.innerHeight - 195,
      loading: false,
      vulnClassOptions: [],
      queryArgs: {
        vulnClass: '',
        logicAddr: '',
        dateValue: ''
      },
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      tableData: []
    }
  },
  created() {
    this.getOptions('vulnClass', 'cmpProb', 'vulnClassOptions')
    this.getDate()
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
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'vulnClassOptions') {
          $self.vulnClassOptions = response.result
        }
      }).catch(() => {
      })
    },
    getTableData() {
      const $self = this
      $self.loading = true
      let param = {}
      let dateValueArr = []
      param = $self.queryArgs
      if ($self.queryArgs.dateValue) {
        dateValueArr = $self.queryArgs.dateValue
        param.beginTime = dateValueArr[0]
        param.endTime = dateValueArr[1]
      }
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('frail/queryFrailHisListByPage', param).then(response => {
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        $self.loading = false
      }).catch(() => {
        $self.loading = false
      })
    },
    getDate() {
      const date = new Date()
      date.getFullYear() // 获取完整的年份(4位)
      date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
      const startDate = date.getFullYear() + '01'
      const endDate = date.getFullYear() + '' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1)
      const arr = []
      arr.push(startDate)
      arr.push(endDate)
      this.queryArgs.dateValue = arr
    },
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
    probInfo(row) {
      this.$router.push({
        path: '/satp-prob/frail/frailProbInfo',
        query: {
          'vulnClass': row.vulnClass,
          'logicAddr': row.logicAddr
        }
      })
    },
    charts(row) {
      let dateValueArr = []
      let beginTime = ''
      let endTime = ''
      if (this.queryArgs.dateValue) {
        dateValueArr = this.queryArgs.dateValue
        beginTime = dateValueArr[0]
        endTime = dateValueArr[1]
      }
      this.$router.push({
        path: '/satp-prob/frail/assetProbLineCharts',
        query: {
          'logicAddr': row.logicAddr,
          'vulnClass': row.vulnClass,
          'beginTime': beginTime,
          'endTime': endTime
        }
      })
    },
    vulnChart(row) {
      let dateValueArr = []
      let beginTime = ''
      let endTime = ''
      if (this.queryArgs.dateValue) {
        dateValueArr = this.queryArgs.dateValue
        beginTime = dateValueArr[0]
        endTime = dateValueArr[1]
      }
      this.$router.push({
        path: '/satp-prob/frail/assetProbBarCharts',
        query: {
          'vulnClass': row.vulnClass,
          'logicAddr': row.logicAddr,
          'beginTime': beginTime,
          'endTime': endTime
        }
      })
    }
  }
}
</script>
