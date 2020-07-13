<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="queryArgs"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="年度">
                <el-select v-model="queryArgs.year" placeholder="年度">
                  <el-option
                    v-for="item in yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="季度">
                <el-select v-model="queryArgs.quarter" placeholder="季度" @change="changeQuarter">
                  <el-option
                    v-for="item in quarterOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="月度">
                <el-select v-model="queryArgs.month" placeholder="月度">
                  <el-option
                    v-for="item in monthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-dropdown size="small" split-button type="primary" @click="getTaskList">
                <i class="el-icon-search" />查询
              </el-dropdown>
              <el-button size="small" icon="el-icon-download" @click="exportPdfAll">导出全部</el-button>
            </el-col>

          </el-row>
        </el-form>
      </el-card>
      <br>
      <component :is="taskSummaryComponentData.component" :parent-param="queryArgs" />
      <br>
      <component :is="probRectComponentData.component" :parent-param="queryArgs" />
      <br>
      <component :is="itemizedComponentData.component" :parent-param="queryArgs" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      queryArgs: {
        year: '',
        quarter: '',
        month: ''
      },
      yearOptions: [],
      quarterOptions: [
        { 'label': '1季度', 'value': '1' },
        { 'label': '2季度', 'value': '2' },
        { 'label': '3季度', 'value': '3' },
        { 'label': '4季度', 'value': '4' }
      ],
      monthOptions: [],
      taskSummaryComponentData: {},
      probRectComponentData: {},
      itemizedComponentData: {}
    }
  },
  created() {
    this.initSearchData()
    this.initTaskSummary()
    this.initProbRect()
    this.initItemized()
  },
  mounted() {
    // const that = this
    // window.onresize = () => {
    //   return (() => {
    //     that.Height = window.innerHeight - 195
    //   })()
    // }
  },
  methods: {
    initSearchData() {
      const year = new Date().getFullYear()
      const lastYear = year - 1
      this.yearOptions.push({ 'label': year + '年度', 'value': year })
      this.yearOptions.push({ 'label': lastYear + '年度', 'value': lastYear })
      this.queryArgs.year = year
    },
    initTaskSummary() {
      var myComponent = () => import('./taskSummary/index.vue')
      this.taskSummaryComponentData = {
        component: myComponent
      }
    },
    initProbRect() {
      var myComponent = () => import('./probRect/index.vue')
      this.probRectComponentData = {
        component: myComponent
      }
    },
    initItemized() {
      var myComponent = () => import('./itemized/index.vue')
      this.itemizedComponentData = {
        component: myComponent
      }
    },
    changeQuarter(val) {
      if (val === '1') {
        this.monthOptions = []
        this.monthOptions.push({ 'label': '1月', 'value': '1' })
        this.monthOptions.push({ 'label': '2月', 'value': '2' })
        this.monthOptions.push({ 'label': '3月', 'value': '3' })
      } else if (val === '2') {
        this.monthOptions = []
        this.monthOptions.push({ 'label': '4月', 'value': '4' })
        this.monthOptions.push({ 'label': '5月', 'value': '5' })
        this.monthOptions.push({ 'label': '6月', 'value': '6' })
      } else if (val === '3') {
        this.monthOptions = []
        this.monthOptions.push({ 'label': '7月', 'value': '7' })
        this.monthOptions.push({ 'label': '8月', 'value': '8' })
        this.monthOptions.push({ 'label': '9月', 'value': '9' })
      } else if (val === '4') {
        this.monthOptions = []
        this.monthOptions.push({ 'label': '10月', 'value': '10' })
        this.monthOptions.push({ 'label': '11月', 'value': '11' })
        this.monthOptions.push({ 'label': '12月', 'value': '12' })
      }
    },
    getTaskList() {
      this.initTaskSummary()
      this.initProbRect()
      this.initItemized()
    },
    exportPdfAll() {
      this.queryArgs.realName = '全部统计.pdf'
      this.$store.dispatch('reportManage/exportReportManagePdfAll', this.queryArgs).then(response => {
      })
    }
  }
}
</script>
