<template>
  <el-card>
    <h2 style="font-weight: 400;color: #1f2f3d;">分项合规统计</h2>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">系统漏洞统计</span>
          </el-row>
          <sys-datagrid
            :url="sysParam.url"
            :qparams="params"
            :columns="sysParam.columns"
            :toolbar="sysParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">web漏洞统计</span>
          </el-row>
          <web-datagrid
            :url="webParam.url"
            :qparams="params"
            :columns="webParam.columns"
            :toolbar="webParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">弱口令数量统计</span>
          </el-row>
          <weak-datagrid
            :url="weakParam.url"
            :qparams="params"
            :columns="weakParam.columns"
            :toolbar="weakParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">基线不合规数量统计</span>
          </el-row>
          <base-datagrid
            :url="baseParam.url"
            :qparams="params"
            :columns="baseParam.columns"
            :toolbar="baseParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">应用漏洞数量统计</span>
          </el-row>
          <app-vuln-datagrid
            :url="appVulnParam.url"
            :qparams="params"
            :columns="appVulnParam.columns"
            :toolbar="appVulnParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">代码审计问题统计</span>
          </el-row>
          <code-datagrid
            :url="codeParam.url"
            :qparams="params"
            :columns="codeParam.columns"
            :toolbar="codeParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <el-row>
            <span class="satp-div-titles">互联网暴露资产漏洞统计</span>
          </el-row>
          <internet-datagrid
            :url="internetParam.url"
            :qparams="params"
            :columns="internetParam.columns"
            :toolbar="internetParam.toolbar"
            idx
            :height="tableHeight"
            border
            class="satp-grid-mini"
            @toolbarClick="toolbarClick"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card shadow="never">
        <el-row>
          <span class="satp-div-titles">应用漏洞按类型数量统计</span>
        </el-row>
        <appvulnbytype-datagrid
          :url="appVulnByTypeParam.url"
          :qparams="params"
          :columns="appVulnByTypeParam.columns"
          :toolbar="appVulnByTypeParam.toolbar"
          idx
          :height="tableHeight"
          border
          class="satp-grid-mini"
          @toolbarClick="toolbarClick"
        />
      </el-card>
    </el-row>
  </el-card>
</template>

