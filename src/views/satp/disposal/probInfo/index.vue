<template>
  <div class="app-container">
    <el-card>
      <el-form
        label-width="100px"
        label-position="left"
        size="small"
        class="satp-form-inline"
      >
        <el-row>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="设备名称">
              <el-input v-model="queryArgs.assetName" placeholder="设备名称" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="资产地址">
              <el-input v-model="queryArgs.logicAddr" placeholder="资产IP(IP或URL) " size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="业务系统">
              <el-input v-model="queryArgs.bizName" placeholder="业务系统" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="资产类型 ">
              <el-select v-model="queryArgs.assetType" placeholder="资产类型" size="small">
                <el-option
                  v-for="item in probAssetTypeOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-dropdown size="small" split-button type="primary" @click="searchData">
              <i class="el-icon-search" />查询
              <el-dropdown-menu slot="dropdown">
                <el-link @click="showCondition=true">
                  <el-dropdown-item>高级条件</el-dropdown-item>
                </el-link>
                <el-link v-if="showCondition==true" @click="showCondition=false">
                  <el-dropdown-item>收起</el-dropdown-item>
                </el-link>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" @click="cleanSearchParm">重置</el-button>
            <!-- <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button> -->
          </el-col>

        </el-row>
        <!-- 搜索条件大于三个添加这块  --第二行的搜索条件 -->
        <el-row v-show="showCondition">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="问题名称">
              <el-input v-model="queryArgs.vulnTitle" placeholder="问题名称" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="问题分类">
              <el-select v-model="queryArgs.vulnClass" placeholder="问题分类" size="small">
                <el-option
                  v-for="item in vulnClassOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="整改状态 ">
              <el-select v-model="queryArgs.rectStat" placeholder="整改状态" size="small">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="showCondition">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="问题发现时间 ">
              <el-date-picker
                v-model="dcvrTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <component
        :is="componentData.component"
        :url="url"
        :qparams="queryArgs"
        :columns="columns"
        idx
        :height="tableHeight"
        border
        @operClick="operClick"
      />
      <router-view />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'disposal/queryProbdetailListByPage',
      tableHeight: 450,
      columns: [
        { label: '问题名称', prop: 'vulnTitle', 'minWidth': 150, align: 'center' },
        { label: '问题描述', prop: 'vulnDesc', 'minWidth': 150, align: 'center' },
        { label: '问题分类', prop: 'vulnClassName', 'minWidth': 150, align: 'center' },
        { label: '问题类型', prop: 'vulnTypeName', 'minWidth': 150, align: 'center' },
        { label: '问题发现时间', prop: 'dcvrTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.dcvrTimeFormatter },
        { label: '问题来源', prop: 'vulnSrcName', 'minWidth': 150, align: 'center' },
        { label: '重复出现', prop: 'isRepetLabel', 'minWidth': 150, align: 'center' },
        { label: '发现次数', prop: 'occNo', 'minWidth': 150, align: 'center' },
        { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 150, align: 'center' },
        { label: '整改发起时间', prop: 'rectTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.rectTimeFormatter },
        { label: '整改期限', prop: 'rectPeriod', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          fixed: 'right',
          width: 100,
          actions: [
            { formatter: 'operFormat', label: '历史轨迹', prop: 'hisInfo', type: 'primary', icon: '' }
          ]
        }
      ],
      componentData: {},
      showCondition: false,
      queryArgs: {

      },
      dcvrTime: [],
      statusOptions: [],
      vulnClassOptions: [],
      probAssetTypeOptions: []
    }
  },
  created() {
    this.initTable()
    this.getOptions('rectStat', 'cmpProb', 'statusOptions')
    this.getOptions('probAssetType', 'cmpProb', 'probAssetTypeOptions')
    this.getOptions('vulnClass', 'cmpProb', 'vulnClassOptions')
  },
  methods: {
    initTable() {
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },

    dcvrTimeFormatter(row) {
      if (!row.dcvrTime) {
        return ''
      }
      return this.moment(row.dcvrTime).format('YYYY-MM-DD HH:mm:ss')
    },
    rectTimeFormatter(row) {
      if (!row.rectTime) {
        return ''
      }
      return this.moment(row.rectTime).format('YYYY-MM-DD HH:mm:ss')
    },
    searchData() {
      this.initTable()
    },
    // 查询当前条件
    cleanSearchParm() {
      // tables数据查询条件
      this.queryArgs = {

      }
      // window.console.log(this.dcvrTime);
      this.dcvrTime = []
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'hisInfo':
          this.hisInfo(row)
          break
        default:
          break
      }
    },
    // 历史轨迹
    hisInfo(row) {
      this.$router.push({
        path: '/satp/disposal/probHis',
        query: {
          'logicId': row.logicId,
          'probDetailId': row.probDetailId
        }
      })
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'statusOptions') {
          $self.statusOptions = response.result
        } else if (options === 'probAssetTypeOptions') {
          $self.probAssetTypeOptions = response.result
        } else if (options === 'vulnClassOptions') {
          $self.vulnClassOptions = response.result
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped>

</style>
