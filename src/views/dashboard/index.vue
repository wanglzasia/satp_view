<template>
  <div class="custom-tree-container">
    <el-row :gutter="10">
      <el-col :span="5">

        <div class="dataBox_ grid-content bg_blue">
          <font style="line-height:30px;;">资产连通情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="连通率">{{ allInfoBean.ZclMap.biliOne }}</div>
            <div class="nums nums-border" title="可连通资产数量">{{ allInfoBean.ZclMap.kltCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.ZclMap.zclCont }}</div>
            <div style="clear:both;" />
          </div>
        </div>

      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_purple grid-content">
          <font style="line-height:30px;">安全基线合规情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="基线合规率">{{ allInfoBean.AqjMap.biliTwo }}</div>
            <div class="nums nums-border" title="基线不合规项数量">{{ allInfoBean.AqjMap.jxbhgCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.AqjMap.aqjCont }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_green grid-content">
          <font style="line-height:30px;">弱口令存在情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="弱口令数量">{{ allInfoBean.RklMap.rklCount }}</div>
            <div class="nums nums-border" title="存在弱口令资产数量">{{ allInfoBean.RklMap.rklzcCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.RklMap.yjcrklCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_6a30 grid-content">
          <font style="line-height:30px;">系统漏洞情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="中高危系统漏洞数量">{{ allInfoBean.XtlMap.zgwCount }}</div>
            <div class="nums nums-border" title="存在系统漏洞资产数量">{{ allInfoBean.XtlMap.czxtldCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.XtlMap.xtlCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="dataBox_ bg_dark grid-content" style="margin-right:0px">
          <font style="line-height:30px;">Web漏洞情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="中高危Web漏洞数量">{{ allInfoBean.WebMap.zgwWebCount }}</div>
            <div class="nums nums-border" title="存在Web漏洞资产数量">{{ allInfoBean.WebMap.czWebCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.WebMap.webCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="dataBox_ grid-content bg_af61">
          <font style="line-height:40px;">内容合规情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="内容异常数量">{{ allInfoBean.NrhMap.nrycCount }}</div>
            <div class="nums nums-border" title="存在内容异常资产数量">{{ allInfoBean.NrhMap.cznryczcCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.NrhMap.nrhCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_80c0 grid-content">
          <font style="line-height:30px;">管理合规情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="管理类不合规项数量">{{ allInfoBean.GlhMap.glbhgCount }}</div>
            <div class="nums nums-border" title="">&nbsp;</div>
            <div class="nums" title="所涉及业务系统">{{ allInfoBean.GlhMap.sjywxtCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_orange grid-content">
          <font style="line-height:30px;">应用安全合规情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="应用不合规项数量">{{ allInfoBean.YyaMap.glbhgCount1 }}</div>
            <div class="nums nums-border" title="">&nbsp;</div>
            <div class="nums" title="涉及业务系统">{{ allInfoBean.YyaMap.sjywxtCount1 }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dataBox_ bg_80c0 grid-content">
          <font style="line-height:30px;">代码审计合规情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="存在代码安全问题数">{{ allInfoBean.SafeCodeMap.safeCodeCount }}</div>
            <div class="nums nums-border" title="存在代码安全问题资产数量">{{ allInfoBean.SafeCodeMap.safeCodezcCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.SafeCodeMap.yjcSafeCodeCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="dataBox_ bg_6a30 grid-content">
          <font style="line-height:30px;">互联网暴露资产情况</font><br>
          <div class="rpt_nums">
            <div class="nums nums-border" title="互联网暴露资产漏洞数量">{{ allInfoBean.HlwblzcqkMap.hlwblzcCount }}</div>
            <div class="nums nums-border" title="存在问题资产数量">{{ allInfoBean.HlwblzcqkMap.hlwblzczcCount }}</div>
            <div class="nums" title="已检测资产数量">{{ allInfoBean.HlwblzcqkMap.yjcHlwblzcCount }}</div>
            <div style="clear:both;" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-button size="mini" style="float:right;" round @click="showDialog('')">设置视图时间范围</el-button>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-loading="basLoading"
        label="基础安全视图"
        name="basicSecurity"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="chartsData.length==0 && basLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置基础安全视图"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in chartsData" :key="index" :span="12">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        v-loading="appLoading"
        label="应用安全视图"
        name="appSecurity"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="appSecurityChartsData.length==0 && appLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置应用安全视图"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in appSecurityChartsData" :key="index" :span="12">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        v-loading="contentLoading"
        label="内容安全视图"
        name="contentSecurity"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="contentSecurityChartsData.length==0 && contentLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置内容安全视图"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in contentSecurityChartsData" :key="index" :span="12">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        v-loading="manageLoading"
        label="管理安全视图"
        name="manageSecurity"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="manageSecurityChartsData.length==0 && manageLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置管理安全视图"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in manageSecurityChartsData" :key="index" :span="24">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        v-loading="codeLoading"
        label="代码安全视图"
        name="codeSafe"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="codeSafeChartsData.length==0 && codeLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置代码安全视图"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in codeSafeChartsData" :key="index" :span="12">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        v-loading="internetLoading"
        label="互联网暴露资产"
        name="internetAsset"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          v-if="internetAssetChartsData.length==0 && internetLoading==false"
          title="尚未设置显示"
          type="warning"
          description="请联系管理员为您设置互联网暴露资产"
          show-icon
        />
        <el-row :gutter="10">
          <el-col v-for="(item,index) in internetAssetChartsData" :key="index" :span="12">
            <el-card shadow="hover">
              <div style="position:relative;height:350px;overflow: hidden;">
                <el-alert
                  v-if="item.option ==null"
                  title="暂无数据"
                  type="warning"
                  center
                  effect="dark"
                  :closable="false"
                />
                <component
                  :is="item.templeSrc"
                  v-else
                  :chart-data="item"
                  @showChartDetails="showChartDetails"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="时间范围设置" :visible.sync="dialogDateVisible" width="400px" :model="dateParam" :modal-append-to-body="false">
      <el-form :model="dateParam" label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="20">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="dateParam.daterange"
                size="small"
                type="monthrange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog('')">取消</el-button>
        <el-button type="primary" :loading="savebutton" @click="saveForm()">保存</el-button>
      </div>
    </el-dialog>

    <assetinfo-window
      v-if="assetInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="assetInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <sysvulninfo-window
      v-if="sysVulnInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="sysVulnInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <webvulninfo-window
      v-if="webVulnInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="webVulnInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <baselineinfo-window
      v-if="baseLineInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="baseLineInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <weakpwdinfo-window
      v-if="weakPwdInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="weakPwdInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <contentsecurityinfo-window
      v-if="contentSecurityInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="contentSecurityInfoWindowVisible"
      :modal-append-to-body="false"
    />

    <codesafeinfo-window
      v-if="codeSafeInfoWindowVisible"
      :parent-component-param="parentComponentParam"
      :visible.sync="codeSafeInfoWindowVisible"
      :modal-append-to-body="false"
    />
  </div>

</template>
<script>
import AssetInfo from './AssetInfoWindow.vue'
import SysVulnInfo from './SysVulnInfoWindow.vue'
import WebVulnInfo from './WebVulnInfoWindow.vue'
import BaseLineInfo from './BaseLineInfoWindow.vue'
import WeakPwdInfo from './WeakPwdInfoWindow.vue'
import ContentSecutiryInfo from './ContentSecurityInfoWindow.vue'
import CodeSafeInfo from './CodeSafeInfoWindow.vue'
export default {
  components: {
    'assetinfo-window': AssetInfo,
    'sysvulninfo-window': SysVulnInfo,
    'webvulninfo-window': WebVulnInfo,
    'baselineinfo-window': BaseLineInfo,
    'weakpwdinfo-window': WeakPwdInfo,
    'contentsecurityinfo-window': ContentSecutiryInfo,
    'codesafeinfo-window': CodeSafeInfo
  },

  data() {
    return {
      dateParam: { // 查询条件
        daterange: []
      },
      allInfoBean: {
        ZclMap: { biliOne: '' },
        AqjMap: { biliTwo: '' },
        RklMap: { rklCount: '' },
        XtlMap: { zgwCount: '' },
        WebMap: { zgwWebCount: '' },
        NrhMap: { nrycCount: '' },
        GlhMap: { glbhgCount: '' },
        YyaMap: { glbhgCount1: '' },
        SafeCodeMap: { safeCodeCount: '' },
        HlwblzcqkMap: { hlwblzcCount: '' }
      },
      dialogDateVisible: false,
      activeName: 'basicSecurity',
      basLoading: false,
      appLoading: false,
      contentLoading: false,
      manageLoading: false,
      codeLoading: false,
      internetLoading: false,
      chartsData: [],
      appSecurityChartsData: [],
      contentSecurityChartsData: [],
      manageSecurityChartsData: [],
      codeSafeChartsData: [],
      internetAssetChartsData: [],
      currentData: {},
      savebutton: false,
      assetInfoWindowVisible: false,
      sysVulnInfoWindowVisible: false,
      webVulnInfoWindowVisible: false,
      baseLineInfoWindowVisible: false,
      weakPwdInfoWindowVisible: false,
      contentSecurityInfoWindowVisible: false,
      codeSafeInfoWindowVisible: false,
      parentComponentParam: {}
    }
  },
  created() {
    const param = {}
    param.reportType = 'basicSecurity'
    const $self = this
    this.getBasSecurityChartData($self, param)
    this.queryAllInfo()
    // this.getConfigMonth();
  },
  mounted() {},
  methods: {
    queryAllInfo() {
      this.$store.dispatch('rptView/queryAllInfo', {}).then(response => {
        this.allInfoBean = response
        window.console.info(response)
      })
    },
    // route: function(data) {
    //   this.currentData = data
    //   this.$refs.cards.style.transform = 'rotateY(-180deg)'
    //   this.$refs.listmeun.style.transform = 'rotateY(0deg)'
    // },
    // routeBack: function() {
    //   this.$refs.cards.style.transform = 'rotateY(0deg)'
    //   this.$refs.listmeun.style.transform = 'rotateY(180deg)'
    //   this.$refs.listmeun.style['backface-visibility'] = 'hidden'
    // },
    // changeChart(data) {
    //   this.currentData = data
    // },
    showChartDetails(val, data, type) {
      // const param = {}
      const title = data.title
      const viewType = data.viewType
      const vulnType = data.vulnType
      const vulnClass = data.vulnClass
      let yearMonth = ''
      let rectStat = ''
      let bizName = ''
      // const infoUrl = data.infoUrl
      this.parentComponentParam.title = title
      this.parentComponentParam.viewType = viewType
      if (viewType === 'asset' || viewType === 'vuln') {
        yearMonth = val.name
      } else if (viewType === 'biz') {
        bizName = val.name
      } else if (viewType === 'rectify') {
        if (val.name === '正在整改') {
          rectStat = '3'
        } else if (val.name === '已整改') {
          rectStat = '1'
        } else if (val.name === '待整改') {
          rectStat = '0'
        } else if (val.name === '已报备') {
          rectStat = '4'
        }
      }
      if (vulnType === 'basicSecurity') {
        this.parentComponentParam.vulnType = '1'
      } else if (vulnType === 'appSecurity') {
        this.parentComponentParam.vulnType = '2'
      } else if (vulnType === 'contentSecurity') {
        this.parentComponentParam.vulnType = '3'
      } else if (vulnType === 'codeSafe') {
        this.parentComponentParam.vulnType = '2'
      } else if (vulnType === 'internetAsset') {
        this.parentComponentParam.vulnType = '1'
      } else if (vulnType === 'manageSecurity') {
        this.parentComponentParam.vulnType = '4'
      }
      this.parentComponentParam.vulnClass = vulnClass
      this.parentComponentParam.yearMonth = yearMonth
      this.parentComponentParam.rectStat = rectStat
      this.parentComponentParam.bizName = bizName

      // this.parentComponentParam.infoUrl = infoUrl;
      if (viewType === 'asset') { // 资产视图明细
        this.parentComponentParam.infoUrl = 'rptView/queryAssetInfoList'
        this.assetInfoWindowVisible = true
      } else if (viewType === 'vuln' || viewType === 'rectify' || viewType === 'biz') { // 漏洞问题视图明细
        this.parentComponentParam.infoUrl = 'rptView/queryProbInfoList'
        if (vulnClass === '3' || vulnClass === '8') { // 系统漏洞、互联网暴露
          this.sysVulnInfoWindowVisible = true
        } else if (vulnClass === '4') { // web
          this.webVulnInfoWindowVisible = true
        } else if (vulnClass === '1') { // 基线
          this.baseLineInfoWindowVisible = true
        } else if (vulnClass === '2') { // 弱口令
          this.weakPwdInfoWindowVisible = true
        } else if (vulnClass === '7') { // 代码安全
          this.codeSafeInfoWindowVisible = true
        }
        if (vulnType === 'contentSecurity') { // 内容安全
          this.contentSecurityInfoWindowVisible = true
        }
      }
    },
    getBasSecurityChartData(data, params) {
      this.basLoading = true
      this.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]
          const rVulnClass = rMap.REPORT_ID.split('_')[1]
          if (rptIdAttr === 'basVuln' || rptIdAttr === 'internetAssetVuln' || rptIdAttr === 'codeSafeVuln') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'vuln',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            if (rMap.rptResult.option != null) {
              initDataVer.option = rMap.rptResult.option
              data.chartsData.push(initDataVer)
            }
          } else if (rptIdAttr === 'basAsset' || rptIdAttr === 'internetAssetAsset' || rptIdAttr === 'codeSafeAsset') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'asset',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            if (rMap.rptResult.option != null) {
              initDataVer.option = rMap.rptResult.option
              data.chartsData.push(initDataVer)
            }
          } else if (rptIdAttr === 'basRectify' || rptIdAttr === 'internetAssetRectify' || rptIdAttr === 'codeSafeRectify') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'rectify',
              templeSrc: () => import('../../echarts/piechart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.chartsData.push(initDataVer)
          } else if (rptIdAttr === 'basBiz' || rptIdAttr === 'internetAssetBiz' || rptIdAttr === 'codeSafeBiz') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'biz',
              templeSrc: () => import('../../echarts/barhorizontalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.chartsData.push(initDataVer)
          }
        }
        this.basLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.basLoading = false
      })
    },

    getAppSecurityChartData(data, params) {
      const $self = this
      $self.appLoading = true
      $self.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]
          const rVulnClass = rMap.REPORT_ID.split('_')[1]
          if (rptIdAttr === 'basVuln') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'vuln',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            if (rMap.rptResult.option != null) {
              initDataVer.option = rMap.rptResult.option
              data.appSecurityChartsData.push(initDataVer)
            }
          } else if (rptIdAttr === 'basAsset') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'asset',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.appSecurityChartsData.push(initDataVer)
          } else if (rptIdAttr === 'basRectify') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'rectify',
              templeSrc: () => import('../../echarts/piechart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.appSecurityChartsData.push(initDataVer)
          } else if (rptIdAttr === 'basBiz') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'biz',
              templeSrc: () => import('../../echarts/barhorizontalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.appSecurityChartsData.push(initDataVer)
          }
        }
        $self.appLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        $self.appLoading = false
      })
    },

    getContentSecurityChartData(data, params) {
      this.contentLoading = true
      this.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]
          let rVulnClass = rMap.REPORT_ID.split('_')[1]
          if (rVulnClass === '6') { // 内容安全 转一下
            rVulnClass = '5'
          }
          if (rptIdAttr === 'basVuln') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'vuln',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.contentSecurityChartsData.push(initDataVer)
          } else if (rptIdAttr === 'basAsset') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'asset',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.contentSecurityChartsData.push(initDataVer)
          } else if (rptIdAttr === 'basRectify') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'rectify',
              templeSrc: () => import('../../echarts/piechart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.contentSecurityChartsData.push(initDataVer)
          } else if (rptIdAttr === 'basBiz') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'biz',
              templeSrc: () => import('../../echarts/barhorizontalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.contentSecurityChartsData.push(initDataVer)
          }
        }
        this.contentLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.contentLoading = false
      })
    },

    getManageSecurityChartData(data, params) {
      this.manageLoading = true
      this.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]

          if (rptIdAttr === 'manageView') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.manageSecurityChartsData.push(initDataVer)
          }
        }
        this.manageLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.manageLoading = false
      })
    },

    getCodeSafeChartData(data, params) {
      this.codeLoading = true
      this.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]
          const rVulnClass = rMap.REPORT_ID.split('_')[1]
          if (rptIdAttr === 'codeSafeVuln') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'vuln',
              infoUrl: 'rptView/queryProbInfoList',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.codeSafeChartsData.push(initDataVer)
          } else if (rptIdAttr === 'codeSafeAsset') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'asset',
              infoUrl: 'rptView/queryAssetInfoList',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.codeSafeChartsData.push(initDataVer)
          } else if (rptIdAttr === 'codeSafeRectify') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'rectify',
              templeSrc: () => import('../../echarts/piechart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.codeSafeChartsData.push(initDataVer)
          } else if (rptIdAttr === 'codeSafeBiz') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'biz',
              templeSrc: () => import('../../echarts/barhorizontalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.codeSafeChartsData.push(initDataVer)
          }
        }
        this.codeLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.codeLoading = false
      })
    },

    getInternetAssetChartData(data, params) {
      this.internetLoading = true
      this.$store.dispatch('rptView/loadView', params).then(response => {
        for (var i = 0; i < response.resultList.length; i++) {
          const rMap = response.resultList[i]
          const rVulnType = rMap.REPORT_TYPE
          const rptIdAttr = rMap.REPORT_ID.split('_')[0]
          const rVulnClass = rMap.REPORT_ID.split('_')[1]
          if (rptIdAttr === 'internetAssetVuln') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'vuln',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.internetAssetChartsData.push(initDataVer)
          } else if (rptIdAttr === 'internetAssetAsset') {
            const initDataVer = {
              vulnType: rVulnType,
              vulnClass: rVulnClass,
              viewType: 'asset',
              templeSrc: () => import('../../echarts/barverticalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.internetAssetChartsData.push(initDataVer)
          } else if (rptIdAttr === 'internetAssetRectify') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'rectify',
              templeSrc: () => import('../../echarts/piechart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.internetAssetChartsData.push(initDataVer)
          } else if (rptIdAttr === 'internetAssetBiz') {
            const initDataVer = {
              vulnType: rVulnType, // 问题类型
              vulnClass: rVulnClass, // 问题分类
              viewType: 'biz',
              templeSrc: () => import('../../echarts/barhorizontalchart.vue')
            }
            initDataVer.option = rMap.rptResult.option
            data.internetAssetChartsData.push(initDataVer)
          }
        }
        this.internetLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.internetLoading = false
      })
    },
    getCharData(name) {
      const param = {}
      param.reportType = name
      const $self = this
      if (name === 'basicSecurity') {
        $self.chartsData = []
        this.getBasSecurityChartData($self, param)
      } else if (name === 'appSecurity') {
        this.appSecurityChartsData = []
        this.getAppSecurityChartData($self, param)
      } else if (name === 'contentSecurity') {
        this.contentSecurityChartsData = []
        this.getContentSecurityChartData($self, param)
      } else if (name === 'manageSecurity') {
        this.manageSecurityChartsData = []
        this.getManageSecurityChartData($self, param)
      } else if (name === 'codeSafe') {
        this.codeSafeChartsData = []
        this.getCodeSafeChartData($self, param)
      } else if (name === 'internetAsset') {
        this.internetAssetChartsData = []
        this.getInternetAssetChartData($self, param)
      }
    },
    handleClick(tab, event) {
      this.getCharData(tab.name)
    },
    dateFormat(nS) {
      var date = new Date(parseInt(nS))
      var year = date.getFullYear()
      var mon = date.getMonth() + 1
      if (mon < 10) {
        mon = '0' + mon
      }
      // var day = date.getDate()
      // var hours = date.getHours()
      // var minu = date.getMinutes()
      // var sec = date.getSeconds()
      // return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
      return year + '' + mon
    },
    saveForm() {
      this.savebutton = true
      const $self = this
      const param = {}
      param.startMonth = $self.dateFormat($self.dateParam.daterange[0])
      param.endMonth = $self.dateFormat($self.dateParam.daterange[1])
      this.$store.dispatch('rptView/setRptViewConfigMonth', param).then(response => {
        if (response.RET_CODE === '0') {
          $self.$message({
            message: '操作成功',
            type: 'success'
          })
        }
        this.savebutton = false
        this.dialogDateVisible = false
        $self.getCharData($self.activeName)
      })
    },
    showDialog(type) {
      const $self = this
      $self.getRptViewConfigMonth()
    },
    cancelDialog(type) {
      this.dialogDateVisible = false
    },
    getRptViewConfigMonth() {
      const $self = this
      const param = {}
      this.$store.dispatch('rptView/getRptViewConfigMonth', param).then(response => {
        $self.dialogDateVisible = true
        const arr = [response.startMonth, response.endMonth]
        $self.dateParam.daterange = arr
        $self.dialogDateVisible = true
      })
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding-right: 8px;
}

.el-carousel__item {
     h3{
           color: #475669;
        font-size: 14px;
        /* opacity: 0.75; */
        margin: 0;
        text-align: left;
        padding: 10px;
        font-size: 18px;
        span.lists {
            display: inline-block;
            float: right;
            font-size: 14px;
        }
     }

     #chartContnt{
         height: calc(100% - 50px);
     }

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
// 布局样式
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .rpt_nums{
	margin:0 auto;
	border-top:1px dotted  rgba(212, 212, 212, 0.2);
  padding:3px 0px 3px 0px;
  }
.rpt_nums .nums{
	float:left;
	width:50px;
	margin-right:1px;
	font-size:8px;
	text-align:center;
	cursor:pointer;
}
.dataBox_{
	float:left;
	text-align:center;
	height:60px;
	color:white;
	line-height:5px;
}
.bg_blue{background-color:#343C5C;}
.bg_purple{background-color:#BA55D3;}
.bg_green{background-color:#32CD32;}
.bg_orange{background-color:#FFA500;}
.bg_dark{background-color:#02f786;}
.bg_af61{background-color:#afaf61;}
.bg_80c0{background-color:#8080c0;}
.bg_6a30{background-color:#c6a300;}

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
