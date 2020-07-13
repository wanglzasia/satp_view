<template>
  <div>
    <div class="app-container">
      <div>
        <el-page-header :content="content" @back="goBack" />
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
                <el-input v-model="queryArgs.vulnTitle" placeholder="地址" />
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <div style="width:96px;">
                <el-dropdown size="small" split-button type="primary" @click="searchData">
                  <i class="el-icon-search" />查询
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
      queryArgs: {
        vulnTitle: ''
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
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '问题名称', 'align': 'left' },
        { 'id': '2', 'field': 'itemNo', 'fieldType': 'text', 'text': '合规编号', 'align': 'left' },
        { 'id': '3', 'field': 'itemContent', 'fieldType': 'text', 'text': '合规项内容', 'align': 'left' },
        { 'id': '4', 'field': 'sumVuln', 'fieldType': 'text', 'text': '问题个数', 'align': 'left' }
      ],
      weakPwdThead: [
        { 'id': '1', 'field': 'account', 'fieldType': 'text', 'text': '账号', 'align': 'left' },
        { 'id': '2', 'field': 'weakPwd', 'fieldType': 'text', 'text': '密码', 'align': 'left' },
        { 'id': '3', 'field': 'sumVuln', 'fieldType': 'text', 'text': '问题个数', 'align': 'left' }
      ],
      sysThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
        { 'id': '3', 'field': 'riskLevelLabel', 'fieldType': 'text', 'text': '漏洞等级', 'align': 'left' },
        { 'id': '4', 'field': 'sumVuln', 'fieldType': 'text', 'text': '漏洞个数', 'align': 'left' }
      ],
      webThead: [
        { 'id': '1', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
        { 'id': '2', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVE编号', 'align': 'left' },
        { 'id': '3', 'field': 'riskLevelLabel', 'fieldType': 'text', 'text': '漏洞等级', 'align': 'left' },
        { 'id': '4', 'field': 'cnt', 'fieldType': 'text', 'text': '漏洞个数', 'align': 'left' }
      ],
      vulnClass: '',
      logicAddr: '',
      content: ''
    }
  },
  created() {
    this.vulnClass = this.$route.query.vulnClass
    this.logicAddr = this.$route.query.logicAddr
    if (this.vulnClass === '1') {
      this.tableThead = this.baseLineThead
      this.content = '[' + this.logicAddr + ']基线问题'
    } else if (this.vulnClass === '2') {
      this.tableThead = this.weakPwdThead
      this.content = '[' + this.logicAddr + ']弱口令问题'
    } else if (this.vulnClass === '3') {
      this.tableThead = this.sysThead
      this.content = '[' + this.logicAddr + ']系统漏洞问题'
    } else if (this.vulnClass === '4') {
      this.tableThead = this.webThead
      this.content = '[' + this.logicAddr + ']web漏洞漏洞问题'
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
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailHis'
      })
    },
    getTableData() {
      const $self = this
      $self.loading = true
      let param = {}
      param = $self.queryArgs
      param.vulnClass = this.vulnClass
      param.logicAddr = this.logicAddr
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('frail/queryFrailProbInfoByPage', param).then(response => {
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
    }
  }
}
</script>
