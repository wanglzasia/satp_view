<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="queryArgs"
          label-position="left"
          label-width="85px"
          size="small"
          class="demo-form-inline"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="问题名称">
                <el-input v-model="queryArgs.vulnTitle" placeholder="问题名称" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
            <el-col :span="4">
              <el-form-item label="资产类型">
                <el-select v-model="queryArgs.probAssetType" placeholder="资产类型">
                  <el-option
                    v-for="item in probAssetTypeOptions"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="地址">
                <el-input v-model="queryArgs.logicAddr" placeholder="地址" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="风险等级">
                <el-select v-model="queryArgs.riskLevel" placeholder="风险等级">
                  <el-option
                    v-for="item in riskLevelOptions"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <div style="width:96px;">
                <el-dropdown size="small" split-button type="primary" @click="searchData">
                  <i class="el-icon-search" />查询
                  <!-- <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu> -->
                </el-dropdown>
              </div>
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
          <el-table-column align="center" prop="vulnTitle" label="问题名称 " width="180" />
          <el-table-column align="center" prop="cveId" label="CVEID " width="180" />
          <el-table-column align="center" prop="vulnClassName" label="问题类型 " width="180" />
          <el-table-column align="center" prop="riskLevelLabel" label="风险等级 " width="180" />
          <el-table-column align="center" prop="vulnCnt" label="出现次数 " width="180" />
          <el-table-column fixed="right" label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click.native.prevent="fraiAsset(scope.row)">资产详情</el-link>
              <el-link type="primary" @click.native.prevent="trendCharts(scope.row)">趋势图</el-link>
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
  data() {
    return {
      Height: window.innerHeight - 195,
      loading: false,
      vulnClassOptions: [],
      riskLevelOptions: [],
      probAssetTypeOptions: [],
      queryArgs: {
        vulnClass: '',
        logicAddr: '',
        probAssetType: '',
        riskLevel: ''
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
    this.getOptions('riskLevel', 'all', 'riskLevelOptions')
    this.getOptions('probAssetType', 'cmpProb', 'probAssetTypeOptions')
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
        if (options === 'statusOptions') {
          $self.statusOptions = response.result
        } else if (options === 'probAssetTypeOptions') {
          $self.probAssetTypeOptions = response.result
        } else if (options === 'vulnClassOptions') {
          $self.vulnClassOptions = response.result
        }
      }).catch(() => {
      })
    },
    getTableData() {
      const $self = this
      $self.loading = true
      let param = {}
      param = $self.queryArgs
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('frail/queryFragVulnListByPage', param).then(response => {
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        $self.loading = false
      }).catch(() => {
        $self.loading = false
      })
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
    fraiAsset(row) {
      this.$router.push({
        path: '/satp-prob/frail/frailAsset',
        query: {
          'vulnTitle': row.vulnTitle,
          'vulnClass': row.vulnClass,
          'vulnClassName': row.vulnClassName
        }
      })
    },
    trendCharts(row) {
      window.console.info(this.$router)
      this.$router.push({
        path: '/satp-prob/frail/trendCharts',
        query: {
          'vulnTitle': row.vulnTitle,
          'vulnClass': row.vulnClass,
          'vulnClassName': row.vulnClassName
        }
      })
    }
  }
}
</script>