<script>
import sysdatagrid from '@/components/datagrid/datagrid'
import webdatagrid from '@/components/datagrid/datagrid'
import weakdatagrid from '@/components/datagrid/datagrid'
import basedatagrid from '@/components/datagrid/datagrid'
import appvulndatagrid from '@/components/datagrid/datagrid'
import codedatagrid from '@/components/datagrid/datagrid'
import internetdatagrid from '@/components/datagrid/datagrid'
import appvulnbytypedatagrid from '@/components/datagrid/datagrid'
export default {
  components: {
    'sys-datagrid': sysdatagrid,
    'web-datagrid': webdatagrid,
    'weak-datagrid': weakdatagrid,
    'base-datagrid': basedatagrid,
    'app-vuln-datagrid': appvulndatagrid,
    'code-datagrid': codedatagrid,
    'internet-datagrid': internetdatagrid,
    'appvulnbytype-datagrid': appvulnbytypedatagrid
  },
  props: ['parentParam'],
  data() {
    return {
      sysParam: {
        url: 'reportManage/querySysVulnListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '高风险', prop: 'high', 'width': 120, align: 'center' },
          { label: '中风险', prop: 'middle', 'width': 120, align: 'center' },
          { label: '低风险', prop: 'low', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'sysVulnExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'sysVulnExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      webParam: {
        url: 'reportManage/queryWebVulnListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '高风险', prop: 'high', 'width': 120, align: 'center' },
          { label: '中风险', prop: 'middle', 'width': 120, align: 'center' },
          { label: '低风险', prop: 'low', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'webVulnExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'webVulnExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      weakParam: {
        url: 'reportManage/queryWeakPwdListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '弱口令数量', prop: 'probSum', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'weakPwdExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'weakPwdExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      baseParam: {
        url: 'reportManage/queryBaseNoItemListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '不合规基线数量', prop: 'probSum', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'baseNoItemExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'baseNoItemExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      appVulnParam: {
        url: 'reportManage/queryAppVulnListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '高风险', prop: 'high', 'width': 120, align: 'center' },
          { label: '中风险', prop: 'middle', 'width': 120, align: 'center' },
          { label: '低风险', prop: 'low', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'appVulnExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'appVulnExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      appVulnByTypeParam: {
        url: 'reportManage/queryAppVulnByTypeListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: 'SQL注入', prop: 'typeA', 'width': 120, align: 'center' },
          { label: 'XSS跨站脚本', prop: 'typeB', 'width': 120, align: 'center' },
          { label: '绕过类漏洞', prop: 'typeC', 'width': 120, align: 'center' },
          { label: '权限控制', prop: 'typeD', 'width': 120, align: 'center' },
          { label: '任意文件上传下载', prop: 'typeE', 'width': 120, align: 'center' },
          { label: '账号密码明文传输', prop: 'typeF', 'width': 120, align: 'center' },
          { label: '信息泄露', prop: 'typeG', 'width': 120, align: 'center' },
          { label: '业务逻辑', prop: 'typeH', 'width': 120, align: 'center' },
          { label: '远程命令执行', prop: 'typeI', 'width': 120, align: 'center' },
          { label: '未授权访问', prop: 'typeJ', 'width': 120, align: 'center' },
          { label: '应用弱口令', prop: 'typeK', 'width': 120, align: 'center' },
          { label: '入侵痕迹', prop: 'typeL', 'width': 120, align: 'center' },
          { label: 'APP测试', prop: 'typeM', 'width': 120, align: 'center' },
          { label: '中间件测试', prop: 'typeN', 'width': 120, align: 'center' },
          { label: '其他', prop: 'typeO', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'appVulnByTypeExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'appVulnByTypeExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      codeParam: {
        url: 'reportManage/querySafeCodeListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '高风险', prop: 'high', 'width': 120, align: 'center' },
          { label: '中风险', prop: 'middle', 'width': 120, align: 'center' },
          { label: '低风险', prop: 'low', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'safeCodeExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'safeCodeExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },

      internetParam: {
        url: 'reportManage/queryInternetAssetListByPage',
        columns: [
          { label: '业务系统', prop: 'bizName', 'width': 200, align: 'center' },
          { label: '高风险', prop: 'high', 'width': 120, align: 'center' },
          { label: '中风险', prop: 'middle', 'width': 120, align: 'center' },
          { label: '低风险', prop: 'low', 'width': 120, align: 'center' }
        ],
        toolbar: [
          { label: '导出excel', prop: 'internetAssetExcel', type: 'primary', icon: 'el-icon-download' },
          { label: '导出pdf', prop: 'internetAssetExport', type: 'primary', icon: 'el-icon-download' }
        ]
      },
      tableHeight: 300,
      params: {
        year: '',
        quarter: '',
        month: ''
      }

    }
  },
  created() {
    this.params.year = this.parentParam.year
    this.params.quarter = this.parentParam.quarter
    this.params.month = this.parentParam.month
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
    initTable() {

    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'sysVulnExcel':
          this.exportExcel('sysVulnExcel')
          break
        case 'sysVulnExport':
          this.exportPdf('sysVulnExport')
          break
        case 'webVulnExcel':
          this.exportExcel('webVulnExcel')
          break
        case 'webVulnExport':
          this.exportPdf('webVulnExport')
          break
        case 'weakPwdExcel':
          this.exportExcel('weakPwdExcel')
          break
        case 'weakPwdExport':
          this.exportPdf('weakPwdExport')
          break
        case 'baseNoItemExcel':
          this.exportExcel('baseNoItemExcel')
          break
        case 'baseNoItemExport':
          this.exportPdf('baseNoItemExport')
          break
        case 'appVulnExcel':
          this.exportExcel('appVulnExcel')
          break
        case 'appVulnExport':
          this.exportPdf('appVulnExport')
          break
        case 'safeCodeExcel':
          this.exportExcel('safeCodeExcel')
          break
        case 'safeCodeExport':
          this.exportPdf('safeCodeExport')
          break
        case 'internetAssetExcel':
          this.exportExcel('internetAssetExcel')
          break
        case 'internetAssetExport':
          this.exportPdf('internetAssetExport')
          break
        case 'appVulnByTypeExcel':
          this.exportExcel('appVulnByTypeExcel')
          break
        case 'appVulnByTypeExport':
          this.exportPdf('appVulnByTypeExport')
          break
        default:
          break
      }
    },
    exportExcel(flag) {
      this.params.flag = flag
      this.params.realName = this.excelFileName(flag)
      this.$store.dispatch('reportManage/exportReportManageExcel', this.params).then(response => {

      })
    },
    pdfFileName(flag) {
      let fileName = ''
      const year = this.params.year
      const quarter = this.params.quarter
      const month = this.params.month
      // 按月度
      if (month) {
        fileName = year + '年' + month + '月度'
      }
      // 按季度
      if (quarter && !month) {
        fileName = year + '年' + quarter + '季度'
      }
      // 按年度
      if (!quarter && !month) {
        fileName = year + '年度'
      }
      if (flag === 'sysVulnExport') {
        fileName += '系统漏洞统计.pdf'
      } else if (flag === 'webVulnExport') {
        fileName += 'web漏洞统计.pdf'
      } else if (flag === 'weakPwdExport') {
        fileName += '弱口令数量统计.pdf'
      } else if (flag === 'baseNoItemExport') {
        fileName += '基线不合规数量统计.pdf'
      } else if (flag === 'appVulnExport') {
        fileName += '应用漏洞数量统计.pdf'
      } else if (flag === 'safeCodeExport') {
        fileName += '代码安全问题数量统计.pdf'
      } else if (flag === 'internetAssetExport') {
        fileName += '互联网暴露资产漏洞数量统计.pdf'
      }
      return fileName
    },
    excelFileName(flag) {
      let fileName = ''
      const year = this.params.year
      const quarter = this.params.quarter
      const month = this.params.month
      // 按月度
      if (month) {
        fileName = year + '年' + month + '月度'
      }
      // 按季度
      if (quarter && !month) {
        fileName = year + '年' + quarter + '季度'
      }
      // 按年度
      if (!quarter && !month) {
        fileName = year + '年度'
      }
      if (flag === 'sysVulnExcel') {
        fileName += '系统漏洞统计.xls'
      } else if (flag === 'webVulnExcel') {
        fileName += 'web漏洞统计.xls'
      } else if (flag === 'weakPwdExcel') {
        fileName += '弱口令数量统计.xls'
      } else if (flag === 'baseNoItemExcel') {
        fileName += '基线不合规数量统计.xls'
      } else if (flag === 'appVulnExcel') {
        fileName += '应用漏洞数量统计.xls'
      } else if (flag === 'safeCodeExcel') {
        fileName += '代码安全问题数量统计.xls'
      } else if (flag === 'internetAssetExcel') {
        fileName += '互联网暴露资产漏洞数量统计.xls'
      }
      return fileName
    },
    exportPdf(flag) {
      this.params.flag = flag
      this.params.realName = this.pdfFileName(flag)
      this.$store.dispatch('reportManage/exportReportManagePdf', this.params).then(response => {

      })
    }
  }
}
</script>
<style scoped>
.gridtable {border-collapse: collapse;border:1px solid #e4e6eb;font-size:12px;}
.gridtable th {font-weight:500;border:1px solid #e4e6eb ;background-color: #f5f7f8;padding:8px;width:80px;text-align:left;}
.gridtable td {border-bottom:1px solid #e4e6eb;border-right:1px solid #e4e6eb;background-color: #ffffff;width:80px;padding:8px;}
</style>
