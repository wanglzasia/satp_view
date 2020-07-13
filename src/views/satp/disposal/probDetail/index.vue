<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header content="详细" @back="goBack" />
        <router-view />
      </div>
      <div style="margin-top: 5px;">
        <el-row>
          <el-card shadow="never">
            <div style="padding: 0px 15px 15px 15px;">
              <el-row>
                <el-col :span="12">
                  <h3><span class="satp-div-titles">问题资产</span></h3>
                </el-col>
              </el-row>
            </div>
            <table class="satp-table-detail">
              <tr>
                <th>资产</th>
                <td>{{ probcenBean.assetName }}</td>
                <th>地址</th>
                <td>{{ probcenBean.logicAddr }}</td>
                <th>业务系统</th>
                <td>{{ probcenBean.bizName }}</td>
                <th>资产类型</th>
                <td>{{ probcenBean.assetTypeLabel }}</td>
              </tr>

              <tr>
                <th>安全责任人</th>
                <td>{{ probcenBean.scyRespName }}</td>
                <th>厂商负责人</th>
                <td>{{ probcenBean.safetyMfrsName }}</td>
                <th>安全管理员</th>
                <td>{{ probcenBean.safetyMgrName }}</td>
                <th>问题数量</th>
                <td>{{ probcenBean.probNo }}</td>
              </tr>

              <tr>
                <th>整改状态</th>
                <td>{{ probcenBean.rectStatLabel }}</td>
                <th>整改期限</th>
                <td>{{ probcenBean.rectPeriod }}工作日</td>
                <th>整改发起时间</th>
                <td colspan="3">{{ dateFormat(probcenBean.rectTime) }}</td>
              </tr>

            </table>
            <div style="padding-left:20px;padding-right:20px;">
              <el-divider />
            </div>
            <div style="padding: 0px 15px 15px 15px;">
              <el-row>
                <el-col :span="12">
                  <h3><span class="satp-div-titles">问题信息</span></h3>
                </el-col>
              </el-row>
            </div>
            <component
              :is="componentData.component"
              :url="url"
              :qparams="params"
              :columns="columns"
              idx
              :height="tableHeight"
              border
              class="satp-grid-mini"
            />
            <!--审批记录-->
            <flowTrace-view proc-def-key="reform_problem" :busi-id="parentParam.probId" />

          </el-card>
        </el-row>

      </div>
    </el-card>

  </div>
</template>
<script>
import FlowTrace from '@/components/FlowTrace/index.vue'
export default {
  components: { 'flowTrace-view': FlowTrace },
  data() {
    return {
      url: 'disposal/queryProbdetailListByPage',
      tableHeight: 250,
      params: {
        probId: '',
        vulnClass: ''
      },
      columns: [
      ],
      componentData: {},
      rectCnclsnOptions: [
        { dictKey: '1', dictValue: '整改完成' },
        { dictKey: '4', dictValue: '误报' },
        { dictKey: '5', dictValue: '无法整改' },
        { dictKey: '7', dictValue: '延期整改' },
        { idictKeyd: '8', dictValue: '临时整改' }
      ],
      parentParam: {
        probId: ''
      },
      formObj: {
        rectCnclsn: '',
        rectCnclsnVal: '',
        note: ''
      },
      auditFormObj: {
        rectifyComments: '',
        note: ''
      },
      checkFormObj: {
        rectifyComments: '',
        note: ''
      },
      auditCfmFormObj: {
        rectifyComments: '',
        note: ''
      },
      probcenBean: {},
      savebutton: false,
      rules: {
        // 验证必填项
        rectCnclsn: [
          { required: true, message: '请选择整改结论' }
        ]
      },
      auditRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      checkRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      auditCfmRules: {
        rectifyComments: [
          { required: true, message: '请选择处理结果' }
        ]
      },
      tableLoading: true,
      detailTableData: [],
      vulnClass: '',
      procDefKey: ''
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
    this.procDefKey = this.$route.query.procDefKey
    this.parentParam.probId = this.$route.query.probId.toString()
    this.queryProbcenListById()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/satp-prob/center' })
    },
    queryProbcenListById() {
      const param = {}
      const $self = this
      param.probId = $self.parentParam.probId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      $self.$store.dispatch('disposal/queryProbcenListById', param).then(response => {
        $self.probcenBean = response.result
        $self.vulnClass = response.result.vulnClass
        loading.close()
        $self.initTable()
      }).catch(() => {
        loading.close()
      })
    },
    initTable() {
      const $self = this
      const probId = $self.parentParam.probId.toString()
      const vulnClass = $self.vulnClass
      $self.params.probId = probId
      if (vulnClass === '1') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '合规项编码', prop: 'itemNo', 'minWidth': 100, align: 'center' },
          { label: '合规项内容', prop: 'itemContent', 'minWidth': 100, align: 'center' },
          { label: '合规项要求', prop: 'itemStandard', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      } else if (vulnClass === '2') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '弱口令账号', prop: 'account', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      } else if (vulnClass === '3') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      } else if (vulnClass === '4') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      } else if (vulnClass === '5') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      } else if (vulnClass === '7') {
        $self.columns = [
          { label: '缺陷名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '缺陷说明', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' }

        ]
      } else if (vulnClass === '8') {
        $self.columns = [
          { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: '问题描述', prop: 'vulnDesc', 'minWidth': 200, align: 'center' },
          { label: '服务名称', prop: 'serviceName', 'minWidth': 100, align: 'center' },
          { label: '端口', prop: 'port', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' }

        ]
      }
      window.console.info('columns', $self.columns)
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    dateformatter(row) {
      if (!row.testTime) {
        return ''
      }
      return this.moment(row.testTime).format('YYYY-MM-DD HH:mm:ss')
    },
    changeLocationValue(vId) {
      let obj = {}
      obj = this.rectCnclsnOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.dictKey === vId// 筛选出匹配数据
      })
      this.formObj.rectCnclsnVal = obj.dictValue
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
