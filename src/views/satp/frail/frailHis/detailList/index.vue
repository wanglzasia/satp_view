<template>
  <div>
    <div class="app-container">
      <div>
        <el-page-header content="资产问题详情" @back="goBack" />
        <router-view />
      </div>
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
            <el-col :span="5">
              <el-form-item label="是否出现">
                <el-select v-model="queryArgs.isRepet" placeholder="是否出现">
                  <el-option
                    v-for="item in isRepetOptions"
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
          <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
            <template slot-scope="scope">
              <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
              <span v-if="thead.fieldType=='datetime'">{{ dateFormat(scope.row[thead.field]) }}</span>
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
// import '@/utils/index.js'
export default {
  name: 'ComplexTable',
  data() {
    return {
      Height: window.innerHeight - 195,
      loading: false,
      isRepetOptions: [
        { dictKey: '0', dictValue: '否' },
        { dictKey: '1', dictValue: '是' }
      ],
      queryArgs: {
        vulnTitle: '',
        isRepet: '',
        beginTime: '',
        endTime: '',
        logicAddr: '',
        vulnClass: '',
        rectStat: ''
      },
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      tableData: [],
      tableThead: [],
      baseLineThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '基线名称', 'align': 'left' },
        { 'id': '2', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
        { 'id': '3', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具', 'align': 'left' },
        { 'id': '4', 'field': 'isRepetLabel', 'fieldType': 'text', 'text': '是否重复出现', 'align': 'left' }
      ],
      weakPwdThead: [
        { 'id': '1', 'field': 'account', 'fieldType': 'text', 'text': '账号', 'align': 'left' },
        { 'id': '2', 'field': 'weakPwd', 'fieldType': 'text', 'text': '密码', 'align': 'left' },
        { 'id': '3', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
        { 'id': '4', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具', 'align': 'left' },
        { 'id': '5', 'field': 'isRepetLabel', 'fieldType': 'text', 'text': '是否重复出现', 'align': 'left' }
      ],
      sysThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
        { 'id': '3', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具', 'align': 'left' },
        { 'id': '4', 'field': 'isRepetLabel', 'fieldType': 'text', 'text': '是否重复出现', 'align': 'left' }
      ],
      webThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
        { 'id': '3', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具', 'align': 'left' },
        { 'id': '4', 'field': 'isRepetLabel', 'fieldType': 'text', 'text': '是否重复出现', 'align': 'left' }
      ],
      internetThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
        { 'id': '3', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具', 'align': 'left' },
        { 'id': '4', 'field': 'isRepetLabel', 'fieldType': 'text', 'text': '是否重复出现', 'align': 'left' }
      ]
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
    this.queryArgs.logicAddr = this.$route.query.logicAddr
    this.queryArgs.vulnClass = this.$route.query.vulnClass
    this.queryArgs.rectStat = this.$route.query.rectStat
    if (this.queryArgs.vulnClass === '1') {
      this.tableThead = this.baseLineThead
    } else if (this.queryArgs.vulnClass === '2') {
      this.tableThead = this.weakPwdThead
    } else if (this.queryArgs.vulnClass === '3') {
      this.tableThead = this.sysThead
    } else if (this.queryArgs.vulnClass === '4') {
      this.tableThead = this.webThead
    } else if (this.queryArgs.vulnClass === '8') {
      this.tableThead = this.internetThead
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
      this.queryArgs.beginTime = this.$route.query.beginTime
      this.queryArgs.endTime = this.$route.query.endTime
      const $self = this
      $self.loading = true
      let param = {}
      param = $self.queryArgs
      param.beginTime = param.beginTime.substring(0, 4) + '-' + param.beginTime.substring(4, 6) + '-01 00:00:00'
      let endTimeYear = Number(param.endTime.substring(0, 4))
      let endTimeMonth = Number(param.endTime.substring(4, 6))
      if (endTimeMonth === 12) {
        endTimeYear = endTimeYear + 1
        endTimeMonth = 1
      }
      param.endTime = new Date(new Date(endTimeYear, endTimeMonth, 1, 0, 0, 0).getTime() - 1000).format('yyyy-MM-dd hh:mm:ss')

      window.console.info(param.beginTime, param.endTime)
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('frail/queryProbdetailListByPage', param).then(response => {
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
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailHis'
      })
    }
  }
}
</script>
