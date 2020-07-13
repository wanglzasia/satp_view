<template>
  <div class="radius_100" style="top:10px;">
    <div
      style="padding: 15px 15px;
        text-align: left;
        font-size: 20px;
        font-weight: 700;"
    >
      <el-row>
        <el-col :span="12">
          <span class="data_root_titles">{{ userInfo.userName }} 视图设置</span>
        </el-col>
      </el-row>
    </div>
    <div style="padding:10px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-loading="basLoading"
          label="基础安全视图"
          name="basicSecurity"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="always">
                <div
                  style="padding: 8px 10px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500"
                >
                  <el-row>
                    <el-col :span="24">
                      <span class="titles">系统漏洞</span>
                    </el-col>
                  </el-row>
                </div>
                <el-aside width="100%;" style="line-height:70px;">
                  <el-col>
                    <el-checkbox v-model="checkBasSysAll" label="全选" :indeterminate="isIndeterminateBasSys" border size="medium" @change="handleCheckAllBasSysChange">全选</el-checkbox>
                  </el-col>

                  <el-checkbox-group v-model="checkedBasSys" @change="handleCheckedBasSysChange">
                    <el-col v-for="(item,index) in basSysOptions" :key="index">
                      <el-checkbox :label="item.key" :value="item.key" border size="medium">{{ item.label }}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-aside>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="always">
                <div
                  style="padding: 8px 10px;
                      text-align: left;
                      font-size: 16px;
                      font-weight: 500"
                >
                  <el-row>
                    <el-col :span="24">
                      <span class="titles">WEB漏洞</span>
                    </el-col>
                  </el-row>
                </div>
                <el-aside width="100%;" style="line-height:70px;">
                  <el-col>
                    <el-checkbox v-model="checkBasWebAll" label="全选" :indeterminate="isIndeterminateBasWeb" border size="medium" @change="handleCheckAllBasWebChange">全选</el-checkbox>
                  </el-col>

                  <el-checkbox-group v-model="checkedBasWeb" @change="handleCheckedBasWebChange">
                    <el-col v-for="(item,index) in basWebOptions" :key="index">
                      <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-aside>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="always">
                <div
                  style="padding: 8px 10px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500"
                >
                  <el-row>
                    <el-col :span="24">
                      <span class="titles">弱口令</span>
                    </el-col>
                  </el-row>
                </div>
                <el-aside width="100%;" style="line-height:70px;">
                  <el-col>
                    <el-checkbox v-model="checkBasWeakAll" label="全选" :indeterminate="isIndeterminateBasWeak" border size="medium" @change="handleCheckAllBasWeakChange">全选</el-checkbox>
                  </el-col>

                  <el-checkbox-group v-model="checkedBasWeak" @change="handleCheckedBasWeakChange">
                    <el-col v-for="(item,index) in basWeakOptions" :key="index">
                      <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-aside>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="always">
                <div
                  style="padding: 8px 10px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 500"
                >
                  <el-row>
                    <el-col :span="24">
                      <span class="titles">基线</span>
                    </el-col>
                  </el-row>
                </div>
                <el-aside width="100%;" style="line-height:70px;">
                  <el-col>
                    <el-checkbox v-model="checkBasBaseAll" label="全选" :indeterminate="isIndeterminateBasBase" border size="medium" @change="handleCheckAllBasBaseChange">全选</el-checkbox>
                  </el-col>

                  <el-checkbox-group v-model="checkedBasBase" @change="handleCheckedBasBaseChange">
                    <el-col v-for="(item,index) in basBaseOptions" :key="index">
                      <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-aside>
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
          <el-row :gutter="12">
            <el-card shadow="always">
              <div
                style="padding: 8px 10px;
                  text-align: left;
                  font-size: 16px;
                  font-weight: 500"
              >
                <el-row>
                  <el-col :span="24">
                    <span class="titles">应用安全</span>
                  </el-col>
                </el-row>
              </div>
              <el-aside width="100%;" style="line-height:70px;">
                <el-col>
                  <el-checkbox v-model="checkAppSecurityAll" label="全选" :indeterminate="isIndeterminateAppSecurity" border size="medium" @change="handleCheckAllAppSecurityChange">全选</el-checkbox>
                </el-col>

                <el-checkbox-group v-model="checkedAppSecurity" @change="handleCheckedAppSecurityChange">
                  <el-col v-for="(item,index) in appSecurityOptions" :key="index">
                    <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-aside>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="contentLoading"
          label="内容安全视图"
          name="contentSecurity"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-row :gutter="24">
            <el-card shadow="always">
              <div
                style="padding: 8px 10px;
                text-align: left;
                font-size: 16px;
                font-weight: 500"
              >
                <el-row>
                  <el-col :span="24">
                    <span class="titles">内容安全</span>
                  </el-col>
                </el-row>
              </div>
              <el-aside width="100%;" style="line-height:70px;">
                <el-col>
                  <el-checkbox v-model="checkContentSecurityAll" label="全选" :indeterminate="isIndeterminateContentSecurity" border size="medium" @change="handleCheckAllContentSecurityChange">全选</el-checkbox>
                </el-col>

                <el-checkbox-group v-model="checkedContentSecurity" @change="handleCheckedContentSecurityChange">
                  <el-col v-for="(item,index) in contentSecurityOptions" :key="index">
                    <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-aside>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="manageLoading"
          label="管理安全视图"
          name="manageSecurity"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >

          <el-row :gutter="24">
            <el-card shadow="always">
              <div
                style="padding: 8px 10px;
                text-align: left;
                font-size: 16px;
                font-weight: 500"
              >
                <el-row>
                  <el-col :span="24">
                    <span class="titles">管理安全</span>
                  </el-col>
                </el-row>
              </div>
              <el-aside width="100%;" style="line-height:70px;">

                <el-checkbox-group v-model="checkedManageSecurity" @change="handleCheckedManageSecurityChange">
                  <el-col v-for="(item,index) in manageSecurityOptions" :key="index">
                    <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-aside>
            </el-card>
          </el-row>

        </el-tab-pane>
        <el-tab-pane
          v-loading="codeLoading"
          label="代码安全视图"
          name="codeSafe"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-row :gutter="12">
            <el-card shadow="always">
              <div
                style="padding: 8px 10px;
                text-align: left;
                font-size: 16px;
                font-weight: 500"
              >
                <el-row>
                  <el-col :span="24">
                    <span class="titles">代码安全</span>
                  </el-col>
                </el-row>
              </div>
              <el-aside width="100%;" style="line-height:70px;">
                <el-col>
                  <el-checkbox v-model="checkCodeSafeAll" label="全选" :indeterminate="isIndeterminateCodeSafe" border size="medium" @change="handleCheckAllCodeSafeChange">全选</el-checkbox>
                </el-col>

                <el-checkbox-group v-model="checkedCodeSafe" @change="handleCheckedCodeSafeChange">
                  <el-col v-for="(item,index) in codeSafeOptions" :key="index">
                    <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-aside>
            </el-card>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-loading="internetLoading"
          label="互联网暴露资产"
          name="internetAsset"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-row :gutter="12">
            <el-card shadow="always">
              <div
                style="padding: 8px 10px;
                text-align: left;
                font-size: 16px;
                font-weight: 500"
              >
                <el-row>
                  <el-col :span="24">
                    <span class="titles">互联网暴露资产</span>
                  </el-col>
                </el-row>
              </div>
              <el-aside width="100%;" style="line-height:70px;">
                <el-col>
                  <el-checkbox v-model="checkInternetAssetAll" label="全选" :indeterminate="isIndeterminateInternetAsset" border size="medium" @change="handleCheckAllInternetAssetChange">全选</el-checkbox>
                </el-col>

                <el-checkbox-group v-model="checkedInternetAsset" @change="handleCheckedInternetAssetChange">
                  <el-col v-for="(item,index) in internetAssetOptions" :key="index">
                    <el-checkbox :key="item.key" :label="item.key" border size="medium">{{ item.label }}</el-checkbox>
                  </el-col>
                </el-checkbox-group>
              </el-aside>
            </el-card>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="padding:10px;">
      <el-button type="primary" :loading="saveLoading" @click="saveSet">保存设置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: { type: String, default: '' }
  },
  data() {
    return {
      activeName: 'basicSecurity',
      basLoading: true,
      appLoading: true,
      contentLoading: true,
      manageLoading: true,
      codeLoading: true,
      internetLoading: true,
      saveLoading: false,
      checkedBasSys: [],
      checkedBasWeb: [],
      checkedBasWeak: [],
      checkedBasBase: [],
      checkedAppSecurity: [],
      checkedContentSecurity: [],
      checkedManageSecurity: [],
      checkedCodeSafe: [],
      checkedInternetAsset: [],
      basSysOptions: [
        { key: 'basAsset_3', label: '中高危系统漏洞资产分布图' },
        { key: 'basVuln_3', label: '系统漏洞问题近况视图' },
        { key: 'basRectify_3', label: '系统漏洞问题整改情况' },
        { key: 'basBiz_3', label: '业务系统中高危系统漏洞排名' }
      ],
      basWebOptions: [
        { key: 'basAsset_4', label: 'WEB漏洞资产分布图' },
        { key: 'basVuln_4', label: 'WEB漏洞问题近况视图' },
        { key: 'basRectify_4', label: 'WEB漏洞问题整改情况' },
        { key: 'basBiz_4', label: '业务系统中高危WEB漏洞排名' }
      ],
      basWeakOptions: [
        { key: 'basAsset_2', label: '弱口令资产分布图' },
        { key: 'basVuln_2', label: '弱口令问题近况视图' },
        { key: 'basRectify_2', label: '弱口令问题整改情况' },
        { key: 'basBiz_2', label: '业务系统弱口令排名' }
      ],
      basBaseOptions: [
        { key: 'basAsset_1', label: '安全基线合规情况资产分布图' },
        { key: 'basVuln_1', label: '安全基线检查近况视图' },
        { key: 'basRectify_1', label: '安全基线问题处置状态图' },
        { key: 'basBiz_1', label: '业务系统安全基线问题排名' }
      ],
      appSecurityOptions: [
        { key: 'basAsset_5', label: '应用安全资产分布图' },
        { key: 'basVuln_5', label: '应用安全问题近况图' },
        { key: 'basRectify_5', label: '应用安全问题处置状态图' },
        { key: 'basBiz_5', label: '业务系统应用安全问题排名图' }
      ],
      contentSecurityOptions: [
        { key: 'basAsset_6', label: '内容合规资产分布图' },
        { key: 'basVuln_6', label: '内容合规问题近况图' },
        { key: 'basRectify_6', label: '内容合规问题处置状态图' },
        { key: 'basBiz_6', label: '业务系统内容合规问题排名图' }
      ],
      manageSecurityOptions: [
        { key: 'manageView', label: '符合性评测情况视图' }
      ],
      codeSafeOptions: [
        { key: 'codeSafeAsset_7', label: '代码审计缺陷资产分布图' },
        { key: 'codeSafeVuln_7', label: '代码审计缺陷近况视图' },
        { key: 'codeSafeRectify_7', label: '代码审计缺陷处置状态图' },
        { key: 'codeSafeBiz_7', label: '业务系统代码安全问题排名' }
      ],
      internetAssetOptions: [
        { key: 'internetAssetAsset_8', label: '互联网暴露资产分布图' },
        { key: 'internetAssetVuln_8', label: '互联网暴露资产问题近况视图' },
        { key: 'internetAssetRectify_8', label: '互联网暴露资产问题处置状态图' },
        { key: 'internetAssetBiz_8', label: '业务系统互联网暴露资产问题排名' }
      ],
      isIndeterminateBasSys: true,
      checkBasSysAll: false,
      isIndeterminateBasWeb: true,
      checkBasWebAll: false,
      isIndeterminateBasWeak: true,
      checkBasWeakAll: false,
      isIndeterminateBasBase: true,
      checkBasBaseAll: false,
      isIndeterminateAppSecurity: true,
      checkAppSecurityAll: false,
      isIndeterminateContentSecurity: true,
      checkContentSecurityAll: false,
      isIndeterminateCodeSafe: true,
      checkCodeSafeAll: false,
      isIndeterminateInternetAsset: true,
      checkInternetAssetAll: false
    }
  },
  created() {
    const param = {}
    param.reportType = 'basicSecurity'
    this.getBasSecuritySet(param)
    // this.getConfigMonth();
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      const reportType = tab.name
      const param = {}
      param.reportType = reportType
      this.getRptSet(param)
      // this.getCharData(tab.name);
    },
    getRptSet(param) {
      const reportType = param.reportType
      if (reportType === 'basicSecurity') {
        this.getBasSecuritySet(param)
      } else if (reportType === 'appSecurity') {
        this.getAppSecurity(param)
      } else if (reportType === 'contentSecurity') {
        this.getContentSecurity(param)
      } else if (reportType === 'manageSecurity') {
        this.getManageSecurity(param)
      } else if (reportType === 'codeSafe') {
        this.getCodeSafe(param)
      } else if (reportType === 'internetAsset') {
        this.getInternetAsset(param)
      }
    },
    handleCheckAllBasBaseChange(val) {
      // let arr = ["中高危系统漏洞资产分布图","系统漏洞问题近况视图","系统漏洞问题整改情况","业务系统中高危系统漏洞排名"];
      const arr = ['basAsset_1', 'basVuln_1', 'basRectify_1', 'basBiz_1']
      this.checkedBasBase = val ? arr : []
      this.isIndeterminateBasBase = false
    },
    handleCheckedBasBaseChange(value) {
      const checkedCount = value.length
      window.console.info(checkedCount + 'checkedCount')
      this.checkBasBaseAll = checkedCount === 0 ? false : checkedCount === this.checkedBasBase.length
      this.isIndeterminateBasBase = checkedCount > 0 && checkedCount < this.basBaseOptions.length
    },

    handleCheckAllBasWeakChange(val) {
      const arr = ['basAsset_2', 'basVuln_2', 'basRectify_2', 'basBiz_2']
      this.checkedBasWeak = val ? arr : []
      this.isIndeterminateBasWeak = false
    },
    handleCheckedBasWeakChange(value) {
      const checkedCount = value.length
      this.checkBasWeakAll = checkedCount === 0 ? false : checkedCount === this.checkedBasWeak.length
      this.isIndeterminateBasWeak = checkedCount > 0 && checkedCount < this.basWeakOptions.length
    },

    handleCheckAllBasSysChange(val) {
      const arr = ['basAsset_3', 'basVuln_3', 'basRectify_3', 'basBiz_3']
      this.checkedBasSys = val ? arr : []
      this.isIndeterminateBasSys = false
    },
    handleCheckedBasSysChange(value) {
      const checkedCount = value.length
      this.checkBasSysAll = checkedCount === 0 ? false : checkedCount === this.checkedBasSys.length
      this.isIndeterminateBasSys = checkedCount > 0 && checkedCount < this.basBaseOptions.length
    },

    handleCheckAllBasWebChange(val) {
      const arr = ['basAsset_4', 'basVuln_4', 'basRectify_4', 'basBiz_4']
      this.checkedBasWeb = val ? arr : []
      this.isIndeterminateBasWeb = false
    },
    handleCheckedBasWebChange(value) {
      const checkedCount = value.length
      this.checkBasWebAll = checkedCount === 0 ? false : checkedCount === this.checkedBasWeb.length
      this.isIndeterminateBasWeb = checkedCount > 0 && checkedCount < this.basWebOptions.length
    },

    handleCheckAllAppSecurityChange(val) {
      const arr = ['basAsset_5', 'basVuln_5', 'basRectify_5', 'basBiz_5']
      this.checkedAppSecurity = val ? arr : []
      this.isIndeterminateAppSecurity = false
    },
    handleCheckedAppSecurityChange(value) {
      const checkedCount = value.length
      this.checkAppSecurityAll = checkedCount === 0 ? false : checkedCount === this.checkedAppSecurity.length
      this.isIndeterminateAppSecurity = checkedCount > 0 && checkedCount < this.appSecurityOptions.length
    },

    handleCheckAllContentSecurityChange(val) {
      const arr = ['basAsset_6', 'basVuln_6', 'basRectify_6', 'basBiz_6']
      this.checkedContentSecurity = val ? arr : []
      this.isIndeterminateContentSecurity = false
    },
    handleCheckedContentSecurityChange(value) {
      const checkedCount = value.length
      this.checkContentSecurityAll = checkedCount === 0 ? false : checkedCount === this.checkedContentSecurity.length
      this.isIndeterminateContentSecurity = checkedCount > 0 && checkedCount < this.contentSecurityOptions.length
    },
    handleCheckedManageSecurityChange(value) {

    },

    handleCheckAllCodeSafeChange(val) {
      const arr = ['codeSafeAsset_7', 'codeSafeVuln_7', 'codeSafeRectify_7', 'codeSafeBiz_7']
      this.checkedCodeSafe = val ? arr : []
      this.isIndeterminateCodeSafe = false
    },
    handleCheckedCodeSafeChange(value) {
      const checkedCount = value.length
      this.checkCodeSafeAll = checkedCount === 0 ? false : checkedCount === this.checkedCodeSafe.length
      this.isIndeterminateCodeSafe = checkedCount > 0 && checkedCount < this.codeSafeOptions.length
    },

    handleCheckAllInternetAssetChange(val) {
      const arr = ['internetAssetAsset_8', 'internetAssetVuln_8', 'internetAssetRectify_8', 'internetAssetBiz_8']
      this.checkedInternetAsset = val ? arr : []
      this.isIndeterminateInternetAsset = false
    },
    handleCheckedInternetAssetChange(value) {
      const checkedCount = value.length
      this.checkInternetAssetAll = checkedCount === 0 ? false : checkedCount === this.checkedInternetAsset.length
      this.isIndeterminateInternetAsset = checkedCount > 0 && checkedCount < this.internetAssetOptions.length
    },

    getBasSecuritySet(param) {
      const $self = this
      $self.basLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedBasSys = []
        var i = 0
        var len = 0
        for (i = 0, len = response.basSysList.length; i < len; i++) {
          const basSysJson = response.basSysList[i]
          $self.checkedBasSys.push(basSysJson.REPORT_ID)
        }
        $self.handleCheckedBasSysChange($self.checkedBasSys)

        $self.checkedBasWeb = []
        for (i = 0, len = response.basWebList.length; i < len; i++) {
          const basWebJson = response.basWebList[i]
          $self.checkedBasWeb.push(basWebJson.REPORT_ID)
        }
        $self.handleCheckedBasWebChange($self.checkedBasWeb)

        $self.checkedBasWeak = []
        for (i = 0, len = response.basWeakList.length; i < len; i++) {
          const basWeakJson = response.basWeakList[i]
          $self.checkedBasWeak.push(basWeakJson.REPORT_ID)
        }
        $self.handleCheckedBasWeakChange($self.checkedBasWeak)

        $self.checkedBasBase = []
        for (i = 0, len = response.basBaseList.length; i < len; i++) {
          const basBaseJson = response.basBaseList[i]
          $self.checkedBasBase.push(basBaseJson.REPORT_ID)
        }
        $self.handleCheckedBasBaseChange($self.checkedBasBase)
        $self.basLoading = false
      })
    },

    getAppSecurity(param) {
      const $self = this
      $self.appLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedAppSecurity = []
        for (var i = 0, len = response.appSecurityList.length; i < len; i++) {
          const appSecurityJson = response.appSecurityList[i]
          $self.checkedAppSecurity.push(appSecurityJson.REPORT_ID)
        }
        $self.handleCheckedAppSecurityChange($self.checkedAppSecurity)

        $self.appLoading = false
      })
    },

    getContentSecurity(param) {
      const $self = this
      $self.contentLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedContentSecurity = []
        for (var i = 0, len = response.contentSecurityList.length; i < len; i++) {
          const contentSecurityJson = response.contentSecurityList[i]
          $self.checkedContentSecurity.push(contentSecurityJson.REPORT_ID)
        }
        $self.handleCheckedContentSecurityChange($self.checkedContentSecurity)
        $self.contentLoading = false
      })
    },

    getManageSecurity(param) {
      const $self = this
      $self.manageLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedManageSecurity = []
        for (var i = 0, len = response.manageSecurityList.length; i < len; i++) {
          const manageSecurityJson = response.manageSecurityList[i]
          $self.checkedManageSecurity.push(manageSecurityJson.REPORT_ID)
        }
        $self.handleCheckedManageSecurityChange($self.checkedManageSecurity)
        this.manageLoading = false
      })
    },

    getCodeSafe(param) {
      const $self = this
      $self.codeLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedCodeSafe = []
        for (var i = 0, len = response.codeSafeList.length; i < len; i++) {
          const codeSafeJson = response.codeSafeList[i]
          $self.checkedCodeSafe.push(codeSafeJson.REPORT_ID)
        }
        $self.handleCheckedCodeSafeChange($self.checkedCodeSafe)
        this.codeLoading = false
      })
    },

    getInternetAsset(param) {
      const $self = this
      $self.internetLoading = true
      param.userId = $self.userInfo.userId
      this.$store.dispatch('rptView/loadViewSet', param).then(response => {
        $self.checkedInternetAsset = []
        for (var i = 0, len = response.internetAssetList.length; i < len; i++) {
          const internetAssetJson = response.internetAssetList[i]
          $self.checkedInternetAsset.push(internetAssetJson.REPORT_ID)
        }
        $self.handleCheckedInternetAssetChange($self.checkedInternetAsset)
        this.internetLoading = false
      })
    },

    saveSet() {
      const $self = this
      $self.saveLoading = true
      const reportType = $self.activeName
      const param = {}
      param.reportType = reportType
      param.userId = $self.userInfo.userId
      if (reportType === 'basicSecurity') {
        const rIdArr = []
        var i = 0
        for (i in $self.checkedBasSys) {
          rIdArr.push($self.checkedBasSys[i])
        }
        for (i in $self.checkedBasWeb) {
          rIdArr.push($self.checkedBasWeb[i])
        }
        for (i in $self.checkedBasWeak) {
          rIdArr.push($self.checkedBasWeak[i])
        }
        for (i in $self.checkedBasBase) {
          rIdArr.push($self.checkedBasBase[i])
        }
        param.reportIds = rIdArr
      } else if (reportType === 'appSecurity') {
        const rIdArr = []
        for (i in $self.checkedAppSecurity) {
          rIdArr.push($self.checkedAppSecurity[i])
        }
        param.reportIds = rIdArr
      } else if (reportType === 'contentSecurity') {
        const rIdArr = []
        for (i in $self.checkedContentSecurity) {
          rIdArr.push($self.checkedContentSecurity[i])
        }
        param.reportIds = rIdArr
      } else if (reportType === 'manageSecurity') {
        const rIdArr = []
        for (i in $self.checkedManageSecurity) {
          rIdArr.push($self.checkedManageSecurity[i])
        }
        param.reportIds = rIdArr
      } else if (reportType === 'codeSafe') {
        const rIdArr = []
        for (i in $self.checkedCodeSafe) {
          rIdArr.push($self.checkedCodeSafe[i])
        }
        param.reportIds = rIdArr
      } else if (reportType === 'internetAsset') {
        const rIdArr = []
        for (i in $self.checkedInternetAsset) {
          rIdArr.push($self.checkedInternetAsset[i])
        }
        param.reportIds = rIdArr
      }
      window.console.info(param)
      this.$store.dispatch('rptView/reportViewSet', param).then(response => {
        if (response.RET_CODE === '0') {
          $self.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          $self.$message({
            message: '操作失败',
            type: 'error'
          })
        }
        $self.saveLoading = false
        $self.getRptSet(param)
      }).catch(() => {
        $self.saveLoading = false
      })
    }
  }
}
</script>

<style scoped>
.titles{
  line-height: 32px;
  float: left;
}
.titles:before{
  content:"";
  width: 4px;
  height: 20px;
  background-color: rgba(0, 204, 255, 1);
  float: left;
  margin: 5px 5px 0px -5px;
}
.data_root_titles{
  line-height: 32px;
  float: left;
}
.data_root_titles:before{
  content:"";
  width: 4px;
  height: 25px;
  background-color: rgb(26, 111, 190);
  float: left;
  margin: 5px 5px 0px -5px;
}
</style>
