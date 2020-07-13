<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="80%"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >
    <component
      :is="componentData.component"
      :url="url"
      :qparams="params"
      :columns="columns"
      idx
      :height="tableHeight"
      border
      class="satp-grid-mini"
      @operClick="neglectClick"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    parentComponentParam: { type: Object, default() { return {} } }
  },
  data() {
    return {
      loading: true,
      title: '',
      url: 'disposal/queryProbdetailListByPage',
      tableHeight: 250,
      params: {
        probId: ''
      },
      columns: [
      ],
      componentData: {},
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
    this.initTable()
  },
  methods: {
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    cancel() {
      this.$emit('update:parentComponentParam', {})
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    dateformatter(row) {
      if (!row.testTime) {
        return ''
      }
      return this.moment(row.testTime).format('YYYY-MM-DD HH:mm:ss')
    },
    initTable() {
      const $self = this
      $self.title = '资产地址[' + $self.parentComponentParam.logicAddr + ']'
      const probId = $self.parentComponentParam.probId
      const vulnClass = $self.parentComponentParam.vulnClass
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
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
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
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
        ]
      } else if (vulnClass === '3') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 100, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
        ]
      } else if (vulnClass === '4') {
        $self.columns = [
          { label: '漏洞名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
          { label: 'CVE_ID', prop: 'cveId', 'minWidth': 100, align: 'center' },
          { label: '漏洞描述', prop: 'vulnDesc', 'minWidth': 100, align: 'center' },
          { label: '问题类型', prop: 'vulnTypeLabel', 'minWidth': 100, align: 'center' },
          { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '问题来源', prop: 'vulnSrc', 'minWidth': 100, align: 'center' },
          { label: '重复出现', prop: 'isRepet', 'minWidth': 100, align: 'center' },
          { label: '发现次数', prop: 'occNo', 'minWidth': 100, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 100, align: 'center' },
          { label: '整改发起时间', prop: 'rectTime', 'minWidth': 200, align: 'center', 'template': true, 'formatter': this.dateformatter },
          { label: '整改期限', prop: 'rectPeriod', 'minWidth': 100, align: 'center' },
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
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
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
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
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 150, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
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
          { label: '整改最终结论', prop: 'rectCnclsn', 'minWidth': 100, align: 'center' },
          {
            label: '操作',
            align: 'center',
            fixed: 'right',
            width: 200,
            actions: [
              { formatter: 'operFormat', label: '永久忽略', prop: 'neglectForever', type: 'primary', icon: '', popconfirm: '是否永久忽略?' },
              { formatter: 'operFormat', label: '本次忽略', prop: 'neglectOnce', type: 'primary', icon: '', popconfirm: '是否本次忽略?' }
            ]
          }
        ]
      }
      window.console.info('columns', $self.columns)
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    neglectClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'neglectForever':
          this.neglectForever(row)
          break
        case 'neglectOnce':
          this.neglectOnce(row)
          break
        default:
          break
      }
    },
    // 忽略本次
    neglectOnce(row) {
      const param = {}
      param.probDetailId = row.probDetailId
      param.rectStat = '2'
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$store.dispatch('disposal/updateProbdetail', param).then(response => {
        if (response.RET_CODE === '0') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!'
          })
        }
        loading.close()
        this.initTable()
      }).catch(() => {
      })
    },
    // 永久忽略
    neglectForever(row) {
      const param = {}
      param.probDetailId = row.probDetailId
      param.rectStat = '6'
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$store.dispatch('disposal/updateProbdetail', param).then(response => {
        if (response.RET_CODE === '0') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!'
          })
        }
        loading.close()
        this.initTable()
      }).catch(() => {
      })
    }
  }
}
</script>

<style  lang="scss" scoped>

</style>
