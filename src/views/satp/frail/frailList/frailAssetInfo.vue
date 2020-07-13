<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header content="脆弱性问题详情" @back="goBack" />
        <router-view />
      </div>
      <div style="padding: 0px 15px 15px 15px;">
        <el-row>
          <el-col :span="12">
            <h3><span class="data_titles">问题信息</span></h3>
          </el-col>
        </el-row>
      </div>
      <table class="gridtable" style="width:100%;padding-left:20px;padding-right:20px;padding-bottom:20px;">
        <tr v-for="(item,index) in resultBean" :key="index">
          <th v-if="item.vuln_class == '1'" width="200px">不合规基线数</th>
          <td v-if="item.vuln_class == '1'" style="text-align:left;">
            <b>{{ item.cnt }}</b>个
          </td>

          <th v-if="item.vuln_class == '2'" width="200px">弱口令数</th>
          <td v-if="item.vuln_class == '2'" style="text-align:left;">
            <b>{{ item.cnt }}</b>个
          </td>

          <th v-if="item.vuln_class == '3'" width="200px">系统漏洞数</th>
          <td v-if="item.vuln_class == '3'" style="text-align:left;">
            低危<b>{{ item.low_risk }}</b>个;
            中危<b>{{ item.middle_risk }}</b>个;
            高危<b>{{ item.high_risk }}</b>个;
            超危<b>{{ item.super_risk }}</b>个
          </td>

          <th v-if="item.vuln_class == '4'" width="200px">web漏洞数</th>
          <td v-if="item.vuln_class == '4'" style="text-align:left;">
            低危<b>{{ item.low_risk }}</b>个;
            中危<b>{{ item.middle_risk }}</b>个;
            高危<b>{{ item.high_risk }}</b>个;
            超危<b>{{ item.super_risk }}</b>个
          </td>

          <th v-if="item.vuln_class == '5'" width="200px">内容不合规数</th>
          <td v-if="item.vuln_class == '5'" style="text-align:left;">
            <b>{{ item.cnt }}</b>个
          </td>

          <th v-if="item.vuln_class == '7'" width="200px">代码安全问题数</th>
          <td v-if="item.vuln_class == '7'" style="text-align:left;">
            低危<b>{{ item.low_risk }}</b>个;
            中危<b>{{ item.middle_risk }}</b>个;
            高危<b>{{ item.high_risk }}</b>个;
            超危<b>{{ item.super_risk }}</b>个
          </td>

          <th v-if="item.vuln_class == '8'" width="200px">互联网暴露资产漏洞数</th>
          <td v-if="item.vuln_class == '8'" style="text-align:left;">
            低危<b>{{ item.low_risk }}</b>个;
            中危<b>{{ item.middle_risk }}</b>个;
            高危<b>{{ item.high_risk }}</b>个;
            超危<b>{{ item.super_risk }}</b>个
          </td>
        </tr>

      </table>
      <div style="padding-left:20px;padding-right:20px;">
        <el-divider />
      </div>
      <el-col v-for="(item,index) in tableData" :key="index" :span="24">
        <component
          :is="item.templeSrc"
          :parent-component-param="item"
        />
      </el-col>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Height: window.innerHeight - 195,
      baseShow: false,
      weakShow: false,
      sysShow: false,
      webShow: false,
      contentShow: false,
      codeSafeShow: false,
      internetShow: false,
      assetId: '',
      resultBean: [],
      tableData: []
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
    this.assetId = this.$route.query.assetId
    this.getFrailAssetVulnInfo()
  },

  methods: {
    goBack() {
      this.$router.push({
        path: '/satp-prob/frail/frailList'
      })
    },
    getFrailAssetVulnInfo() {
      const param = {}
      param.assetId = this.assetId
      this.$store.dispatch('frail/queryFrailVulnInfoByAssetId', param).then(response => {
        this.resultBean = response.result
        for (var i = 0; i < this.resultBean.length; i++) {
          var vulnClass = this.resultBean[i].vuln_class
          const initDataVer = {
            'vulnClass': vulnClass,
            'assetId': this.assetId,
            templeSrc: () => import('./probetailList.vue')
          }
          this.tableData.push(initDataVer)
        }
        window.console.info(this.tableData)
        // this.resultBean = response.result
      }).catch(() => {
      })
    },
    frailAssetInfo(row) {
      this.$router.push({
        path: '/satp-prob/frail/frailAssetInfo',
        query: {
          'assetId': row.assetId
        }
      })
    }
  }
}
</script>
<style scoped>
.is-fixed {
    position: fixed;
    bottom: 0;
    padding: 1px;
    top: 200px;
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
