<template>
  <div class="custom-tree-container">
    <div>
      <el-page-header content="历史轨迹" @back="goBack" />
      <router-view />
    </div>
    <div class="radius">
      <div style="padding: 0px 15px 15px 15px;">
        <el-row>
          <el-col :span="12">
            <h3><span class="data_titles">问题信息</span></h3>
          </el-col>
        </el-row>
      </div>
      <div style="padding-left:20px;padding-right:20px;padding-bottom:20px;">
        <table class="gridtable" style="width:100%;">
          <tr>
            <th width="80px">问题名称</th>
            <td style="text-align:left;" colspan="5">{{ probdetailData.vulnTitle }}</td>

          </tr>
          <tr>
            <th width="80px">问题类型</th>
            <td style="text-align:left;">{{ probdetailData.vulnClassName }}</td>
            <th width="80px">问题分类</th>
            <td style="text-align:left;" />
            <th width="80px">问题子类</th>
            <td style="text-align:left;" />
          </tr>
          <tr>
            <th width="80px">问题来源</th>
            <td style="text-align:left;" />
            <th width="80px">问题状态</th>
            <td style="text-align:left;" />
            <th width="80px">发现时间</th>
            <td style="text-align:left;" />
          </tr>

        </table>
      </div>
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
      <component
        :is="componentData.component"
        :url="url"
        :qparams="queryArgs"
        :columns="columns"
        idx
        :height="tableHeight"
        border
        class="satp-grid-mini"
        @operClick="operClick"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'disposal/queryProbHisInfoListByPage',
      tableHeight: 450,
      columns: [
        { label: '资产名称', prop: 'assetName', 'minWidth': 150, align: 'center' },
        { label: '资产IP', prop: 'logicAddr', 'minWidth': 150, align: 'center' },
        { label: '业务系统', prop: 'bizName', 'minWidth': 150, align: 'center' },
        { label: '资产类型', prop: 'assetTypeLabel', 'minWidth': 150, align: 'center' },
        { label: '问题分类', prop: 'vulnClassName', 'minWidth': 150, align: 'center' },
        { label: '部门', prop: 'deptName', 'minWidth': 150, align: 'center' },
        { label: '科室', prop: 'sectName', 'minWidth': 150, align: 'center' },
        { label: '厂商负责人', prop: 'safetyMfrs', 'minWidth': 150, align: 'center' },
        { label: '安全责任人', prop: 'scyRespId', 'minWidth': 150, align: 'center' },
        { label: '安全管理员', prop: 'safetyMgr', 'minWidth': 150, align: 'center' },
        { label: '问题数量', prop: 'probNo', 'minWidth': 150, align: 'center' },
        { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 150, align: 'center' },
        { label: '整改发起时间', prop: 'rectTime', 'minWidth': 150, align: 'center' },
        { label: '整改期限', prop: 'rectPeriod', 'minWidth': 150, align: 'center' },
        { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }
      ],
      componentData: {},
      queryArgs: {
        logicId: '',
        vulnClass: ''
      },
      probDetailId: '',
      loading: false,
      probdetailData: {}
    }
  },
  // 格式化返回的时间格式
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-D HH:mm:ss')
      }
    }
  },
  created() {
    this.queryArgs.logicId = this.$route.query.logicId
    this.queryArgs.vulnClass = this.$route.query.vulnClass
    this.probDetailId = this.$route.query.probDetailId
    this.initTable()
    this.getProbdetail()
  },
  methods: {
    getProbdetail() {
      const param = {}
      const $self = this
      param.probDetailId = $self.probDetailId
      $self.$store.dispatch('disposal/queryProbdetailList', param).then(response => {
        $self.probdetailData = response.result[0]
      }).catch(() => {
      })
    },
    goBack() {
      this.$router.push({ path: '/satp/disposal/probInfo' })
    },
    initTable() {
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    operClick(data) {
      const { row, prop } = data
      console.log(row)
      switch (prop) {
        case 'hisInfo':
          // this.hisInfo(row)
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.radius {
    min-height: 120px;
    width: 100%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 5px;
}

.data_titles{
  line-height: 32px;
  float: left;
}
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;min-width:80px;padding:8px;}
.data_titles:before{
  content:"";
  width: 4px;
  height: 25px;
  background-color: #409eff;
  float: left;
  margin: 5px 5px 0px -5px;
}
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
