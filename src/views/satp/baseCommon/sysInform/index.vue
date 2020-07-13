<template>
  <div class="custom-tree-container">
    <el-page-header title="返回主页" content="通知提醒" @back="goBack" />

    <div class="pages">
      <el-table
        v-loading="loading"
        class="elTable"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(185, 185, 185, 0.1)"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="350"
      >
        <el-table-column prop="informType" label="通知类型" min-width="100" />
        <el-table-column prop="inform_content" label="通知内容" min-width="100" />
        <el-table-column prop="informDate" label="通知时间" min-width="120">
          <template slot-scope="scope">{{ dateFormat(scope.row.informDate) }}</template>
        </el-table-column>
        <el-table-column prop="informTitle" label="通知标题" min-width="100" />

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      }
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        let value = ''
        if (el) {
          value = this.moment(el).format('YYYY-MM-D HH:mm:ss')
        }
        return value
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      const $self = this
      $self.loading = true
      window.console.info('this.$store')
      window.console.info(this.$store)
      const param = {}
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('base/querySysInformListByPage', param).then(response => {
        $self.loading = false
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        $self.loading = false
        // this.rowsFormatter(response.rows)
      }).catch(erro => {
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
    },
    goBack() {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree-container {
  position: relative;
  height: 100%;
  -webkit-perspective: 1500;
  -moz-perspective: 1500;
  padding:12px;
  .cards {
      margin-top: 20px;
    // height: 100%;
    transition: all 1s;
    backface-visibility: hidden;
    transform: rotateY(0deg);
    background: #f9f9f9;
    .medium {
      border-bottom: 1px solid #ededed;
      overflow: hidden;
    }
  }
  .detailSqu{
      min-height: 30px;
      display: none;
      background:#ededed
  }
  .listmeun {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    transition: all 1s;
    backface-visibility: hidden;
    background: #f9f9f9;
    transform: rotateY(180deg);
    .singlecharts {
      width: 100%;
      height: 350px;
      border-top: 1px solid #ccc;
    }
    ul {
      padding: 10px;
      overflow: hidden;
      li {
        width: 160px;
        height: 120px;
        float: left;
        margin: 5px;
        background: #f2f2f2;
        position: relative;
        span {
          display: inline-block;
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 30px;
          left: 0px;
          line-height: 30px;
          background: #a9a9a9;
          color: #fff;
        }
      }
      li.active {
        span {
          background: #8fc320;
        }
      }
    }
  }
}
</style>
