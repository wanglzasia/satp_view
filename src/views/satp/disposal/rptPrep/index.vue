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
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="资产ip">
              <el-input v-model="queryArgs.logicAddr" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="报备类型">
              <el-select v-model="queryArgs.prepType" placeholder="整改状态" size="small">
                <el-option
                  v-for="item in prepTypeOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="报备时间">
              <el-date-picker
                v-model="queryArgs.prepTime"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
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
        <el-row v-show="showCondition">
          <el-col :span="8">
            <el-form-item label="合规项编号">
              <el-input v-model="queryArgs.itemNo" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合规项名称">
              <el-input v-model="queryArgs.itemName" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="pages">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            label="系统漏洞类问题"
            name="20"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <component
              :is="componentData.component"
              :url="url"
              :qparams="queryArgs"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              @operClick="operClick"
              @toolbarClick="toolbarClick"
            />
          </el-tab-pane>
          <el-tab-pane
            label="WEB漏洞类问题"
            name="21"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <component
              :is="componentData.component"
              :url="url"
              :qparams="queryArgs"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              @operClick="operClick"
              @toolbarClick="toolbarClick"
            />

          </el-tab-pane>
          <el-tab-pane
            label="基线类"
            name="22"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <component
              :is="componentData.component"
              :url="url"
              :qparams="queryArgs"
              :columns="columns"
              :toolbar="toolbar"
              idx
              :height="tableHeight"
              border
              @operClick="operClick"
              @toolbarClick="toolbarClick"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <router-view />
    </el-card>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index.js'
export default {
  components: {},
  data() {
    return {
      url: 'disposal/queryRptPrepListByPage',
      tableHeight: 450,
      columns: [
        { label: 'IP地址', prop: 'logicAddr', 'minWidth': 150, align: 'center' },
        { label: '设备名称', prop: 'assetName', 'minWidth': 150, align: 'center' },
        { label: '设备类型', prop: 'assetTypeLabel', 'minWidth': 150, align: 'center' },
        { label: '报备有效期', prop: 'expDate', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.expDateFormatter },
        { label: '报备时间', prop: 'prepTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.prepTimeFormatter },
        { label: '审批状态', prop: 'prepStatusLabel', 'minWidth': 150, align: 'center' },
        { label: '上报状态', prop: 'rptStatusLabel', 'minWidth': 150, align: 'center' },
        { label: '数据状态', prop: 'dataStatusLabel', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 100,
          actions: [
            { formatter: 'operFormat', label: '详情', prop: 'showDetailInfo', type: 'primary', icon: 'el-icon-document' }
          ]
        }
      ],
      toolbar: [
        { label: '报备申请', prop: 'add', type: 'primary', icon: 'el-icon-plus' }
      ],
      componentData: {},
      showCondition: false,
      tableData: [],
      activeName: '20',
      queryArgs: {
        logicAddr: '',
        prepType: '',
        prepTime: ''
      },
      prepTypeOptions: []
    }
  },
  created() {
    this.getOptions('prepType', 'rptPrep', 'prepTypeOptions')
    this.initTable()
  },
  methods: {
    handleClick(tab, event) {
      this.initTable()
    },
    initTable() {
      window.console.info('initTable')
      window.console.info(this.$store)
      this.queryArgs.prepType = this.activeName
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          this.add()
          break
        default:
          break
      }
    },
    prepTimeFormatter(row) {
      if (!row.dcvrTime) {
        return ''
      }
      return this.moment(row.prepTime).format('YYYY-MM-DD HH:mm:ss')
    },
    expDateFormatter(row) {
      if (!row.expDate) {
        return ''
      }
      return this.moment(row.expDate).format('YYYY-MM-DD')
    },
    searchData() {
      if (this.queryArgs.prepTime) {
        this.queryArgs.prepTime = parseTime(this.queryArgs.prepTime, '')
      }
      this.initTable()
    },
    cleanSearchParm() {
      this.queryArgs = {
        logicAddr: '',
        prepType: '',
        prepTime: ''
      }
      this.initTable()
    },
    // 报备
    add() {
      const prepType = this.activeName
      this.$router.push({
        path: '/satp/disposal/rptPrepAdd',
        query: {
          'prepType': prepType,
          'viewType': 'add'
        }
      })
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'showDetailInfo':
          this.showDetailInfo(row)
          break
        default:
          break
      }
    },
    showDetailInfo(row) {
      const prepId = row.prepId
      const dataStatus = row.dataStatus
      const prepStatus = row.prepStatus
      const prepType = row.prepType
      window.console.info('dataStatus', dataStatus)
      window.console.info('prepStatus', prepStatus)
      if (dataStatus == '0') { // 草稿
        if (prepStatus == '0') { // 待审批
          this.$router.push({
            path: '/satp/disposal/rptPrepAdd',
            query: {
              'prepType': prepType,
              'viewType': 'draft',
              'prepId': prepId
            }
          })
        }
        if (prepStatus == '2') { // 驳回
          this.$router.push({
            path: '/satp/disposal/rptPrepView',
            query: {
              'prepType': prepType,
              'viewType': 'view',
              'taskName': '报备审批中',
              'prepId': prepId
            }
          })
        }
      }
      if (dataStatus == '1') { // 正式提交
        this.$router.push({
          path: '/satp/disposal/rptPrepView',
          query: {
            'prepType': prepType,
            'formKey': 'view',
            'taskName': '报备审批中',
            'busiId': prepId
          }
        })
      }
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'prepTypeOptions') {
          $self.prepTypeOptions = response.result
        }
      }).catch(() => {
      })
    }

  }

}
</script>
<style scoped>

</style>
